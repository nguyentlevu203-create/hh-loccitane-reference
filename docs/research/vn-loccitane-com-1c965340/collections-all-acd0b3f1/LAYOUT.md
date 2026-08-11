# Layout Architecture — /collections/all

## Page skeleton (top to bottom)

1. `AnnouncementBar` (shared, sticky top) — reused as-is.
2. `SiteHeader` (shared) — reused, with `forceScrolled` behavior for this template (see BEHAVIORS.md).
3. `<main>`
   - Breadcrumb: "Trang chủ / Tất cả sản phẩm" — `font-size: 13px; color: #3f2b2e`, simple text row with `/` separator, `Trang chủ` links to `/`, current page plain text.
   - `CollectionHeader`: H1 "Tất cả sản phẩm" — `font-size: 40px; font-weight: 600; line-height: 56px; font-family` matches the existing serif heading font (`--font-cormorant`/`--font-sans` token — reuse, don't add a new font).
   - `CollectionToolbar`: result count text ("Hiển thị 20 trên 304") left-aligned, "Bộ Lọc" filter button right-aligned, same row.
   - `FilterPanel` / `MobileFilterDrawer` (same component, responsive width — see BEHAVIORS.md): off-canvas, only rendered/visible when open.
   - `ProductGrid`: CSS grid, container max-width ~1170px (centered, matches the site's `.container` = 1200px minus padding), 4 fixed-width columns × 15px gap on desktop.
   - Load-more `Button` centered below the grid.
4. `FeedbackStrip` (shared homepage section — the "Giúp chúng tôi phục vụ bạn tốt hơn!" NPS block also appears on this collection page, unchanged) — reuse as-is, this is the same component already built for the homepage.
5. `SiteFooter` (shared) — reused as-is.
6. `FloatingActions` (shared, Zalo/Phone/Messenger) — reused as-is.
7. `MobileBottomNav` (shared, new) — reused, mounted on both `/` and `/collections/all`.

## Container / grid system

- Outer container: `max-width: 1200px` (`.container`), inner content row `max-width: 1170px` (`.top-collection`/`.container` padding).
- Product grid: CSS Grid, `grid-template-columns: repeat(4, 1fr)` conceptually (observed as 4 fixed 281.25px tracks in a 1170px-ish content row), `gap: 15px` both axes.
- Breakpoints (see RESPONSIVE.md): 4 cols desktop, 3 cols tablet (768px), 2 cols mobile (390px).

## Sticky / fixed / z-index layers

- `AnnouncementBar`: sticky, `z-50` equivalent (matches existing homepage token usage).
- `SiteHeader`: fixed, sits below announcement bar via `offsetTop` (reuse existing `SiteChrome` composition unchanged).
- `FilterPanel`/`MobileFilterDrawer`: fixed right-anchored panel, `z-index: 99997` (very high in source — implement as the highest z-layer in this page, above header/backdrop).
- Filter backdrop: fixed full-viewport, `z-index: 1040`, `opacity 0.5` black.
- `MobileBottomNav`: fixed bottom, `z-index: 1110`.
- `FloatingActions`: fixed bottom-right (existing, unchanged, sits above bottom nav visually since bottom nav is only on mobile/tablet and floating actions are already positioned `bottom-6 right-6` clear of the 50px-tall bottom nav — verify no overlap at 390px when both build).

## Dependencies between sections

- `MobileFilterDrawer`/`FilterPanel` open state is owned by the `/collections/all` page component (or a small client wrapper), same pattern as the homepage's `menuOpen` state for `OffCanvasNav`.
- `ProductGrid` reads from a local mock product array (extended dataset, ~40+ items to support demonstrating "load more" meaningfully — real catalog of 304 is out of scope, mock data only per template defaults).
- `MobileBottomNav`'s active-item highlight should reflect the current route (`/` vs other) — since this is a Next.js app, use `usePathname()`.
