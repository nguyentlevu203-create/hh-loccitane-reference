# Behaviors — /collections/all

Source: https://vn.loccitane.com/collections/all (Haravan-based storefront, theme classes `template-collection`, `tp-collection`)

## Header (shared chrome, template-level difference from homepage)

- The header component itself is the same as the homepage's `SiteHeader` (identical DOM/markup — hamburger, search, logo, account/location/wishlist/cart icons), **but on `tp-collection` pages it renders permanently in the "scrolled" (light) visual state**, even at `scrollY = 0`.
  - Confirmed via computed styles at scroll 0 and scroll 300: `backgroundColor: rgb(249,245,240)`, `height: 62px` in both cases — never the dark/transparent 72px hero-overlay state.
  - Reason: this page has no full-bleed hero video/image beneath the header (unlike the homepage), so the "unscrolled" dark-overlay-on-hero look would have nothing to overlay.
  - **Implementation:** extend `SiteHeader`/`SiteChrome` with an optional prop (e.g. `forceScrolled?: boolean`, default `false` so homepage is untouched) that skips the scroll listener and renders the scrolled visual state unconditionally. Pass `forceScrolled` from the `/collections/all` page only.
- Announcement bar behaves identically (dismissible, same copy "Gợi Ý Quà Tặng Rạng Rỡ Ngày Hè").

## Mobile bottom navigation bar (newly discovered GLOBAL SHARED component — missing from current homepage clone)

- Fixed bar, bottom of viewport, present on **both** the homepage and `/collections/all` on the live site (confirmed by checking https://vn.loccitane.com/ at 390px width).
- Not currently built in this codebase — this is a gap in the Phase 1 homepage clone, not a collections-page-specific pattern. Per the reuse instructions ("GLOBAL SHARED... mobile bottom navigation" is explicitly named), build it once as a shared component and mount it on **both** `/` and `/collections/all`, additively (no existing homepage markup removed/changed).
- 3 items: Trang chủ (home, href `/`), Tư vấn (consult — no href, opens the Zalo chat widget via JS on the live site; implement as a static button with a `console.log`-free no-op / local placeholder since backend chat isn't in scope), Giỏ hàng (cart, badge count "0").
- Computed styles: `position: fixed; bottom: 0; left: 0; width: 100%; height: 50px; background: #fff; box-shadow: 0 0 3px rgba(146,146,146,1) (top-ish ambient shadow); z-index: 1110; padding: 5px 10px`. Item text `color: #3f2b2e; font-size: 14px`. Active item (Trang chủ on `/`) gets an `active` class — treat as route-based active state (highlight whichever item matches the current pathname).
- **Responsive breakpoint:** visible at 390px and 768px, hidden at 1024px+ (`display:none`). Implement as `lg:hidden` (Tailwind `lg` = 1024px).

## Toolbar: Filter + Sort combined panel

**Interaction model: click-driven** (not scroll-driven). A single "Bộ Lọc" button opens one combined panel containing both sort options and filter facets — there is no separate sort dropdown control.

- Trigger: click "Bộ Lọc" button (desktop: `top-collection-info` toolbar, right-aligned; mobile: same button, full width toolbar row).
- **Desktop/tablet (≥ some breakpoint):** panel is a **right-side fixed drawer**. `position: fixed; top:0; right:0; width: 550px; max-width: 550px; height: 100vh; background: #fff; z-index: 99997; transition: 0.3s` (slides in from the right, likely via `transform: translateX()` toggled by a class — exact transform property wasn't captured mid-animation, implement as `translate-x-full` → `translate-x-0` with the same 550px width and 0.3s ease transition).
- **Mobile (390px):** panel becomes a **full-width sheet** (same right-anchored slide-in, but width = 100vw instead of 550px). Same internal content/structure as desktop.
- **Backdrop:** a separate fixed full-viewport black backdrop appears behind the panel: `background: rgb(0,0,0); opacity: 0.5; z-index: 1040` (lower than drawer's 99997, but visually behind since it doesn't overlap the drawer's own stacking context bounds). Clicking the backdrop is the expected way to dismiss (standard modal-backdrop pattern) in addition to the explicit close (×) button.
- Close: × button at top-right of the panel header ("LỌC SẢN PHẨM" heading + × button in a flex row).
- **Panel content, top to bottom:**
  1. Heading "LỌC SẢN PHẨM" + close ×
  2. "Sắp xếp theo:" (Sort by) — pill/chip button row, NOT a `<select>` or radio list. Options (in order): Bán chạy (best-selling), Mới nhất (newest — this is the default-selected state observed), Giá cao đến thấp (price high→low), Giá thấp đến cao (price low→high), A-Z, Z-A, Tồn kho: Giảm dần (stock descending). Wraps to a second row on desktop (last item alone on row 2).
  3. Divider
  4. "Loại sản phẩm" (Product type) — chip row, collapsed to 4 visible chips + "Xem thêm" (Show more) toggle button that expands to reveal the rest (observed 13 total categories after expanding: CHĂM SÓC CƠ THỂ, Ưu Đãi, CHĂM SÓC TÓC, TẮM & DƯỠNG THỂ, Ưu Đãi Cửa Hàng, CHĂM SÓC DA MẶT, Khác, Gift, KHÁC, NƯỚC HOA, KHÔNG GIAN SỐNG, "Deal Tháng 8", COMBO). Expand button label toggles "Xem thêm" ↔ "Rút gọn" (Collapse).
  5. Divider
  6. "Dung tích" (Volume/size) — same chip + "Xem thêm" pattern. Visible: 30ml, 50ml, 75ml, 150ml.
  7. Divider
  8. "Lọc giá" (Price range) — same chip + "Xem thêm" pattern. Visible: Dưới 1,000,000₫ / Từ 1,000,000₫-2,000,000₫ / Từ 2,000,000₫-3,000,000₫ / Từ 3,000,000₫-4,000,000₫.
  9. Sticky footer (pinned to bottom of the panel, not scrolling with content): "Làm mới" (Reset — outline button) + "Áp dụng" (Apply — filled dark button, wider/primary emphasis).
- **Chip visual states** (applies to both sort pills and filter chips — same component):
  - Unselected: `background: #fbf9f6; color: #3f2b2e; border: 1px solid #cccccc; border-radius: 5px; padding: 8px; font-size: 14px`.
  - Selected: `background: #3f2b2e; color: #fff; border-radius: 5px` (same padding/size). This is the same wine/foreground color used as `--foreground` / `--brand-wine` in `globals.css` — reuse the existing token, don't hardcode a new hex.
- **State/scope:** All filter/sort selection is local UI state for this clone (no backend catalog to actually filter against) — implement as client-side `useState` that toggles chip selection and, for demo purposes, can locally re-sort/filter the mock product array. "Áp dụng" closes the panel and applies the local state; "Làm mới" clears all selections.

## Product grid

**Interaction model:** static grid + click-driven pagination (see below). No scroll-driven behavior on the grid itself.

- Result count text above the grid: "Hiển thị 20 trên 304" (Showing 20 of 304) — updates after "Load more" (not verified exact text after click, but count of rendered cards was confirmed to go 20→40 after one click).
- **Pagination model: "Load more" button — confirmed empirically, not assumed.** Clicking "Xem thêm" at the bottom of the grid appends 20 more product cards via AJAX to the same grid (verified: card count went from 20 rendered/31 total-in-DOM to 40 rendered/51 total-in-DOM after one click; URL and scroll position unchanged — no full page navigation, no infinite scroll on mere scrolling). Button label/icon: "Xem thêm" + a small down-chevron SVG icon.
- Note: the live DOM also contains ~11 extra hidden `.product-block` elements unrelated to the main grid (a separate hidden carousel/slider elsewhere on the page, not the collection grid) — don't be misled by raw `.product-block` counts; the visible grid always renders in multiples of the 20-per-page batch.

## Product card

**Interaction model:** click-driven (navigates to PDP) + a quick-view affordance that exists in the DOM/CSS but did not visibly trigger via automated `:hover` in headless testing (see note below) — implement it as a hover-reveal button for parity with the existing homepage `BestsellersCarousel` pattern, since the markup, CSS transition, and a working `window.wd.theme.quickview(...)` handler all confirm the feature is intentional.

- Card structure: image (square-ish product shot on `#f8f4ef`-ish neutral card background), wishlist heart icon (top-right, **always visible**, not hover-gated — confirmed via computed styles: `display:block` in both hovered and non-hovered states), title (2-line clamp), variant/size line (e.g. "250ml") OR category label for gift sets (e.g. "Bộ Quà Tặng"), price.
- Sale badge: for discounted items, a small dark pill in the top-left corner of the image reading e.g. "-36%". `background: #3f2b2e; color: #fff; font-size: 12px; padding: 0 4px; border-radius: 5px 0` (diagonal corner rounding — top-left and bottom-right rounded, top-right/bottom-left square; safe to approximate as a simple small rounded badge, this exact diagonal shape is a P3-level nicety).
- Price: current price uses the **same foreground/wine color as everything else** (`#3f2b2e`), NOT red — this differs from the existing homepage `BestsellersCarousel`, which hardcodes `text-destructive` (red) for all prices. When there's a sale, the original price renders via a `<del>` element: `color: #888888; text-decoration: line-through; font-size: 13px`, and the current price is `font-size: 16px; font-weight: 500; color: #3f2b2e`. Regular (non-sale) price: `font-size: 14px; font-weight: 400`.
- Quick View: a "Xem nhanh" button + search-icon overlay, revealed on hover (CSS `opacity`/`visibility` transition, 0.3s). Clicking opens a **centered modal** (not a drawer): `width: 900px; border-radius: 8px; background: #fff; box-shadow: 0 0 10px rgba(0,0,0,1)` (i.e. a soft shadow, actual alpha likely lower than 1 — treat as a standard modal shadow, e.g. `shadow-xl`). Modal content: product image (left), title, SKU + green "Còn hàng" (in stock) badge (`background: #38bf57; color:#fff; border-radius:3px; font-size:11px; padding:2px 7px`), price, variant/volume selector chips (e.g. "15ml", same chip component as filters), quantity stepper (−/1/+), "THÊM VÀO GIỎ" (Add to cart) button, "Xem chi tiết »" (View details) link to the PDP. Close via × top-right of modal.
- **Hover-testing caveat:** synthetic Playwright `.hover()` on the card did trigger real `:hover` (confirmed via `element.matches(':hover') === true`) and did flip `opacity`/`visibility` on the quick-view/add-to-cart overlay elements, but `display` computed as `none` in both states, so nothing visibly rendered in the automated screenshot. This is most likely a `hoverIntent`-style JS gate that needs continuous real pointer movement rather than an instant synthetic hover, not a feature that's actually disabled — the quick-view modal itself works perfectly when triggered directly. Build the hover-reveal UI as designed; it's a reasonable, low-risk interpretation consistent with the existing homepage carousel's already-implemented hover quick-view icon.
- There is also a hover-revealed "Thêm vào giỏ" (Add to cart) button in some card layouts (inline within the price row, `position:absolute; bottom:-6px`) — this is Add-to-Cart, not Quick View, and is a separate affordance. Given cart/checkout is out of scope for this clone (no real backend), skip building this second hover button — Quick View + wishlist heart is sufficient coverage of the card's interactive surface for this phase.

## Responsive sweep summary

See RESPONSIVE.md for the full breakdown; key trigger points:
- Header layout: desktop/tablet row (icons+logo+search all in one row) down to ~640px, then stacks to the two-row mobile header (matches existing `sm:` breakpoint already used in `SiteHeader`).
- Product grid columns: 4 (desktop ≥1024px, fixed 281.25px columns in a 1170px container) → 3 (tablet 768px) → 2 (mobile 390px).
- Filter drawer: fixed 550px right panel (desktop/tablet) → full-width sheet (mobile).
- Mobile bottom nav: visible ≤ ~991px, hidden ≥ 1024px.
