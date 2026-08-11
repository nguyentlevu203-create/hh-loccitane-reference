# ProductCard Specification

## Overview
- **Target file:** `src/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/ProductCard.tsx`
- **Screenshots:** `desktop-1440-toolbar-viewport.png` (grid), `desktop-1440-card-hover.png`, `desktop-1440-quickview.png`
- **Interaction model:** click (→ PDP, out of scope, use `#`/local product slug placeholder) + hover-reveal quick-view + click wishlist toggle

## DOM Structure
`<div>` card: image wrapper (image + wishlist heart button, top-right, always visible + hover-reveal quick-view button, centered over image) → title (2-line clamp) → variant/size text → price block (current + optional struck original).

## Computed Styles

### Card container
- backgroundColor: neutral card bg (reuse `bg-card` token, matches `#f8f4ef`-ish)
- borderRadius: small (~5px, matches existing `BestsellersCarousel` card radius — reuse `rounded-[5px]` for consistency)
- Image area: square-ish aspect ratio (`aspect-square`), `object-fit: contain` on a light neutral backdrop (matches existing carousel pattern)

### Title
- fontSize: 21px, fontWeight: 500, fontFamily: serif heading token, lineHeight: 29.4px, color: #3f2b2e
- NOTE: 21px is the source's full PDP-ish card title size — cross-check against screenshot proportions; if it visually reads closer to the existing `BestsellersCarousel` card title (`text-sm`), prefer matching the grid screenshot's actual rendered proportion (~15-16px) over the raw computed value, since the computed value was captured on a related-products slider block elsewhere on the page (see caveat in BEHAVIORS.md about duplicate `.product-block` nodes) — verify against `desktop-1440-toolbar-viewport.png` during build and adjust down to `text-base`/`text-sm` if 21px renders too large relative to the reference screenshot.

### Price
- Regular: `font-size: 14px; font-weight: 400; color: #3f2b2e` (foreground, NOT destructive/red — differs from `BestsellersCarousel`)
- Sale current price: `font-size: 16px; font-weight: 500; color: #3f2b2e`
- Sale original (struck): `<del>`-equivalent, `font-size: 13px; color: #888888; text-decoration: line-through`

### Wishlist heart icon
- Always visible (not hover-gated): `position: relative` within a small top-right-anchored button, `width/height: 25px`, `color: #3f2b2e`. Reuse existing `HeartIcon` from `shared/icons.tsx`.

### Sale badge (only when `originalPrice` present)
- Top-left of image, `background: #3f2b2e; color: #fff; font-size: 12px; padding: 0 4px; border-radius` — approximate as `rounded-tl-sm` (small top-left rounding is the dominant visible feature; exact diagonal corner shape is a P3 nicety, skip).
- Content: `-{percent}%` computed from `(1 - price/originalPrice) * 100`, rounded.

### Quick view trigger
- Hover-revealed button + small search icon (reuse `shared/images/quick-view-icon.svg`, already downloaded for the homepage carousel — reuse the same asset, don't re-download), centered over the image, `opacity-0 group-hover:opacity-100 transition-opacity duration-200` (same pattern already used in `BestsellersCarousel.tsx`'s quick-view overlay — mirror it exactly for consistency).

## States & Behaviors

### Hover (desktop)
- **Trigger:** `:hover` on card (`group` class + `group-hover:` variants).
- **Before:** quick-view icon `opacity-0`.
- **After:** quick-view icon `opacity-100`.
- **Transition:** `opacity 200ms ease` (matches existing carousel pattern).

### Click wishlist heart
- Toggles a local `wishlisted` boolean (no backend) — optionally swap `HeartIcon` fill state (outline → filled) for visible feedback; not confirmed from source screenshots (heart never appeared filled during testing) but is a reasonable, low-risk UX completion since the button exists and needs *some* visible click feedback. Keep simple: toggle a `fill-current` class when active.

### Click quick-view button
- Opens `QuickViewModal` with this card's product data (owned by parent `ProductGrid` or a shared modal-state context — simplest: `ProductGrid` holds `quickViewProduct: Product | null` state, passes an `onQuickView` callback down to each card).

## Text Content
Product data comes from the mock catalog (`products.ts` in this page's namespace) built from real extracted names/prices/images — see LAYOUT.md for the 20-item source list already downloaded to `public/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/images/`.

## Responsive Behavior
- Card itself has no internal responsive changes — the **grid** controls column count (2/3/4 — see RESPONSIVE.md); the card just fills its grid cell at all widths.
