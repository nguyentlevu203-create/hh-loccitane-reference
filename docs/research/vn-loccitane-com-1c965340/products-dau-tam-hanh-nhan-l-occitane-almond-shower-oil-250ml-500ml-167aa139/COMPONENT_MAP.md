# Component Map — Product Detail Page (Almond Shower Oil)

Each entry is implementable directly from this spec + BEHAVIORS.md/LAYOUT.md/DATA_MODEL.md. Reuse
existing shared components/tokens wherever noted — do not redesign chrome already built in Phase 1/2.

## ProductBreadcrumbs
- **Props:** `items: {label: string; href?: string}[]` (last item has no `href`, rendered plain).
- **Renders:** same simple text-row-with-`/`-separator pattern already used on `/collections/all`'s
  breadcrumb (~13px, `text-foreground`, `Trang chủ` always first and links to `/`).
- **Real content:** `["Trang chủ" → "/", "Ưu đãi web - Nhóm áp dụng voucher" → "/collections/nhom-ap-dung-voucher", "[Phiên Bản Mới] Dầu Tắm Hạnh Nhân"]`.
- **States:** none (static).

## ProductGallery
- **Props:** `images: string[]`, `giftPanel?: {threshold: string; caption: string}[]`, `productLabel?: string` (e.g. "250ml" shown as a caption under the main image on slide 0).
- **Renders:** main image area (square-ish, `object-fit: contain` on light neutral bg, matches `ProductCard` image treatment) + prev/next arrow buttons pinned to the gallery's left/right edges.
- **Real content:** 6 real images (see ASSETS.md), gift panel only rendered when `activeIndex === 0`.
- **States:** `activeIndex` (0-5). Arrow click advances/retreats `activeIndex` (implement as inline slide swap — see BEHAVIORS.md's note on simplifying vs. the live site's fullscreen-lightbox-on-arrow-click quirk, which is P2/optional).
- **Interaction:** clicking a thumbnail (via `ProductThumbnails`) sets `activeIndex` directly.

## ProductThumbnails
- **Props:** `images: string[]`, `activeIndex: number`, `onSelect: (i: number) => void`.
- **Renders:** horizontal row of 6 thumbnails (~80-90px square), active one visually highlighted (border), scrolls horizontally at narrow widths rather than wrapping (confirmed at 390px).
- **States:** hover (cursor), active (border/opacity highlight on the selected thumbnail).

## ProductInfo
- **Props:** `name: string`, composes `ProductRating`, `ProductPrice`, `VariantSelector`, `QuantitySelector`, promo box, `ProductActions`, share row as children/sub-props (or accept the full `ProductDetail` object and destructure internally — simplest given how many sibling fields it needs).
- **Renders:** `<h1>` title, then the stacked rows described in LAYOUT.md, with the mobile-only row-merge (qty + share) implemented via a responsive class change, not a separate mobile component.

## ProductRating
- **Props:** `average: number`, `count: number`.
- **Real content:** `average: 0, count: 0` — 5 outline stars, no fill, caption "Dựa trên 0 đánh giá". **Not rendered near the title/price on this product** (BEHAVIORS.md confirms no compact rating badge in the buy box) — this component is only actually used inside `ProductReviews`' header, not in `ProductInfo`. Keep it a standalone component since a future product might show a compact version near the price, but don't wire it into `ProductInfo` for this product.

## ProductPrice
- **Props:** `price: string`, `originalPrice?: string`, `label?: string` (defaults to "Giá:").
- **Renders:** label + price (bold, large). Sale layout (struck original + current) exists for parity with `ProductCard`'s pattern but isn't exercised on this product (`originalPrice` undefined here — `compare_at_price: 0`).

## VariantSelector
- **Props:** `optionLabel: string` (e.g. "Dung tích"), `variants: {id, value, price, sku, available}[]`, `selected: string`, `onChange: (value: string) => void`.
- **Renders:** `<label>{optionLabel}:</label>` + a real `<select>`-driven dropdown styled to match the source's `.custom-dropdown` look (bordered box, small edit-icon affordance — see ASSETS.md for the optional icon asset). Build as a genuine controlled `<select>` so it's correct for future multi-variant products.
- **Real content:** single option, "250 ml" / 890,000₫ / sku 29HD250A26 / available.
- **States:** disabled/unavailable option styling exists in the type shape (`available: boolean`) even though not exercised here.

## QuantitySelector
- **Props:** `value: number`, `onChange: (n: number) => void`, `min?: number` (default 1), `max?: number` (optional, no UI cap on the source).
- **Renders:** `−` button, numeric display/input, `+` button — confirmed working increment via live click test (1→3).
- **States:** `−` disabled at `min`.

## ProductActions
- **Props:** `onAddToCart: () => void`, `onBuyNow: () => void`, `addToCartLabel?` (default "THÊM VÀO GIỎ HÀNG"), `buyNowLabel?` (default "MUA NGAY").
- **Renders:** two side-by-side buttons, left outlined ("THÊM VÀO GIỎ HÀNG"), right dark-filled ("MUA NGAY") — same filled-button treatment already used elsewhere (e.g. `FilterSortPanel`'s "Áp dụng").
- **Behavior (deliberate scope decision, see BEHAVIORS.md):** both are **local mock actions** — update a shared/local mock cart-count (consumed by `SiteHeader`/`MobileBottomNav` cart badges) and show a lightweight confirmation (toast or inline state), rather than navigating to a real `/cart` page. Do not build a real cart/checkout page.

## Promo/voucher box + modal (part of `ProductInfo`, or a small `PromoCodeBox` if you prefer a named component)
- **Props:** `codes: ProductPromoCode[]`.
- **Renders:** bordered box, chip button per code (ticket icon + `label`), "Xem tất cả" link.
- **Modal:** clicking "Xem tất cả" opens a centered modal (reuse `QuickViewModal`'s modal shell pattern: `fixed inset-0` backdrop + centered white rounded panel + × close) titled "Mã khuyến mãi", listing each code as a card (gift-circle icon, `title`, `description`, `expiry`, "Chi tiết" link, "Sao chép" copy button).

## ShareRow (part of `ProductInfo`)
- **Props:** `url: string`, `label?: string` (product name, for share text).
- **Renders:** "Chia sẻ:" label + 5 icon links (Facebook, Messenger, Twitter/X, Pinterest, copy-link) — real public share-intent `href`s, safe to hardcode the URL templates.

## ProductAccordion
- **Props:** `sections: {heading: string; body: string}[]`, `mode?: "single" | "accordion"` (default `"single"`), `collapsedHeight?: number` (default ~460px), `mobileWrapped?: boolean` (default true — wraps in the extra "Chi tiết sản phẩm" toggle header below `md` breakpoint).
- **Renders (mode="single", this product):** heading ("MÔ TẢ SẢN PHẨM" desktop / "Chi tiết sản phẩm" + chevron on mobile, expanded by default) + the 5 real numbered sections rendered as plain text blocks, clipped to `collapsedHeight` behind a centered "Xem thêm nội dung +" pill button that toggles to "Rút gọn -" on expand — confirmed both directions via live click test.
- **Renders (mode="accordion", future use):** classic multi-item collapsible list, one section per item — not wired up for this product, but the prop shape supports it without a rewrite.

## ProductIngredients
- Not a separate component for this product — "THÀNH PHẦN" is just section 2 inside `ProductAccordion`'s single block (see BEHAVIORS.md: no separate ingredients tab exists on the live page). Keep `ProductIngredients` as a thin named export that's really just `ProductAccordion` with a single ingredients-only section, for API-shape parity with the task's requested component list, but don't build a visually distinct ingredients UI beyond what's real.

## ProductBenefits
- Same note as above — "CÔNG DỤNG" is section 4 inside the single accordion block, not a separate benefits component/section visually. Provide as a thin type-level concept, not a separate rendered UI block, to stay faithful to the real page.

## ProductReviews
- **Props:** `summary: {average: number; count: number}`, `items: [] ` (empty for this product).
- **Renders:** "Đánh giá sản phẩm" heading, `ProductRating` (5 outline stars + "Dựa trên {count} đánh giá"), "Viết đánh giá"/"Đặt câu hỏi" outlined pill buttons (top-right), tabs "Đánh giá {count}" / "Câu hỏi & trả lời {count}".
- **States:** clicking "Viết đánh giá" reveals an inline write-review form (Tên/Email/Số điện thoại row, 5-star input defaulting to 5, Tiêu đề, Nội dung textarea, optional Video field) — build the form UI for fidelity but it doesn't need to actually submit anywhere (no backend in scope); a local no-op submit handler is sufficient.

## ProductRecommendations
- **Props:** `products: Product[]` (same `Product` type as `collections-all-acd0b3f1/types.ts`).
- **Renders:** "Gợi ý" heading + prev/next carousel arrows (reuse `BestsellersCarousel`'s carousel mechanics/pattern) wrapping a `ProductGrid`/`ProductCard` reuse (**must reuse existing `ProductCard/ProductGrid` from `collections-all-acd0b3f1/`, do not build a new card** — confirmed 1:1 reusable type shape).
- **Real content:** 2 items — Almond Supple Skin Oil, Almond Milk Concentrate (see DATA_MODEL.md), both already-downloaded real assets.

## Reused as-is (no changes)
`SiteChrome`/`SiteHeader` (with `forceScrolled`), `OffCanvasNav`, `SiteFooter`, `FloatingActions`,
`MobileBottomNav`, `FeedbackStrip`, `shared/icons.tsx`, `ProductCard`, `ProductGrid` (for
recommendations), and all existing design tokens in `globals.css`.
