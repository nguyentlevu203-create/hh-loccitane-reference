# Behaviors — Product Detail Page (Almond Shower Oil)

Source: https://vn.loccitane.com/products/dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml
(Haravan-based storefront, `body.template-product.product-available`). Verified via Playwright MCP
(`browser_evaluate` against the live DOM and the page's own `window.wd.productjson` config object — a
first-party data source, not inference) and claude-in-chrome interaction testing (clicks, scroll,
form reveals). Tested at 1440×1000, 768×1024, 390×844.

## Header

Same conclusion as `collections-all-acd0b3f1`: this template has no full-bleed hero beneath the header,
so the header renders in the light/"scrolled" visual state at `scrollY = 0` in every screenshot taken
(desktop, tablet, mobile) — confirmed visually across all captures, consistent with `forceScrolled`.
**Implementation:** pass the same `forceScrolled` prop already added to `SiteHeader`/`SiteChrome` for
`/collections/all`. No new chrome work needed.

## Breadcrumbs

Real rendered breadcrumb: `Trang chủ / Ưu đãi web - Nhóm áp dụng voucher / [Phiên Bản Mới] Dầu tắm Hạnh Nhân`.

This is **not** the canonical product taxonomy — it's dynamic. The page's own `BreadcrumbList` JSON-LD
only lists 2 levels (home + product, no category), while the visible on-page breadcrumb inserts a
middle crumb sourced from `window.wd.collection.url` (`/collections/nhom-ap-dung-voucher`, id
`1004596749`) — i.e., whichever collection the product's Haravan catalog record is primarily filed
under (here: a promo/voucher-eligible collection, not the shower-oil category you'd expect). This is
real, confirmed, storefront behavior, not a bug — the product also carries a `tam-va-duong-the`
("shower & body") collection reference in `cart_related` and `/collections/sua-tam-va-dau-tam` in
`collectionurl`, so the same catalog record maps to *multiple* plausible crumbs depending on which
config field you read.

**Recommendation:** keep it real — `ProductBreadcrumbs` should accept a `parentCategory?: {label, href}`
prop and use the actual observed value (`Ưu đãi web - Nhóm áp dụng voucher` → `/collections/nhom-ap-dung-voucher`)
for this product, rather than "fixing" it to the more intuitive shower-oil category. Faithful reproduction
over invented tidiness.

## Container / spacing / background

Same site container system as `/collections/all` — no new tokens. Two-column layout inside the
1200px container: gallery column ≈ left half, product-info column ≈ right half, on desktop/tablet;
stacks to a single column (gallery, then info) on mobile.

## Product gallery

**Structure:** main image area + a 6-item horizontal thumbnail strip below it + prev/next arrow
buttons pinned to the far left/right edges of the whole gallery region.

**Slide 0 has a unique layout, not shared by any other slide:** the default view shows the main
product bottle image on the left *plus* a secondary always-visible column with two stacked
gift-with-purchase promo tiles ("🎁 ĐƠN HÀNG TỪ 990K" / "🎁 ĐƠN HÀNG TỪ 1TR5" — free-gift-at-spend-threshold
banners, each a triangle gift-wrap graphic + "Set quà bí mật" caption + fine print "*Quà tặng KHÔNG
hiển thị trong giỏ hàng / *Số lượng quà có hạn"). Clicking **any other thumbnail** replaces this whole
area with a single full-width image (no gift panel) — confirmed by clicking thumbnails 3 and 4 and
observing the gift tiles disappear entirely, arrows repositioning to the edges of the now-wider image.
**This means the gift-tile panel is not one of the 6 slider images** — it's a separate promo insert
that only coexists with slide-0's product shot. See ASSETS.md for why it has no distinct downloadable
asset (composite of small graphics/logo, not a photographed image).

**Thumbnails:** 6 total, corresponding 1:1 to `productjson.images` in order (see ASSETS.md): [1] main
bottle (shown with gift panel), [2] alternate bottle shot alone, [3] "+25% Độ ẩm*" marketing claim,
[4] "Chiết xuất 40% Dầu tự nhiên" marketing claim, [5] lifestyle hand-massage photo, [6] "Rạng rỡ"
campaign group shot. Clicking a thumbnail swaps the main image immediately (some had a brief
lazy-load blank frame in testing — real network latency, not a broken state).

**Zoom/lightbox:** clicking the gallery's edge **arrow buttons** (not a thumbnail) opens a full-screen
Fancybox-style lightbox: `1/6` counter top-left, zoom/play/grid/close icon row top-right, prev/next
arrows, its own bottom thumbnail strip. Confirmed via live click + Escape-to-close. This is a real,
if secondary, feature. **Recommendation:** implement the inline main-image swap (arrows advance the
same in-place slide, matching thumbnail-click behavior) as the P0/P1 requirement; treat the full
fullscreen Fancybox-style lightbox as a P2 stretch feature — it adds real implementation weight
(counter, zoom controls, independent thumbnail strip, backdrop) for a secondary interaction, and Phase
3's checklist only requires zoom "if present" without mandating the exact lightbox chrome.

**Aspect ratio:** main image area and thumbnails are roughly square (product-shot on a light neutral
backdrop, matches `object-fit: contain` pattern already used by the existing `ProductCard`).

**No video** on this gallery.

**Mobile (390px):** identical split-panel-on-slide-0 / full-width-on-other-slides behavior persists;
gallery just scales down. Thumbnail strip remains a horizontal scroll row, does not wrap to a grid.
Touch-swipe itself wasn't independently exercised (Playwright doesn't simulate real touch gestures
well) — reasonable to assume swipe works given the underlying slider is JS-transform-driven like the
existing `BestsellersCarousel`, but this is an inference, not a directly confirmed observation.

## Product information / buy box

- **Title:** `[Phiên Bản Mới] Dầu Tắm Hạnh Nhân` (the `<h1>`; note the page `<title>`/breadcrumb render
  a slightly different capitalization, "Dầu tắm Hạnh Nhân" — use the `<h1>` version as canonical).
- **No subtitle** text.
- **No compact rating/star summary near the title or price** — the only rating UI is the full review
  widget further down the page. Don't invent a rating badge next to the buy box; it doesn't exist here.
- **SKU:** exists in data (`29HD250A26`, from JSON-LD `sku` and `productjson.variants[0].sku`) but is
  **never rendered as visible page text** — confirmed by full `innerText` dump of `<main>`, no "SKU"
  or "Mã SP" label anywhere. `ProductInfo`/`DATA_MODEL` should carry `sku` as real data, but the
  component should not display it by default (an optional `showSku` prop is reasonable for future
  products that do show it publicly, but default false to match this page).
- **Price:** `890,000₫` — plain, no original/struck-through price on this SKU (`compare_at_price: 0`
  in the Haravan config, i.e. no discount registered here despite the "Ưu đãi web" collection framing).
  Format: comma-thousands, `₫` suffix, matches `wd.formatmoney: '{{amount}}₫'`.
- **Variant selector ("Dung tích"):** a **real native `<select class="single-option-selector">`**
  inside `<div class="selector-wrapper"><label>Dung tích</label><span class="custom-dropdown">…</span></div>`,
  with a small edit/pencil affordance icon overlaid. Confirmed via DOM: on this SKU it currently has
  **exactly one `<option value="250 ml">250 ml</option>`** — despite the product's display name/URL
  saying "250ml/500ml", the 500ml size is sold as a **completely separate product page**
  (`dau-tam-hanh-nhan-almond-shower-oil-500ml`, priced 1,490,000₫ — confirmed via the real product
  data already in `root-8a5edab2/BestsellersCarousel.tsx`), not a second option on this SKU. Build
  `VariantSelector` as a genuine multi-option-capable `<select>`-driven component (so it's correct
  for any future multi-variant product) but seed it with this product's real single-option data —
  do not fabricate a working 500ml option on this specific product page.
- **Quantity stepper:** `Số lượng:` label + `− [n] +`. Confirmed working: 2 clicks on `+` took the
  count from 1 → 3. No visible UI-enforced max (backend `inventory_quantity: 147` isn't surfaced to
  the stepper). Implement with a floor of 1, no hardcoded ceiling.
- **Promo/voucher UI ("Mã khuyến mãi"):** a bordered box containing a chip button (ticket icon +
  "Giảm 5%") and a "Xem tất cả" (view all) link. Clicking "Xem tất cả" opens a **centered modal**
  titled "Mã khuyến mãi" with an × close button, listing voucher cards: gift-circle icon, bold title
  "Giảm 5% tối đa 150k" (5% off, capped at 150k), subtext "Cho đơn hàng tối thiểu 1,500k" (min order
  1,500k), "HSD: 31/08/2026" (expiry), "Chi tiết" (details) link, and a dark filled "Sao chép" (copy
  code) button. Model as an array (`promoCodes: {label, description, minOrder, expiry, code}[]`) even
  though only one exists for this product.
- **Wishlist:** heart icon top-right of the gallery (not inline with the title/price). Clicking it
  fills the heart solid **and increments the SiteHeader wishlist badge** (confirmed 0 → 1 live) — a
  real cross-component effect. `ProductActions`' wishlist toggle needs to update whatever shared
  wishlist-count mechanism `SiteHeader`/`MobileBottomNav` already expose (check their current props/
  state before adding a new one — if none exists yet, a minimal shared client-side count is the
  right scope, consistent with "local/mock frontend state" guidance).
- **Add to Cart ("THÊM VÀO GIỎ HÀNG", outlined):** on the live site this is a real form submit that
  **navigates to a full separate `/cart` page** (not a drawer/toast) and updates the header cart badge
  (confirmed 0 → 3 for qty 3). Building a full real cart/checkout page is explicitly out of scope
  ("Do not attempt to reproduce private checkout/account systems"). **Recommendation:** implement Add
  to Cart as a **local mock action** — increment a shared/local mock cart-count badge (same pattern as
  wishlist) plus a lightweight on-page confirmation (e.g. a toast), without navigating to a real cart
  page. This is a deliberate scope decision, documented here rather than left implicit.
- **Buy Now ("MUA NGAY", dark filled):** not clicked live (would proceed toward real checkout) — assume
  the same local-mock semantics as Add to Cart, visually differentiated only by using the existing
  dark-filled primary button treatment already used elsewhere in this codebase (e.g. `FilterSortPanel`'s
  "Áp dụng").
- **Share row:** 5 icons — Facebook, Messenger, Twitter/X, Pinterest, generic copy-link (teal chain
  icon) — real public share-intent URLs (`facebook.com/sharer`, `m.me/…`, `twitter.com/intent/tweet`,
  `pinterest.com/pin/create`) plus copy-to-clipboard. Safe to implement faithfully (no auth needed).
- **Shipping/service messaging:** **not present** in the buy box on this PDP. The only shipping-related
  copy on the page is inside the shared `FeedbackStrip` section further down ("GIAO HÀNG MIỄN PHÍ" /
  free shipping ≥1,500,000₫ tile) — that's the same 6-tile grid already used on `/` and
  `/collections/all`, reused verbatim, not a PDP-specific component. No new shipping-message component
  needed.

## Content section ("MÔ TẢ SẢN PHẨM" / "Chi tiết sản phẩm")

**This is one single expandable block, not separate tabs/accordion items.** Real content, 5 numbered
subsections inside one HTML blob:
1. **THÔNG TIN CHUNG** (general info — origin, brand, volume, shelf life, responsible entity)
2. **THÀNH PHẦN** (ingredients / INCI list)
3. **ĐỐI TƯỢNG SỬ DỤNG** (target skin type — "Mọi loại da" = all skin types)
4. **CÔNG DỤNG** (benefits)
5. **HƯỚNG DẪN SỬ DỤNG** (usage instructions — also names the 2 real companion products used for
   ProductRecommendations, see below)

**Truncation:** desktop clips the block at a fixed height (~460px, ending mid-way through section 4)
behind a centered outlined pill button "Xem thêm nội dung +". Clicking expands to full height and the
button becomes "Rút gọn -" (collapse), confirmed both directions. **No gradient/fade mask** at the
clip edge — it's a hard `overflow:hidden` cut.

**Mobile-only outer accordion:** at ≤ the site's mobile breakpoint, the same content is wrapped in an
*additional* accordion (`div.tab-mobile.hidden-sm.hidden-md.hidden-lg`, class `active-show` = expanded
by default) headed "Chi tiết sản phẩm" with a down-chevron toggle button. So mobile has a **nested
two-level collapse**: outer accordion (open by default, mobile-only) containing the same inner
"Xem thêm nội dung +" truncation. Desktop has only the inner truncation, no outer accordion header.

**No separate sustainability, product-story, or dedicated media sections** exist on this PDP beyond
the gallery's own marketing-claim slides — don't fabricate these.

**Recommendation for `ProductAccordion`:** design the component to support both a `mode: "single"`
(one truncate/expand block — what's actually used here) and `mode: "accordion"` (classic multi-item,
for future products with real separate tabs) via the same `items: {title, content}[]` prop shape, so
a future product with genuinely separate Ingredients/Usage tabs is a prop change, not a rewrite. Wire
up `mode="single"` for this product since that's what's real.

## Reviews

Widget is real (not hidden), but genuinely empty — and this is a **verified site-wide state**, not
missing data for this one SKU: the page's own JS config sets `reviewtype: "none"`, meaning the reviews
app is effectively disabled/empty store-wide.

- Header "Đánh giá sản phẩm", 5 outline stars (all unfilled), caption "Dựa trên 0 đánh giá".
- Two outlined pill buttons top-right: "Viết đánh giá" (speech-bubble icon) and "Đặt câu hỏi" (edit
  icon).
- Tabs: "Đánh giá  0" / "Câu hỏi & trả lời  0" (active tab underlined).
- Clicking "Viết đánh giá" reveals an **inline expanding form** directly below the tabs (not a modal):
  a 3-column row (Tên / Email / Số điện thoại), then a 5-star interactive rating input (defaults to
  all 5 stars highlighted), "Tiêu đề đánh giá" text input, "Nội dung" textarea, and a "Video (không
  bắt buộc)" optional field (paste a YouTube link or upload). Did not scroll further / submit — no
  fake data entered per task constraints.
- **Recommendation:** build `ProductReviews` rendering this exact real empty-state shell (star row,
  caption, tabs, write-review/ask-question buttons, and the inline write-review form fields) rather
  than fabricating sample reviews — that's what actually exists on the live page.

## Recommendations ("Gợi ý")

Heading renders with prev/next carousel-arrow chrome but **zero product cards** — confirmed by the
page's own config: `checkproductrelated: "false"`, `typerelated: ""`. This is a deliberate store
setting (product-relation recommendations disabled sitewide), not a loading bug or missing data —
re-verified on a fresh navigation.

**Resolution (per PDP_SELECTION.md):** seed `ProductRecommendations` with the two real companion
products this product's own usage instructions name by name — "Dầu Dưỡng Thể Hạnh Nhân (Almond Supple
Skin Oil)" and "Kem Dưỡng Ẩm Săn Chắc Da Hạnh Nhân (Almond Milk Concentrate)" — both already exist as
real catalog entries (slug/name/image/price, assets already downloaded) in
`root-8a5edab2/BestsellersCarousel.tsx`. **Must reuse the existing `ProductCard` + `ProductGrid`
components from `collections-all-acd0b3f1/`** (same `Product` type: slug/sku/name/image/volume/price/
originalPrice) — confirmed 1:1 reusable, no new card component needed.

## Mobile-specific

- **No sticky/fixed Add-to-Cart bar.** Verified via computed style: the button container holding
  "THÊM VÀO GIỎ HÀNG"/"MUA NGAY" is `position: relative`, not fixed or sticky, at every ancestor level
  checked. It scrolls away normally with the page. (An earlier screenshot taken mid-scroll made it
  *look* pinned purely by coincidence of scroll position — do not build a sticky ATC bar, it isn't real.)
- **MobileBottomNav is present** on this PDP template at 390px and 768px (same fixed `z-index: 1110`
  bar, "Trang chủ / Tư vấn / Giỏ hàng" — already built in `shared/MobileBottomNav.tsx` for `/` and
  `/collections/all`). Reuse as-is, no PDP-specific changes.
- **Qty stepper + Share row layout differs by breakpoint:** desktop stacks them as two separate
  full-width rows in this order — Số lượng row → Mã khuyến mãi box → CTA buttons → Chia sẻ row (share
  is last, below the CTAs). Mobile **combines qty stepper and Chia sẻ onto the same row** (qty left,
  share right), positioned directly above the Mã khuyến mãi box. A real, deliberate mobile-only
  compaction — implement via a responsive flex layout change, not a different component.
- **Gallery** keeps the same slide-0-gift-panel / other-slides-full-width behavior down to 390px.
