# Phase 4 — Full Public Product Inventory

Source: `https://vn.loccitane.com/sitemap_products_1.xml`, fetched live 2026-08-11. This is the authoritative, complete list of publicly indexed product URLs on `vn.loccitane.com` — **305 products**, not just the 40 gathered for `/collections/all` (which is scoped to one voucher-eligible listing, breadcrumb "Ưu đãi web - Nhóm áp dụng voucher"). No authentication, bypass, or private data was used — the sitemap is public.

## Scope of this document

- **43 products get full detail modeling** (SKU, variants, gallery, description sections, category) in `src/data/products/records/`: the original 40 known products, plus 3 supplemental products added to cover QA categories absent from the 40 (men's cross-sell, refill, a real out-of-stock example). See detailed table below.
- The remaining 262 products are listed with **extraction status "URL only"** — slug, source URL, name, and primary image only (all sourced from the sitemap's own `<image:title>`/`<image:loc>` fields, not fabricated), matching the pattern of every other product on the site (see `PDP_TEMPLATE_MATRIX.md` — no product sampled required a different template).
- **PDP template compatibility**: 100% — `PDP_TEMPLATE_MATRIX.md` samples across every discovered category and price/variant/stock shape found; all render through the one existing `ProductDetailPage` template. No exceptional PDP layout was found anywhere in this catalogue.
- **Fragrance**: confirmed to have zero live products in both `/collections/nuoc-hoa` and `/collections/nuoc-hoa-san-pham-cho-nam` as of this check (see `PDP_TEMPLATE_MATRIX.md`) — no fragrance product exists to model.

## Catalogue counts

| Metric | Count |
|---|---|
| Discovered public product URLs (sitemap) | 305 |
| Modeled with full PDP detail (Phase 4 target) | 43 |
| URL-only (sitemap metadata, not modeled this phase) | 262 |
| Categories represented in modeled set | body-care, hand-care, face-care, hair-care, gifts, refills |
| Categories confirmed to have zero live products | fragrance |
| "Men's" note | No distinct men's SKU catalogue exists — `/collections/danh-cho-nam` cross-sells unisex products |

## Modeled products (full detail — 43)

Extraction status: **complete** — all 43 products scraped live via `scripts/scrape-products-phase4.mjs` (2026-08-12), which reads each PDP's server-rendered `window.wd.productjson` (name/sku/price/variants/images/description) and real breadcrumb DOM markup directly from the static HTML response (no browser JS execution needed — this data is present pre-hydration). SKU/name/volume/price/category in the table below reflect the values at scrape time; the authoritative per-product detail lives in `src/data/products/records/<slug>.ts`, this table stays a summary index.

`promoCodes`, `giftPanel`, and `recommendations` are **not** included — those are client-side/AJAX-injected on the live site and were only ever captured by hand (via `browser_evaluate`) for the one reference product. Each of the 43 records flags this honestly via `missingFields: ["promoCodes", "giftPanel", "recommendations"]` rather than fabricating or copying the reference product's values across unrelated products.

| # | Slug | SKU | Name | Volume | Price | Category | Source |
|---|---|---|---|---|---|---|---|
| 1 | `dau-tre-hoa-da-hoa-cuc-truong-sinh` | 27DH015I22 | Dầu Trẻ Hóa Da Hoa Cúc Trường Sinh | 15ml | 1,790,000₫ | face-care | /collections/all |
| 2 | `gel-tam-huong-hoa-anh-dao-1` | 24GD500CBR25 | Gel Tắm Hương Hoa Anh Đào | 500ml | 1,290,000₫ | body-care | /collections/all |
| 3 | `gel-tam-huong-hoa-hong-rose-shower-gel-250ml` | 24GD250RR25 | Gel Tắm Hương Hoa Hồng Rose | 250ml | 750,000₫ | body-care | /collections/all |
| 4 | `kem-duong-da-tay-hoa-oai-huong-trang` | 15MA075LBR25 | Kem Dưỡng Da Tay Hoa Oải Hương Trắng | 75ml | 690,000₫ | hand-care | /collections/all |
| 5 | `sua-duong-the-huong-hoa-oai-huong-trang` | 15LC250LBR25 | Sữa Dưỡng Thể Hương Hoa Oải Hương Trắng | 250ml | 1,090,000₫ | body-care | /collections/all |
| 6 | `gel-tam-huong-hoa-oai-huong-trang` | 15GD250LBR25 | Gel Tắm Hương Hoa Oải Hương Trắng | 250ml | 750,000₫ | body-care | /collections/all |
| 7 | `dau-goi-phuc-hoi-toc-hu-ton` | 11SH500G24 | Dầu Gội Phục Hồi Tóc Hư Tổn | 500ml | 1,290,000₫ | hair-care | /collections/all |
| 8 | `kem-duong-da-tay-huong-hoa-cuc-huong-ngai` | 11MA030BAR25 | Kem Dưỡng Da Tay Hương Hoa Cúc Hương Ngải | 30ml | 350,000₫ | hand-care | /collections/all |
| 9 | `sua-duong-the-hoa-moc-te-mo` | 11LC250OR25 | Sữa Dưỡng Thể Hoa Mộc Tê & Mơ | 250ml | 1,090,000₫ | body-care | /collections/all |
| 10 | `phien-ban-moi-kem-duong-da-tay-hanh-nhan` | 29MA150A26 | [Phiên Bản Mới] Kem Dưỡng Da Tay Hạnh Nhân | 150ml | 990,000₫ | hand-care | /collections/all |
| 11 | `kem-duong-da-chan` | 01CP150K26 | Kem Dưỡng Da Chân | 150ml | 990,000₫ | body-care | /collections/all |
| 12 | `phien-ban-moi-sua-duong-the-hanh-nhan` | 29LC240A26 | [Phiên Bản Mới] Sữa Dưỡng Thể Hạnh Nhân | 240ml | 1,490,000₫ | body-care | /collections/all |
| 13 | `combo-bo-qua-tang10-rose` | COMBO10ROSE | Bộ Quà Tặng | Bộ Quà Tặng | 970,000₫ | gifts | /collections/all |
| 14 | `combo-bo-qua-tang17` | COMBO17 | Bộ Quà Tặng | Bộ Quà Tặng | 1,040,000₫ | gifts | /collections/all |
| 15 | `combo-qua-tang-11` | COMBO11 | Bộ Quà Tặng | Bộ Quà Tặng | 390,000₫ | gifts | /collections/all |
| 16 | `bo-cham-soc-da-mat-danh-cho-khach-tham-gia-chuong-trinh-big-little-things` | BLT-FACE | Bộ chăm sóc da mặt dành cho khách tham gia chương trình Big Little Things | — | 940,000₫ | face-care | /collections/all |
| 17 | `bo-cham-soc-co-the-hanh-nhan-danh-cho-khach-tham-gia-chuong-trinh-big-little-things` | BLT-ALMOND | Bộ chăm sóc cơ thể hạnh nhân dành cho khách tham gia chương trình Big Little Things | — | 590,000₫ | body-care | /collections/all |
| 18 | `combo-bo-qua-tang-28` | COMBO28 | Bộ Quà Tặng | Bộ Quà Tặng | 340,000₫ | gifts | /collections/all |
| 19 | `combo-bo-qua-tang13` | COMBO13 | Bộ Quà Tặng | Bộ Quà Tặng | 1,030,000₫ | gifts | /collections/all |
| 20 | `combo-bo-qua-tang12-1` | COMBO12 | Bộ Quà Tặng | Bộ Quà Tặng | 1,230,000₫ | gifts | /collections/all |
| 21 | `combo-bo-qua-tang10-1` | COMBO10-1 | Bộ Quà Tặng | Bộ Quà Tặng | 970,000₫ | gifts | /collections/all |
| 22 | `combo-qua-tang-8` | COMBO8 | Combo quà tặng 8 | — | 680,000₫ | gifts | /collections/all |
| 23 | `combo-bo-qua-tang-21` | COMBO21 | Bộ Quà Tặng | Bộ Quà Tặng | 1,010,000₫ | gifts | /collections/all |
| 24 | `combo-bo-qua-tang-45` | COMBO45 | Bộ Quà Tặng | Bộ Quà Tặng | 1,120,000₫ | gifts | /collections/all |
| 25 | `combo-qua-tang` | COMBOQT | Combo Quà Tặng | — | 390,000₫ | gifts | /collections/all |
| 26 | `combo-bo-qua-tang` | COMBOBQT | Bộ Quà Tặng | Bộ Quà Tặng | 780,000₫ | gifts | /collections/all |
| 27 | `combo-cham-soc-co-the-hanh-nhan` | 27ALMOND | Bộ Sản Phẩm Tẩy Tế Bào Chết Và Dưỡng Da Cơ Thể | — | 2,770,000₫ | gifts | /collections/all |
| 28 | `bo-du-lich-cham-soc-co-the-hanh-nhan` | 28ALMOND | Bộ du lịch chăm sóc cơ thể hạnh nhân | — | 1,780,000₫ | body-care | /collections/all |
| 29 | `bo-doi-goi-xa-cham-soc-toc-l-occitane-tang-bo-cham-soc-co-the-hoa-hong-luoc-go-va-tui-l-occitane` | 29HAIRSET | Bộ đôi gội xả chăm sóc tóc L'Occitane tặng bộ chăm sóc cơ thể hoa hồng, lược gỗ và túi L'Occitane | — | 2,780,000₫ | hair-care | /collections/all |
| 30 | `tinh-chat-duong-da-dau-ban-dem-tang-bo-cham-soc-toc-va-tui-l-occitane` | 30SCALP | Tinh Chất Dưỡng Da Đầu Ban Đêm tặng bộ chăm sóc tóc và túi L'Occitane | — | 1,390,000₫ | hair-care | /collections/all |
| 31 | `tinh-chat-duong-da-dau-cuc-truong-sinh-tang-bo-cham-soc-toc-va-tui-l-occitane` | 31SCALP | Tinh Chất Dưỡng Da Đầu Cúc Trường Sinh tặng bộ chăm sóc tóc và túi L'Occitane | — | 1,590,000₫ | hair-care | /collections/all |
| 32 | `tinh-chat-tre-hoa-da-cuc-truong-sinh-tang-bo-cham-soc-co-the-hanh-nhan-va-tui-l-occitane` | 32IMMORTELLE | Tinh Chất Trẻ Hóa Da Cúc Trường Sinh tặng bộ chăm sóc cơ thể hạnh nhân và túi L'Occitane | — | 5,890,000₫ | gifts | /collections/all |
| 33 | `kem-duong-chong-lao-hoa-cuc-truong-sinh-tang-bo-cham-soc-co-the-hanh-nhan-va-tui-l-occitane` | 33IMMORTELLE | Kem Dưỡng Chống Lão Hóa Cúc Trường Sinh tặng bộ chăm sóc cơ thể hạnh nhân và túi L'Occitane | — | 5,490,000₫ | gifts | /collections/all |
| 34 | `bo-doi-san-pham-chong-lao-hoa-da-cao-cap-tang-bo-cham-soc-ban-than-tai-nha` | 34ANTIAGE | Bộ đôi sản phẩm chống lão hóa da cao cấp tặng bộ chăm sóc bản thân tại nhà | — | 11,380,000₫ | gifts | /collections/all |
| 35 | `bo-doi-cham-soc-da-mat-cuc-truong-sinh-tang-bo-cham-soc-ban-than-tai-nha` | 35IMMORTELLE | Bộ đôi chăm sóc da mặt cúc trường sinh tặng bộ chăm sóc bản thân tại nhà | — | 6,380,000₫ | face-care | /collections/all |
| 36 | `combo-cham-soc-da-mat-l-occitane-tang-combo-cham-soc-co-the-hanh-nhan` | 36COMBOFACE | Combo chăm sóc da mặt L'Occitane tặng Combo chăm sóc cơ thể hạnh nhân | — | 8,370,000₫ | gifts | /collections/all |
| 37 | `kem-duong-da-cuc-truong-sinh-tang-bo-san-pham-cham-soc-da-cuc-truong-sinh-va-tui-l-occitane` | 37IMMORTELLE | Kem dưỡng da cúc trường sinh tặng bộ sản phẩm chăm sóc da cúc trường sinh và túi L'Occitane | — | 3,190,000₫ | gifts | /collections/all |
| 38 | `dau-duong-tre-hoa-da-tang-bo-san-pham-duong-da-tre-hoa-cao-cap-tu-cuc-truong-sinh-va-tui-l-occitane-2` | 38IMMORTELLE | Dầu dưỡng trẻ hóa da Tặng Bộ sản phẩm dưỡng da trẻ hóa cao cấp từ Cúc Trường Sinh Và Túi L'Occitane | — | 3,190,000₫ | gifts | /collections/all |
| 39 | `tinh-chat-tai-sinh-quyen-nang-ngua-lao-hoa-75ml-tang-bo-doi-cham-soc-da-cuc-truong-sinh-va-tui-l-occitane` | 39REVITALIFT75 | Tinh Chất Tái Sinh Quyền Năng, Ngừa Lão Hóa 75ml tặng bộ sản phẩm chăm sóc da cúc trường sinh và túi L'Occitane | — | 3,690,000₫ | face-care | /collections/all |
| 40 | `tinh-chat-tai-sinh-quyen-nang-ngua-lao-hoa-50ml-tang-bo-doi-cham-soc-da-cuc-truong-sinh-va-tui-l-occitane` | 40REVITALIFT50 | Tinh Chất Tái Sinh Quyền Năng, Ngừa Lão Hóa 50ml tặng bộ sản phẩm chăm sóc da cúc trường sinh và túi L'Occitane | — | 2,890,000₫ | face-care | /collections/all |
| 41 | `kem-duong-da-tay-20-bo-dau-mo-l-occitane-150ml-duong-am` | 01MA150K26 | Kem Dưỡng Da Tay 20% Bơ Đậu Mỡ | 150ml | 990,000₫ | hand-care | supplemental (Men's cross-sell rep (featured on /collections/danh-cho-nam as "Kem Dưỡng Tay Cho Nam")) |
| 42 | `dau-tam-hanh-nhan-5` | 29HDR500A26 | [Phiên Bản Mới] Refill Dầu tắm Hạnh Nhân | 500ml | 1,290,000₫ | refills | supplemental (Refill rep) |
| 43 | `kem-tam-bo-dau-mo-shea-shower-cream-75ml` | 01CD075K25 | Kem Tắm Bơ Đậu Mỡ Shea Shower Cream | 75ml | 290,000₫ | body-care | supplemental (Real out-of-stock rep (available:false confirmed live)) |

## URL-only inventory (262 products — sitemap metadata, not modeled this phase)

Name and primary image are real values from the sitemap's own `<image:title>`/`<image:loc>`. No SKU/variant/description was fetched for these (would require visiting all 262 live pages, out of scope for this phase per the plan's "do not clone every PDP" instruction). The dynamic `/products/[slug]` route returns `notFound()` for any of these slugs until/unless they are modeled in a future pass.

<details><summary>Expand full list (262 rows)</summary>

| Slug | Name | Source URL |
|---|---|---|
| `tinh-chat-tai-sinh-quyen-nang-ngua-lao-hoa-30ml-tang-bo-doi-cham-soc-da-cuc-truong-sinh-va-tui-l-occitane` | Tinh Chất Tái Sinh Quyền Năng, Ngừa Lão Hóa 30ml tặng bộ sản phẩm chăm sóc da cúc trường sinh và túi L'Occitane | https://vn.loccitane.com/products/tinh-chat-tai-sinh-quyen-nang-ngua-lao-hoa-30ml-tang-bo-doi-cham-soc-da-cuc-truong-sinh-va-tui-l-occitane |
| `bo-doi-cham-soc-co-the-hanh-nhan-tang-gel-tam-tay-te-bao-chet-hanh-nhan-va-tui-l-occitane` | Bộ đôi chăm sóc cơ thể hạnh nhân tặng gel tắm tẩy tế bào chết hạnh nhân và túi L'Occitane | https://vn.loccitane.com/products/bo-doi-cham-soc-co-the-hanh-nhan-tang-gel-tam-tay-te-bao-chet-hanh-nhan-va-tui-l-occitane |
| `bo-doi-cham-soc-co-the-refill-tang-bo-doi-goi-xa-can-bang-cho-moi-loai-da-dau-va-tui-l-occitane` | Bộ đôi chăm sóc cơ thể refill tặng bộ đôi gội xả cân bằng cho mọi loại da đầu và Túi L'Occitane | https://vn.loccitane.com/products/bo-doi-cham-soc-co-the-refill-tang-bo-doi-goi-xa-can-bang-cho-moi-loai-da-dau-va-tui-l-occitane |
| `bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-kem-tay-te-bao-chet-hanh-nhan-va-tui-l-occitane` | Bộ ba chăm sóc cơ thể hạnh nhân cao cấp tặng Kem Tẩy Tế Bào Chết Hạnh Nhân và túi L'Occitane | https://vn.loccitane.com/products/bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-kem-tay-te-bao-chet-hanh-nhan-va-tui-l-occitane |
| `bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-bo-goi-xa-can-bang-cho-moi-loai-da-dau` | Bộ ba chăm sóc cơ thể hạnh nhân cao cấp tặng Bộ gội xả cân bằng cho mọi loại da đầu và túi L'Occitane | https://vn.loccitane.com/products/bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-bo-goi-xa-can-bang-cho-moi-loai-da-dau |
| `bo-qua-tang-danh-cho-hoa-don-tu-5-000-000d-5` | Bộ quà tặng dành cho hóa đơn từ 5,000,000đ | https://vn.loccitane.com/products/bo-qua-tang-danh-cho-hoa-don-tu-5-000-000d-5 |
| `bo-qua-tang-danh-cho-hoa-don-tu-6-000-000d-1` | Bộ quà tặng dành cho hóa đơn từ 6,000,000đ | https://vn.loccitane.com/products/bo-qua-tang-danh-cho-hoa-don-tu-6-000-000d-1 |
| `bo-qua-tang-danh-cho-hoa-don-tu-5-000-000d-4` | Bộ quà tặng dành cho hóa đơn từ 5,000,000đ | https://vn.loccitane.com/products/bo-qua-tang-danh-cho-hoa-don-tu-5-000-000d-4 |
| `bo-qua-tang-danh-cho-hoa-don-tu-3-000-000d-3` | Bộ quà tặng dành cho hóa đơn từ 3,000,000đ | https://vn.loccitane.com/products/bo-qua-tang-danh-cho-hoa-don-tu-3-000-000d-3 |
| `bo-suu-tap-hoa-hong-1` | Bộ Sưu Tập Hoa Hồng | https://vn.loccitane.com/products/bo-suu-tap-hoa-hong-1 |
| `qua-tang-danh-cho-hoa-don-tu-3-000-000d-11` | Bộ quà tặng dành cho hóa đơn 3,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-3-000-000d-11 |
| `set-cham-soc-co-the-hoa-moc-te` | Set Chăm Sóc Cơ Thể Hoa Mộc Tê | https://vn.loccitane.com/products/set-cham-soc-co-the-hoa-moc-te |
| `set-cham-soc-co-the-hoa-anh-dao-1` | Set Chăm Sóc Cơ Thể Hoa Anh Đào | https://vn.loccitane.com/products/set-cham-soc-co-the-hoa-anh-dao-1 |
| `combo-gel-tam-hoa-anh-dao-va-refill-500ml` | Combo Gel Tắm Hoa Anh Đào Và Refill 500ml | https://vn.loccitane.com/products/combo-gel-tam-hoa-anh-dao-va-refill-500ml |
| `mat-na-tay-te-bao-chet` | Mặt Nạ Tẩy Tế Bào Chết | https://vn.loccitane.com/products/mat-na-tay-te-bao-chet |
| `tinh-chat-chong-lao-hoa-da-dau-l-occitane-phc-scalp-serum-50ml` | Tinh Chất Dưỡng Da Đầu Cúc Trường Sinh | https://vn.loccitane.com/products/tinh-chat-chong-lao-hoa-da-dau-l-occitane-phc-scalp-serum-50ml |
| `tinh-chat-duong-da-dau-ban-dem-l-occitane-scalp-night-serum-50ml-3` | Tinh Chất Dưỡng Da Đầu Ban Đêm | https://vn.loccitane.com/products/tinh-chat-duong-da-dau-ban-dem-l-occitane-scalp-night-serum-50ml-3 |
| `almond-body-scrub-200ml` | Kem Tẩy Tế Bào Da Chết Cơ Thể Hạnh Nhân | https://vn.loccitane.com/products/almond-body-scrub-200ml |
| `combo-bo-qua-tang-34-35-36-37-38` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-34-35-36-37-38 |
| `combo-bo-qua-tang-44` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-44 |
| `combo-bo-qua-tang-39-40` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-39-40 |
| `combo-bo-qua-tang-43` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-43 |
| `combo-qua-tang-5` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-qua-tang-5 |
| `combo-qua-tang-1` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-qua-tang-1 |
| `combo-qua-tang-2-3` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-qua-tang-2-3 |
| `combo-bo-qua-tang-42` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-42 |
| `combo-qua-tang-10` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-qua-tang-10 |
| `combo-bo-qua-tang-40` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-40 |
| `combo-bo-qua-tang-39` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-39 |
| `combo-bo-qua-tang-38` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-38 |
| `combo-bo-qua-tang-37` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-37 |
| `combo-bo-qua-tang17-1` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang17-1 |
| `combo-bo-qua-tang18-1` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang18-1 |
| `combo-bo-qua-tang-36` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-36 |
| `combo-qua-tang-9` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-qua-tang-9 |
| `combo-bo-qua-tang-35` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-35 |
| `combo-bo-qua-tang-34` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-34 |
| `combo-bo-qua-tang13-1` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang13-1 |
| `combo-bo-qua-tang-33` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-33 |
| `combo-bo-qua-tang19` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang19 |
| `combo-bo-qua-tang12` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang12 |
| `combo-bo-qua-tang-20` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-20 |
| `combo-bo-qua-tang15` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang15 |
| `combo-bo-qua-tang10` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang10 |
| `combo-bo-qua-tang-9-16` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-9-16 |
| `combo-bo-qua-tang14` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang14 |
| `combo-bo-qua-tang-30` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-30 |
| `combo-bo-qua-tang-23` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang-23 |
| `combo-bo-qua-tang11` | Bộ Quà Tặng | https://vn.loccitane.com/products/combo-bo-qua-tang11 |
| `set-tam-goi-toan-than-danh-cho-toc-xo-mong` | [Travel Kit] Tắm Gội Toàn Thân Dành Cho Tóc Xơ Mỏng | https://vn.loccitane.com/products/set-tam-goi-toan-than-danh-cho-toc-xo-mong |
| `set-tam-goi-toan-than-danh-cho-toc-hu-ton` | [Travel Kit] Tắm Gội Toàn Thân Dành Cho Tóc Hư Tổn | https://vn.loccitane.com/products/set-tam-goi-toan-than-danh-cho-toc-hu-ton |
| `dau-duong-the-hanh-nhan-l-occitane-almond-supple-skin-oil-40ml` | Dầu Dưỡng Thể Hạnh Nhân | https://vn.loccitane.com/products/dau-duong-the-hanh-nhan-l-occitane-almond-supple-skin-oil-40ml |
| `sua-duong-the-co-roi-ngua-l-occitane-chong-nang-spf30-50ml` | Sữa Dưỡng Thể Cỏ Roi Ngựa | https://vn.loccitane.com/products/sua-duong-the-co-roi-ngua-l-occitane-chong-nang-spf30-50ml |
| `dau-goi-phuc-hoi-sau-cho-toc-kho-hu-ton-75ml-l-occitane` | Dầu Gội Phục Hồi Sâu Cho Tóc Khô &amp; Hư Tổn | https://vn.loccitane.com/products/dau-goi-phuc-hoi-sau-cho-toc-kho-hu-ton-75ml-l-occitane |
| `dau-goi-giup-toc-chac-khoe-bong-benh-75ml-l-occitane` | Dầu Gội Giúp Tóc Chắc Khoẻ, Bồng Bềnh | https://vn.loccitane.com/products/dau-goi-giup-toc-chac-khoe-bong-benh-75ml-l-occitane |
| `dau-xa-danh-can-bang-cho-moi-loai-da-dau-l-occitane-gentle-balance-conditioner-75ml` | [Test] Dầu Xả Dành Cân Bằng Cho Mọi Loại Da Đầu | https://vn.loccitane.com/products/dau-xa-danh-can-bang-cho-moi-loai-da-dau-l-occitane-gentle-balance-conditioner-75ml |
| `dau-xa-phuc-hoi-chuyen-sau-toc-kho-hu-ton-75ml-l-occitane` | Dầu Xả Phục Hồi Chuyên Sâu Tóc Khô &amp; Hư Tổn | https://vn.loccitane.com/products/dau-xa-phuc-hoi-chuyen-sau-toc-kho-hu-ton-75ml-l-occitane |
| `sua-duong-the-l-occitane-huong-hoa-hong-75ml-duong-am-da-mem-min` | Sữa Dưỡng Thể Hương Hoa Hồng | https://vn.loccitane.com/products/sua-duong-the-l-occitane-huong-hoa-hong-75ml-duong-am-da-mem-min |
| `sua-duong-the-l-occitane-hoa-phong-lan-den-nero-orchi-body-lotion-75ml` | Sữa Dưỡng Thể Hoa Phong Lan Đen | https://vn.loccitane.com/products/sua-duong-the-l-occitane-hoa-phong-lan-den-nero-orchi-body-lotion-75ml |
| `sua-tam-l-occitane-huong-hoa-hong-75ml-duong-am-mem-min-huong-thom-thanh-lich` | Sữa Tắm Hương Hoa Hồng Dưỡng Ẩm Mềm Mịn | https://vn.loccitane.com/products/sua-tam-l-occitane-huong-hoa-hong-75ml-duong-am-mem-min-huong-thom-thanh-lich |
| `dau-tam-hanh-nhan-l-occitane-almond-shower-oil-75ml` | Dầu Tắm Hạnh Nhân | https://vn.loccitane.com/products/dau-tam-hanh-nhan-l-occitane-almond-shower-oil-75ml |
| `dau-goi-can-bang-diu-nhe-cho-moi-loai-da-dau-gb-gentle-shampoo-75ml` | Dầu Gội Cân Bằng Dịu Nhẹ Cho Mọi Loại Da Đầu | https://vn.loccitane.com/products/dau-goi-can-bang-diu-nhe-cho-moi-loai-da-dau-gb-gentle-shampoo-75ml |
| `dau-xa-phuc-hoi-toc-chac-khoe-va-bong-benh-75ml-l-occitane` | Dầu Xả Phục Hồi Tóc Chắc Khoẻ và Bồng Bềnh | https://vn.loccitane.com/products/dau-xa-phuc-hoi-toc-chac-khoe-va-bong-benh-75ml-l-occitane |
| `nhan-ban-tu-phien-ban-moi-bo-dau-duong-the-va-kem-duong-am-hanh-nhan` | [Phiên Bản Mới] Bộ Kem Dưỡng Ẩm Hạnh Nhân Và Dầu Dưỡng Thể | https://vn.loccitane.com/products/nhan-ban-tu-phien-ban-moi-bo-dau-duong-the-va-kem-duong-am-hanh-nhan |
| `bo-dau-goi-giam-gau-va-dau-xa-diu-nhe` | Bộ Dầu Gội Giảm Gàu Và Dầu Xả Dịu Nhẹ | https://vn.loccitane.com/products/bo-dau-goi-giam-gau-va-dau-xa-diu-nhe |
| `bo-qua-tang-danh-cho-hoa-don-tu-6-000-000d` | Bộ quà tặng dành cho hóa đơn từ 6,000,000đ | https://vn.loccitane.com/products/bo-qua-tang-danh-cho-hoa-don-tu-6-000-000d |
| `bo-qua-tang-danh-cho-hoa-don-tu-5-000-000d-3` | Bộ quà tặng dành cho hóa đơn từ 5,000,000đ | https://vn.loccitane.com/products/bo-qua-tang-danh-cho-hoa-don-tu-5-000-000d-3 |
| `bo-qua-tang-danh-cho-hoa-don-tu-5-000-000d-2` | Bộ quà tặng dành cho hóa đơn từ 5,000,000đ | https://vn.loccitane.com/products/bo-qua-tang-danh-cho-hoa-don-tu-5-000-000d-2 |
| `qua-tang-danh-cho-hoa-don-tu-3-000-000d-10` | Quà tặng dành cho hóa đơn từ 3,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-3-000-000d-10 |
| `bo-qua-tang-danh-cho-hoa-don-tu-3-000-000d-2` | Bộ quà tặng dành cho hóa đơn từ 3,000,000đ | https://vn.loccitane.com/products/bo-qua-tang-danh-cho-hoa-don-tu-3-000-000d-2 |
| `qua-tang-danh-cho-hoa-don-tu-5-000-000d-7` | Quà tặng dành cho hóa đơn từ 5,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-5-000-000d-7 |
| `qua-tang-danh-cho-hoa-don-tu-3-000-000d-9` | Quà tặng dành cho hóa đơn từ 3,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-3-000-000d-9 |
| `bo-san-pham-du-lich-cham-soc-da-mat-cuc-truong-sinh-tang-sua-sua-mat-va-tui-l-occitane-1` | Bộ sản phẩm du lịch chăm sóc da mặt cúc trường sinh tặng sữa sửa mặt và túi L'Occitane | https://vn.loccitane.com/products/bo-san-pham-du-lich-cham-soc-da-mat-cuc-truong-sinh-tang-sua-sua-mat-va-tui-l-occitane-1 |
| `bo-ba-du-lich-cham-soc-co-the-hanh-nhan-tang-sua-rua-mat-va-tui-l-occitane-1` | Bộ ba du lịch chăm sóc cơ thể hạnh nhân tặng sữa rửa mặt và túi L'Occitane | https://vn.loccitane.com/products/bo-ba-du-lich-cham-soc-co-the-hanh-nhan-tang-sua-rua-mat-va-tui-l-occitane-1 |
| `bo-doi-goi-xa-cham-soc-toc-l-occitane-tang-bo-cham-soc-co-the` | Bộ đôi gội xả chăm sóc tóc L'Occitane tặng bộ chăm sóc cơ thể L'Occitane | https://vn.loccitane.com/products/bo-doi-goi-xa-cham-soc-toc-l-occitane-tang-bo-cham-soc-co-the |
| `tinh-chat-chong-lao-hoa-cao-cap-tang-bo-doi-cham-soc-co-the-hanh-nhan` | Tinh chất chống lão hóa cao cấp tặng bộ đôi chăm sóc cơ thể hạnh nhận | https://vn.loccitane.com/products/tinh-chat-chong-lao-hoa-cao-cap-tang-bo-doi-cham-soc-co-the-hanh-nhan |
| `kem-duong-chong-lao-hoa-cao-cap-tang-bo-doi-cham-soc-co-the-hanh-nhan` | Kem dưỡng chống lão hóa cao cấp tặng bộ đôi chăm sóc cơ thể hạnh nhân | https://vn.loccitane.com/products/kem-duong-chong-lao-hoa-cao-cap-tang-bo-doi-cham-soc-co-the-hanh-nhan |
| `bo-doi-san-pham-chong-lao-hoa-da-cao-cap-tang-tinh-chat-tai-sinh-quyen-nang` | Bộ đôi sản phẩm chống lão hóa da cao cấp tặng Tinh Chất Tái Sinh Quyền Năng | https://vn.loccitane.com/products/bo-doi-san-pham-chong-lao-hoa-da-cao-cap-tang-tinh-chat-tai-sinh-quyen-nang |
| `bo-doi-cham-soc-da-mat-cuc-truong-sinh-tang-kem-duong-da-tay-hoa-cuc-truong-sinh` | Bộ đôi chăm sóc da mặt cúc trường sinh tặng Kem Dưỡng Da Tay Cúc Trường Sinh Bơ Đậu Mỡ | https://vn.loccitane.com/products/bo-doi-cham-soc-da-mat-cuc-truong-sinh-tang-kem-duong-da-tay-hoa-cuc-truong-sinh |
| `combo-cham-soc-da-mat-l-occitane-tang-bo-doi-cham-soc-co-the-hanh-nhan` | Combo chăm sóc da mặt L'Occitane tặng bộ đôi chăm sóc cơ thể hạnh nhân | https://vn.loccitane.com/products/combo-cham-soc-da-mat-l-occitane-tang-bo-doi-cham-soc-co-the-hanh-nhan |
| `kem-duong-da-cuc-truong-sinh-50ml-tang-bo-trai-nghiem-cham-soc-da-tai-nha-1` | Kem dưỡng da cúc trường sinh 50ml Tặng Bộ trải nghiệm chăm sóc da tại nhà | https://vn.loccitane.com/products/kem-duong-da-cuc-truong-sinh-50ml-tang-bo-trai-nghiem-cham-soc-da-tai-nha-1 |
| `dau-duong-tre-hoa-da-tang-bo-san-pham-duong-da-tre-hoa-cao-cap-tu-cuc-truong-sinh-va-tui-l-occitane-1` | Dầu dưỡng trẻ hóa da Tặng Bộ sản phẩm dưỡng da trẻ hóa cao cấp từ Cúc Trường Sinh Và Túi L'Occitane | https://vn.loccitane.com/products/dau-duong-tre-hoa-da-tang-bo-san-pham-duong-da-tre-hoa-cao-cap-tu-cuc-truong-sinh-va-tui-l-occitane-1 |
| `tinh-chat-tai-sinh-quyen-nang-50ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-tui-l-occitane-tinh-chat-tai-sinh-quyen-nang-50ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-tui-l-occitane` | Tinh Chất Tái Sinh Quyền Năng 50ml Tặng Bộ Sản Phẩm Chăm Sóc Da Mặt Cúc Trường Sinh và Túi L'Occitane Tinh Chất Tái Sinh Quyền Năng 50ml Tặng Bộ Sản Phẩm Chăm Sóc Da Mặt Cúc Trường Sinh và Túi L'Occitane | https://vn.loccitane.com/products/tinh-chat-tai-sinh-quyen-nang-50ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-tui-l-occitane-tinh-chat-tai-sinh-quyen-nang-50ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-tui-l-occitane |
| `tinh-chat-tai-sinh-quyen-nang-50ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-tui-l-occitane-2` | Tinh Chất Tái Sinh Quyền Năng 50ml Tặng Bộ Sản Phẩm Chăm Sóc Da Mặt Cúc Trường Sinh Và Túi L'Occitane | https://vn.loccitane.com/products/tinh-chat-tai-sinh-quyen-nang-50ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-tui-l-occitane-2 |
| `tinh-chat-tai-sinh-quyen-nang-30ml-tang-bo-kem-duong-da-va-sua-rua-mat-cuc-truong-sinh` | Tinh Chất Tái Sinh Quyền Năng 30ml Tặng Bộ Kem Dưỡng Da Và Sữa Rửa Mặt Cúc Trường Sinh | https://vn.loccitane.com/products/tinh-chat-tai-sinh-quyen-nang-30ml-tang-bo-kem-duong-da-va-sua-rua-mat-cuc-truong-sinh |
| `bo-doi-cham-soc-co-the-hanh-nhan-tang-gel-tam-tay-te-bao-chet-hanh-nhan` | Bộ đôi chăm sóc cơ thể hạnh nhân tặng Gel Tắm Tẩy Tế Bào Chết Hạnh Nhân | https://vn.loccitane.com/products/bo-doi-cham-soc-co-the-hanh-nhan-tang-gel-tam-tay-te-bao-chet-hanh-nhan |
| `bo-doi-cham-soc-co-the-refill-tang-bo-doi-cham-soc-toc-cho-moi-loai-da-dau` | Bộ đôi chăm sóc cơ thể refill tặng Bộ đôi chăm sóc tóc cho mọi loại da đầu | https://vn.loccitane.com/products/bo-doi-cham-soc-co-the-refill-tang-bo-doi-cham-soc-toc-cho-moi-loai-da-dau |
| `bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-kem-tay-te-bao-chet-hanh-nhan` | Bộ ba chăm sóc cơ thể hạnh nhân cao cấp tặng Kem Tẩy Tế Bào Chết Hạnh Nhân | https://vn.loccitane.com/products/bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-kem-tay-te-bao-chet-hanh-nhan |
| `bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-dau-goi-phuc-hoi-sau-cho-toc-kho-hu-ton-va-tui-vai-l-occcitane` | Bộ ba chăm sóc cơ thể hạnh nhân cao cấp tặng Dầu Gội Phục Hồi Sâu Cho Tóc Khô &amp; Hư Tổn và Túi vải L'Occcitane | https://vn.loccitane.com/products/bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-dau-goi-phuc-hoi-sau-cho-toc-kho-hu-ton-va-tui-vai-l-occcitane |
| `kem-duong-da-tay-hoa-lan-den-neroli` | Kem Dưỡng Da Tay Hoa Lan Đen &amp; Neroli | https://vn.loccitane.com/products/kem-duong-da-tay-hoa-lan-den-neroli |
| `dau-xa-phuc-hoi-chuyen-sau` | Dầu Xả Phục Hồi Chuyên Sâu | https://vn.loccitane.com/products/dau-xa-phuc-hoi-chuyen-sau |
| `kem-duong-mat-chong-lao-hoa-l-occitane-immortelle-precious-eye-balm-15ml` | Kem Dưỡng Mắt Chống Lão Hóa | https://vn.loccitane.com/products/kem-duong-mat-chong-lao-hoa-l-occitane-immortelle-precious-eye-balm-15ml |
| `sua-duong-the-hoa-phong-lan-den` | Sữa Dưỡng Thể Hoa Phong Lan Đen | https://vn.loccitane.com/products/sua-duong-the-hoa-phong-lan-den |
| `kem-tam-bo-dau-mo` | Kem Tắm Bơ Đậu Mỡ | https://vn.loccitane.com/products/kem-tam-bo-dau-mo |
| `kem-duong-am-hanh-nhan` | [Phiên Bản Mới] Kem Dưỡng Ẩm Hạnh Nhân | https://vn.loccitane.com/products/kem-duong-am-hanh-nhan |
| `bo-dau-tam-va-kem-duong-san-chac-da-hanh-nhan-refills` | [Phiên Bản Mới] Bộ Dầu Tắm Và Kem Dưỡng Săn Chắc Da Hạnh Nhân Refill | https://vn.loccitane.com/products/bo-dau-tam-va-kem-duong-san-chac-da-hanh-nhan-refills |
| `set-cham-soc-toc-va-da-dau-dau` | Set Chăm Sóc Tóc Và Da Đầu Dầu | https://vn.loccitane.com/products/set-cham-soc-toc-va-da-dau-dau |
| `set-cham-soc-toc-va-can-bang-da-dau` | Set Chăm Sóc Tóc Và Cân Bằng Da Đầu | https://vn.loccitane.com/products/set-cham-soc-toc-va-can-bang-da-dau |
| `set-cham-soc-toc-hu-ton` | Set Chăm Sóc Tóc Hư Tổn | https://vn.loccitane.com/products/set-cham-soc-toc-hu-ton |
| `set-cham-soc-toc-cho-toc-xo-mong` | Set Chăm Sóc Tóc Cho Tóc Xơ Mỏng | https://vn.loccitane.com/products/set-cham-soc-toc-cho-toc-xo-mong |
| `set-cham-soc-co-the-hanh-nhan-1` | Set Chăm Sóc Cơ Thể Hạnh Nhân | https://vn.loccitane.com/products/set-cham-soc-co-the-hanh-nhan-1 |
| `set-cham-da-co-ban-cuc-truong-sinh` | Set Phục Hồi Sức Sống Làn Da | https://vn.loccitane.com/products/set-cham-da-co-ban-cuc-truong-sinh |
| `bo-doi-bieu-tuong-duong-am-bo-dau-mo` | Bộ Đôi Biểu Tượng Dưỡng Ẩm Bơ Đậu Mỡ | https://vn.loccitane.com/products/bo-doi-bieu-tuong-duong-am-bo-dau-mo |
| `bo-ba-bieu-tuong-duong-am-hanh-nhan` | Bộ Ba Biểu Tượng Dưỡng Ẩm Hạnh Nhân | https://vn.loccitane.com/products/bo-ba-bieu-tuong-duong-am-hanh-nhan |
| `travel-kit-tam-goi-toan-than` | [Travel Kit] Tắm Gội Toàn Thân Dành Cho Mọi Da Đầu | https://vn.loccitane.com/products/travel-kit-tam-goi-toan-than |
| `travel-kit-cham-soc-co-the-hanh-nhan` | [Travel Kit] Chăm Sóc Cơ Thể Hạnh Nhân | https://vn.loccitane.com/products/travel-kit-cham-soc-co-the-hanh-nhan |
| `travel-kit-cham-soc-co-the-bo-dau-mo` | [Travel Kit] Chăm Sóc Cơ Thể Bơ Đậu Mỡ | https://vn.loccitane.com/products/travel-kit-cham-soc-co-the-bo-dau-mo |
| `bo-cham-soc-co-the-hanh-nhan-2` | [Phiên Bản Mới] Bộ Chăm Sóc Cơ Thể Hạnh Nhân | https://vn.loccitane.com/products/bo-cham-soc-co-the-hanh-nhan-2 |
| `bo-dau-duong-the-hanh-nhan-va-chai-refills` | [Phiên Bản Mới] Bộ Dầu Dưỡng Thể Hạnh Nhân Và Chai Refill | https://vn.loccitane.com/products/bo-dau-duong-the-hanh-nhan-va-chai-refills |
| `bo-kem-duong-the-hanh-nhan-va-loi-refills` | [Phiên Bản Mới] Bộ Kem Dưỡng Thể Hạnh Nhân Và Lõi Refill | https://vn.loccitane.com/products/bo-kem-duong-the-hanh-nhan-va-loi-refills |
| `bo-dau-tam-hanh-nhan-va-chai-refill-1` | [Phiên Bản Mới] Bộ Dầu Tắm Hạnh Nhân Và Chai Refill | https://vn.loccitane.com/products/bo-dau-tam-hanh-nhan-va-chai-refill-1 |
| `bo-dau-tam-va-dau-duong-the-hanh-nhan-refills` | [Phiên Bản Mới] Bộ Refill Dầu Tắm Và Dầu Dưỡng Thể Hạnh Nhân | https://vn.loccitane.com/products/bo-dau-tam-va-dau-duong-the-hanh-nhan-refills |
| `bo-dau-tam-va-dau-duong-the-hanh-nhan-2` | [Phiên Bản Mới] Bộ Dầu Tắm Và Dầu Dưỡng Thể Hạnh Nhân | https://vn.loccitane.com/products/bo-dau-tam-va-dau-duong-the-hanh-nhan-2 |
| `bo-dau-tam-va-dau-duong-the-hanh-nhan-1` | [Phiên Bản Mới] Bộ Dầu Tắm Và Dầu Dưỡng Thể Hạnh Nhân | https://vn.loccitane.com/products/bo-dau-tam-va-dau-duong-the-hanh-nhan-1 |
| `bo-dau-tam-va-kem-duong-am-san-chac-da-hanh-nhan` | [Phiên Bản Mới] Bộ Dầu Tắm và Kem Dưỡng Ẩm Săn Chắc Da Hạnh Nhân | https://vn.loccitane.com/products/bo-dau-tam-va-kem-duong-am-san-chac-da-hanh-nhan |
| `trai-nghiem-san-pham-cham-soc-da-mat-tai-cua-hang-nhan-ngay-qua-tang-1` | Trải nghiệm sản phẩm chăm sóc da mặt tại cửa hàng nhận ngay quà tặng | https://vn.loccitane.com/products/trai-nghiem-san-pham-cham-soc-da-mat-tai-cua-hang-nhan-ngay-qua-tang-1 |
| `trai-nghiem-san-pham-cham-soc-da-mat-tai-cua-hang-nhan-ngay-qua-tang` | Trải nghiệm sản phẩm chăm sóc da mặt tại cửa hàng nhận ngay quà tặng | https://vn.loccitane.com/products/trai-nghiem-san-pham-cham-soc-da-mat-tai-cua-hang-nhan-ngay-qua-tang |
| `bo-san-pham-du-lich-cham-soc-da-mat-cuc-truong-sinh-tang-sua-sua-mat-va-tui-l-occitane` | Bộ sản phẩm du lịch chăm sóc da mặt cúc trường sinh tặng sữa sửa mặt và túi L'Occitane | https://vn.loccitane.com/products/bo-san-pham-du-lich-cham-soc-da-mat-cuc-truong-sinh-tang-sua-sua-mat-va-tui-l-occitane |
| `bo-ba-du-lich-cham-soc-co-the-hanh-nhan-tang-sua-rua-mat-va-tui-l-occitane` | Bộ ba du lịch chăm sóc cơ thể hạnh nhân tặng sữa rửa mặt và túi L'Occitane | https://vn.loccitane.com/products/bo-ba-du-lich-cham-soc-co-the-hanh-nhan-tang-sua-rua-mat-va-tui-l-occitane |
| `bo-doi-cham-soc-toc-tang-gel-tam-va-luoc-go-l-occitane` | Bộ đôi chăm sóc tóc tặng gel tắm và lược gỗ L'Occitane | https://vn.loccitane.com/products/bo-doi-cham-soc-toc-tang-gel-tam-va-luoc-go-l-occitane |
| `bo-cham-soc-toc-refill-tang-gel-tam-va-kem-duong-tay-l-occitane` | Bộ chăm sóc tóc refill tặng gel tắm và kem dưỡng tay L'Occitane | https://vn.loccitane.com/products/bo-cham-soc-toc-refill-tang-gel-tam-va-kem-duong-tay-l-occitane |
| `bo-doi-goi-xa-cham-soc-toc-l-occitane-tang-bo-cham-soc-co-the-huong-hoa-hong-cung-luoc-go-va-hop-qua-bi-mat` | Bộ đôi gội xả chăm sóc tóc L'Occitane tặng bộ chăm sóc cơ thể và lược gỗ L'Occitane | https://vn.loccitane.com/products/bo-doi-goi-xa-cham-soc-toc-l-occitane-tang-bo-cham-soc-co-the-huong-hoa-hong-cung-luoc-go-va-hop-qua-bi-mat |
| `tinh-chat-chong-lao-hoa-cao-cap-tang-bo-doi-cham-soc-co-the-hanh-nhan-va-tui-l-occitane` | Tinh chất chống lão hóa cao cấp tặng bộ đôi chăm sóc cơ thể hạnh nhận và túi L'Occitane | https://vn.loccitane.com/products/tinh-chat-chong-lao-hoa-cao-cap-tang-bo-doi-cham-soc-co-the-hanh-nhan-va-tui-l-occitane |
| `kem-duong-da-chong-lao-hoa-cao-cap-va-dau-duong-the-hanh-nhan-tang-dau-tam-hanh-nhan-cung-dung-cu-massage-mat-va-hop-qua-bi-mat` | Kem dưỡng chống lão hóa cao cấp tặng bộ đôi chăm sóc cơ thể hạnh nhân cùng dụng cụ massage mặt và hộp quà bí mật | https://vn.loccitane.com/products/kem-duong-da-chong-lao-hoa-cao-cap-va-dau-duong-the-hanh-nhan-tang-dau-tam-hanh-nhan-cung-dung-cu-massage-mat-va-hop-qua-bi-mat |
| `bo-doi-san-pham-chong-lao-hoa-da-cao-cap-tang-bo-cham-soc-da-mat-tai-nha` | Bộ đôi sản phẩm chống lão hóa da cao cấp tặng bộ chăm sóc da mặt tại nhà | https://vn.loccitane.com/products/bo-doi-san-pham-chong-lao-hoa-da-cao-cap-tang-bo-cham-soc-da-mat-tai-nha |
| `bo-doi-cham-soc-da-mat-cuc-truong-sinh-tang-bo-cham-soc-da-mat-tai-nha` | Bộ đôi chăm sóc da mặt cúc trường sinh tặng bộ chăm sóc da mặt tại nhà | https://vn.loccitane.com/products/bo-doi-cham-soc-da-mat-cuc-truong-sinh-tang-bo-cham-soc-da-mat-tai-nha |
| `combo-cham-soc-da-mat-cuc-truong-sinh-tang-bo-cham-soc-da-mat-tai-nha-va-set-qua-bi-mat` | Combo chăm sóc da mặt L'Occitane tặng bộ chăm sóc da mặt tại nhà | https://vn.loccitane.com/products/combo-cham-soc-da-mat-cuc-truong-sinh-tang-bo-cham-soc-da-mat-tai-nha-va-set-qua-bi-mat |
| `kem-duong-da-cuc-truong-sinh-50ml-tang-bo-trai-nghiem-cham-soc-da-tai-nha` | Kem dưỡng da cúc trường sinh 50ml Tặng Bộ trải nghiệm chăm sóc da tại nhà | https://vn.loccitane.com/products/kem-duong-da-cuc-truong-sinh-50ml-tang-bo-trai-nghiem-cham-soc-da-tai-nha |
| `dau-duong-tre-hoa-da-tang-bo-san-pham-duong-da-tre-hoa-cao-cap-tu-cuc-truong-sinh-va-tui-l-occitane` | Dầu dưỡng trẻ hóa da Tặng Bộ sản phẩm dưỡng da trẻ hóa cao cấp từ Cúc Trường Sinh Và Túi L'Occitane | https://vn.loccitane.com/products/dau-duong-tre-hoa-da-tang-bo-san-pham-duong-da-tre-hoa-cao-cap-tu-cuc-truong-sinh-va-tui-l-occitane |
| `tinh-chat-tai-sinh-quyen-nang-50ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-tui-l-occitane-1` | Tinh Chất Tái Sinh Quyền Năng 50ml Tặng Bộ Sản Phẩm Chăm Sóc Da Mặt Cúc Trường Sinh và Túi L'Occitane | https://vn.loccitane.com/products/tinh-chat-tai-sinh-quyen-nang-50ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-tui-l-occitane-1 |
| `tinh-chat-tai-sinh-quyen-nang-50ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-tui-l-occitane` | Tinh Chất Tái Sinh Quyền Năng 50ml Tặng Bộ Sản Phẩm Chăm Sóc Da Mặt Cúc Trường Sinh Và Túi L'Occitane | https://vn.loccitane.com/products/tinh-chat-tai-sinh-quyen-nang-50ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-tui-l-occitane |
| `tinh-chat-tai-sinh-quyen-nang-30ml-tang-bo-kem-duong-da-va-sua-rua-mat-cuc-truong-sinh-va-tui-l-occitane` | Tinh Chất Tái Sinh Quyền Năng 30ml Tặng Bộ Kem Dưỡng Da Và Sữa Rửa Mặt Cúc Trường Sinh Và Túi L'Occitane | https://vn.loccitane.com/products/tinh-chat-tai-sinh-quyen-nang-30ml-tang-bo-kem-duong-da-va-sua-rua-mat-cuc-truong-sinh-va-tui-l-occitane |
| `bo-san-pham-duong-da-bo-dau-mo-cuc-truong-sinh-tang-kem-duong-da-tay-bo-dau-mo-cuc-truong-sinh` | Bộ sản phẩm dưỡng da Bơ Đậu Mỡ Cúc Trường Sinh Tặng Kem Dưỡng Da Tay Bơ Đậu Mỡ Cúc Trường Sinh | https://vn.loccitane.com/products/bo-san-pham-duong-da-bo-dau-mo-cuc-truong-sinh-tang-kem-duong-da-tay-bo-dau-mo-cuc-truong-sinh |
| `bo-doi-cham-soc-co-the-refill-tang-bo-doi-cham-soc-huong-hoa-hong` | Bộ đôi chăm sóc cơ thể refill tặng bộ đôi chăm sóc cơ thể | https://vn.loccitane.com/products/bo-doi-cham-soc-co-the-refill-tang-bo-doi-cham-soc-huong-hoa-hong |
| `dau-tam-hanh-nhan-tang-dau-duong-the-hanh-nhan` | Dầu tắm hạnh nhân tặng dầu dưỡng thể hạnh nhân | https://vn.loccitane.com/products/dau-tam-hanh-nhan-tang-dau-duong-the-hanh-nhan |
| `dau-duong-the-hanh-nhan-tang-dau-tam-hanh-nhan` | Dầu dưỡng thể hạnh nhân tặng dầu tắm hạnh nhân | https://vn.loccitane.com/products/dau-duong-the-hanh-nhan-tang-dau-tam-hanh-nhan |
| `kem-duong-am-san-chac-da-hanh-nhan-tang-dau-duong-the-hanh-nhan` | Kem dưỡng ẩm săn chắc da hạnh nhân Tặng Dầu dưỡng thể hạnh nhân | https://vn.loccitane.com/products/kem-duong-am-san-chac-da-hanh-nhan-tang-dau-duong-the-hanh-nhan |
| `bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-gel-tam-tay-te-bao-chet-hanh-nhan` | Bộ ba chăm sóc cơ thể hạnh nhân cao cấp tặng gel tắm tẩy tế bào chết hạnh nhân | https://vn.loccitane.com/products/bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-gel-tam-tay-te-bao-chet-hanh-nhan |
| `bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-blind-box` | Bộ ba chăm sóc cơ thể hạnh nhân cao cấp tặng Blind box | https://vn.loccitane.com/products/bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-blind-box |
| `bo-qua-tang-danh-cho-hoa-don-tu-5-000-000d-1` | Bộ quà tặng dành cho hóa đơn từ 5,000,000đ | https://vn.loccitane.com/products/bo-qua-tang-danh-cho-hoa-don-tu-5-000-000d-1 |
| `bo-qua-tang-danh-cho-hoa-don-tu-5-000-000d` | Bộ quà tặng dành cho hóa đơn từ 5,000,000đ | https://vn.loccitane.com/products/bo-qua-tang-danh-cho-hoa-don-tu-5-000-000d |
| `bo-qua-tang-danh-cho-hoa-don-tu-3-000-000d-1` | Bộ quà tặng dành cho hóa đơn từ 3,000,000đ | https://vn.loccitane.com/products/bo-qua-tang-danh-cho-hoa-don-tu-3-000-000d-1 |
| `bo-qua-tang-danh-cho-hoa-don-tu-3-000-000d` | Bộ quà tặng dành cho hóa đơn từ 3,000,000đ | https://vn.loccitane.com/products/bo-qua-tang-danh-cho-hoa-don-tu-3-000-000d |
| `qua-tang-danh-cho-hoa-don-tu-5-000-000d-6` | Quà tặng dành cho hóa đơn từ 5,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-5-000-000d-6 |
| `qua-tang-danh-cho-hoa-don-tu-3-000-000d-8` | Quà tặng dành cho hóa đơn từ 3,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-3-000-000d-8 |
| `dau-duong-the-hanh-nhan` | [Phiên Bản Mới] Refill Dầu Dưỡng Thể Hạnh Nhân | https://vn.loccitane.com/products/dau-duong-the-hanh-nhan |
| `kem-duong-the-hanh-nhan-loi-refill` | [Phiên Bản Mới] Refill Kem Dưỡng Ẩm Hạnh Nhân | https://vn.loccitane.com/products/kem-duong-the-hanh-nhan-loi-refill |
| `kem-duong-tre-hoa-da-cao-cap-tang-bo-cham-soc-da-tai-nha-va-hop-qua-bi-mat` | Kem dưỡng trẻ hóa da cao cấp tặng bộ chăm sóc da tại nhà và hộp quà bí mật | https://vn.loccitane.com/products/kem-duong-tre-hoa-da-cao-cap-tang-bo-cham-soc-da-tai-nha-va-hop-qua-bi-mat |
| `bo-doi-goi-xa-cham-soc-toc-refill-tang-bo-doi-cham-soc-co-the-hanh-nhan-va-hop-qua-bi-mat` | Bộ đôi gội xả chăm sóc tóc refill tặng bộ đôi chăm sóc cơ thể hạnh nhân và hộp quà bí mật | https://vn.loccitane.com/products/bo-doi-goi-xa-cham-soc-toc-refill-tang-bo-doi-cham-soc-co-the-hanh-nhan-va-hop-qua-bi-mat |
| `bo-doi-goi-xa-cham-soc-toc-l-occitane-tang-tay-te-bao-chet-da-dau-va-hop-qua-bi-mat` | Bộ đôi gội xả chăm sóc tóc L'Occitane tặng tẩy tế bào chết da đầu và hộp quà bí mật | https://vn.loccitane.com/products/bo-doi-goi-xa-cham-soc-toc-l-occitane-tang-tay-te-bao-chet-da-dau-va-hop-qua-bi-mat |
| `bo-san-pham-duong-da-bo-dau-mo-cuc-truong-sinh-kem-duong-da-tay-bo-dau-mo-cuc-truong-sinh-va-hop-qua-bi-mat` | Bộ sản phẩm dưỡng da Bơ Đậu Mỡ Cúc Trường Sinh Kem Dưỡng Da Tay Bơ Đậu Mỡ Cúc Trường Sinh và hộp quà bí mật | https://vn.loccitane.com/products/bo-san-pham-duong-da-bo-dau-mo-cuc-truong-sinh-kem-duong-da-tay-bo-dau-mo-cuc-truong-sinh-va-hop-qua-bi-mat |
| `bo-doi-hanh-nhan-refill-tang-blind-box-va-hop-qua-bi-mat` | Bộ đôi hạnh nhân refill tặng blind box và hộp quà bí mật | https://vn.loccitane.com/products/bo-doi-hanh-nhan-refill-tang-blind-box-va-hop-qua-bi-mat |
| `bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-gel-tam-tay-te-bao-chet-hanh-nhan-va-hop-qua-bi-mat` | Bộ ba chăm sóc cơ thể hạnh nhân cao cấp tặng gel tắm tẩy tế bào chết hạnh nhân và hộp quà bí mật | https://vn.loccitane.com/products/bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-gel-tam-tay-te-bao-chet-hanh-nhan-va-hop-qua-bi-mat |
| `bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-blind-box-va-hop-qua-bi-mat` | Bộ ba chăm sóc cơ thể hạnh nhân cao cấp tặng Blind box và hộp quà bí mật | https://vn.loccitane.com/products/bo-ba-cham-soc-co-the-hanh-nhan-cao-cap-tang-blind-box-va-hop-qua-bi-mat |
| `bo-doi-tre-hoa-da-cao-cap-tang-bo-cham-soc-da-mat-tai-nha-va-hop-qua-bi-mat` | Bộ đôi trẻ hóa da cao cấp tặng bộ chăm sóc da mặt tại nhà và hộp quà bí mật | https://vn.loccitane.com/products/bo-doi-tre-hoa-da-cao-cap-tang-bo-cham-soc-da-mat-tai-nha-va-hop-qua-bi-mat |
| `bo-doi-cham-soc-da-mat-cuc-truong-sinh-tang-bo-cham-soc-da-mat-tai-nha-va-hop-qua-bi-mat-1` | Bộ đôi chăm sóc da mặt cúc trường sinh tặng bộ chăm sóc da mặt tại nhà và hộp quà bí mật | https://vn.loccitane.com/products/bo-doi-cham-soc-da-mat-cuc-truong-sinh-tang-bo-cham-soc-da-mat-tai-nha-va-hop-qua-bi-mat-1 |
| `bo-doi-cham-soc-da-mat-cuc-truong-sinh-tang-bo-cham-soc-da-mat-tai-nha-va-hop-qua-bi-mat` | Bộ đôi chăm sóc da mặt cúc trường sinh tặng bộ chăm sóc da mặt tại nhà và hộp quà bí mật | https://vn.loccitane.com/products/bo-doi-cham-soc-da-mat-cuc-truong-sinh-tang-bo-cham-soc-da-mat-tai-nha-va-hop-qua-bi-mat |
| `combo-cham-soc-da-mat-cuc-truong-sinh-tang-bo-cham-soc-da-mat-tai-nha-va-hop-qua-bi-mat` | Combo chăm sóc da mặt cúc trường sinh tặng bộ chăm sóc da mặt tại nhà và hộp quà bí mật | https://vn.loccitane.com/products/combo-cham-soc-da-mat-cuc-truong-sinh-tang-bo-cham-soc-da-mat-tai-nha-va-hop-qua-bi-mat |
| `kem-duong-da-cuc-truong-sinh-50ml-tang-bo-trai-nghiem-cham-soc-da-tai-nha-va-hop-qua-bi-mat` | Kem dưỡng da cúc trường sinh 50ml Tặng Bộ trải nghiệm chăm sóc da tại nhà và hộp quà bí mật | https://vn.loccitane.com/products/kem-duong-da-cuc-truong-sinh-50ml-tang-bo-trai-nghiem-cham-soc-da-tai-nha-va-hop-qua-bi-mat |
| `dau-duong-tre-hoa-da-30ml-tang-bo-3-san-pham-duong-da-tre-hoa-cao-cap-tu-cuc-truong-sinh-va-hop-qua-bi-mat` | Dầu dưỡng trẻ hóa da 30ml Tặng Bộ 3 sản phẩm dưỡng da trẻ hóa cao cấp từ Cúc Trường Sinh và hộp quà bí mật | https://vn.loccitane.com/products/dau-duong-tre-hoa-da-30ml-tang-bo-3-san-pham-duong-da-tre-hoa-cao-cap-tu-cuc-truong-sinh-va-hop-qua-bi-mat |
| `tinh-chat-tre-hoa-da-30ml-tang-bo-3-san-pham-duong-da-tre-hoa-cao-cap-tu-cuc-truong-sinh-va-hop-qua-bi-mat` | Tinh chất trẻ hóa da 30ml Tặng Bộ 3 sản phẩm dưỡng da trẻ hóa cao cấp từ Cúc Trường Sinh và hộp quà bí mật | https://vn.loccitane.com/products/tinh-chat-tre-hoa-da-30ml-tang-bo-3-san-pham-duong-da-tre-hoa-cao-cap-tu-cuc-truong-sinh-va-hop-qua-bi-mat |
| `tinh-chat-tai-sinh-quyen-nang-70ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-hop-qua-bi-mat` | Tinh Chất Tái Sinh Quyền Năng 70ml Tặng Bộ Sản Phẩm Chăm Sóc Da Mặt Cúc Trường Sinh và hộp quà bí mật | https://vn.loccitane.com/products/tinh-chat-tai-sinh-quyen-nang-70ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-hop-qua-bi-mat |
| `tinh-chat-tai-sinh-quyen-nang-50ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-hop-qua-bi-mat` | Tinh Chất Tái Sinh Quyền Năng 50ml Tặng Bộ Sản Phẩm Chăm Sóc Da Mặt Cúc Trường Sinh và hộp quà bí mật | https://vn.loccitane.com/products/tinh-chat-tai-sinh-quyen-nang-50ml-tang-bo-san-pham-cham-soc-da-mat-cuc-truong-sinh-va-hop-qua-bi-mat |
| `tinh-chat-tai-sinh-quyen-nang-30ml-tang-bo-kem-duong-da-va-sua-rua-mat-cuc-truong-sinh-cung-hop-qua-bi-mat` | Tinh Chất Tái Sinh Quyền Năng 30ml Tặng Bộ Kem Dưỡng Da Và Sữa Rửa Mặt Cúc Trường Sinh Cùng Hộp quà Bí Mật | https://vn.loccitane.com/products/tinh-chat-tai-sinh-quyen-nang-30ml-tang-bo-kem-duong-da-va-sua-rua-mat-cuc-truong-sinh-cung-hop-qua-bi-mat |
| `qua-tang-danh-cho-hoa-don-tu-5-000-000d-5` | Quà tặng dành cho hóa đơn từ 5,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-5-000-000d-5 |
| `qua-tang-danh-cho-hoa-don-tu-3-000-000d-7` | Bộ quà Quà tặng dành cho hóa đơn từ 3,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-3-000-000d-7 |
| `qua-tang-danh-cho-hoa-don-tu-3-000-000d-6` | Bộ quà tặng dành cho hóa đơn từ 3,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-3-000-000d-6 |
| `qua-tang-danh-cho-hoa-don-tu-3-000-000d-5` | Quà tặng dành cho hóa đơn từ 3,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-3-000-000d-5 |
| `bo-goi-xa-phuc-hoi-chuyen-sau-500ml` | Bộ Gội Xả Phục Hồi Chuyên Sâu | https://vn.loccitane.com/products/bo-goi-xa-phuc-hoi-chuyen-sau-500ml |
| `qua-tang-danh-cho-hoa-don-tu-7-000-000d-3` | Quà tặng dành cho hóa đơn từ 7,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-7-000-000d-3 |
| `qua-tang-danh-cho-hoa-don-tu-5-000-000d-4` | Quà tặng dành cho hóa đơn từ 5,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-5-000-000d-4 |
| `qua-tang-danh-cho-hoa-don-tu-3-000-000d-4` | Quà tặng dành cho hóa đơn từ 3,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-3-000-000d-4 |
| `mua-1-tang-2` | Mua 1 tặng 1 | https://vn.loccitane.com/products/mua-1-tang-2 |
| `dau-xa-can-bang-va-tinh-chat-kich-thich-moc-toc-tang-bo-doi-cham-soc-co-the-hanh-nhan` | Dầu xả cân bằng và tinh chất kích thích mọc tóc  Tặng bộ đôi chăm sóc cơ thể hạnh nhân | https://vn.loccitane.com/products/dau-xa-can-bang-va-tinh-chat-kich-thich-moc-toc-tang-bo-doi-cham-soc-co-the-hanh-nhan |
| `kem-duong-da-cuc-truong-sinh-l-occitane-immortelle-divine-youth-cream-tang-bo-trai-nghiem-cham-soc-da-tai-nha` | Kem dưỡng da cúc trường sinh L'Occitane Immortelle Divine Youth Cream  Tặng Bộ trải nghiệm chăm sóc da tại nhà | https://vn.loccitane.com/products/kem-duong-da-cuc-truong-sinh-l-occitane-immortelle-divine-youth-cream-tang-bo-trai-nghiem-cham-soc-da-tai-nha |
| `dau-duong-tre-hoa-da-cuc-truong-sinh-l-occitane-immortelle-divine-youth-oil-tang-bo-cham-soc-da-3-buoc-cuc-truong-sinh` | Dầu dưỡng trẻ hóa da cúc trường sinh L'Occitane Immortelle Divine Youth Oil  Tặng Bộ chăm sóc da 3 bước cúc trường sinh | https://vn.loccitane.com/products/dau-duong-tre-hoa-da-cuc-truong-sinh-l-occitane-immortelle-divine-youth-oil-tang-bo-cham-soc-da-3-buoc-cuc-truong-sinh |
| `tinh-chat-tai-sinh-quyen-nang-ngua-lao-hoa-l-occitane-immortelle-reset-serum-tang-bo-doi-lam-sach-va-tai-tao-da-cuc-truong-sinh` | Tinh chất tái sinh quyền năng ngừa lão hóa L'Occitane Immortelle Reset Serum  Tặng Bộ đôi làm sạch và tái tạo da cúc trường sinh | https://vn.loccitane.com/products/tinh-chat-tai-sinh-quyen-nang-ngua-lao-hoa-l-occitane-immortelle-reset-serum-tang-bo-doi-lam-sach-va-tai-tao-da-cuc-truong-sinh |
| `bo-doi-cham-soc-tre-hoa-da-mat-cuc-truong-sinh-tang-kem-duong-da-cuc-truong-sinh-va-dau-tam-hanh-nhan` | Bộ đôi chăm sóc trẻ hóa da mặt cúc trường sinh  Tặng Kem dưỡng da cúc trường sinh và Dầu tắm hạnh nhân | https://vn.loccitane.com/products/bo-doi-cham-soc-tre-hoa-da-mat-cuc-truong-sinh-tang-kem-duong-da-cuc-truong-sinh-va-dau-tam-hanh-nhan |
| `bo-ba-cham-soc-co-the-hanh-nhan-cao-cap` | Bộ ba chăm sóc cơ thể hạnh nhân tặng blind box | https://vn.loccitane.com/products/bo-ba-cham-soc-co-the-hanh-nhan-cao-cap |
| `qua-tang-danh-cho-hoa-don-tu-7-000-000d-2` | Quà tặng dành cho hóa đơn từ 7,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-7-000-000d-2 |
| `qua-tang-danh-cho-hoa-don-tu-5-000-000d-3` | Quà tặng dành cho hóa đơn từ 5,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-5-000-000d-3 |
| `qua-tang-danh-cho-hoa-don-tu-3-000-000d-3` | Quà tặng dành cho hóa đơn từ 3,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-3-000-000d-3 |
| `kem-cao-rau-chiet-xuat-go-cay-bach-xu` | Kem Cạo Râu Chiết Xuất Gỗ Cây Bách Xù | https://vn.loccitane.com/products/kem-cao-rau-chiet-xuat-go-cay-bach-xu |
| `gel-tam-huong-hoa-anh-dao` | Gel Tắm Hương Hoa Anh Đào | https://vn.loccitane.com/products/gel-tam-huong-hoa-anh-dao |
| `kem-duong-da-tay-tam-ma-trang-30ml` | Kem Dưỡng Da Tay Tầm Ma Trắng 30ML | https://vn.loccitane.com/products/kem-duong-da-tay-tam-ma-trang-30ml |
| `kem-duong-da-tay-hoa-moc-abri-30ml` | Kem Dưỡng Da Tay Hoa Mộc | https://vn.loccitane.com/products/kem-duong-da-tay-hoa-moc-abri-30ml |
| `kem-duong-da-tay-oai-huong-trang-30ml` | Kem Dưỡng Da Tay Oải Hương Trắng | https://vn.loccitane.com/products/kem-duong-da-tay-oai-huong-trang-30ml |
| `refill-dau-xa-phuc-hoi-cho-toc-kho-hu-ton-500ml` | Refill Dầu Xả Phục Hồi Cho Tóc Khô &amp; Hư Tổn 500ML | https://vn.loccitane.com/products/refill-dau-xa-phuc-hoi-cho-toc-kho-hu-ton-500ml |
| `refill-dau-goi-thanh-loc-danh-cho-da-dau` | Refill Dầu Gội Thanh Lọc Dành Cho Da Đầu | https://vn.loccitane.com/products/refill-dau-goi-thanh-loc-danh-cho-da-dau |
| `gel-tam-hoa-anh-dao-refill` | Gel Tắm Hoa Anh Đào Refill | https://vn.loccitane.com/products/gel-tam-hoa-anh-dao-refill |
| `dau-xa-can-bang-va-tinh-chat-kich-thich-moc-toc-tang-dau-goi-can-bang-danh-cho-moi-loai-toc-tri-gia-790-000d` | Dầu xả cân bằng và tinh chất kích thích mọc tóc  Tặng dầu gội cân bằng dành cho mọi loại tóc trị giá 790,000đ | https://vn.loccitane.com/products/dau-xa-can-bang-va-tinh-chat-kich-thich-moc-toc-tang-dau-goi-can-bang-danh-cho-moi-loai-toc-tri-gia-790-000d |
| `bo-ba-cham-soc-tre-hoa-da-mat-cuc-truong-sinh-tang-san-pham-cham-soc-co-the-tay-va-dung-cu-massage-tri-gia-2-870-000d` | Bộ ba chăm sóc trẻ hóa da mặt cúc trường sinh Tặng sản phẩm chăm sóc cơ thể, tay và dụng cụ massage trị giá 2,870,000đ | https://vn.loccitane.com/products/bo-ba-cham-soc-tre-hoa-da-mat-cuc-truong-sinh-tang-san-pham-cham-soc-co-the-tay-va-dung-cu-massage-tri-gia-2-870-000d |
| `bo-doi-san-pham-cham-soc-da-mat-tang-bo-cham-soc-co-the-tri-gia-1-980-000d` | Bộ đôi sản phẩm chăm sóc da mặt Tặng bộ chăm sóc cơ thể trị giá 1,980,000đ | https://vn.loccitane.com/products/bo-doi-san-pham-cham-soc-da-mat-tang-bo-cham-soc-co-the-tri-gia-1-980-000d |
| `bo-doi-cham-soc-tre-hoa-da-mat-cuc-truong-sinh-tang-san-pham-cham-soc-co-the-va-mat-tri-gia-1-480-000d` | Bộ đôi chăm sóc trẻ hóa da mặt cúc trường sinh Tặng sản phẩm chăm sóc cơ thể và mắt trị giá 1,480,000đ | https://vn.loccitane.com/products/bo-doi-cham-soc-tre-hoa-da-mat-cuc-truong-sinh-tang-san-pham-cham-soc-co-the-va-mat-tri-gia-1-480-000d |
| `bo-ba-cham-soc-co-the-hanh-nhan-premier-tang-bo-cham-soc-co-the-va-tay-te-bao-chet-hanh-nhan-tri-gia-1-680-000d` | Bộ ba chăm sóc cơ thể hạnh nhân premier Tặng bộ chăm sóc cơ thể và tẩy tế bào chết hạnh nhân trị giá 1,680,000đ | https://vn.loccitane.com/products/bo-ba-cham-soc-co-the-hanh-nhan-premier-tang-bo-cham-soc-co-the-va-tay-te-bao-chet-hanh-nhan-tri-gia-1-680-000d |
| `bo-ba-cham-soc-co-the-hanh-nhan-refill-tang-bo-cham-soc-co-the-va-tay-te-bao-chet-hanh-nhan-tri-gia-1-680-000d` | Bộ ba chăm sóc cơ thể hạnh nhân refill Tặng bộ chăm sóc cơ thể và tẩy tế bào chết hạnh nhân trị giá 1,680,000đ | https://vn.loccitane.com/products/bo-ba-cham-soc-co-the-hanh-nhan-refill-tang-bo-cham-soc-co-the-va-tay-te-bao-chet-hanh-nhan-tri-gia-1-680-000d |
| `qua-tang-danh-cho-hoa-don-tu-7-000-000d-1` | Quà tặng dành cho hóa đơn từ 7,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-7-000-000d-1 |
| `qua-tang-danh-cho-hoa-don-tu-5-000-000d-2` | Quà tặng dành cho hóa đơn từ 5,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-5-000-000d-2 |
| `qua-tang-danh-cho-hoa-don-tu-3-000-000d-2` | Quà tặng dành cho hóa đơn từ 3,000,000đ | https://vn.loccitane.com/products/qua-tang-danh-cho-hoa-don-tu-3-000-000d-2 |
| `mua-1-tang-1` | Mua 1 tặng 1 | https://vn.loccitane.com/products/mua-1-tang-1 |
| `kem-duong-da-tay-bo-dau-mo-l-occitane-75ml-duong-am-lam-min-da` | [Phiên Bản Mới] Kem Dưỡng Da Tay Bơ Đậu Mỡ | https://vn.loccitane.com/products/kem-duong-da-tay-bo-dau-mo-l-occitane-75ml-duong-am-lam-min-da |
| `kem-duong-da-tay-bo-dau-mo-l-occitane-30ml-duong-am-lam-mem-da` | [Phiên Bản Mới] Kem Dưỡng Da Tay Bơ Đậu Mỡ | https://vn.loccitane.com/products/kem-duong-da-tay-bo-dau-mo-l-occitane-30ml-duong-am-lam-mem-da |
| `kem-duong-am-chuyen-sau-bo-dau-mo-l-occitane-200ml` | Kem Dưỡng Ẩm Chuyên Sâu Bơ Đậu Mỡ | https://vn.loccitane.com/products/kem-duong-am-chuyen-sau-bo-dau-mo-l-occitane-200ml |
| `kem-duong-da-chan-bo-dau-mo-l-occitane-30ml` | Kem Dưỡng Da Chân Bơ Đậu Mỡ | https://vn.loccitane.com/products/kem-duong-da-chan-bo-dau-mo-l-occitane-30ml |
| `combo-goi-xa-can-bang-cho-moi-loai-da-dau-l-occitane-gentle-balance-500ml-1` | Bộ Gội Xả Cân Bằng Dành Cho Mọi Loại Tóc | https://vn.loccitane.com/products/combo-goi-xa-can-bang-cho-moi-loai-da-dau-l-occitane-gentle-balance-500ml-1 |
| `combo-dau-goi-xa-phuc-hoi-chuyen-sau` | Bộ Gội Xả Phục Hồi Chuyên Sâu | https://vn.loccitane.com/products/combo-dau-goi-xa-phuc-hoi-chuyen-sau |
| `kem-duong-tre-hoa-da-tay-l-occitane-cuc-truong-sinh-bo-dau-mo-immortelle-shea-youth-hand-cream-75ml` | Kem Dưỡng Trẻ Hóa Da Tay | https://vn.loccitane.com/products/kem-duong-tre-hoa-da-tay-l-occitane-cuc-truong-sinh-bo-dau-mo-immortelle-shea-youth-hand-cream-75ml |
| `combo-goi-xa-l-occitane-gom-dau-goi-verbena-300ml-va-dau-xa-verbena-250ml-1` | Bộ Gội Xả Giúp Tóc Bồng Bềnh Và Chắc Khoẻ | https://vn.loccitane.com/products/combo-goi-xa-l-occitane-gom-dau-goi-verbena-300ml-va-dau-xa-verbena-250ml-1 |
| `combo-goi-xa-l-occitane-thanh-loc-danh-cho-da-dau-dau` | Bộ Gội Xả Thanh Lọc Dành Cho Da Đầu Dầu | https://vn.loccitane.com/products/combo-goi-xa-l-occitane-thanh-loc-danh-cho-da-dau-dau |
| `combo-goi-xa-l-occitane-can-bang-diu-nhe-danh-cho-moi-loai-da-dau-250ml-va-300ml-1` | Bộ Gội Xả Cân Bằng Dành Cho Mọi Loại Tóc | https://vn.loccitane.com/products/combo-goi-xa-l-occitane-can-bang-diu-nhe-danh-cho-moi-loai-da-dau-250ml-va-300ml-1 |
| `kem-duong-da-tay-huong-hoa-hong-chanh-mayer-30ml` | Kem Dưỡng Da Tay Hương Hoa Hồng &amp; Chanh Mayer | https://vn.loccitane.com/products/kem-duong-da-tay-huong-hoa-hong-chanh-mayer-30ml |
| `kem-duong-da-tay-co-ngot-30ml` | Kem Dưỡng Da Tay Cỏ Ngọt | https://vn.loccitane.com/products/kem-duong-da-tay-co-ngot-30ml |
| `kem-duong-da-tay-tu-dang` | Kem Dưỡng Da Tay Tử Đằng | https://vn.loccitane.com/products/kem-duong-da-tay-tu-dang |
| `tui-refill-dau-xa-can-bang-cho-moi-loai-da-dau-l-occitane-gentle-balance-conditioner-500ml` | Túi Refill Dầu Xả Cân Bằng Cho Mọi Loại Da Đầu | https://vn.loccitane.com/products/tui-refill-dau-xa-can-bang-cho-moi-loai-da-dau-l-occitane-gentle-balance-conditioner-500ml |
| `dau-xa-nuoi-duong-toc-bong-benh-va-chac-khoe-l-occitane-vd-conditioner-250ml` | Dầu Xả Phục Hồi Tóc Chắc Khoẻ và Bồng Bềnh | https://vn.loccitane.com/products/dau-xa-nuoi-duong-toc-bong-benh-va-chac-khoe-l-occitane-vd-conditioner-250ml |
| `dau-goi-nuoi-duong-toc-bong-benh-va-chac-khoe-l-occitane-vd-shampoo-300ml` | Dầu Gội Phục Hồi Tóc Chắc Khoẻ và Bồng Bềnh | https://vn.loccitane.com/products/dau-goi-nuoi-duong-toc-bong-benh-va-chac-khoe-l-occitane-vd-shampoo-300ml |
| `dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml` | [Phiên Bản Mới] Dầu tắm Hạnh Nhân | https://vn.loccitane.com/products/dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml |
| `kem-duong-da-tay-l-occitane-huong-hoa-hong-rose-hand-cream-30ml-1` | Kem Dưỡng Da Tay Hương Hoa Hồng | https://vn.loccitane.com/products/kem-duong-da-tay-l-occitane-huong-hoa-hong-rose-hand-cream-30ml-1 |
| `kem-duong-da-tay-l-occitane-huong-hoa-hong-rose-hand-cream-75ml` | Kem Dưỡng Da Tay Hương Hoa Hồng | https://vn.loccitane.com/products/kem-duong-da-tay-l-occitane-huong-hoa-hong-rose-hand-cream-75ml |
| `son-duong-moi-l-occitane-hoa-hong-12ml` | Son Dưỡng Môi Hoa Hồng | https://vn.loccitane.com/products/son-duong-moi-l-occitane-hoa-hong-12ml |
| `kem-duong-da-tay-l-occitane-hoa-anh-dao-75ml` | Kem Dưỡng Da Tay Hoa Anh Đào | https://vn.loccitane.com/products/kem-duong-da-tay-l-occitane-hoa-anh-dao-75ml |
| `kem-duong-da-tay-l-occitane-hoa-anh-dao-30ml` | Kem Dưỡng Da Tay L'Occitane Hoa Anh Đào 30ML | https://vn.loccitane.com/products/kem-duong-da-tay-l-occitane-hoa-anh-dao-30ml |
| `sua-duong-the-hoa-hong-l-occitane-250ml` | Sữa Dưỡng Thể Hoa Hồng | https://vn.loccitane.com/products/sua-duong-the-hoa-hong-l-occitane-250ml |
| `sua-duong-the-hoa-anh-dao-l-occitane-cherry-blossom-body-lotion-250ml` | Sữa Dưỡng Thể Hoa Anh Đào | https://vn.loccitane.com/products/sua-duong-the-hoa-anh-dao-l-occitane-cherry-blossom-body-lotion-250ml |
| `mat-na-phuc-hoi-chuyen-sau-cho-toc-kho-hu-ton-l-occitane-intensive-repair-mask-200ml` | Mặt Nạ Phục Hồi Chuyên Sâu Cho Tóc Hư Tổn | https://vn.loccitane.com/products/mat-na-phuc-hoi-chuyen-sau-cho-toc-kho-hu-ton-l-occitane-intensive-repair-mask-200ml |
| `dau-goi-danh-can-bang-cho-moi-loai-da-dau-l-occitane-gentle-balance-conditioner-500ml` | Dầu Gội Cân Bằng Dành Cho Mọi Loại Tóc | https://vn.loccitane.com/products/dau-goi-danh-can-bang-cho-moi-loai-da-dau-l-occitane-gentle-balance-conditioner-500ml |
| `kem-duong-lam-sang-da-tran-chau-mai-l-occitane-reine-des-pres-cream-50ml` | Kem Dưỡng Làm Sáng Da Trân Châu Mai | https://vn.loccitane.com/products/kem-duong-lam-sang-da-tran-chau-mai-l-occitane-reine-des-pres-cream-50ml |
| `combo-duong-da-l-occitane-gom-dau-duong-tre-hoa-da-30ml-va-duong-chat-tai-sinh-quyen-nang-30ml` | Bộ Đôi Serum Cho Làn Da Không Tuổi | https://vn.loccitane.com/products/combo-duong-da-l-occitane-gom-dau-duong-tre-hoa-da-30ml-va-duong-chat-tai-sinh-quyen-nang-30ml |
| `duong-chat-tai-sinh-quyen-nang-l-occitane-immortelle-reset-serum-50ml-1` | Dưỡng Chất Tái Sinh Quyền Năng | https://vn.loccitane.com/products/duong-chat-tai-sinh-quyen-nang-l-occitane-immortelle-reset-serum-50ml-1 |
| `combo-dau-goi-300ml-dau-xa-250ml-l-occitane-intensive-repair` | Bộ Gội Xả Phục Hồi Chuyên Sâu | https://vn.loccitane.com/products/combo-dau-goi-300ml-dau-xa-250ml-l-occitane-intensive-repair |
| `combo-serum-duong-da-dau-ban-dem-va-tinh-chat-kich-thich-moc-toc-l-occitane-50ml` | Bộ Dưỡng Da Đầu Ban Đêm Và Tinh Chất Kích Thích Mọc Tóc | https://vn.loccitane.com/products/combo-serum-duong-da-dau-ban-dem-va-tinh-chat-kich-thich-moc-toc-l-occitane-50ml |
| `sua-rua-mat-chong-lao-hoa-cuc-truong-sinh` | Sữa Rửa Mặt Tạo Bọt Cúc Trường Sinh | https://vn.loccitane.com/products/sua-rua-mat-chong-lao-hoa-cuc-truong-sinh |
| `dau-xa-phuc-hoi-chuyen-sau-l-occitane-intensive-repair-conditioner-250ml-500ml` | Dầu Xả Phục Hồi Chuyên Sâu | https://vn.loccitane.com/products/dau-xa-phuc-hoi-chuyen-sau-l-occitane-intensive-repair-conditioner-250ml-500ml |
| `dau-goi-phuc-hoi-chuyen-sau-l-occitane-intensive-repair-shampoo-300ml-500ml` | Dầu Gội Phục Hồi Chuyên Sâu | https://vn.loccitane.com/products/dau-goi-phuc-hoi-chuyen-sau-l-occitane-intensive-repair-shampoo-300ml-500ml |
| `kem-duong-tay-hanh-nhan-almond-delicious-hands-travel-size-30-ml` | Kem Dưỡng Da Tay Hạnh Nhân | https://vn.loccitane.com/products/kem-duong-tay-hanh-nhan-almond-delicious-hands-travel-size-30-ml |
| `dau-xa-diu-nhe-danh-cho-moi-loai-da-dau-l-occitane-gentle-balance-conditioner-250ml` | Dầu Xả  Cân Bằng Dành Cho Mọi Loại Tóc | https://vn.loccitane.com/products/dau-xa-diu-nhe-danh-cho-moi-loai-da-dau-l-occitane-gentle-balance-conditioner-250ml |
| `dau-goi-thanh-loc-danh-cho-da-dau-dau-l-occitane-purifying-freshness-shampoo-300ml-1` | Dầu Gội Thanh Lọc Dành Cho Da Đầu Dầu | https://vn.loccitane.com/products/dau-goi-thanh-loc-danh-cho-da-dau-dau-l-occitane-purifying-freshness-shampoo-300ml-1 |
| `tui-refill-dau-xa-danh-cho-da-dau-dau-500ml` | Túi Refill Dầu Xả Thanh Lọc Tươi Mát | https://vn.loccitane.com/products/tui-refill-dau-xa-danh-cho-da-dau-dau-500ml |
| `dau-xa-thanh-loc-danh-cho-da-dau-dau-l-occitane-purifying-freshness-conditioner-250ml` | Dầu Xả Thanh Lọc Tươi Mát | https://vn.loccitane.com/products/dau-xa-thanh-loc-danh-cho-da-dau-dau-l-occitane-purifying-freshness-conditioner-250ml |
| `dau-xa-can-bang-cho-moi-loai-da-dau-l-occitane-gentle-balance-conditioner-500ml` | Dầu Xả Cân Bằng Dành Cho Mọi Loại Tóc | https://vn.loccitane.com/products/dau-xa-can-bang-cho-moi-loai-da-dau-l-occitane-gentle-balance-conditioner-500ml |
| `kem-tam-hanh-nhan-br-almond-shower-cream` | Kem Tắm Hạnh Nhân | https://vn.loccitane.com/products/kem-tam-hanh-nhan-br-almond-shower-cream |
| `kem-duong-tre-hoa-da-tay-cuc-truong-sinh-bo-dau-mo-immortelle-shea-youth-hand-cream` | Kem Dưỡng Trẻ Hóa Da Tay Cúc Trường Sinh Bơ Đậu Mỡ | https://vn.loccitane.com/products/kem-duong-tre-hoa-da-tay-cuc-truong-sinh-bo-dau-mo-immortelle-shea-youth-hand-cream |
| `lan-khu-mui-huong-go-bach-xu-roll-on-deodorant` | Lăn Khử Mùi Hương Gỗ Bách Xù Roll-On Deodorant | https://vn.loccitane.com/products/lan-khu-mui-huong-go-bach-xu-roll-on-deodorant |
| `dau-duong-tre-hoa-da-cuc-truong-sinh-immortelle-divine-youth-oil` | Dầu Dưỡng Trẻ Hoá Da Cúc Trường Sinh | https://vn.loccitane.com/products/dau-duong-tre-hoa-da-cuc-truong-sinh-immortelle-divine-youth-oil |
| `kem-duong-tre-hoa-da-danh-cho-mat-moi-cuc-truong-sinh-immortelle-divine-contour-eyes-lips` | Kem Dưỡng Da Cho Mắt &amp; Môi Cúc Trường Sinh | https://vn.loccitane.com/products/kem-duong-tre-hoa-da-danh-cho-mat-moi-cuc-truong-sinh-immortelle-divine-contour-eyes-lips |
| `bot-rua-mat-cuc-truong-sinh-immortelle-precious-cleansing-foam` | Bọt Rửa Mặt Cúc Trường Sinh | https://vn.loccitane.com/products/bot-rua-mat-cuc-truong-sinh-immortelle-precious-cleansing-foam |
| `dau-tay-trang-cuc-truong-sinh-br-immortelle-precious-cleansing-oil` | Dầu Tẩy Trang Cúc Trường Sinh | https://vn.loccitane.com/products/dau-tay-trang-cuc-truong-sinh-br-immortelle-precious-cleansing-oil |
| `kem-duong-tay-hoa-oai-huong-br-lavender-hand-cream` | Kem Dưỡng Da Tay Hoa Oải Hương | https://vn.loccitane.com/products/kem-duong-tay-hoa-oai-huong-br-lavender-hand-cream |
| `sua-rua-mat-tay-te-bao-chet-huong-go-bach-xu-br-cade-daily-exfoliating-face-cleanser` | Sửa Rửa Mặt Tẩy Tế Bào Chết Hương Gỗ Bách Xù | https://vn.loccitane.com/products/sua-rua-mat-tay-te-bao-chet-huong-go-bach-xu-br-cade-daily-exfoliating-face-cleanser |
| `dau-goi-ngan-ngua-gau-anti-dandruff-soothing-shampoo` | Dầu Gội Ngăn Ngừa Gàu Anti-dandruff Soothing Shampoo | https://vn.loccitane.com/products/dau-goi-ngan-ngua-gau-anti-dandruff-soothing-shampoo |
| `gel-tam-goi-huong-qua-thanh-yen-co-dien-cedrat-shower-gel-body-hair` | Gel Tắm Gội Hương Quả Thanh Yên Cổ Điển | https://vn.loccitane.com/products/gel-tam-goi-huong-qua-thanh-yen-co-dien-cedrat-shower-gel-body-hair |
| `sua-tay-trang-bo-dau-mo-shea-butter-cleasing-milk` | Sữa Tẩy Trang Chiết Xuất Bơ Đậu Mỡ | https://vn.loccitane.com/products/sua-tay-trang-bo-dau-mo-shea-butter-cleasing-milk |
| `kem-rua-mat-bo-dau-mo-shea-butter-cleasing-cream` | Kem Rửa Mặt Bơ Đậu Mỡ | https://vn.loccitane.com/products/kem-rua-mat-bo-dau-mo-shea-butter-cleasing-cream |
| `dau-goi-can-bang-diu-nhe-danh-cho-moi-loai-da-dau-br-gentle-balance-micellar-shampoo` | Dầu Gội Cân Bằng Dành Cho Mọi Loại Tóc | https://vn.loccitane.com/products/dau-goi-can-bang-diu-nhe-danh-cho-moi-loai-da-dau-br-gentle-balance-micellar-shampoo |
| `kem-duong-tre-hoa-da-cuc-truong-sinh-immortelle-divine-youth-cream` | Kem Dưỡng Da Cúc Trường Sinh | https://vn.loccitane.com/products/kem-duong-tre-hoa-da-cuc-truong-sinh-immortelle-divine-youth-cream |
| `dau-duong-the-hanh-nhan-almond-supple-skin-oil` | [Phiên Bản Mới] Dầu Dưỡng Thể Hạnh Nhân | https://vn.loccitane.com/products/dau-duong-the-hanh-nhan-almond-supple-skin-oil |
| `kem-duong-am-san-chac-da-hanh-nhan-br-almond-milk-concentrate` | [Phiên Bản Mới] Kem Dưỡng Ẩm Săn Chắc Da Hạnh Nhân | https://vn.loccitane.com/products/kem-duong-am-san-chac-da-hanh-nhan-br-almond-milk-concentrate |
| `tay-te-bao-chet-danh-cho-da-dau-purifying-freshness-scalp-scrub` | Tẩy Tế Bào Chết Dành Cho Da Đầu | https://vn.loccitane.com/products/tay-te-bao-chet-danh-cho-da-dau-purifying-freshness-scalp-scrub |
| `tui-refill-kem-duong-am-san-chac-da-hanh-nhan-almond-milk-concentrate-eco-refill` | Túi Refill Kem Dưỡng Ẩm Săn Chắc Da Hạnh Nhân | https://vn.loccitane.com/products/tui-refill-kem-duong-am-san-chac-da-hanh-nhan-almond-milk-concentrate-eco-refill |
| `dau-tam-hanh-nhan-almond-shower-oil-500ml` | [Phiên Bản Mới] Dầu Tắm Hạnh Nhân | https://vn.loccitane.com/products/dau-tam-hanh-nhan-almond-shower-oil-500ml |
| `duong-chat-tai-sinh-quyen-nang-immortelle-reset-serum-30ml` | Dưỡng Chất Tái Sinh Quyền Năng | https://vn.loccitane.com/products/duong-chat-tai-sinh-quyen-nang-immortelle-reset-serum-30ml |
| `https://vn.loccitane.com` |  | https://vn.loccitane.com/products/https://vn.loccitane.com |

</details>
