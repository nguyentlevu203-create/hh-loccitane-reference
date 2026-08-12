#!/usr/bin/env node
// Phase 7 — Step 4: turns the raw crawl cache (scripts/.cache/pages-raw.json, produced by
// scripts/crawl-pages-phase7.mjs) plus the real public store JSON (scripts/.cache/cuahang.json,
// fetched from file.hstatic.net — see PAGE_TEMPLATE_MATRIX.md) into typed
// src/data/pages/records/<slug>.ts files.
//
// Scope: only MODELED_SLUGS below — the pages actually reachable from the site's real footer/
// off-canvas navigation, plus a couple of substantial real utility/legal pages kept for honesty
// even though not currently nav-linked. See FULL_PAGE_INVENTORY.md for the full reasoning per page.
//
// Usage: node scripts/generate-page-records-phase7.mjs

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CACHE_FILE = path.join(ROOT, "scripts/.cache/pages-raw.json");
const STORES_FILE = path.join(ROOT, "scripts/.cache/cuahang.json");
const RECORDS_DIR = path.join(ROOT, "src/data/pages/records");

const MODELED_SLUGS = [
  "chinh-sach-bao-mat-1",
  "chinh-sach-giao-hang-va-thanh-toan",
  "chinh-sach-thanh-toan",
  "chinh-sach-doi-tra-va-hoan-tien",
  "chinh-sach-kiem-hang",
  "huong-dan-mua-hang",
  "dieu-khoan-dich-vu",
  "chinh-sach-bao-ve-thong-tin-ca-nhan-cua-nguoi-tieu-dung",
  "faq",
  "dang-ky-thanh-cong",
  "he-thong-cua-hang",
  "lien-he",
  "ve-l-occitane",
  "ki-niem-50-nam-thanh-lap",
  "brand-commitments",
  "bcorp",
  "big-little-things",
  "sustainable-sourcing",
  "hotel-amenities",
  "corporate-gifting",
  "spa-loccitane",
  "khachhangthanthietloccitane",
  "uudai",
];

function tsString(v) {
  return JSON.stringify(v);
}

function renderBreadcrumb(breadcrumb) {
  return breadcrumb
    .filter((b) => b.href)
    .map((b) => `    { label: ${tsString(b.label)}, href: ${tsString(b.href)} },`)
    .join("\n");
}

function renderStandard(page) {
  const paragraphs = page.paragraphs.map((p) => `    ${tsString(p)},`).join("\n");
  const missing = page.isEmpty ? `\n  missingFields: ["bodyParagraphs"],` : "";
  return `  template: "standard",
  bodyParagraphs: [
${paragraphs}
  ],${missing}`;
}

function renderEditorial(page) {
  const lead = page.leadParagraphs.map((p) => `    ${tsString(p)},`).join("\n");
  const missing = [];
  if (!page.heroImage) missing.push("heroImage");
  if (page.leadParagraphs.length === 0) missing.push("leadParagraphs");
  return `  template: "editorial",${page.heroImage ? `\n  heroImage: ${tsString(page.heroImage)},` : ""}
  leadParagraphs: [
${lead}
  ],${missing.length ? `\n  missingFields: [${missing.map(tsString).join(", ")}],` : ""}`;
}

function extractMapSrc(iframeHtml) {
  const m = iframeHtml.match(/src="([^"]+)"/);
  return m ? m[1] : "";
}

async function loadStores() {
  const raw = await readFile(STORES_FILE, "utf-8");
  const data = JSON.parse(raw.replace(/^﻿/, ""));
  return data.cuahang.map((s) => ({
    name: s.shop_name.trim(),
    province: s.province.trim(),
    district: s.district.trim(),
    address: s.address.replace(/\s+/g, " ").trim(),
    phone: s.phone.replace(/\s+/g, " ").trim(),
    hours: s.time.replace(/\s+/g, " ").trim(),
    mapEmbedUrl: extractMapSrc(s.map),
  }));
}

function renderStoreLocator(stores) {
  const items = stores
    .map(
      (s) =>
        `    { name: ${tsString(s.name)}, province: ${tsString(s.province)}, district: ${tsString(s.district)}, address: ${tsString(s.address)}, phone: ${tsString(s.phone)}, hours: ${tsString(s.hours)}, mapEmbedUrl: ${tsString(s.mapEmbedUrl)} },`,
    )
    .join("\n");
  return `  template: "store-locator",
  stores: [
${items}
  ],`;
}

function renderContactForm() {
  return `  template: "contact-form",`;
}

function renderRecordFile(page, body) {
  return `import type { PageRecord } from "@/data/pages/types";

// Source: ${page.url}
// Generated via scripts/generate-page-records-phase7.mjs from scripts/.cache/pages-raw.json
// (produced by scripts/crawl-pages-phase7.mjs's static-HTML crawl of the live page).
const page: PageRecord = {
  slug: ${tsString(page.slug)},
  sourceUrl: ${tsString(page.url)},
  title: ${tsString(page.title)},
  breadcrumb: [
${renderBreadcrumb(page.breadcrumb)}
  ],
${body}
};

export default page;
`;
}

async function main() {
  const cache = JSON.parse(await readFile(CACHE_FILE, "utf-8"));
  const bySlug = Object.fromEntries(cache.map((p) => [p.slug, p]));
  const stores = await loadStores();

  await mkdir(RECORDS_DIR, { recursive: true });

  const generated = [];
  for (const slug of MODELED_SLUGS) {
    const page = bySlug[slug];
    if (!page) {
      console.warn(`! ${slug} not found in crawl cache — skipped`);
      continue;
    }

    let body;
    if (page.template === "standard") body = renderStandard(page);
    else if (page.template === "bespoke") body = renderEditorial(page);
    else if (page.template === "store-locator") body = renderStoreLocator(stores);
    else if (page.template === "contact-form") body = renderContactForm();
    else {
      console.warn(`! ${slug} has unknown template ${page.template} — skipped`);
      continue;
    }

    const content = renderRecordFile(page, body);
    await writeFile(path.join(RECORDS_DIR, `${slug}.ts`), content, "utf-8");
    generated.push({ slug, template: page.template });
  }

  console.log(`Generated ${generated.length} page records:`);
  for (const g of generated) console.log(`  ${g.slug} [${g.template}]`);
}

main();
