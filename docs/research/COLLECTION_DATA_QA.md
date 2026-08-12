# Phase 5 — Collection Data QA

QA pass over the collection inventory/modeling work in `FULL_COLLECTION_INVENTORY.md` and
`COLLECTION_TEMPLATE_MATRIX.md`, and over the real product↔collection associations wired into
`src/data/collections/records/`. All figures below come from the live crawl
(`scripts/.cache/collections-raw.json`, produced by `scripts/crawl-collections-phase5.mjs` on
2026-08-12) and from static analysis of the generated record files — nothing here is estimated.

## Discovery

| Metric | Value |
|---|---|
| Total discovered collection URLs (sitemap) | 204 |
| Successfully crawled (HTTP 200) | 204 / 204 |
| Inaccessible pages | 0 |
| Duplicate slugs in sitemap | 0 |

All 204 URLs resolved on the first pass except 4 transient network failures, which succeeded on a
single `--retry-errors` re-run (see `scripts/crawl-collections-phase5.mjs`) — no collection is
missing from the inventory due to a fetch failure.

## Active vs. legacy

| Metric | Value |
|---|---|
| Active (≥1 real product live on the page) | 111 |
| Legacy/empty (real URL, 0 products currently listed) | 93 |

93 of 204 real collections are currently empty on the live site — most are single-ingredient/
fragrance sub-collections (consistent with Phase 4's finding that fragrance has zero live products
sitewide) or seasonal collections between campaigns. These are not bugs in our crawl: each was
confirmed via the page's own literal "Hiện chưa có sản phẩm" text and/or `data-col-total="0"`.

## Template classification

| Template | Count | New component required? |
|---|---|---|
| standard-plp | 69 | No — reuses `/collections/all`'s existing components |
| legacy-empty | 93 | No — `ProductGrid`'s existing empty-state branch |
| promotional | 35 | No — data flag on the standard-plp shell (real slug pattern, e.g. `retail-t08-2026-*`) |
| category-landing | 5 | `CollectionHeader` extended with 3 optional props (hero/description/subcategory chips) |
| editorial | 2 | Reuses the category-landing composition with `heroImage` omitted |

**Unique template count: 2 real structural layouts** (standard-plp shell, category-landing/editorial
shell), plus 2 semantic/data-only classifications (promotional, legacy) layered on the standard-plp
shell. See `COLLECTION_TEMPLATE_MATRIX.md` for full reasoning and the site's own
`style-collection-new-template` CSS signal that confirms category-landing is a real, site-authored
distinct template rather than a heuristic guess.

51 collections match a date/campaign slug naming pattern (`retail-*`, `web-offer-*`, `ecom-*`,
voucher-group collections) — 35 of those are currently active, 16 currently empty (already counted
in the legacy-empty bucket above, not double-counted in the template table).

## Product ↔ collection associations

| Metric | Value |
|---|---|
| Collections modeled with full detail | 28 |
| Products (of our 44) referenced by ≥1 modeled collection | 23 |
| **Products with no collection association** | **21** |
| Invalid product references (collection → nonexistent product) | 0 |
| Duplicate associations (same product listed twice in one collection) | 0 |
| Unavailable products correctly marked | 1/1 (`kem-tam-bo-dau-mo-shea-shower-cream-75ml`, real `available: false`, not referenced by any modeled collection — consistent, not fabricated into one) |

Validated by static analysis of every generated `src/data/collections/records/*.ts` file against
the 44-product catalogue (see Step 7 in the phase task list) — zero integrity issues found.

### Products with no collection association (21 of 44)

These 44 products' own PDPs either have no live collection in their breadcrumb (just "Trang chủ"),
or aren't listed on the page-1 grid of any of the 28 modeled collections. This is an honest gap, not
a bug — extending coverage would require either deeper pagination crawling of the 176 non-modeled
collections or full multi-page crawls of the 28 modeled ones (see "Known limitations" below).
Mostly gift bundles (whose real membership lives in seasonal `combo-bo-qua-tang-*`-style collections
we didn't crawl deeply enough to catch on page 1) and a few single-SKU body/hair-care items:

- `combo-bo-qua-tang`, `combo-bo-qua-tang-21`, `combo-bo-qua-tang-28`, `combo-bo-qua-tang-45`,
  `combo-bo-qua-tang10-1`, `combo-bo-qua-tang10-rose`, `combo-bo-qua-tang12-1`,
  `combo-bo-qua-tang13`, `combo-bo-qua-tang17`, `combo-cham-soc-co-the-hanh-nhan`,
  `combo-qua-tang`, `combo-qua-tang-11`, `combo-qua-tang-8`
- `dau-goi-phuc-hoi-toc-hu-ton`, `gel-tam-huong-hoa-anh-dao-1`,
  `gel-tam-huong-hoa-hong-rose-shower-gel-250ml`, `gel-tam-huong-hoa-oai-huong-trang`,
  `kem-duong-da-chan`, `phien-ban-moi-sua-duong-the-hanh-nhan`, `sua-duong-the-hoa-moc-te-mo`,
  `sua-duong-the-huong-hoa-oai-huong-trang`

## Asset/content completeness (modeled collections only)

| Metric | Value |
|---|---|
| category-landing/editorial collections (7 total) missing a real description | 0 |
| category-landing collections (5 total) missing a real hero image | 0 |
| Modeled collections missing a real `totalLiveProductCount` | 6 (the swiper/carousel templates — `best-seller`, `cham-soc-da-mat`, `danh-cho-nam`, `tam-va-duong-the`, `cham-soc-da-tay`, `eco-refill-tam-rua-tay-shower-liquid-soaps` — these templates render no count element on the live site at all, so `null` here is the honest real value, not a missing scrape) |

## Known limitations (documented, not silently absorbed)

- **Page-1-only crawl**: product-slug association is derived from each collection's *first* page of
  results (plus each product's own PDP breadcrumb) — not a full pagination crawl. A collection with
  &gt;20 products could contain more of our 44 than currently recorded. This under-reports
  associations; it never fabricates one.
- **176 collections are URL-only**: title/total/template are real observed values, but no
  description/hero/product-association detail was captured for them, matching the same
  not-every-page-gets-modeled scope decision as Phase 4's 262 URL-only products.
- **`retail-test-new-template-khong-xoa`**: a real, live, internal QA/staging collection
  ("do-not-delete" in its own slug) left on the production site — included in the inventory for
  completeness, explicitly excluded from modeling since it's not real customer-facing content.

## Regression check

`/`, `/collections/all`, `/products/[slug]`, and representative `/collections/[slug]` pages
(standard-plp, category-landing, editorial, promotional, legacy-empty) were all re-verified at
1440×1000, 768×1024, and 390×844 after the Phase 5 changes — SiteChrome, breadcrumb nav, filter/sort
toggle, ProductGrid, ProductCard, MobileBottomNav, footer, and PDP recommendations all render
unchanged from their pre-Phase-5 state. `/collections/all` in particular renders byte-identical
product data to before (same 40-product list, same "Hiển thị 20 trên 304" count) since it was
refactored to pass its existing data through the newly-shared `CollectionPage` component rather than
having its data changed.
