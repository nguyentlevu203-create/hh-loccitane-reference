# Phase 5 — Collection Template Matrix

Live sampling across body care, hand care, face care, hair care, fragrance, men, gifts, refills, and
promotion/campaign collections, using the same technique as `PDP_TEMPLATE_MATRIX.md`: fetch the
real page HTML (`scripts/crawl-collections-phase5.mjs`), isolate the real page body (excluding the
site-wide header search-suggestions widget, which embeds its own fixed 3-product carousel on every
page — see "Known false signal" below), and diff structure. Goal: determine how many genuinely
different collection *layouts* exist, versus differences that are just content/data.

## Sampled pages

| Collection | URL | Category area | Real total | Filter/sort toolbar | Pagination | Hero banner | Editorial description | Sub-category chips |
|---|---|---|---|---|---|---|---|---|
| `cham-soc-da-mat-1` | `/collections/cham-soc-da-mat-1` | face care | 41 | ✅ | ✅ (3 pages) | ❌ | ❌ (empty) | ❌ |
| `cham-soc-da-tay-va-da-chan` | `/collections/cham-soc-da-tay-va-da-chan` | hand/foot care | 13 | ✅ | ❌ (fits on 1 page) | ❌ | ❌ | ❌ |
| `duong-da-tay` | `/collections/duong-da-tay` | hand care | 21 | ✅ | ✅ | ❌ | ❌ | ❌ |
| `refills` | `/collections/refills` | refills | 3 | ✅ | ❌ | ❌ | ❌ | ❌ |
| `nhom-ap-dung-voucher` | `/collections/nhom-ap-dung-voucher` | promo (voucher-eligible) | 55 | ✅ | ✅ | ❌ | ❌ | ❌ |
| `retail-t08-2026-face-care` | `/collections/retail-t08-2026-face-care` | promo (campaign) | 10 | ✅ | ❌ | ❌ | ❌ | ❌ |
| `chamsoccothe-2` | `/collections/chamsoccothe-2` | promo (campaign) | 19 | ✅ | ❌ | ❌ | ❌ | ❌ |
| `chong-nang` | `/collections/chong-nang` | face care (sunscreen) | 0 | ✅ | ❌ | ❌ | ❌ | ❌ |
| `cham-soc-da-mat` | `/collections/cham-soc-da-mat` | face care (nav landing) | n/a (carousel) | ❌ | ❌ | ✅ real | ✅ real, ~500 chars | ✅ (sub-nav chips, `href="/"` placeholders) |
| `danh-cho-nam` | `/collections/danh-cho-nam` | men | n/a (carousel) | ❌ | ❌ | ✅ real | ✅ real | ✅ (17 chips) |
| `tam-va-duong-the` | `/collections/tam-va-duong-the` | body care (nav landing) | n/a (carousel) | ❌ | ❌ | ✅ real | ✅ real | ✅ (10 chips) |
| `cham-soc-da-tay` | `/collections/cham-soc-da-tay` | hand care (nav landing) | n/a (carousel) | ❌ | ❌ | ✅ real | ✅ real | ✅ |
| `cham-soc-toc` | `/collections/cham-soc-toc` | hair care (nav landing) | n/a (carousel) | ❌ | ❌ | ✅ real | ✅ real | — (not fully sampled) |
| `best-seller` | `/collections/best-seller` | curated ("Được Yêu Thích") | n/a (carousel) | ❌ | ❌ | ❌ | ✅ real, ~500 chars | ❌ |
| `bo-dau-mo-shea-butter`, `hoa-moc-te-osmanthus`, `chong-nang`, `hot-products`, + ~90 more | various | 0 | ✅ (shell renders, no results) | ❌ | ❌ | ❌ | ❌ |
| *(fragrance collections — see note)* | `nuoc-can-bang-va-xit-khoang`, `co-roi-ngua-verbena-citrus-verbena`, etc. | fragrance | 0 | ✅ | ❌ | ❌ | ❌ | ❌ |

### Known false signal: the header search-suggestions widget

Every page on the site — independent of collection — server-renders a hidden search-overlay panel
containing a fixed, site-wide "Discover our best-sellers" 3-product swiper (always the same 3 SKUs:
Almond Shower Oil 500ml, Almond Milk Concentrate, and its eco-refill pouch). This is **not** page
content. The crawler isolates the real page body starting at the `breadcrumb-shop` marker (which
always comes after this header widget in the DOM) before extracting any product tiles, so this
widget never gets misread as a collection's real product membership — verified by confirming empty
collections (`total: 0`, real "Hiện chưa có sản phẩm" text) report zero associated products, not the
3 widget SKUs.

## Classification

**Three genuinely different structural templates exist**, not five. The user-provided candidate list
(STANDARD PLP / CATEGORY LANDING + PLP / EDITORIAL / PROMOTIONAL / LEGACY-CAMPAIGN / UNIQUE) maps
onto real, observed structure as follows — two of the six candidates turned out to be **data/status
variants of the same STANDARD PLP shell**, not new layouts, which matters because it means no new
component was needed for them:

| Classification | Real structural evidence | New component needed? |
|---|---|---|
| **STANDARD PLP** | Title + breadcrumb + `content-product-list` grid + `filter-and-sort-by` toolbar, optionally paginated (`id="pagination"`, `data-paginate`). This is the exact shape `/collections/all` already uses. | No — `CollectionHeader` + `ProductGrid` + `FilterSortPanel`, unchanged. |
| **CATEGORY LANDING + PLP** | The site's own CSS literally names this `class="style-collection-new-template"` on the wrapping `<section>` — a real, site-authored signal, not a heuristic. Structurally distinct: a full-bleed hero banner image (`banner-collection-header` → real lazy-loaded CDN image), a substantial real editorial description paragraph, a horizontally-scrollable sub-category chip row (`list-category`), and one-or-more themed product carousels (`swiper-wrapper`) in place of a filter/grid+pagination shell. Found on the primary nav-level category landing pages (`cham-soc-da-mat`, `danh-cho-nam`, `tam-va-duong-the`, `cham-soc-da-tay`, `cham-soc-toc`). | Yes, but minimal — `CollectionHeader` was extended with three new **optional** props (`heroImage`, `description`, `subcategoryLinks`) rather than a new component; `ProductGrid`'s existing toolbar is simply hidden (`showToolbar={false}`) since these pages have no filter/sort or count element on the live site. |
| **EDITORIAL COLLECTION** | Same swiper-carousel, no-toolbar shell as CATEGORY LANDING, but **no hero banner** (`style-collection-new-template` absent) and a real curated narrative description. Only one clear example found: `best-seller` ("Được Yêu Thích" — 6 real products from our catalogue appear in its carousel). Structurally this is CATEGORY LANDING minus the hero image, so it reuses the exact same optional-prop `CollectionHeader`/`ProductGrid` composition with `heroImage` simply omitted. | No new component — same composition as CATEGORY LANDING with `heroImage` unset. |
| **PROMOTIONAL COLLECTION** | No structural difference from STANDARD PLP — same `content-product-list` + filter toolbar shell. The only real signal is the **slug/title naming convention**: date/campaign-scoped names (`retail-t08-2026-face-care`, `web-offer-t12-2025-*`, `chamsoccothe-2` titled "Ưu đãi web - T12/2025 - Chăm sóc cơ thể", `nhom-ap-dung-voucher`). 51 of the 204 real collections match this pattern. Modeled as a `template: "promotional"` **data flag** on the same `CollectionRecord`/`StandardPLP` composition — not a layout difference, so no new component. | No. |
| **LEGACY/CAMPAIGN (empty)** | No structural difference from STANDARD PLP either — same shell, same filter toolbar — the grid body just contains the real, literal string "Hiện chưa có sản phẩm" instead of product tiles, and `data-col-total="0"`. 93 of the 204 real collections are currently in this state (includes several fragrance-adjacent collections — consistent with `PDP_TEMPLATE_MATRIX.md`'s Phase 4 finding that fragrance has zero live products sitewide). `ProductGrid` already renders this correctly via its existing empty-state branch (`products.length === 0` → "Hiện chưa có sản phẩm trong bộ sưu tập này."). | No. |
| **UNIQUE** | No exceptional/one-off layout was found beyond the three above. One genuine oddity: `retail-test-new-template-khong-xoa` ("do-not-delete" in its own slug) is a real internal QA/staging collection left live on the production site — noted as an artifact, not modeled as a template. | No. |

**Conclusion: three real structural templates (STANDARD PLP, CATEGORY LANDING/EDITORIAL, and the
empty-state variant of STANDARD PLP), plus two purely semantic/data classifications (promotional,
legacy) that reuse the STANDARD PLP shell.** This matches the Phase 4 PDP finding of "one real
layout, differences are in populated fields" — extended here to "two real layouts, plus status
flags," rather than inventing five distinct page components for six candidate labels.

## Fragrance / category-existence check (live, 2026-08-12)

Consistent with `PDP_TEMPLATE_MATRIX.md`'s Phase 4 finding: fragrance-adjacent collections
(`nuoc-can-bang-va-xit-khoang`, `co-roi-ngua-verbena-citrus-verbena`, `hoa-cam-hoa-lan-neroli-orchidee`,
`hoa-moc-te-osmanthus`, and others) are real, resolvable (HTTP 200) collection URLs that currently
render the empty-state shell — no fragrance product exists to populate them, matching the "zero live
fragrance products" conclusion from Phase 4. No fragrance collection is modeled with real products
this phase, for the same reason.
