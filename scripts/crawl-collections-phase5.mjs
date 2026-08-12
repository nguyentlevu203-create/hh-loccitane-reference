#!/usr/bin/env node
// Phase 5 — Step 1/6: shallow crawl of every public collection URL (from the site's own
// sitemap_collections_1.xml — 204 real URLs, none invented) to build the raw inventory that
// docs/research/FULL_COLLECTION_INVENTORY.md and COLLECTION_TEMPLATE_MATRIX.md are derived from.
//
// For each collection this fetches page 1 only (deterministic static HTML, no JS execution
// needed — same technique proven in scripts/scrape-products-phase4.mjs) and extracts:
//   - title (H1)
//   - breadcrumb (real DOM breadcrumb, same markup pattern as PDPs)
//   - meta description (og:description)
//   - displayed/total product count ("Hiển thị X trên Y")
//   - page-1 product slugs (real <a href="/products/..."> links)
//   - template signal flags: has editorial/description text, has a promo/banner block above the
//     grid, zero-product ("no longer live") collections
//
// Output: a single JSON cache at scripts/.cache/collections-raw.json so downstream doc-writing
// doesn't need to re-hit the network. Re-run is idempotent/safe (overwrites the cache).
//
// Usage: node scripts/crawl-collections-phase5.mjs [--limit=N]

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CACHE_DIR = path.join(ROOT, "scripts/.cache");
const CACHE_FILE = path.join(CACHE_DIR, "collections-raw.json");
const SITEMAP_URL = "https://vn.loccitane.com/sitemap_collections_1.xml";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

function decodeEntities(str) {
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

async function fetchSitemapSlugs() {
  const res = await fetch(SITEMAP_URL, { headers: { "User-Agent": UA } });
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  return locs.map((url) => ({
    url,
    slug: url.replace(/^https?:\/\/vn\.loccitane\.com\/collections\//, ""),
  }));
}

function extractBreadcrumb(html) {
  const m = html.match(/<ol class="breadcrumb breadcrumb-arrows">([\s\S]*?)<\/ol>/);
  if (!m) return [];
  const lis = [...m[1].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((x) => x[1]);
  const crumbs = [];
  for (const li of lis) {
    const hrefM = li.match(/href="([^"]+)"/);
    const nameM = li.match(/itemprop="name">([^<]+)</);
    if (!nameM) continue;
    let href = hrefM ? hrefM[1].replace(/^https?:\/\/vn\.loccitane\.com/, "") : null;
    if (href === "") href = "/";
    crumbs.push({ label: decodeEntities(nameM[1]).trim(), href, active: li.includes('class="active"') });
  }
  return crumbs;
}

function extractMeta(html, prop) {
  const m = html.match(new RegExp(`<meta property="${prop}" content="([^"]*)"`));
  return m ? decodeEntities(m[1]).trim() : "";
}

function extractH1(html) {
  const m = html.match(/<h1[^>]*>([^<]*)<\/h1>/);
  return m ? decodeEntities(m[1]).trim() : "";
}

function extractProductCount(body) {
  const dataTotal = body.match(/data-col-total="(\d+)"/);
  if (dataTotal) return { total: Number(dataTotal[1]) };
  const m = body.match(/Hiển thị\s*<span class="displayed">(\d+)<\/span>\s*trên\s*<span class="total-col">(\d+)<\/span>/);
  if (m) return { total: Number(m[2]) };
  return { total: null };
}

function extractProductSlugs(body) {
  const hrefs = [...body.matchAll(/href="\/products\/([a-z0-9-]+)"/g)].map((m) => m[1]);
  return [...new Set(hrefs)];
}

function extractDescription(body) {
  // Real editorial/collection description text lives inside .desc-col right after the H1, when present.
  const m = body.match(/<div class="desc-col[^"]*">([\s\S]*?)<\/div>/);
  if (!m) return "";
  const text = m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return decodeEntities(text);
}

function extractTemplateSignals(body) {
  return {
    hasFilterToolbar: body.includes("content-product-list") && body.includes("filter-and-sort-by"),
    hasProductGridContainer: body.includes("content-product-list"),
    hasSwiperCarousel: body.includes("swiper-wrapper"),
    hasPagination: /id="pagination"/.test(body),
    explicitlyEmpty: body.includes("Hiện chưa có sản phẩm") || body.includes("Không tìm thấy sản phẩm"),
    // The site's own CSS literally names this the "new" collection template — a real,
    // site-authored structural signal, not a heuristic we invented.
    isCategoryLandingTemplate: body.includes("style-collection-new-template"),
  };
}

function extractHeroImage(body) {
  const m = body.match(/banner-collection-header[\s\S]{0,400}?data-src="([^"]+)"/);
  if (!m) return null;
  let src = m[1];
  if (src.startsWith("//")) src = "https:" + src;
  return src;
}

function extractSubcategoryLinks(body) {
  const m = body.match(/class="list-category[\s\S]*?<\/ul>/);
  if (!m) return [];
  const items = [...m[0].matchAll(/<a href="([^"]*)"[^>]*title="([^"]*)"/g)];
  return items.map(([, href, title]) => ({ href, label: decodeEntities(title).trim() })).filter((x) => x.href && x.href !== "/");
}

// The site's header search-suggestions dropdown ("Discover our best-sellers") embeds a fixed
// 3-product swiper on EVERY page, before any real collection content — isolate the real page
// body (between the title block and the footer) so that widget never gets misread as this
// collection's own product membership.
function isolateBody(html) {
  const bodyStart = html.indexOf("breadcrumb-shop");
  if (bodyStart === -1) return null; // no recognizable collection template on this page
  const footerIdx = html.indexOf("<footer", bodyStart);
  return html.slice(bodyStart, footerIdx === -1 ? html.length : footerIdx);
}

async function crawlOne({ url, slug }) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return { slug, url, error: `HTTP ${res.status}` };
  const html = await res.text();

  const title = extractH1(html);
  const ogTitle = extractMeta(html, "og:title");
  const ogDescription = extractMeta(html, "og:description");
  const ogImage = extractMeta(html, "og:image:secure_url") || extractMeta(html, "og:image");
  const breadcrumb = extractBreadcrumb(html);

  const body = isolateBody(html);
  if (body === null) {
    return { slug, url, title, ogTitle, ogDescription, ogImage, breadcrumb, error: "no recognizable collection template (no 'heading-desc' block)", httpStatus: res.status };
  }

  const { total } = extractProductCount(body);
  const signals = extractTemplateSignals(body);
  const productSlugs = signals.explicitlyEmpty ? [] : extractProductSlugs(body);
  const description = extractDescription(body);
  const isEmpty = signals.explicitlyEmpty || total === 0;
  const heroImage = extractHeroImage(body);
  const subcategoryLinks = extractSubcategoryLinks(body);

  return {
    slug,
    url,
    title,
    ogTitle,
    ogDescription,
    ogImage,
    breadcrumb,
    total,
    productSlugCount: productSlugs.length,
    productSlugs,
    description,
    heroImage,
    subcategoryLinks,
    ...signals,
    isEmpty,
    httpStatus: res.status,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const limitArg = args.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
  const retryOnly = args.includes("--retry-errors");
  const onlyArg = args.find((a) => a.startsWith("--only="));
  const only = onlyArg ? onlyArg.split("=")[1].split(",") : null;

  await mkdir(CACHE_DIR, { recursive: true });

  let existing = [];
  if (retryOnly || only) {
    existing = JSON.parse(await readFile(CACHE_FILE, "utf-8"));
  }

  const allTargets = (await fetchSitemapSlugs()).slice(0, limit);
  const targets = only
    ? allTargets.filter((t) => only.includes(t.slug))
    : retryOnly
      ? allTargets.filter((t) => existing.find((e) => e.slug === t.slug)?.error)
      : allTargets;
  console.log(`Crawling ${targets.length} collections...`);

  const results = (retryOnly || only)
    ? existing.filter((e) => !targets.find((t) => t.slug === e.slug))
    : [];
  let i = 0;
  for (const t of targets) {
    i++;
    process.stdout.write(`[${i}/${targets.length}] ${t.slug} ... `);
    try {
      const r = await crawlOne(t);
      console.log(r.error ? `ERROR ${r.error}` : `OK (total=${r.total}, page1Products=${r.productSlugCount})`);
      results.push(r);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      results.push({ slug: t.slug, url: t.url, error: err.message });
    }
  }

  results.sort((a, b) => allTargets.findIndex((t) => t.slug === a.slug) - allTargets.findIndex((t) => t.slug === b.slug));
  await writeFile(CACHE_FILE, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\nWrote ${results.length} entries to ${path.relative(ROOT, CACHE_FILE)}`);
}

main();
