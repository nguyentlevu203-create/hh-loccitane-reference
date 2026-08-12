#!/usr/bin/env node
// Phase 7 — Step 1: shallow crawl of every public content page URL (from the site's own
// sitemap_pages_1.xml — 42 real URLs, none invented) to build the raw inventory that
// docs/research/phase-7-content/FULL_PAGE_INVENTORY.md and PAGE_TEMPLATE_MATRIX.md are derived
// from. Same static-HTML technique proven in scripts/crawl-collections-phase5.mjs — no browser/JS
// execution needed for template classification or rich-text content.
//
// For each page this fetches the real HTML and extracts:
//   - title (H1, real DOM)
//   - breadcrumb (real DOM breadcrumb, same markup pattern as PDPs/collections)
//   - meta description (og:description)
//   - template signal flags: has the standard sidebar+richtext body, has a store-locator address
//     map, has a contact form, or is a bespoke section-built landing page (`ldp-*` id/class,
//     `layoutPage-*`) — see PAGE_TEMPLATE_MATRIX.md for how these map to real templates.
//   - for STANDARD-template pages: the real rich-text body content (paragraphs)
//   - image count, section count (rough bespoke-page complexity signal, not full content)
//
// Output: scripts/.cache/pages-raw.json. Re-run is idempotent/safe (overwrites the cache).
//
// Usage: node scripts/crawl-pages-phase7.mjs [--limit=N] [--only=slug1,slug2]

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CACHE_DIR = path.join(ROOT, "scripts/.cache");
const CACHE_FILE = path.join(CACHE_DIR, "pages-raw.json");
const SITEMAP_URL = "https://vn.loccitane.com/sitemap_pages_1.xml";

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
    slug: url.replace(/^https?:\/\/vn\.loccitane\.com\/pages\//, ""),
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
    crumbs.push({ label: decodeEntities(nameM[1]).trim(), href });
  }
  return crumbs;
}

function extractMeta(html, prop) {
  const m = html.match(new RegExp(`<meta property="${prop}" content="([^"]*)"`));
  return m ? decodeEntities(m[1]).trim() : "";
}

function extractH1(html) {
  const matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  for (const m of matches) {
    const text = decodeEntities(m[1].replace(/<[^>]+>/g, "").trim());
    if (text) return text;
  }
  return "";
}

// Bespoke pages sometimes give their semantic <h1> a low-quality value (e.g. literally the page
// slug — a real content quirk on the live site, not a scrape bug). Where that happens, prefer the
// first *visible* on-page heading a real visitor would actually read as the page title — still
// 100% real text from the page, just a better-representative choice than the hidden slug string.
function extractDisplayHeading(body, slug, fallbackH1) {
  const headingMatches = [...body.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g)];
  const slugWords = slug.replace(/-/g, "").toLowerCase();
  for (const m of headingMatches) {
    const text = decodeEntities(m[1].replace(/<[^>]+>/g, "").trim());
    if (text && text.toLowerCase().replace(/\s+/g, "") !== slugWords) return text;
  }
  return fallbackH1;
}

// The og:image meta tag is often just the site-wide default share image on bespoke pages — the
// real per-page hero is the first lazy-loaded image in the body (`data-src`, same pattern used
// site-wide; `src` itself is always a tiny base64 placeholder swapped in by lazysizes JS).
function extractHeroImage(body) {
  const m = body.match(/data-src="(https:\/\/cdn\.hstatic\.net\/[^"]+)"/);
  return m ? m[1] : null;
}

// Generic lead-paragraph extraction for bespoke pages — no two bespoke pages share section class
// names, so rather than targeting per-page markup (which would mean hand-modeling each page), pull
// the first few substantial real visible text blocks in document order.
function extractLeadParagraphs(body, max = 3) {
  const paragraphs = htmlToParagraphs(body);
  const substantial = paragraphs.filter((p) => p.length >= 40 && /[a-zA-ZÀ-ỹ]/.test(p));
  return substantial.slice(0, max);
}

function stripScriptsAndStyles(html) {
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "");
}

function htmlToParagraphs(html) {
  const clean = stripScriptsAndStyles(html);
  const withBreaks = clean.replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|li|h[1-6]|div)>/gi, "\n\n");
  const stripped = withBreaks.replace(/<[^>]+>/g, "");
  const decoded = decodeEntities(stripped);
  return decoded
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function isolateBody(html) {
  const markerIdx = html.indexOf("breadcrumb-shop");
  if (markerIdx === -1) return null;
  // Start just after the breadcrumb nav's closing tag — `breadcrumb-shop` itself is a class-name
  // substring mid-attribute, and the breadcrumb links ("Trang chủ" etc.) aren't real page content.
  const olCloseIdx = html.indexOf("</ol>", markerIdx);
  const bodyStart = olCloseIdx === -1 ? markerIdx : olCloseIdx + "</ol>".length;
  const footerIdx = html.indexOf("<footer", bodyStart);
  const sectionNewsIdx = html.indexOf('class="section-news-wd', bodyStart); // feedback-strip marker, always after real page content
  let end = html.length;
  if (footerIdx !== -1) end = Math.min(end, footerIdx);
  if (sectionNewsIdx !== -1) end = Math.min(end, sectionNewsIdx);
  return html.slice(bodyStart, end);
}

function classifyTemplate(body) {
  if (body.includes("page-content content-entry")) return "standard";
  if (body.includes("address-map") && body.includes("change-tinh")) return "store-locator";
  if (body.includes("class='contact-form'") || body.includes('class="contact-form"')) return "contact-form";
  return "bespoke";
}

function extractStandardContent(body) {
  const m = body.match(/page-content content-entry[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/);
  if (!m) return [];
  return htmlToParagraphs(m[1]);
}

async function crawlOne({ url, slug }) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return { slug, url, error: `HTTP ${res.status}` };
  const html = await res.text();

  const rawTitle = extractH1(html) || extractMeta(html, "og:title");
  const ogDescription = extractMeta(html, "og:description");
  const ogImage = extractMeta(html, "og:image:secure_url") || extractMeta(html, "og:image");
  const breadcrumb = extractBreadcrumb(html);

  const body = isolateBody(html);
  if (body === null) {
    return { slug, url, title: rawTitle, ogDescription, ogImage, breadcrumb, error: "no breadcrumb-shop marker found", httpStatus: res.status };
  }

  const template = classifyTemplate(body);
  const title = extractDisplayHeading(body, slug, rawTitle);
  const paragraphs = template === "standard" ? extractStandardContent(body) : [];
  const leadParagraphs = template === "bespoke" ? extractLeadParagraphs(body) : [];
  const heroImage = template === "bespoke" ? extractHeroImage(body) || ogImage : ogImage;
  const wordCount = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  const imageCount = (body.match(/<img\b/g) || []).length;
  const sectionCount = (body.match(/<section\b/g) || []).length;
  const isEmpty = template === "standard" && wordCount === 0;

  return {
    slug,
    url,
    title,
    rawTitle,
    ogDescription,
    ogImage,
    heroImage,
    breadcrumb,
    template,
    paragraphs,
    leadParagraphs,
    wordCount,
    imageCount,
    sectionCount,
    isEmpty,
    httpStatus: res.status,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const limitArg = args.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
  const onlyArg = args.find((a) => a.startsWith("--only="));
  const only = onlyArg ? onlyArg.split("=")[1].split(",") : null;

  await mkdir(CACHE_DIR, { recursive: true });

  let existing = [];
  try {
    existing = JSON.parse(await readFile(CACHE_FILE, "utf-8"));
  } catch {
    // no cache yet
  }

  const allTargets = (await fetchSitemapSlugs()).slice(0, limit);
  const targets = only ? allTargets.filter((t) => only.includes(t.slug)) : allTargets;

  const results = only ? existing.filter((e) => !targets.find((t) => t.slug === e.slug)) : [];
  let i = 0;
  for (const t of targets) {
    i++;
    process.stdout.write(`[${i}/${targets.length}] ${t.slug} ... `);
    try {
      const r = await crawlOne(t);
      console.log(
        r.error
          ? `ERROR ${r.error}`
          : `OK (${r.template}, words=${r.wordCount}, imgs=${r.imageCount}, sections=${r.sectionCount})`,
      );
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
