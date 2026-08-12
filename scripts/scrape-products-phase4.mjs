#!/usr/bin/env node
// Phase 4 — bulk PDP scraper for the 42 remaining modeled products.
//
// Source of truth for each field:
//   - name/sku/price/images/variants/stock: window.wd.productjson, server-rendered inline in the
//     page HTML (Haravan config object) — same source used for the original reference product,
//     just read via static fetch instead of browser_evaluate since it's already present pre-JS.
//   - breadcrumb: the real <ol class="breadcrumb breadcrumb-arrows"> markup on the page (per-product,
//     not guessed) — excludes the trailing "active" crumb (the product name itself), matching the
//     convention set by the reference product's record.
//   - descriptionSections: parsed from productjson.description's numbered "N. HEADING" plain-text
//     structure (verified consistent across sampled products in PDP_TEMPLATE_MATRIX.md).
//   - category: from docs/research/FULL_PRODUCT_INVENTORY.md's curated table (not present in live
//     data — this is our own QA taxonomy).
//   - promoCodes/giftPanel/recommendations: NOT scraped here (these are client-side/AJAX-injected on
//     the live site and were only ever captured for the one reference product via browser_evaluate).
//     Left empty/omitted and flagged in missingFields rather than fabricated or copied across
//     unrelated products.
//
// Usage: node scripts/scrape-products-phase4.mjs [--only slug1,slug2] [--dry-run]

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const RECORDS_DIR = path.join(ROOT, "src/data/products/records");
const PUBLIC_BASE = path.join(ROOT, "public/products");

// The 43-item modeled table from docs/research/FULL_PRODUCT_INVENTORY.md, minus the reference
// product already scraped by hand (dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml).
const TARGETS = [
  { slug: "dau-tre-hoa-da-hoa-cuc-truong-sinh", category: "face-care" },
  { slug: "gel-tam-huong-hoa-anh-dao-1", category: "body-care" },
  { slug: "gel-tam-huong-hoa-hong-rose-shower-gel-250ml", category: "body-care" },
  { slug: "kem-duong-da-tay-hoa-oai-huong-trang", category: "hand-care" },
  { slug: "sua-duong-the-huong-hoa-oai-huong-trang", category: "body-care" },
  { slug: "gel-tam-huong-hoa-oai-huong-trang", category: "body-care" },
  { slug: "dau-goi-phuc-hoi-toc-hu-ton", category: "hair-care" },
  { slug: "kem-duong-da-tay-huong-hoa-cuc-huong-ngai", category: "hand-care" },
  { slug: "sua-duong-the-hoa-moc-te-mo", category: "body-care" },
  { slug: "phien-ban-moi-kem-duong-da-tay-hanh-nhan", category: "hand-care" },
  { slug: "kem-duong-da-chan", category: "body-care" },
  { slug: "phien-ban-moi-sua-duong-the-hanh-nhan", category: "body-care" },
  { slug: "combo-bo-qua-tang10-rose", category: "gifts" },
  { slug: "combo-bo-qua-tang17", category: "gifts" },
  { slug: "combo-qua-tang-11", category: "gifts" },
  { slug: "bo-cham-soc-da-mat-danh-cho-khach-tham-gia-chuong-trinh-big-little-things", category: "face-care" },
  { slug: "bo-cham-soc-co-the-hanh-nhan-danh-cho-khach-tham-gia-chuong-trinh-big-little-things", category: "body-care" },
  { slug: "combo-bo-qua-tang-28", category: "gifts" },
  { slug: "combo-bo-qua-tang13", category: "gifts" },
  { slug: "combo-bo-qua-tang12-1", category: "gifts" },
  { slug: "combo-bo-qua-tang10-1", category: "gifts" },
  { slug: "combo-qua-tang-8", category: "gifts" },
  { slug: "combo-bo-qua-tang-21", category: "gifts" },
  { slug: "combo-bo-qua-tang-45", category: "gifts" },
  { slug: "combo-qua-tang", category: "gifts" },
  { slug: "combo-bo-qua-tang", category: "gifts" },
  { slug: "combo-cham-soc-co-the-hanh-nhan", category: "gifts" },
  { slug: "bo-du-lich-cham-soc-co-the-hanh-nhan", category: "body-care" },
  { slug: "bo-doi-goi-xa-cham-soc-toc-l-occitane-tang-bo-cham-soc-co-the-hoa-hong-luoc-go-va-tui-l-occitane", category: "hair-care" },
  { slug: "tinh-chat-duong-da-dau-ban-dem-tang-bo-cham-soc-toc-va-tui-l-occitane", category: "hair-care" },
  { slug: "tinh-chat-duong-da-dau-cuc-truong-sinh-tang-bo-cham-soc-toc-va-tui-l-occitane", category: "hair-care" },
  { slug: "tinh-chat-tre-hoa-da-cuc-truong-sinh-tang-bo-cham-soc-co-the-hanh-nhan-va-tui-l-occitane", category: "gifts" },
  { slug: "kem-duong-chong-lao-hoa-cuc-truong-sinh-tang-bo-cham-soc-co-the-hanh-nhan-va-tui-l-occitane", category: "gifts" },
  { slug: "bo-doi-san-pham-chong-lao-hoa-da-cao-cap-tang-bo-cham-soc-ban-than-tai-nha", category: "gifts" },
  { slug: "bo-doi-cham-soc-da-mat-cuc-truong-sinh-tang-bo-cham-soc-ban-than-tai-nha", category: "face-care" },
  { slug: "combo-cham-soc-da-mat-l-occitane-tang-combo-cham-soc-co-the-hanh-nhan", category: "gifts" },
  { slug: "kem-duong-da-cuc-truong-sinh-tang-bo-san-pham-cham-soc-da-cuc-truong-sinh-va-tui-l-occitane", category: "gifts" },
  { slug: "dau-duong-tre-hoa-da-tang-bo-san-pham-duong-da-tre-hoa-cao-cap-tu-cuc-truong-sinh-va-tui-l-occitane-2", category: "gifts" },
  { slug: "tinh-chat-tai-sinh-quyen-nang-ngua-lao-hoa-75ml-tang-bo-doi-cham-soc-da-cuc-truong-sinh-va-tui-l-occitane", category: "face-care" },
  { slug: "tinh-chat-tai-sinh-quyen-nang-ngua-lao-hoa-50ml-tang-bo-doi-cham-soc-da-cuc-truong-sinh-va-tui-l-occitane", category: "face-care" },
  { slug: "kem-duong-da-tay-20-bo-dau-mo-l-occitane-150ml-duong-am", category: "hand-care" },
  { slug: "dau-tam-hanh-nhan-5", category: "refills" },
  { slug: "kem-tam-bo-dau-mo-shea-shower-cream-75ml", category: "body-care" },
];

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

function extractBalancedObject(html, key) {
  const keyIdx = html.indexOf(key);
  if (keyIdx === -1) return null;
  const start = html.indexOf("{", keyIdx);
  let depth = 0;
  for (let i = start; i < html.length; i++) {
    if (html[i] === "{") depth++;
    else if (html[i] === "}") {
      depth--;
      if (depth === 0) return html.slice(start, i + 1);
    }
  }
  return null;
}

function extractBreadcrumb(html) {
  const m = html.match(/<ol class="breadcrumb breadcrumb-arrows">([\s\S]*?)<\/ol>/);
  if (!m) return [];
  const lis = [...m[1].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((x) => x[1]);
  const crumbs = [];
  for (const li of lis) {
    if (li.includes('class="active"')) continue; // trailing crumb duplicates the product name
    const hrefM = li.match(/href="([^"]+)"/);
    const nameM = li.match(/itemprop="name">([^<]+)</);
    if (!hrefM || !nameM) continue;
    let href = hrefM[1].replace(/^https?:\/\/vn\.loccitane\.com/, "");
    if (href === "") href = "/";
    crumbs.push({ label: decodeEntities(nameM[1]).trim(), href });
  }
  return crumbs;
}

function htmlToLines(html) {
  const withBreaks = html.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n\n");
  const stripped = withBreaks.replace(/<[^>]+>/g, "");
  const decoded = decodeEntities(stripped);
  return decoded
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

const HEADING_RE = /^\d+\.\s*[A-ZÀ-Ỹ]/;

function parseDescriptionSections(descriptionHtml) {
  if (!descriptionHtml) return [];
  const lines = htmlToLines(descriptionHtml);
  const firstHeadingIdx = lines.findIndex((l) => HEADING_RE.test(l));
  if (firstHeadingIdx === -1) {
    // No numbered structure (e.g. gift-bundle plain-text descriptions) — keep the real text as one
    // section rather than fabricating headings that don't exist on the live page.
    return lines.length ? [{ heading: "MÔ TẢ SẢN PHẨM", body: lines.join("\n") }] : [];
  }
  const sections = [];
  let current = null;
  for (let i = firstHeadingIdx; i < lines.length; i++) {
    const line = lines[i];
    if (HEADING_RE.test(line)) {
      if (current) sections.push(current);
      current = { heading: line, body: "" };
    } else if (current) {
      current.body += (current.body ? "\n" : "") + line;
    }
  }
  if (current) sections.push(current);
  return sections;
}

function formatPrice(centiValue) {
  // productjson prices are in VND * 100 (e.g. 89000000 -> 890,000₫)
  const vnd = Math.round(centiValue / 100);
  return `${vnd.toLocaleString("en-US")}₫`;
}

function extFromUrl(url) {
  const clean = url.split("?")[0];
  const ext = path.extname(clean);
  return ext && ext.length <= 5 ? ext : ".png";
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Image fetch failed ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
}

function tsString(value) {
  return JSON.stringify(value);
}

function renderRecordFile({ slug, sku, name, category, breadcrumb, imagesPublicPaths, variants, price, originalPrice, stock, descriptionSections, sourceUrl, missingFields }) {
  const variantsSrc = variants
    .map(
      (v) =>
        `    { id: ${tsString(v.id)}, value: ${tsString(v.value)}, price: ${tsString(v.price)}, sku: ${tsString(v.sku)}, available: ${v.available} },`,
    )
    .join("\n");

  const breadcrumbSrc = breadcrumb
    .map((c) => `    { label: ${tsString(c.label)}, href: ${tsString(c.href)} },`)
    .join("\n");

  const imagesSrc = imagesPublicPaths.map((p) => `    ${tsString(p)},`).join("\n");

  const descSrc = descriptionSections
    .map((s) => `    {\n      heading: ${tsString(s.heading)},\n      body: ${tsString(s.body)},\n    },`)
    .join("\n");

  const originalPriceLine = originalPrice ? `\n  originalPrice: ${tsString(originalPrice)},` : "";
  const missingFieldsLine = missingFields.length
    ? `\n  missingFields: [${missingFields.map(tsString).join(", ")}],`
    : "";

  return `import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

// Source: ${sourceUrl}
// Scraped via scripts/scrape-products-phase4.mjs from the live page's server-rendered
// window.wd.productjson + real breadcrumb markup. promoCodes/giftPanel/recommendations are
// client-side-injected on the live site and were not captured here — see missingFields.
const product: ProductDetail = {
  slug: ${tsString(slug)},
  sku: ${tsString(sku)},
  name: ${tsString(name)},
  category: ${tsString(category)},
  breadcrumb: [
${breadcrumbSrc}
  ],
  images: [
${imagesSrc}
  ],
  optionLabel: ${tsString(variants.length ? "Dung tích" : "")},
  variants: [
${variantsSrc}
  ],
  price: ${tsString(price)},${originalPriceLine}
  promoCodes: [],
  stock: ${tsString(stock)},
  descriptionSections: [
${descSrc}
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  shareUrl: ${tsString(sourceUrl)},${missingFieldsLine}
};

export default product;
`;
}

async function scrapeOne({ slug, category }) {
  const sourceUrl = `https://vn.loccitane.com/products/${slug}`;
  const res = await fetch(sourceUrl, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${sourceUrl}`);
  const html = await res.text();

  const raw = extractBalancedObject(html, "productjson");
  if (!raw) throw new Error(`productjson not found for ${slug}`);
  const data = JSON.parse(raw);

  const breadcrumb = extractBreadcrumb(html);
  const name = decodeEntities(data.title).trim();
  const variantsRaw = data.variants ?? [];
  const primaryVariant = variantsRaw[0];
  const sku = primaryVariant?.sku || String(data.id);
  const price = formatPrice(primaryVariant?.price ?? data.price ?? 0);
  const compareAt = primaryVariant?.compare_at_price ?? 0;
  const originalPrice = compareAt && compareAt > (primaryVariant?.price ?? 0) ? formatPrice(compareAt) : undefined;
  const stock = primaryVariant?.available ?? data.available ? "in_stock" : "out_of_stock";

  const variants = variantsRaw.map((v) => ({
    id: String(v.id),
    value: v.title,
    price: formatPrice(v.price),
    sku: v.sku || sku,
    available: Boolean(v.available),
  }));

  const descriptionSections = parseDescriptionSections(data.description);

  const missingFields = ["promoCodes", "giftPanel", "recommendations"];

  // Download images
  const publicDir = path.join(PUBLIC_BASE, slug);
  await mkdir(publicDir, { recursive: true });
  const imagesPublicPaths = [];
  const sourceImages = Array.isArray(data.images) && data.images.length ? data.images : [data.featured_image].filter(Boolean);
  let n = 1;
  for (const imgUrl of sourceImages) {
    if (!imgUrl) continue;
    const ext = extFromUrl(imgUrl);
    const filename = `image-${String(n).padStart(2, "0")}${ext}`;
    const dest = path.join(publicDir, filename);
    try {
      await downloadImage(imgUrl, dest);
      imagesPublicPaths.push(`/products/${slug}/${filename}`);
      n++;
    } catch (err) {
      console.warn(`  ! image failed for ${slug}: ${err.message}`);
    }
  }

  const fileContent = renderRecordFile({
    slug,
    sku,
    name,
    category,
    breadcrumb,
    imagesPublicPaths,
    variants,
    price,
    originalPrice,
    stock,
    descriptionSections,
    sourceUrl,
    missingFields,
  });

  const dest = path.join(RECORDS_DIR, `${slug}.ts`);
  await writeFile(dest, fileContent, "utf-8");
  return { slug, images: imagesPublicPaths.length, variants: variants.length, sections: descriptionSections.length };
}

async function main() {
  const args = process.argv.slice(2);
  const onlyArg = args.find((a) => a.startsWith("--only"));
  const only = onlyArg ? onlyArg.split("=")[1]?.split(",") : null;
  const targets = only ? TARGETS.filter((t) => only.includes(t.slug)) : TARGETS;

  await mkdir(RECORDS_DIR, { recursive: true });
  await mkdir(PUBLIC_BASE, { recursive: true });

  const results = [];
  for (const target of targets) {
    process.stdout.write(`Scraping ${target.slug} ... `);
    try {
      const r = await scrapeOne(target);
      console.log(`OK (${r.images} images, ${r.variants} variants, ${r.sections} sections)`);
      results.push(r);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }
  }
  console.log(`\nDone: ${results.length}/${targets.length} succeeded.`);
}

main();
