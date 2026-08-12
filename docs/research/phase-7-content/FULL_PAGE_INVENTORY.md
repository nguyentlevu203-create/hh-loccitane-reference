# Phase 7 — Full Public Content Page Inventory

Source: `https://vn.loccitane.com/sitemap_pages_1.xml`, fetched live 2026-08-12 — the authoritative, complete list of publicly indexed `/pages/...` content routes on `vn.loccitane.com`: **42 pages**. No authentication or private API was used. Each URL was crawled once via `scripts/crawl-pages-phase7.mjs` (static HTML, same technique as prior phases) for template classification and real title/breadcrumb/content extraction; a handful of navigation/footer link targets were additionally confirmed by reading the real `<footer>` and off-canvas-nav sidebar markup embedded in every page (not invented).

## Scope of this document

- **42 real content page URLs discovered**, all crawled successfully (0 errors).
- **23 pages get full data modeling** in `src/data/pages/records/` — every page that is either (a) actually linked from the site's real footer or off-canvas navigation (confirmed by reading that markup, not guessed), or (b) a substantial real legal/utility page worth preserving even though not currently nav-linked (see the individual reasons in the table below).
- The remaining 19 pages are listed **URL-only** — real title/template/word-count, not modeled with full content this phase. Several are near-duplicate legacy versions of a modeled page under a different slug (see "Known duplicates" below) — the nav-linked slug is always the one modeled, per confirmed real footer behavior, not our own preference.
- **Do not clone every page independently**: of the 25 real "bespoke" (custom hand-built landing) pages, only the 11 that are actually reachable from real navigation are modeled — and even those are modeled through **one reusable EDITORIAL template** (hero image + real display heading + real lead paragraphs), not as pixel-perfect clones of each page's unique custom section layout. See `PAGE_TEMPLATE_MATRIX.md`.

## Catalogue counts

| Metric | Count |
|---|---|
| Discovered public content page URLs (sitemap) | 42 |
| Modeled with full detail (Phase 7 target) | 23 |
| URL-only (not modeled this phase) | 19 |
| Template: bespoke | 25 |
| Template: standard | 15 |
| Template: store-locator | 1 |
| Template: contact-form | 1 |
| Real empty-content pages found | 1 (`faq`) |

## Modeled pages (full detail)

| Slug | Real title | Template | Reachable from | Source |
|---|---|---|---|---|
| `chinh-sach-bao-mat-1` | Chính sách bảo mật | standard | Chính sách bảo mật (footer) | `https://vn.loccitane.com/pages/chinh-sach-bao-mat-1` |
| `chinh-sach-giao-hang-va-thanh-toan` | Chính sách vận chuyển và giao nhận | standard | Chính sách vận chuyển và giao nhận (footer) | `https://vn.loccitane.com/pages/chinh-sach-giao-hang-va-thanh-toan` |
| `chinh-sach-thanh-toan` | Chính sách thanh toán | standard | Chính sách thanh toán (footer) | `https://vn.loccitane.com/pages/chinh-sach-thanh-toan` |
| `chinh-sach-doi-tra-va-hoan-tien` | Chính sách đổi trả và hoàn tiền | standard | Chính sách đổi trả và hoàn tiền (footer) | `https://vn.loccitane.com/pages/chinh-sach-doi-tra-va-hoan-tien` |
| `chinh-sach-kiem-hang` | Chính sách kiểm hàng | standard | Chính sách kiểm hàng (footer) | `https://vn.loccitane.com/pages/chinh-sach-kiem-hang` |
| `huong-dan-mua-hang` | HƯỚNG DẪN MUA HÀNG | standard | Hướng dẫn mua hàng (footer) | `https://vn.loccitane.com/pages/huong-dan-mua-hang` |
| `dieu-khoan-dich-vu` | Điều khoản dịch vụ | standard | Điều khoản & điều kiện (off-canvas nav) | `https://vn.loccitane.com/pages/dieu-khoan-dich-vu` |
| `chinh-sach-bao-ve-thong-tin-ca-nhan-cua-nguoi-tieu-dung` | Chính sách bảo vệ thông tin cá nhân của người tiêu dùng | standard | real PDPA-style legal policy (not nav-linked, substantial real content) | `https://vn.loccitane.com/pages/chinh-sach-bao-ve-thong-tin-ca-nhan-cua-nguoi-tieu-dung` |
| `faq` | FAQ | standard | real empty-content example (not nav-linked) | `https://vn.loccitane.com/pages/faq` |
| `dang-ky-thanh-cong` | ĐĂNG KÝ THÀNH CÔNG | standard | registration-success utility page (not nav-linked) | `https://vn.loccitane.com/pages/dang-ky-thanh-cong` |
| `he-thong-cua-hang` | Hệ thống cửa hàng | store-locator | Hệ Thống Cửa Hàng (footer + off-canvas — STORE LOCATOR template) | `https://vn.loccitane.com/pages/he-thong-cua-hang` |
| `lien-he` | Liên hệ | contact-form | Liên hệ (CONTACT FORM template; not footer-linked but real, reachable, standard commerce utility page) | `https://vn.loccitane.com/pages/lien-he` |
| `ve-l-occitane` | Về L'Occitane | bespoke | Về chúng tôi (footer) | `https://vn.loccitane.com/pages/ve-l-occitane` |
| `ki-niem-50-nam-thanh-lap` | Kỉ niệm 50 năm thành lập | bespoke | Kỉ niệm 50 năm thành lập (footer) | `https://vn.loccitane.com/pages/ki-niem-50-nam-thanh-lap` |
| `brand-commitments` | brand-commitments | bespoke | Giá trị của chúng tôi (footer) | `https://vn.loccitane.com/pages/brand-commitments` |
| `bcorp` | TỰ HÀO LÀ DOANH NGHIỆP B CORP™ | bespoke | Doanh nghiệp B Corp™ (footer) | `https://vn.loccitane.com/pages/bcorp` |
| `big-little-things` | TẠI SAO BIG LITTLE THINGS RA ĐỜI? | bespoke | Big Little Things (footer) | `https://vn.loccitane.com/pages/big-little-things` |
| `sustainable-sourcing` | NGUỒN CƯNG ỨNG BỀN VỮNG | bespoke | Chuỗi cung bền vững (footer) | `https://vn.loccitane.com/pages/sustainable-sourcing` |
| `hotel-amenities` | DỊCH VỤ DÀNH CHO KHÁCH SẠN | bespoke | Dịch vụ dành cho khách sạn (footer) | `https://vn.loccitane.com/pages/hotel-amenities` |
| `corporate-gifting` | Quà Tặng Doanh Nghiệp | bespoke | Quà tặng doanh nghiệp (footer) | `https://vn.loccitane.com/pages/corporate-gifting` |
| `spa-loccitane` | SPA L’OCCITANE Nuôi dưỡng nghệ thuật sống khỏe | bespoke | L'Occitane Spa (footer) | `https://vn.loccitane.com/pages/spa-loccitane` |
| `khachhangthanthietloccitane` | CHƯƠNG TRÌNH KHÁCH HÀNG THÂN THIẾT | bespoke | Chương Trình Khách Hàng Thân Thiết (footer) | `https://vn.loccitane.com/pages/khachhangthanthietloccitane` |
| `uudai` | ƯU ĐÃI ĐẶC BIỆT | bespoke | LỢI ÍCH VÀ ƯU ĐÃI ĐẶC BIỆT ✨ (off-canvas category nav) | `https://vn.loccitane.com/pages/uudai` |

## Known duplicates (real, live, both resolve — nav-linked one is modeled)

| Modeled (nav-linked) | Orphaned duplicate (URL-only, not linked anywhere in nav/footer) |
|---|---|
| `chinh-sach-bao-mat-1` | `chinh-sach-bao-mat` (shorter/older real version, still live) |
| `chinh-sach-doi-tra-va-hoan-tien` | `chinh-sach-doi-tra` (shorter/older real version, still live) |
| `ve-l-occitane` | `about-us`, `gioi-thieu` (same real "about" bespoke template family, different real copy/imagery per slug) |

## URL-only inventory (not modeled this phase)

Title, template, and word/image counts are all real observed values from the live crawl — nothing here is fabricated.

<details><summary>Expand full list</summary>

| Slug | Title | Template | Words | Images |
|---|---|---|---|---|
| `chinh-sach-doi-tra` | Chính sách đổi trả | standard | 234 | 0 |
| `chinh-sach-bao-mat` | Chính sách bảo mật | standard | 179 | 0 |
| `tham-quan-manosque` | KHÁM PHÁ | standard | 460 | 5 |
| `uu-dai-dac-biet-loccitane-tet-2026` | Ưu Đãi Đặc Biệt Tháng 2 | bespoke | 0 | 20 |
| `cam-ket-1` | Cam kết | bespoke | 0 | 9 |
| `wishlist` | Wishlist | bespoke | 0 | 0 |
| `nang-niu-lan-da-don-he-rang-ro` | NÂNG NIU LÀN DA, ĐÓN HÈ RẠNG RỠ | bespoke | 0 | 60 |
| `cam-ket` | Cam kết | standard | 606 | 4 |
| `thanh-phan-1` | Thành Phần | standard | 1469 | 10 |
| `gioi-thieu` | Tại L'OCCITANE | bespoke | 0 | 4 |
| `about-us` | Tại L'OCCITANE | bespoke | 0 | 4 |
| `promotion-thang-12` | ƯU ĐÃI GIÁNG SINH TƯNG BỪNG THÁNG 12 | bespoke | 0 | 54 |
| `survey` | GUEST EXPERIENCE SURVEY | bespoke | 0 | 0 |
| `respecting-biodiversity` | respecting-biodiversity | bespoke | 0 | 10 |
| `shea-butter` | Shea butter Hạnh | bespoke | 0 | 16 |
| `ingredients` | Thành Phần | bespoke | 0 | 16 |
| `nang-niu-khoanh-khac-he` | NÂNG NIU VẺ ĐẸP TRONG TỪNG KHOẢNH KHẮC HÈ | bespoke | 0 | 54 |
| `almond` | Amande Sublime | bespoke | 0 | 7 |
| `nang-niu-tung-cham` | NÂNG NIU TỪNG CHẠM, YÊU CHIỀU TỪNG KHOẢNH KHẮC | bespoke | 0 | 60 |

</details>
