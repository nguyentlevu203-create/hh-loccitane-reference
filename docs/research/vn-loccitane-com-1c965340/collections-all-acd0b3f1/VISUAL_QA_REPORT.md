# Visual QA Report — /collections/all

Compared https://vn.loccitane.com/collections/all (source) against http://localhost:3000/collections/all (local) at 1440×1000, 768×1024, 390×844. Also regression-tested `/` (homepage) at the same 3 viewports after adding `MobileBottomNav` and the `FloatingActions`/`SiteHeader` prop changes.

## Result: PASS — no P0/P1 found, one accepted P2, homepage regression clean.

## Findings

| # | Severity | Area | Description | Resolution |
|---|---|---|---|---|
| 1 | P2 | Header | Source header includes a Vietnam-flag language selector dropdown next to the account icon; the cloned `SiteHeader` (shared, unchanged from Phase 1 homepage baseline) doesn't have one. | Not fixed — pre-existing gap in the shared `SiteHeader` component inherited from the homepage baseline, out of scope to alter for this page per "do not refactor unrelated components." |
| 2 | P2 | Product card badge | Source's sale badge has a diagonal corner (top-left + bottom-right rounded, others square, via `border-radius: 5px 0`); local uses a simpler `rounded-tl-sm rounded-br-sm` approximation. | Accepted — negligible visual difference at card scale, documented in the spec as an accepted trade-off. |
| 3 | — | Quick View hover trigger | Source's hover-reveal quick-view button didn't visibly trigger under synthetic Playwright hover during recon (see BEHAVIORS.md), but the modal itself works identically once opened. Local implementation uses the same hover-reveal pattern as the existing homepage `BestsellersCarousel`, confirmed working in local testing (real click after hover reveals the button correctly). | No discrepancy — local quick-view hover + modal verified working via manual test screenshots. |

## Verified matches (screenshot-compared)

- Desktop 1440: header (light/scrolled state, matches source's `tp-collection` template behavior), breadcrumb, H1, "Hiển thị 20 trên 304" toolbar text, 4-column product grid, card styling (image, wishlist heart, title, price), filter/sort drawer (550px right panel, chip styles, accordion expand, sticky footer), quick-view modal (image + details layout, SKU/stock badge, variant chip, stepper, add-to-cart button).
- Tablet 768: 3-column grid, header row layout, mobile bottom nav visible.
- Mobile 390: 2-column grid, full-width filter sheet, mobile two-row header, mobile bottom nav.
- Homepage regression (`/`) at all 3 viewports: hero, header (dark/transparent unscrolled state — confirmed `forceScrolled` prop change did not affect homepage default), bestsellers carousel, category grid, promo slider, refills banner, membership perks, feedback strip, footer all rendered identically to the pre-existing baseline. New `MobileBottomNav` appears correctly at 390/768 and is hidden at 1440. `FloatingActions` repositioned to clear the new bottom nav on mobile/tablet (`bottom-[70px] lg:bottom-6`) with no overlap.

## Interaction behaviors verified locally

- Filter/sort panel: opens via "Bộ Lọc", chip selection toggles (single-select sort, multi-select filters), "Xem thêm"/"Rút gọn" expand/collapse, "Làm mới" resets, "Áp dụng" applies and closes, backdrop present.
- Product grid: "Xem thêm" load-more button appends the next batch of mock products (client-side slice, matches source's confirmed AJAX-append behavior without a real backend).
- Quick View: opens centered modal with correct product data, quantity stepper works, close via × and backdrop.
- Wishlist heart: toggles local state per card.
- Mobile bottom nav: renders on `/` and `/collections/all`, hidden ≥1024px, "Trang chủ" active only on `/`.

## Build validation

`npm run check` (lint + typecheck + build): **clean**. 0 errors, 7 pre-existing `no-img-element` warnings (unchanged from before this work, all in Phase 1 homepage files). Both `/` and `/collections/all` prerender as static routes.
