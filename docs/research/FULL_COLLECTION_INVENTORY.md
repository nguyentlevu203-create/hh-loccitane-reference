# Phase 5 — Full Public Collection Inventory

Source: `https://vn.loccitane.com/sitemap_collections_1.xml`, fetched live 2026-08-12 — the authoritative, complete list of publicly indexed collection URLs on `vn.loccitane.com`: **204 collections**. No authentication, private API, or invented URL was used. Each URL was crawled once (page 1 only — see `COLLECTION_DATA_QA.md` for the pagination-coverage caveat) via `scripts/crawl-collections-phase5.mjs`, which reads the same kind of server-rendered static HTML used successfully in Phase 4 (no browser/JS execution needed).

## Scope of this document

- **204 real collection URLs discovered**, all crawled successfully (0 network errors after one retry pass).
- **28 collections get full data modeling** in `src/data/collections/records/` — every collection that either (a) real-associates with ≥1 of our 44 modeled products (via that product's own live breadcrumb, or via appearing on the collection's page-1 grid), or (b) was hand-picked to give template-classification coverage even with zero product overlap (`cham-soc-da-mat` for CATEGORY LANDING, `chong-nang` for LEGACY/EMPTY — see `COLLECTION_TEMPLATE_MATRIX.md`).
- The remaining 176 collections are listed **URL-only** below (slug, title, real product total, template classification, status) — not modeled with full description/hero/product-slug detail this phase, matching the same "not every page gets cloned" scope decision made for the 262 URL-only products in Phase 4.
- **Product associations are conservative by construction**: only real product slugs already present in our 44-product catalogue are ever recorded against a collection; a collection's *live* product count (`totalLiveProductCount`) may be much larger than the number of products we can actually render (see `COLLECTION_DATA_QA.md` for the honest gap).
- **Association sources, combined**: (1) the product's own live PDP breadcrumb (its site-assigned primary collection), and (2) the collection's own page-1 product grid. A product can be associated with a collection via either source, so "Modeled products" below can exceed what page-1 alone shows.

## Catalogue counts

| Metric | Count |
|---|---|
| Discovered public collection URLs (sitemap) | 204 |
| Modeled with full collection detail (Phase 5 target) | 28 |
| URL-only (sitemap + page-1 metadata, not modeled this phase) | 176 |
| Active (≥1 real product live) | 111 |
| Legacy/empty (0 products live, real URL still resolves 200) | 93 |
| Template: legacy-empty | 93 |
| Template: standard-plp | 69 |
| Template: promotional | 35 |
| Template: category-landing | 5 |
| Template: editorial | 2 |

## Modeled collections (full detail — 28)

Full record fields (title, breadcrumb, template, description, hero image, sub-category links, modeled product slugs, real live total) live in `src/data/collections/records/<slug>.ts`. Summary:

| Slug | Title | Template | Modeled products | Real live total | Source |
|---|---|---|---|---|---|
| `best-seller` | Được Yêu Thích | editorial | 6 | unknown (no count element) | `https://vn.loccitane.com/collections/best-seller` |
| `cham-soc-co-the-bo-dau-mo` | Chăm Sóc Cơ Thể | standard-plp | 1 | 2 | `https://vn.loccitane.com/collections/cham-soc-co-the-bo-dau-mo` |
| `cham-soc-co-the-duoc-yeu-thich` | Chăm Sóc Cơ Thể - Được Yêu Thích | standard-plp | 1 | 1 | `https://vn.loccitane.com/collections/cham-soc-co-the-duoc-yeu-thich` |
| `cham-soc-da-mat-1` | Chăm Sóc Da Mặt | standard-plp | 2 | 41 | `https://vn.loccitane.com/collections/cham-soc-da-mat-1` |
| `cham-soc-da-mat` | Chăm Sóc Da Mặt | category-landing | 0 | unknown (no count element) | `https://vn.loccitane.com/collections/cham-soc-da-mat` |
| `cham-soc-da-tay-va-da-chan` | Chăm Sóc Cơ Thể-Chăm Sóc Da Tay & Da Chân | standard-plp | 2 | 13 | `https://vn.loccitane.com/collections/cham-soc-da-tay-va-da-chan` |
| `cham-soc-da-tay` | Chăm Sóc Da Tay | category-landing | 4 | unknown (no count element) | `https://vn.loccitane.com/collections/cham-soc-da-tay` |
| `chamsoccothe-2` | Ưu đãi web - T12/2025 - Chăm sóc cơ thể | promotional | 2 | 19 | `https://vn.loccitane.com/collections/chamsoccothe-2` |
| `chong-nang` | Chăm Sóc Da Mặt-Chống Nắng | legacy-empty | 0 | 0 | `https://vn.loccitane.com/collections/chong-nang` |
| `danh-cho-nam` | DÀNH CHO NAM | category-landing | 1 | unknown (no count element) | `https://vn.loccitane.com/collections/danh-cho-nam` |
| `duong-da-tay` | Dưỡng Da Tay | standard-plp | 4 | 21 | `https://vn.loccitane.com/collections/duong-da-tay` |
| `eco-refill-tam-rua-tay-shower-liquid-soaps` | Refills | editorial | 1 | unknown (no count element) | `https://vn.loccitane.com/collections/eco-refill-tam-rua-tay-shower-liquid-soaps` |
| `eco-refills-1` | Eco-Refills | standard-plp | 1 | 9 | `https://vn.loccitane.com/collections/eco-refills-1` |
| `hanh-nhan-almond` | Chăm Sóc Cơ Thể-Hạnh Nhân | standard-plp | 1 | 6 | `https://vn.loccitane.com/collections/hanh-nhan-almond` |
| `kem-duong-da-tay-bo-dau-mo` | Kem Dưỡng Da Tay | standard-plp | 1 | 3 | `https://vn.loccitane.com/collections/kem-duong-da-tay-bo-dau-mo` |
| `mat-xa-dau-duong` | Mát-xa & Dầu Dưỡng | standard-plp | 1 | 3 | `https://vn.loccitane.com/collections/mat-xa-dau-duong` |
| `nhom-ap-dung-voucher` | Ưu đãi web - Nhóm áp dụng voucher | promotional | 1 | 55 | `https://vn.loccitane.com/collections/nhom-ap-dung-voucher` |
| `refills` | Refills Dầu Tắm | standard-plp | 1 | 3 | `https://vn.loccitane.com/collections/refills` |
| `retail-t08-2026-big-little-things` | Retail T08/2026 - Big Little Things | promotional | 2 | 2 | `https://vn.loccitane.com/collections/retail-t08-2026-big-little-things` |
| `retail-t08-2026-body-care` | Retail T08/2026 - Body care | promotional | 1 | 5 | `https://vn.loccitane.com/collections/retail-t08-2026-body-care` |
| `retail-t08-2026-face-care` | Retail T08/2026 - Face care | promotional | 9 | 10 | `https://vn.loccitane.com/collections/retail-t08-2026-face-care` |
| `retail-t08-2026-hair-care` | Retail T08/2026 - Hair care | promotional | 3 | 3 | `https://vn.loccitane.com/collections/retail-t08-2026-hair-care` |
| `san-pham-bo-dau-mo` | Sản Phẩm Bơ Đậu Mỡ | standard-plp | 1 | 5 | `https://vn.loccitane.com/collections/san-pham-bo-dau-mo` |
| `sanphamapdungvoucher` | Ưu đãi web - T12/2025 - Nhóm áp dụng quà tặng theo giá trị đơn hàng | promotional | 1 | 27 | `https://vn.loccitane.com/collections/sanphamapdungvoucher` |
| `sua-tam-va-dau-tam` | Xà Phòng Và Sản Phẩm Tắm | standard-plp | 2 | 7 | `https://vn.loccitane.com/collections/sua-tam-va-dau-tam` |
| `tam-va-duong-the` | Chăm Sóc Cơ Thể | category-landing | 1 | unknown (no count element) | `https://vn.loccitane.com/collections/tam-va-duong-the` |
| `web-travel-size` | Web - Travel Size | standard-plp | 1 | 18 | `https://vn.loccitane.com/collections/web-travel-size` |
| `xa-phong-va-tam-bo-dau-mo` | Xà Phòng Và Tắm | standard-plp | 1 | 1 | `https://vn.loccitane.com/collections/xa-phong-va-tam-bo-dau-mo` |

## URL-only inventory (176 collections — sitemap + page-1 metadata, not modeled this phase)

Title, real live total, and template classification are all real observed values from the page-1 crawl — no field here is fabricated. `total` is `null` where the live page uses an infinite-scroll/no-count template rather than the standard paginated count element (see `COLLECTION_TEMPLATE_MATRIX.md`).

<details><summary>Expand full list (176 rows)</summary>

| Slug | Title | Template | Real live total | Status |
|---|---|---|---|---|
| `nuoc-can-bang-va-xit-khoang` | Chăm Sóc Da Mặt-Nước Cân Bằng & Xịt Khoáng | legacy-empty | 0 | empty/legacy |
| `cuc-truong-sinh-immortelle-reset` | Chăm Sóc Da Mặt-Cúc Trường Sinh Immortelle Reset | standard-plp | 1 | active |
| `cuc-truong-sinh-immortelle-precious` | Chăm Sóc Da Mặt-Cúc Trường Sinh | standard-plp | 2 | active |
| `san-pham-cho-nam` | Chăm Sóc Cơ Thể-Sản Phẩm Cho Nam | standard-plp | 2 | active |
| `bo-dau-mo-shea-butter` | Chăm Sóc Cơ Thể-Bơ Đậu Mỡ | legacy-empty | 0 | empty/legacy |
| `atiso-artichoke` | Chăm Sóc Cơ Thể-Atiso | legacy-empty | 0 | empty/legacy |
| `hoa-oai-huong-lavender` | Chăm Sóc Cơ Thể-Hoa Oải Hương | standard-plp | 1 | active |
| `hoa-hong-rose` | Chăm Sóc Cơ Thể-Hoa Hồng | legacy-empty | 0 | empty/legacy |
| `hoa-moc-te-osmanthus` | Chăm Sóc Cơ Thể-Hoa Mộc Tê | legacy-empty | 0 | empty/legacy |
| `hoa-nghe-tay-violet-arlesienne` | Chăm Sóc Cơ Thể-Hoa Nghệ Tây & Violet | legacy-empty | 0 | empty/legacy |
| `thao-moc-herbae-par` | Chăm Sóc Cơ Thể-Thảo Mộc - Herbae Par | legacy-empty | 0 | empty/legacy |
| `go-tuyet-tung-eau-des-baux` | Chăm Sóc Cơ Thể-Trắc Bách Diệp | legacy-empty | 0 | empty/legacy |
| `thanh-yen-cedrat-cap-cedrat` | Chăm Sóc Cơ Thể-Thanh Yên | standard-plp | 1 | active |
| `xa-phong` | Chăm Sóc Cơ Thể-Xà Phòng | legacy-empty | 0 | empty/legacy |
| `lan-khu-mui` | Chăm Sóc Cơ Thể-Lăn Khử Mùi | standard-plp | 1 | active |
| `cham-soc-toc` | Chăm Sóc Tóc | category-landing | — | active |
| `dau-goi` | Chăm Sóc Tóc-Dầu gội | standard-plp | 7 | active |
| `dau-xa` | Chăm Sóc Tóc-Dầu xả | standard-plp | 7 | active |
| `huong-hoa` | NƯỚC HOA-Hương Hoa/ Floral Scent | legacy-empty | 0 | empty/legacy |
| `nuoc-hoa-san-pham-cho-nam` | NƯỚC HOA-Sản Phẩm Cho Nam/ Men | legacy-empty | 0 | empty/legacy |
| `xit-thom` | KHÔNG GIAN SỐNG-Xịt Thơm/ Mist | legacy-empty | 0 | empty/legacy |
| `cham-soc-da-mat-hoa-tran-chau-mai-reine-blanche` | Chăm Sóc Da Mặt-Hoa Trân Châu Mai | legacy-empty | 0 | empty/legacy |
| `tam-duong-the-hoa-mau-don-peony` | Chăm Sóc Cơ Thể-Hoa Mẫu Đơn | legacy-empty | 0 | empty/legacy |
| `cham-soc-toc-can-bang-diu-nhe-gentle-balance` | Chăm Sóc Tóc-Cân Bằng & Dịu Nhẹ | standard-plp | 4 | active |
| `cham-soc-toc-thanh-loc-tuoi-mat-purifying-freshness` | Chăm Sóc Tóc-Thanh Lọc Tươi Mát | standard-plp | 1 | active |
| `cham-soc-toc-chac-khoe-bong-benh-volume-strength` | Chăm Sóc Tóc-Chắc Khỏe & Bồng Bềnh | legacy-empty | 0 | empty/legacy |
| `cham-soc-toc-co-roi-ngua-verbena` | Chăm Sóc Tóc-Cỏ Roi Ngựa | legacy-empty | 0 | empty/legacy |
| `co-roi-ngua` | NƯỚC HOA-Cỏ Roi Ngựa - Verbena & Citrus Verbena | legacy-empty | 0 | empty/legacy |
| `hoa-hong` | NƯỚC HOA-Hoa Hồng - Rose | legacy-empty | 0 | empty/legacy |
| `hoa-oai-huong-lavender-1` | BỘ SƯU TẬP-HOA OẢI HƯƠNG - LAVENDER | standard-plp | 1 | active |
| `hoa-moc-te` | NƯỚC HOA-Hoa Mộc Tê - Osmanthus | legacy-empty | 0 | empty/legacy |
| `bo-suu-tap-hoa-anh-dao-cherry-blossom` | BỘ SƯU TẬP-HOA ANH ĐÀO - CHERRY BLOSSOM | legacy-empty | 0 | empty/legacy |
| `thao-moc` | NƯỚC HOA-Thảo Mộc - Herbae Par | legacy-empty | 0 | empty/legacy |
| `bo-suu-tap-hoa-moc-te-osmanthus` | BỘ SƯU TẬP-HOA MỘC TÊ - OSMANTHUS | legacy-empty | 0 | empty/legacy |
| `bo-suu-tap-hoa-cam-hoa-lan-neroli-orchidee` | BỘ SƯU TẬP-HOA CAM & HOA LAN - NEROLI & ORCHIDEE | legacy-empty | 0 | empty/legacy |
| `bo-suu-tap-hoa-mau-don-peony` | BỘ SƯU TẬP-HOA MẪU ĐƠN - PEONY | legacy-empty | 0 | empty/legacy |
| `hanh-nhan` | Eco-Refills-Hạnh Nhân | standard-plp | 1 | active |
| `bo-suu-tap-thao-moc-herbae-par` | BỘ SƯU TẬP-THẢO MỘC - HERBAE PAR | legacy-empty | 0 | empty/legacy |
| `bo-suu-tap-forgotten-flowers` | BỘ SƯU TẬP-FORGOTTEN FLOWERS | legacy-empty | 0 | empty/legacy |
| `bo-suu-tap-thanh-yen-cedrat-cap-cedrat` | BỘ SƯU TẬP-THANH YÊN - CEDRAT & CAP CEDRAT | standard-plp | 1 | active |
| `bo-suu-tap-bach-xu-cade-l-occitan` | BỘ SƯU TẬP-BÁCH XÙ - CADE & L'OCCITAN | standard-plp | 2 | active |
| `eco-refill-hoa-oai-huong` | Eco-Refills-Hoa Oải Hương | legacy-empty | 0 | empty/legacy |
| `hoa-anh-dao-1` | Eco-Refills-Hoa Anh Đào | legacy-empty | 0 | empty/legacy |
| `eco-refill-phuc-hoi-hu-ton` | Eco-Refills-Phục Hồi Hư Tổn | legacy-empty | 0 | empty/legacy |
| `eco-refill-thanh-loc-tuoi-mat` | Eco-Refills-Thanh Lọc Tươi Mát | legacy-empty | 0 | empty/legacy |
| `eco-refill-chac-khoe-va-bong-benh` | Eco-Refills-Chắc Khỏe & Bồng Bềnh | legacy-empty | 0 | empty/legacy |
| `eco-refill-dau-goi-shampoo` | Eco-Refills-Dầu Gội | standard-plp | 1 | active |
| `eco-refills-hoa-hong-rose` | Eco-Refills-Hoa Hồng | legacy-empty | 0 | empty/legacy |
| `san-pham-khuyen-mai` | SẢN PHẨM KHUYẾN MÃI | legacy-empty | 0 | empty/legacy |
| `bo-suu-tap-bo-dau-mo-shea-butter` | BỘ SƯU TẬP-BƠ ĐẬU MỠ - SHEA BUTTER | standard-plp | 2 | active |
| `hot-products` | Sản phẩm nổi bật | legacy-empty | 0 | empty/legacy |
| `tam-duong-the-xit-thom-co-the-body-mist` | Chăm Sóc Cơ Thể-Xịt Thơm Cơ Thể | legacy-empty | 0 | empty/legacy |
| `cham-soc-da-mat-tinh-chat-dau-duong-da-serums-oil-treatments` | Chăm Sóc Da Mặt-Tinh Chất & Dầu Dưỡng Da | standard-plp | 2 | active |
| `cham-soc-toc-cham-soc-toc-chuyen-sau-hair-treatments` | Chăm Sóc Tóc-Chăm Sóc Tóc Chuyên Sâu | legacy-empty | 0 | empty/legacy |
| `bo-san-pham-hoa-tran-chau-mai-reine-blanche` | BỘ SƯU TẬP - HOA TRÂN CHÂU MAI - REINE BLANCHE | legacy-empty | 0 | empty/legacy |
| `tam-duong-the-cuc-truong-sinh-bo-dau-mo-immortelle-shea` | Chăm Sóc Cơ Thể-Cúc Trường Sinh Bơ Đậu Mỡ | standard-plp | 1 | active |
| `san-pham-trai-nghiem` | SẢN PHẨM TRẢI NGHIỆM | legacy-empty | 0 | empty/legacy |
| `kham-pha-uu-dai-40` | KHÁM PHÁ ƯU ĐÃI UPTO 40% | standard-plp | 3 | active |
| `bo-suu-tap-le-hoi-va-qua-tang` | Bộ Sưu Tập Quà Tặng | standard-plp | 2 | active |
| `retail-promotion-t11-face` | Retail - T01/2026 - Khối sản phẩm 1 | legacy-empty | 0 | empty/legacy |
| `retail-test-new-template-khong-xoa` | retail test new template không xóa | promotional | 3 | active |
| `tat-ca-san-pham-1` | Tất Cả Sản Phẩm | standard-plp | 25 | active |
| `retail-khoi-san-pham-3` | Retail - T01/2026 - Khối sản phẩm 3 | legacy-empty | 0 | empty/legacy |
| `retail-khoi-san-pham-6` | Retail - T01/2026 - Khối sản phẩm 6 | legacy-empty | 0 | empty/legacy |
| `cham-soc-da-chan` | Chăm Sóc Da Chân | legacy-empty | 0 | empty/legacy |
| `ecom-khoi-3` | Web Offer - Khối Sản Phẩm 3 | legacy-empty | 0 | empty/legacy |
| `ecom-khoi-6` | Ecom - Khối 6 | legacy-empty | 0 | empty/legacy |
| `retail-t12-2025-khoi-san-pham-3` | Retail - T12/2025 - Khối sản phẩm 4 | legacy-empty | 0 | empty/legacy |
| `retail-t12-2025-khoi-san-pham-5` | Retail - T12/2025 - Khối sản phẩm 3 | legacy-empty | 0 | empty/legacy |
| `web-offer-khoi-2` | Web offer - Khối 2 | legacy-empty | 0 | empty/legacy |
| `web-offer-t12-2025-khoi-san-pham-2` | Ưu đãi web - T11/2025 | legacy-empty | 0 | empty/legacy |
| `chamsoctoc-2` | Ưu đãi web - T12/2025 - Chăm sóc tóc | promotional | 10 | active |
| `uu-dai-web-t1-2026-bo-cham-soc` | Ưu đãi web - T1/2026 - Bộ chăm sóc | legacy-empty | 0 | empty/legacy |
| `uu-dai-web-t1-2026-cham-soc-toc` | Ưu đãi web - T1/2026 - Chăm sóc tóc | standard-plp | 3 | active |
| `uu-dai-web-t1-2026-bo-dau-mo` | Ưu đãi web - T1/2026 - Bơ Đậu Mỡ | legacy-empty | 0 | empty/legacy |
| `8-3` | Bộ Sản Phẩm Gifts | standard-plp | 24 | active |
| `retail-t03-2026-khoi-san-pham-1` | Retail - T03/2026 - Khối sản phẩm 1 | promotional | 4 | active |
| `retail-t03-2026-khoi-san-pham-2` | Retail - T03/2026 - Khối sản phẩm 2 | promotional | 2 | active |
| `retail-t03-2026-khoi-san-pham-4` | Retail - T03/2026 - Khối sản phẩm 4 | promotional | 1 | active |
| `cham-soc-da-chan-bo-dau-mo` | Chăm Sóc Da Chân | standard-plp | 1 | active |
| `cham-soc-co-the-duong-the` | Chăm Sóc Cơ Thể - Dưỡng Thể | standard-plp | 4 | active |
| `cham-soc-moi` | Chăm Sóc Môi | standard-plp | 1 | active |
| `cham-soc-toc-1` | Chăm sóc tóc | standard-plp | 7 | active |
| `combo-goi-xa` | Combo gội xả | standard-plp | 1 | active |
| `cham-soc-toc-duoc-yeu-thich` | Chăm Sóc Tóc - Được Yêu Thích | legacy-empty | 0 | empty/legacy |
| `refill-le-ap-voucher` | Refill lẻ áp voucher | standard-plp | 5 | active |
| `refill-combo-ap-voucher` | Refill combo áp voucher | legacy-empty | 0 | empty/legacy |
| `retail-t03-2026-khoi-san-pham-5` | Retail - T04/2026 - Khối sản phẩm 1 | promotional | 3 | active |
| `retail-t04-2026-khoi-san-pham-3` | Retail - T04/2026 - Khối sản phẩm 3 | promotional | 4 | active |
| `retail-t04-2026-khoi-san-pham-4` | Retail - T04/2026 - Khối sản phẩm 4 | promotional | 1 | active |
| `retail-t05-2026-khoi-san-pham-1` | Retail - T05/2026 - Ưu đãi | promotional | 4 | active |
| `retail-t05-2026-cham-soc-co-the` | Retail - T05/2026 - Chăm sóc cơ thể | promotional | 4 | active |
| `retail-t06-2026-uu-dai` | Retail - T06/2026 - Ưu đãi | promotional | 8 | active |
| `retail-t06-2026-cham-soc-toc` | Retail T06/2026 - Chăm sóc tóc | promotional | 3 | active |
| `bo-qua-tang` | BỘ QUÀ TẶNG | standard-plp | 21 | active |
| `tay-trang` | Chăm Sóc Da Mặt-Tẩy Trang | standard-plp | 2 | active |
| `lam-sach-va-tay-te-bao-chet` | Chăm Sóc Da Mặt-Làm Sạch & Tẩy Tế Bào Chết | standard-plp | 4 | active |
| `cuc-truong-sinh-immortelle-divine` | Chăm Sóc Da Mặt-Cúc Trường Sinh Immortelle Divine | standard-plp | 3 | active |
| `duong-mat-va-moi` | Chăm Sóc Da Mặt-Dưỡng Môi & Mắt | standard-plp | 1 | active |
| `bach-xu-cade-l-occitan` | Chăm Sóc Cơ Thể-Bách Xù | standard-plp | 1 | active |
| `bo-dau-mo-shea-butter-1` | Chăm Sóc Da Mặt-Bơ Đậu Mỡ | standard-plp | 2 | active |
| `co-roi-ngua-verbena-citrus-verbena` | Chăm Sóc Cơ Thể-Cỏ Roi Ngựa | legacy-empty | 0 | empty/legacy |
| `hoa-anh-dao-cherry-blossom` | Chăm Sóc Cơ Thể-Hoa Anh Đào | legacy-empty | 0 | empty/legacy |
| `hoa-cam-hoa-lan-neroli-orchidee` | Chăm Sóc Cơ Thể-Hoa Cam & Hoa Lan | legacy-empty | 0 | empty/legacy |
| `tay-te-bao-chet-co-the` | Chăm Sóc Cơ Thể-Tẩy Tế Bào Chết Cơ Thể | legacy-empty | 0 | empty/legacy |
| `forgotten-flowers` | Chăm Sóc Cơ Thể-Forgotten Flowers | legacy-empty | 0 | empty/legacy |
| `san-pham-tam` | Chăm Sóc Cơ Thể-Sản Phẩm Tắm | standard-plp | 2 | active |
| `dau-duong` | Chăm Sóc Cơ Thể-Dầu Dưỡng Thể | standard-plp | 1 | active |
| `kem-duong-the` | Chăm Sóc Cơ Thể-Kem Dưỡng Thể | standard-plp | 2 | active |
| `cham-soc-da-mat-san-pham-cho-nam-1` | Chăm Sóc Da Mặt-Sản Phẩm Cho Nam | legacy-empty | 0 | empty/legacy |
| `eco-refills` | Chăm Sóc Cơ Thể-Eco-Refills | standard-plp | 1 | active |
| `cham-soc-da-dau-chuyen-sau` | Chăm Sóc Tóc-Chăm Sóc Da Đầu Chuyên Sâu | standard-plp | 1 | active |
| `cham-soc-toc-eco-refills` | Chăm Sóc Tóc-Eco-Refills | legacy-empty | 0 | empty/legacy |
| `nuoc-hoa` | NƯỚC HOA | legacy-empty | 0 | empty/legacy |
| `khong-gian-song` | KHÔNG GIAN SỐNG | legacy-empty | 0 | empty/legacy |
| `nen` | KHÔNG GIAN SỐNG-Nến/ Candle | legacy-empty | 0 | empty/legacy |
| `tinh-dau` | KHÔNG GIAN SỐNG-Tinh Dầu/ Home Perfume | legacy-empty | 0 | empty/legacy |
| `duong-am` | Chăm Sóc Da Mặt-Dưỡng Ẩm | standard-plp | 1 | active |
| `cham-soc-toc-phuc-hoi-hu-ton-intensive-repair` | Chăm Sóc Tóc-Phục Hồi Hư Tổn | standard-plp | 6 | active |
| `cham-soc-toc-ngan-ngua-gau-anti-dandruff` | Chăm Sóc Tóc-Ngăn Ngừa Gàu | standard-plp | 1 | active |
| `cham-soc-toc-hanh-nhan-almond` | Chăm Sóc Tóc-Hạnh Nhân | legacy-empty | 0 | empty/legacy |
| `hoa-oai-huong` | NƯƠC HOA-Hoa Oải Hương - Lavender | legacy-empty | 0 | empty/legacy |
| `hoa-anh-dao` | NƯỚC HOA - Hoa Anh Đào - Cherry Blossom | legacy-empty | 0 | empty/legacy |
| `5-loai-tinh-dau-5-essential-oils` | BỘ SƯU TẬP-5 LOẠI TINH DẦU - 5 ESSENTIAL OILS | standard-plp | 4 | active |
| `atiso-artichoke-1` | BỘ SƯU TẬP-ATISO - ARTICHOKE | legacy-empty | 0 | empty/legacy |
| `co-roi-ngua-verbena-citrus-verbena-1` | BỘ SƯU TẬP-CỎ ROI NGỰA - VERBENA & CITRUS VERBENA | legacy-empty | 0 | empty/legacy |
| `hoa-hong-rose-1` | BỘ SƯU TẬP-HOA HỒNG - ROSE | legacy-empty | 0 | empty/legacy |
| `hoa-cam-va-hoa-lan` | NƯỚC HOA-Hoa Cam & Hoa Lan - Neroli & Orchidee | legacy-empty | 0 | empty/legacy |
| `forgotten-flowers-1` | NƯỚC HOA - Forgotten Flowers | legacy-empty | 0 | empty/legacy |
| `bo-suu-tap-hoa-nghe-tay-violet-arlesienne` | BỘ SƯU TẬP-HOA NGHỆ TÂY & VIOLET - ARLESIENNE | legacy-empty | 0 | empty/legacy |
| `trac-bach-diep-eau-des-baux` | BỘ SƯU TẬP-TRẮC BÁCH DIỆP - EAU DES BAUX | legacy-empty | 0 | empty/legacy |
| `eco-refill-bo-dau-mo` | Eco-Refills-Bơ Đậu Mỡ | legacy-empty | 0 | empty/legacy |
| `eco-refill-co-roi-ngua` | Eco-Refills-Cỏ Roi Ngựa | legacy-empty | 0 | empty/legacy |
| `eco-refill-can-bang-va-diu-nhe` | Eco-Refills-Cân Bằng & Dịu Nhẹ | legacy-empty | 0 | empty/legacy |
| `eco-refill-duong-the-body-moisturizers` | Eco-Refills-Dưỡng Thể | standard-plp | 1 | active |
| `eco-refill-dau-xa-conditioner` | Eco-Refills-Dầu Xả | legacy-empty | 0 | empty/legacy |
| `eco-refill-dau-xa-conditioner-1` | Eco-Refills-Dầu Xả | standard-plp | 3 | active |
| `bo-suu-tap-cuc-truong-sinh-immortelle` | BỘ SƯU TẬP-CÚC TRƯỜNG SINH IMMORTELLE | standard-plp | 6 | active |
| `uu-dai` | ƯU ĐÃI | standard-plp | 7 | active |
| `eco-refills-dau-goi-shampoo` | Eco-Refills-Dầu Gội | legacy-empty | 0 | empty/legacy |
| `bo-suu-tap-cuc-truong-sinh-bo-dau-mo-immortelle-shea` | BỘ SƯU TẬP-CÚC TRƯƠNG SINH BƠ ĐẬU MỠ-IMMORTELLE SHEA | standard-plp | 1 | active |
| `bo-suu-tap-hoa-oai-huong-tuyet-white-lavender` | BỘ SƯU TẬP-HOA OẢI HƯƠNG TUYẾT-WHITE LAVENDER | legacy-empty | 0 | empty/legacy |
| `khuyen-mai` | KHUYẾN MÃI | legacy-empty | 0 | empty/legacy |
| `holiday` | HOLIDAY | standard-plp | 2 | active |
| `bo-suu-tap-hanh-nhan-almond-1` | BỘ SƯU TẬP HẠNH NHÂN - ALMOND | standard-plp | 3 | active |
| `retail-black-friday-body` | Retail - T01/2026 - Khối sản phẩm 2 | legacy-empty | 0 | empty/legacy |
| `retail-khoi-san-pham-4` | Retail - T01/2026 - Khối sản phẩm 4 | legacy-empty | 0 | empty/legacy |
| `retail-khoi-san-pham-5` | Retail - T01/2026 - Khối sản phẩm 5 | legacy-empty | 0 | empty/legacy |
| `uudaisetlehoiloccitane` | Ưu đãi web - T12/2025 - Set lễ hội | legacy-empty | 0 | empty/legacy |
| `ecom-khoi-4` | Web Offer - Khối Sản Phẩm 4 | promotional | 1 | active |
| `ecomo-khoi-5` | Web Offer - Khối Sản Phẩm 5 | legacy-empty | 0 | empty/legacy |
| `uu-dai-thang-11` | Ưu Đãi Tháng 11 | legacy-empty | 0 | empty/legacy |
| `retail-t12-2025-khoi-san-pham-1` | Retail - T12/2025 - Khối sản phẩm 1 | legacy-empty | 0 | empty/legacy |
| `retail-t12-2025-khoi-san-pham-2` | Retail - T12/2025 - Khối sản phẩm 2 | legacy-empty | 0 | empty/legacy |
| `retail-t12-2025-khoi-san-pham-4` | Retail - T12/2025 - Khối sản phẩm 5 | legacy-empty | 0 | empty/legacy |
| `web-offer-t12-2025-khoi-san-pham-1` | Ưu đãi web - T12/2025 - Khối 1 | legacy-empty | 0 | empty/legacy |
| `chamsocdamat-2` | Ưu đãi web - T12/2025 - Chăm sóc da mặt | promotional | 10 | active |
| `uu-dai-web-t1-2026-cham-soc-co-the` | Ưu đãi web - T1/2026 - Chăm sóc cơ thể | legacy-empty | 0 | empty/legacy |
| `uu-dai-web-t1-2026-cham-soc-da-mat` | Ưu đãi web - T1/2026 - Chăm sóc da mặt | standard-plp | 1 | active |
| `uu-dai-web-t3-2026-bo-dau-mo` | Ưu đãi web - T3/2026 - Bơ Đậu Mỡ | legacy-empty | 0 | empty/legacy |
| `retail-t03-2026-khoi-san-pham-3` | Retail - T03/2026 - Khối sản phẩm 3 | promotional | 3 | active |
| `uu-dai-2` | Ưu Đãi | standard-plp | 16 | active |
| `da-dau-dau` | Da Đầu Dầu | standard-plp | 4 | active |
| `retail-t04-2026-khoi-san-pham-2` | Retail - T04/2026 - Khối sản phẩm 2 | promotional | 1 | active |
| `retail-t04-2026-khoi-san-pham-1-1` | Retail - T04/2026 - Khối sản phẩm 1-1 | promotional | 4 | active |
| `retail-t05-2026-face-care` | Retail - T05/2026 - Chăm sóc mặt | promotional | 10 | active |
| `retail-t05-2026-cham-soc-toc` | Retail - T05/2026 - Chăm sóc tóc | promotional | 2 | active |
| `retail-t06-2026-cham-soc-co-the` | Retail - T06/2026 - Chăm sóc cơ thể | promotional | 7 | active |
| `retail-t06-2026-cham-soc-mat` | Retail - T06/2026 - Chăm sóc mặt | promotional | 10 | active |
| `retail-t06-2026-travel` | Retail T06/2026 - Travel | promotional | 2 | active |
| `retail-t07-2026-uu-dai` | Retail T07/2026 - Ưu đãi | promotional | 7 | active |
| `retail-t07-2026-body-care` | Retail T07/2026 - Body care | promotional | 3 | active |
| `retail-t07-2026-face-care` | Retail T07/2026 - Face care | promotional | 9 | active |
| `retail-t07-2026-hair-care` | Retail T07/2026 - Hair care | promotional | 1 | active |
| `retail-t07-2026-travel` | Retail T07/2026 - Travel | promotional | 2 | active |
| `retail-t08-2026-uu-dai` | Retail T08/2026 - Ưu đãi | promotional | 5 | active |

</details>

## Known artifacts

- `retail-test-new-template-khong-xoa` ("retail-test-new-template-do-not-delete") is a real, live, internal test/staging collection left on the production site by the L'Occitane team — included in the inventory for completeness (it's a real public URL) but explicitly **not** modeled, and flagged again in `COLLECTION_DATA_QA.md`.
