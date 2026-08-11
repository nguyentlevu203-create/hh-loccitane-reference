# QuickViewModal Specification

## Overview
- **Target file:** `src/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/QuickViewModal.tsx`
- **Screenshot:** `desktop-1440-quickview.png`
- **Interaction model:** click-driven (opened from `ProductCard`'s quick-view button)

## DOM Structure
Centered modal: backdrop + panel (image left, details right on desktop; stacks on mobile).

## Computed Styles
### Panel
- width: 900px (desktop; cap with `max-w-[900px] w-[90vw]` so it's responsive on mobile rather than a hardcoded 900px that would overflow small viewports — source's mobile quick-view behavior wasn't separately captured, so use standard responsive modal sizing: full-width minus margin on mobile, 900px cap on desktop)
- borderRadius: 8px
- background: #ffffff
- boxShadow: soft drop shadow (`shadow-xl`)
- padding: ~15px outer, generous internal spacing per screenshot

### Close button
- × top-right of panel, reuse `CloseIcon`/`CloseNavIcon` from `shared/icons.tsx`

### Stock badge ("Còn hàng")
- background: #38bf57 (green), color: #fff, borderRadius: 3px, padding: 2px 7px, fontSize: 11px

### Variant chip ("15ml")
- Reuse the same chip component built for `FilterSortPanel` (selected state: dark fill; here shown selected/active since it's the only/current variant)

### Quantity stepper
- `− [1] +` row, simple bordered box, reuse existing icon set or plain text `−`/`+` characters if no icon exists (acceptable for a minor control)

### Add to cart button
- "THÊM VÀO GIỎ" — dark filled button (`bg-foreground text-white`), full width of the details column, icon (bag/cart) + label. Reuse existing `CartIcon` from `shared/icons.tsx`.

### View details link
- "Xem chi tiết »" — plain text link below the add-to-cart button, links to the product's slug (mock `#`/`/products/{slug}` placeholder route, PDP is out of scope for this phase).

## States & Behaviors
- **Open:** triggered by `ProductCard`'s quick-view button, receives the clicked product's data as props.
- **Close:** × button, backdrop click.
- Quantity stepper: local `useState<number>`, min 1, +/- buttons increment/decrement.
- Add to cart: no real cart/backend — acceptable to no-op or show a local toast-free visual confirmation (e.g. temporarily disable button / no action needed beyond click handling; do not build a cart page).

## Text Content
- "SKU:" label + product SKU (mock, can reuse product slug as a stand-in SKU if no real SKU captured)
- "Còn hàng" (in stock)
- "Dung tích: {volume}" label above the variant chip
- "THÊM VÀO GIỎ"
- "Xem chi tiết »"

## Responsive Behavior
- Desktop: side-by-side image + details (900px cap).
- Mobile: stack image above details, modal width `90vw` or similar, not explicitly captured from source at 390px — use standard responsive modal conventions consistent with `OffCanvasNav`'s mobile-first sizing.
