# Behaviors — vn.loccitane.com homepage

## Global

### Header scroll transform (scroll-driven, class toggle)
- **Trigger:** `window.scrollY` crosses a threshold between 80px and 100px (measured ~90px). Site toggles class `hSticky hSticky-nav` on the header.
- **State A (top, scrollY < ~90):**
  - height: 72px
  - background-color: rgba(0,0,0,0.47) (transparent, overlays hero video)
  - box-shadow: 0 10px 90px 60px rgba(0,0,0,0.5) (soft dark gradient into hero for text legibility)
  - icon/text color: white
- **State B (scrolled, scrollY > ~90):**
  - height: 62px
  - background-color: rgb(249,245,240) (solid cream)
  - box-shadow: 0 0 6px 0 rgba(0,0,0,0.15)
  - icon/text color: dark brown rgb(63,43,46)
- **Transition:** `transition: all` (theme sets a generic all-transition; treat as ~250ms ease on background-color, box-shadow, height in the rebuild)
- **Implementation approach:** scroll listener toggling a boolean state class (not IntersectionObserver — simple `window.scrollY` threshold).
- Header itself is `position: fixed`, `top: 32px` (sits below the 32px announcement bar). Z-index 121+.

### Announcement bar
- `position: sticky`, height 32px, background `rgb(242,233,219)` (tan), sits above header.
- Single promotional link ("Gợi Ý Quà Tặng Rạng Rỡ Ngày Hè") + a dismiss (×) button that removes the bar (no rotation/carousel observed — only 1 slide present at test time, but build it as a single-item dismissible bar, collapsible via local state).

### Off-canvas navigation (click-driven, NOT scroll-driven)
- Triggered by the "Menu" hamburger button (`icon-menu`, sprite viewBox `0 0 16 16`) in the header, at ALL breakpoints (desktop, tablet, mobile) — there is no persistent horizontal nav bar anywhere.
- Panel width: 416px (desktop), slides in from the left over a dim overlay. Contains:
  1. Close button (`icon-close-nav`) + search button
  2. Primary nav list: "Tất Cả Sản Phẩm", "LỢI ÍCH VÀ ƯU ĐÃI ĐẶC BIỆT ✨", "BST SET VÀ QUÀ TẶNG", "Được Yêu Thích", then 4 categories ("Chăm Sóc Cơ Thể", "Chăm Sóc Da Mặt", "Chăm Sóc Da Tay", "Chăm Sóc Tóc") each with a trailing chevron "open" button that expands an accordion submenu, then "Dành Cho Nam", "Eco-Refills" (also expandable).
  3. Secondary list: "Tìm kiếm", "Điều khoản & điều kiện"
  4. Tertiary "Về chúng tôi" list with its own expand toggle, plus static links (Kỉ niệm 50 năm, Giá trị của chúng tôi, B Corp, Big Little Things, Sức khỏe & Làm đẹp, Chuỗi cung bền vững, Dịch vụ khách sạn, Quà tặng doanh nghiệp, L'Occitane Spa).
- **Implementation approach:** click toggles an `isOpen` state; panel translates in via CSS transform/transition (translateX(-100%) → translateX(0)); category rows toggle their own local `isOpen` state for the accordion submenu (chevron rotates 180deg).

### Search box
- Always visible inline in the header next to the hamburger (not a click-to-expand affordance) at desktop/tablet. On mobile it drops to its own full-width row below the icon row (see RESPONSIVE below).

### Floating action buttons (static, fixed)
- Two circular buttons fixed bottom-right: phone (`tel:0911024272`) and Messenger (`https://m.me/193955090673746`), stacked vertically, dark circle bg with white icon.
- A third-party Zalo chat-widget iframe also renders bottom-right (do NOT attempt to functionally clone this — build only the static circular Zalo icon button as a visual placeholder; no real chat backend in scope).

### Promo modal (session-based, click-driven dismiss)
- A "KHÁM PHÁ DIỆN MẠO MỚI" promo modal appeared once on a fresh session load, centered overlay with dim backdrop, dismissible via × icon (`icon-close-black`) or "Close" link. Did not reappear on subsequent navigations in the same session (session/cookie gated).
- Treat as optional/lower-priority: build a simple dismiss-once-per-session modal using `localStorage`, not required for core pixel-fidelity of the page flow.

## Section: Best-sellers carousel (`#section-h-top-product`)
- **Interaction model:** click-driven carousel (Next/Prev slide buttons), NOT scroll-driven and NOT auto-playing (no evidence of autoplay timer).
- 12 products total; visible slots per breakpoint: 4 (desktop 1440), 3 (tablet 768), 2 (mobile 390) — see RESPONSIVE.
- Card hover state: "Xem nhanh" (quick-view) magnifier icon overlay appears centered on the product image on hover (standard swiper/e-commerce reveal-on-hover pattern) — implement as `opacity 0 → 1` on `.group:hover`, transition ~200ms.
- Wishlist heart icon (`icon-heart-no-fill`) top-right of each card, static outline by default.

## Section: Promo carousel (`#section-home-pro-swipper`, "storytelling" banner)
- **Interaction model:** click-driven (Previous/Next slide text buttons showing the adjacent slide's title), 3 unique slides that loop: "Dầu Tắm Hạnh Nhân" → "Dầu Dưỡng Thể Hạnh Nhân" → "Tái Nạp, Tái Nạp Yêu Thương" → back to start.
- Controls row below the slide: `‹ {prevSlideTitle}` — `{currentIndex} / {total}` — `{nextSlideTitle} ›`.
- Each slide: full-bleed image (right or left, alternating) + heading + paragraph + "Khám phá ngay" link.
- No scroll-snap or autoplay observed; purely click to advance.

## Section: Category grid (`#section-category-2`)
- Static grid, no interactive state changes beyond standard link hover (browser default + no explicit custom hover transform observed in the sampled computed styles — treat image scale-on-hover as optional polish, not confirmed).

## Section: Membership perks (`#section-h-member-privilege`)
- Static 3-card row, each: image + heading + paragraph + "› " arrow link. No carousel behavior.

## Section: Feedback / services strip (between main and footer)
- Static: heading + paragraph + "Bắt đầu" CTA (external Typeform link) + 6 service tiles in a 3×2 grid (desktop), each tile is a full-card link with thumbnail + heading + paragraph.

## Footer accordion (RESPONSIVE-triggered structural change, not just reflow)
- **Desktop (≥1024px approx):** all 4 footer link columns (Company info, Thông tin, Chăm sóc khách hàng, Mạng xã hội) render fully expanded, no accordion chrome.
- **Tablet (768px) and Mobile (390px):** the SAME 4 groups render as accordion rows with a `+`/`-` toggle, collapsed by default, 2 columns wide at tablet and 1 column wide at mobile.
- **Implementation approach:** a single footer component that renders either static columns or `<details>`/accordion rows based on viewport width (CSS-only via `md:` breakpoint visibility toggling is acceptable — no JS breakpoint detection required since it's a pure display swap).

## RESPONSIVE (confirmed via live sweep at 1440 / 768 / 390)

### Header
- 1440 & 768: single row (hamburger + search | logo | account/store/wishlist/cart icons).
- 390: splits into two rows — icon row (hamburger, logo, flag, account, wishlist) on top; full-width search input as its own row below. Cart icon moves out of the header entirely into a new bottom tab bar.

### Bottom tab bar (mobile/tablet only — NEW element not present on desktop)
- Appears at ≤768px width: fixed bottom bar with 3 items — "Trang chủ" (home), "Tư vấn" (consult), "Giỏ hàng" (cart, with badge count). Not present at 1440px.

### Product grid / carousel visible columns
- Desktop 1440: 4 cards visible per row.
- Tablet 768: 3 cards visible per row.
- Mobile 390: 2 cards visible per row, arrow controls replaced by a swipe-progress bar.
- Same 4→3→2 pattern applies to the category grid tiles.

### Footer
- Desktop: benefit-strip 3×2 icon grid; loyalty/store banner 2 columns; 4 expanded link columns.
- Tablet: benefit-strip 2×3; loyalty/store banner stacks to 1 column; 4 link groups become a 2-column accordion.
- Mobile: link groups become a single-column accordion stack.

### Breakpoints (approximate, from observed layout shifts)
- Mobile → Tablet shift: ~640–768px
- Tablet → Desktop shift: ~1024px
