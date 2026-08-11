# Phase 4 — PDP Template Matrix

Live sampling of 9 product detail pages across categories, using the same extraction technique
documented in `docs/research/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-.../DATA_MODEL.md`
(`window.wd.productjson` + JSON-LD, read via `browser_evaluate`/`javascript_tool`). Goal: determine
whether the site has genuinely different PDP *layouts*, or just different *content* rendered through
one layout.

## Sampled pages

| Product | URL | Category | Variants | SKU shape | Price/compare | Images | Notes |
|---|---|---|---|---|---|---|---|
| [Phiên Bản Mới] Dầu Tắm Hạnh Nhân (reference) | `/products/dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml` | body-care | **2** (250ml/500ml), real dropdown+radio selector | single SKU | no compare price, promo code chip | 6 | Richest real page — reference/STANDARD |
| Dầu Trẻ Hóa Da Hoa Cúc Trường Sinh | `/products/dau-tre-hoa-da-hoa-cuc-truong-sinh` | face-care | 1 (15ml) | single SKU | no compare price | 1 | Minimal — single size, no promo |
| Kem Dưỡng Da Tay Hoa Oải Hương Trắng | `/products/kem-duong-da-tay-hoa-oai-huong-trang` | hand-care | 1 (75ml) | single SKU | no compare price | 1 | Minimal |
| Sữa Dưỡng Thể Hương Hoa Oải Hương Trắng | `/products/sua-duong-the-huong-hoa-oai-huong-trang` | body-care | 1 (250ml) | single SKU | no compare price | 1 | Minimal |
| Dầu Gội Phục Hồi Tóc Hư Tổn | `/products/dau-goi-phuc-hoi-toc-hu-ton` | hair-care | 1 (500ml) | single SKU | no compare price | 1 | Minimal |
| [Phiên Bản Mới] Refill Dầu tắm Hạnh Nhân | `/products/dau-tam-hanh-nhan-5` | refills | 1 | single SKU | no compare price | 7 | **Quirk**: `variant.title` is a price-like string ("1,530,000đ") that doesn't match the real `price` field (1,290,000₫) — real backend data oddity, preserve not "fix" |
| Kem Dưỡng Da Chân | `/products/kem-duong-da-chan` | body-care | 1 (150ml) | single SKU | no compare price | 5 | Minimal, richer gallery than most single-size products |
| Kem Dưỡng Da Tay 20% Bơ Đậu Mỡ | `/products/kem-duong-da-tay-20-bo-dau-mo-l-occitane-150ml-duong-am` | hand-care (men's cross-sell) | 1 (150ml) | single SKU | no compare price | 2 | Not a distinct "men's" SKU — same unisex product, just featured on the `/collections/danh-cho-nam` landing page |
| Kem Tắm Bơ Đậu Mỡ Shea Shower Cream 75ml | `/products/kem-tam-bo-dau-mo-shea-shower-cream-75ml` | body-care | 1 (75ml), **`available: false`** | single SKU | no compare price | — | Real out-of-stock example — confirms `stock: "out_of_stock"` state is real, not hypothetical |
| Combo Bộ Quà Tặng10 - rose | `/products/combo-bo-qua-tang10-rose` | gifts | 1 ("Bộ Quà Tặng") | **compound SKU** — dash-joined SKUs of every bundled item in one string | no compare price | 1 | Bundle contents appear only as a **plain-text bullet list** inside the description ("Combo quà tặng bao gồm : * ... * ..."), not a separate structured field |
| Bộ chăm sóc da mặt — Big Little Things | `/products/bo-cham-soc-da-mat-danh-cho-khach-tham-gia-chuong-trinh-big-little-things` | face-care (loyalty program) | 1 ("Default Title"), `sku: null` | none | **real compare price** (940,000₫ vs 1,470,000₫) | 1 | Content is a recycling/loyalty **redemption program page** (terms, valid bottle types, store addresses), not ingredients/usage — but renders through the exact same single description block |

## Classification

**No second PDP layout exists on the live site.** Every sampled page — from the richest (almond
shower oil) to the sparsest (single-size face oil) to the structurally odd (gift bundle compound
SKU, loyalty-program "product") — renders through the same component shell: gallery, title/price,
variant selector (real or single-option), promo/voucher chips, qty stepper, add-to-cart/buy-now,
share row, one numbered description block, review shell, recommendations slot. The differences are
entirely in **which optional fields are populated**, not in DOM/layout structure.

| Class | Definition | Examples | New component needed? |
|---|---|---|---|
| **STANDARD PDP** | Full field set: real multi-option variant selector, promo codes, gift-with-purchase tiles, multi-image gallery | Almond Shower Oil (the only one found with a real 2-option selector) | No — already built |
| **VARIANT PDP** | Same layout, fewer populated fields: single implicit variant, no promo chip, 1-7 images, ordinary numbered description | The large majority — every single-size product, every gift bundle, every refill, the out-of-stock example | No — `ProductDetailPage` already renders this correctly with `variants.length === 1` and empty optional fields |
| **UNIQUE PDP (content, not layout)** | Structurally identical render, but the "product" is actually a program/redemption page or a compound gift bundle with unusual SKU/price shape | Big Little Things loyalty page, gift bundles with compound SKUs | No — flag in the inventory as a content anomaly; store the real compound SKU / null SKU / program text as-is, don't normalize it into something it isn't |

**Conclusion: zero new PDP components are needed for Phase 4.** All ~43 modeled products (see
`FULL_PRODUCT_INVENTORY.md`) render through the existing `ProductDetailPage` +
`ProductDetail` shape, extended only with the small additive fields (`category`, `recommendations`,
`missingFields`) described in the Phase 4 plan.

## Category existence check (live, 2026-08-11)

- Confirmed real, populated public categories beyond the 40-item voucher list: **hand-care,
  face-care, hair-care, body-care, gifts/sets** (`/collections/bo-qua-tang`), **refills**
  (`/collections/eco-refills` + ~9 sub-collections, 22+ refill products found in the sitemap).
- **`/collections/danh-cho-nam` ("Dành Cho Nam") exists and has real products** — but it's a curated
  cross-sell landing page reusing existing unisex SKUs (e.g. "Kem Dưỡng Da Tay 20% Bơ Đậu Mỡ"
  explicitly captioned "Kem Dưỡng Tay Cho Nam"), not a distinct men's-only product line.
- **Fragrance does not currently exist as a live, purchasable category.** Both
  `/collections/nuoc-hoa` ("NƯỚC HOA") and `/collections/nuoc-hoa-san-pham-cho-nam` ("Nước
  Hoa-Sản Phẩm Cho Nam/Men") are real collection pages that render "Hiển thị 0 trên 0" /
  "Hiện chưa có sản phẩm" (0 of 0 shown / no products yet) as of this check. Documented here rather
  than fabricated — no fragrance product will be modeled or QA'd; Phase 4's QA sample substitutes
  the men's cross-sell product for that slot and notes fragrance's absence explicitly.
