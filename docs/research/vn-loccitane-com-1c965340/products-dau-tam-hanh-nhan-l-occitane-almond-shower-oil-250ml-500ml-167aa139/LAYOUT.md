# Layout Architecture — Product Detail Page (Almond Shower Oil)

## Page skeleton (top to bottom)

1. `AnnouncementBar` (shared, sticky top) — reused as-is, same dismissible copy pattern.
2. `SiteHeader` (shared) — reused, `forceScrolled` (same as `/collections/all`, see BEHAVIORS.md).
3. `<main>`
   - `ProductBreadcrumbs`: "Trang chủ / Ưu đãi web - Nhóm áp dụng voucher / [Phiên Bản Mới] Dầu Tắm Hạnh Nhân" — same simple text-row-with-`/`-separator pattern as `/collections/all`'s breadcrumb (font-size ~13px, `text-foreground`), `Trang chủ` links to `/`, middle crumb links to its collection, last crumb plain text.
   - Two-column product hero row (desktop/tablet ≥ some breakpoint; stacks to 1 column on mobile):
     - **Left: `ProductGallery`** (main image + gift-tile side panel on slide 0 only) + `ProductThumbnails` strip below it.
     - **Right: `ProductInfo` column**, top to bottom:
       1. Wishlist heart (top-right, floats above/beside the gallery on desktop — actually positioned top-right of the *gallery* image itself, not the info column; see screenshots)
       2. Title (`<h1>`)
       3. `ProductPrice` ("Giá:" label + price)
       4. `VariantSelector` ("Dung tích:" + select)
       5. `QuantitySelector` ("Số lượng:" + stepper) — combined with `Chia sẻ` share row on mobile only
       6. Promo/voucher box ("Mã khuyến mãi" + chip + "Xem tất cả")
       7. `ProductActions` (Add to Cart + Buy Now, side by side)
       8. Share row ("Chia sẻ:" + icons) — last on desktop, merged into row 5 on mobile
   - `ProductAccordion` ("MÔ TẢ SẢN PHẨM" / mobile: "Chi tiết sản phẩm") — full width below the hero row.
   - `ProductReviews` — full width, below the accordion.
   - `ProductRecommendations` ("Gợi ý") — full width, below reviews, reusing `ProductGrid`/`ProductCard`.
4. `FeedbackStrip` (shared homepage/collections section, "Giúp chúng tôi phục vụ bạn tốt hơn!") — reused as-is, unchanged.
5. `SiteFooter` (shared) — reused as-is.
6. `FloatingActions` (shared, Zalo/Phone/Messenger) — reused as-is.
7. `MobileBottomNav` (shared) — reused, same as `/` and `/collections/all`.

## Container / grid system

- Outer container: same `max-width: 1200px` system already established for `/collections/all` — no
  new container width introduced.
- Hero row: 2 columns (gallery / info) roughly equal width on desktop/tablet, single column
  (gallery on top, info below) on mobile — implement as `grid-cols-1 lg:grid-cols-2` (adjust the exact
  breakpoint against RESPONSIVE.md's tablet screenshot, which still shows 2 columns at 768px, so the
  stack likely happens below `md`/`768px`, i.e. closer to `sm`).
- Accordion / Reviews / Recommendations sections: full container width, single column, matches the
  existing `/collections/all` full-width section pattern (e.g. `FeedbackStrip`).

## Sticky / fixed / z-index layers

- `AnnouncementBar`, `SiteHeader`: unchanged from existing chrome (same z-index scheme already used).
- **No PDP-specific fixed/sticky element** — confirmed no sticky Add-to-Cart bar exists (see
  BEHAVIORS.md). The promo-code "Xem tất cả" modal is a standard centered modal overlay (not a
  drawer) — implement with the same modal pattern already used for `QuickViewModal`
  (`fixed inset-0` backdrop + centered `bg-white rounded` panel), reusing that visual language rather
  than inventing a new modal style.
- `MobileBottomNav`: fixed bottom, `z-index: 1110` — same as existing implementation, unchanged.
- `FloatingActions`: fixed bottom-right — same as existing implementation, unchanged.

## Dependencies between sections

- `ProductGallery` owns its own `activeIndex` state (which of the 6 slides is showing, and whether the
  gift-tile panel is visible — visible only when `activeIndex === 0`).
- `VariantSelector` owns the selected variant (single-option here, but shaped as `variants[]` +
  `selectedVariantId` for future multi-variant products); changing variant would, on a real
  multi-variant product, update price/image — not observable on this SKU since only 1 option exists,
  document this as inferred-but-unverified default wiring, not a confirmed live-page observation.
- `QuantitySelector` owns local qty state, read by `ProductActions` when Add to Cart / Buy Now fires.
- `ProductActions`' Add to Cart / Buy Now are **local mock actions** (see BEHAVIORS.md) — they should
  update a shared mock cart-count value (consumed by `SiteHeader`'s cart badge and
  `MobileBottomNav`'s "Giỏ hàng" badge) rather than navigate to a real `/cart` route.
- Wishlist heart toggle updates a shared mock wishlist-count value (consumed by `SiteHeader`'s
  wishlist badge) — same mechanism shape as the cart count above; check whether `SiteHeader`/
  `MobileBottomNav` already expose a count prop/context to hook into before adding a new one.
- `ProductAccordion`'s truncate/expand state is local, independent of the mobile outer-accordion's
  open/closed state (they're nested, not the same toggle — see BEHAVIORS.md).
- `ProductRecommendations` reads from a small local array of the 2 real companion products (see
  DATA_MODEL.md / ASSETS.md) — no dynamic "related products" logic needed since the live site itself
  has this disabled.
