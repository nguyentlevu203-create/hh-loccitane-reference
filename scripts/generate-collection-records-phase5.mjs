#!/usr/bin/env node
// Phase 5 — Step 6/7: turns the raw crawl cache (scripts/.cache/collections-raw.json, produced by
// scripts/crawl-collections-phase5.mjs) plus the real per-product breadcrumb data already captured
// in src/data/products/records/*.ts into typed src/data/collections/records/<slug>.ts files.
//
// Scope: this only models MODELED_SLUGS below — a deliberately curated subset of the 204 real
// collections, not all of them (see docs/research/FULL_COLLECTION_INVENTORY.md for why). A
// collection is included here if either:
//   (a) it real-associates with >=1 of our 44 modeled products (via page-1 product tiles or via
//       that product's own live breadcrumb), or
//   (b) it was hand-picked to give template-classification coverage (see
//       COLLECTION_TEMPLATE_MATRIX.md) even with zero product overlap — flagged via FORCE_INCLUDE.
//
// Product associations are intentionally conservative: only real slugs already present in
// src/data/products are ever referenced (see getGridProducts in src/data/products/index.ts, which
// silently drops anything else) — nothing is invented.
//
// Usage: node scripts/generate-collection-records-phase5.mjs

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CACHE_FILE = path.join(ROOT, "scripts/.cache/collections-raw.json");
const PRODUCT_RECORDS_DIR = path.join(ROOT, "src/data/products/records");
const COLLECTION_RECORDS_DIR = path.join(ROOT, "src/data/collections/records");

// slug -> explicit template override + force-include flag (for zero-association template samples)
const TEMPLATE_OVERRIDES = {
  "cham-soc-da-mat": { template: "category-landing", forceInclude: true },
  "chong-nang": { template: "legacy-empty", forceInclude: true },
  "best-seller": { template: "editorial" },
  "danh-cho-nam": { template: "category-landing" },
  "tam-va-duong-the": { template: "category-landing" },
};

const PROMO_SLUG_PATTERN = /^(retail-|web-offer-|ecom-|sanphamapdungvoucher$|nhom-ap-dung-voucher$|chamsoccothe-2$|chamsoctoc-2$|chamsocdamat-2$)/;

function classifyTemplate(c) {
  if (TEMPLATE_OVERRIDES[c.slug]?.template) return TEMPLATE_OVERRIDES[c.slug].template;
  if (c.isEmpty) return "legacy-empty";
  if (c.isCategoryLandingTemplate) return "category-landing";
  if (c.hasSwiperCarousel && !c.hasFilterToolbar) return "editorial";
  if (PROMO_SLUG_PATTERN.test(c.slug)) return "promotional";
  return "standard-plp";
}

async function loadProductBreadcrumbCollections() {
  const files = (await readdir(PRODUCT_RECORDS_DIR)).filter((f) => f.endsWith(".ts"));
  const map = {}; // collectionSlug -> Set(productSlug)
  for (const file of files) {
    const productSlug = file.replace(/\.ts$/, "");
    const content = await readFile(path.join(PRODUCT_RECORDS_DIR, file), "utf-8");
    const hrefs = [...content.matchAll(/href: "(\/collections\/[a-z0-9-]+)"/g)].map((m) => m[1]);
    for (const href of hrefs) {
      const colSlug = href.replace("/collections/", "");
      (map[colSlug] ??= new Set()).add(productSlug);
    }
  }
  return map;
}

function tsString(v) {
  return JSON.stringify(v);
}

function renderRecordFile(c, template, productSlugs) {
  // Drop the trailing "current page" crumb (no href — whether or not the site marks it
  // class="active" varies by template) to match the convention used for product breadcrumbs.
  const breadcrumbSrc = c.breadcrumb
    .filter((b) => b.href)
    .map((b) => `    { label: ${tsString(b.label)}, href: ${tsString(b.href)} },`)
    .join("\n");

  const productSlugsSrc = productSlugs.map((s) => `    ${tsString(s)},`).join("\n");

  const subcatSrc = (c.subcategoryLinks || [])
    .slice(0, 12)
    .map((s) => `    { label: ${tsString(s.label)}, href: ${tsString(s.href)} },`)
    .join("\n");

  const missingFields = [];
  if (!c.description) missingFields.push("description");
  if (template === "category-landing" && !c.heroImage) missingFields.push("heroImage");
  if (c.total === null) missingFields.push("totalLiveProductCount");

  return `import type { CollectionRecord } from "@/data/collections/types";

// Source: ${c.url}
// Generated via scripts/generate-collection-records-phase5.mjs from scripts/.cache/collections-raw.json
// (itself produced by scripts/crawl-collections-phase5.mjs's static-HTML crawl of the live page).
const collection: CollectionRecord = {
  slug: ${tsString(c.slug)},
  sourceUrl: ${tsString(c.url)},
  title: ${tsString(c.title || c.ogTitle || c.slug)},
  breadcrumb: [
${breadcrumbSrc}
  ],
  template: ${tsString(template)},${c.description ? `\n  description: ${tsString(c.description)},` : ""}${c.heroImage ? `\n  heroImage: ${tsString(c.heroImage)},` : ""}${subcatSrc ? `\n  subcategoryLinks: [\n${subcatSrc}\n  ],` : ""}
  productSlugs: [
${productSlugsSrc}
  ],
  totalLiveProductCount: ${c.total === null ? "null" : c.total},${missingFields.length ? `\n  missingFields: [${missingFields.map(tsString).join(", ")}],` : ""}
};

export default collection;
`;
}

async function main() {
  const cache = JSON.parse(await readFile(CACHE_FILE, "utf-8"));
  const byProductBreadcrumb = await loadProductBreadcrumbCollections();
  const ourProductSlugs = new Set(
    (await readdir(PRODUCT_RECORDS_DIR)).filter((f) => f.endsWith(".ts")).map((f) => f.replace(/\.ts$/, "")),
  );

  await mkdir(COLLECTION_RECORDS_DIR, { recursive: true });

  const modeled = [];
  for (const c of cache) {
    if (c.error) continue;
    const pageAssoc = new Set((c.productSlugs || []).filter((s) => ourProductSlugs.has(s)));
    for (const s of byProductBreadcrumb[c.slug] || []) pageAssoc.add(s);

    const forced = TEMPLATE_OVERRIDES[c.slug]?.forceInclude;
    if (pageAssoc.size === 0 && !forced) continue;

    const template = classifyTemplate(c);
    const productSlugs = [...pageAssoc].sort();
    const content = renderRecordFile(c, template, productSlugs);
    await writeFile(path.join(COLLECTION_RECORDS_DIR, `${c.slug}.ts`), content, "utf-8");
    modeled.push({ slug: c.slug, template, productCount: productSlugs.length });
  }

  console.log(`Generated ${modeled.length} collection records:`);
  for (const m of modeled) console.log(`  ${m.slug} [${m.template}] (${m.productCount} modeled products)`);
}

main();
