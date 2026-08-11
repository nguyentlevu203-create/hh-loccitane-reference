# MobileBottomNav Specification

## Overview
- **Target file:** `src/components/sites/vn-loccitane-com-1c965340/shared/MobileBottomNav.tsx` (GLOBAL SHARED — site-wide, not page-scoped; confirmed present on both `/` and `/collections/all` on the live site)
- **Screenshot:** `mobile-390-viewport.png`, `mobile-390-homepage-bottomnav-check.png`
- **Interaction model:** static (route-based active state) + click navigation

## DOM Structure
Fixed bottom bar, 3 items: Home / Consult / Cart, each icon + label stacked vertically.

## Computed Styles
### Bar container
- position: fixed; bottom: 0; left: 0; width: 100%; height: 50px
- background: #ffffff
- boxShadow: subtle ambient shadow (`0 0 3px rgba(146,146,146,1)` observed — implement as `shadow-[0_0_3px_rgba(146,146,146,0.5)]` or similar soft top shadow, e.g. Tailwind `shadow-[0_-1px_3px_rgba(0,0,0,0.1)]`)
- z-index: 1110 (use the app's next-highest z step after `FilterSortPanel`)
- padding: 5px 10px
- display: flex, justify-content: space-around, align-items: center

### Item
- color: #3f2b2e, fontSize: 14px (label), icon above label, `flex-direction: column`, `align-items: center`, `gap: ~2px`
- Active item (current route): visually distinguished — source applies an `active` class; since no distinct active color was captured, use a subtle treatment consistent with the rest of the app (e.g. `text-foreground` vs `text-muted-foreground` for inactive, or a small underline/dot) — pick the simplest option (bold or full-opacity vs. reduced-opacity for inactive) since exact active styling wasn't visually distinguishable in the captured screenshots.

## States & Behaviors
- Active state reflects current route via Next.js `usePathname()` — "Trang chủ" active on `/`, none of the 3 items correspond to `/collections/all` so no item is active there (matches source: only exact route matches get `.active`).
- "Trang chủ" → link to `/`.
- "Tư vấn" (Consult) → no real destination on source (opens a Zalo chat widget via JS, out of scope) — implement as a static button, `href="#"` or no-op click handler.
- "Giỏ hàng" (Cart) → badge count "0" (static, matches existing header cart badge convention already in `SiteHeader`), no real cart page — link to `#` or reuse the same non-functional pattern as the header's cart icon.

## Icons
- Home: new simple house-outline `HomeIcon` (add to `shared/icons.tsx`).
- Consult: new simple chat/headset-outline `ConsultIcon` (add to `shared/icons.tsx`) — source's icon looked like a person/consult bust icon; a simple chat-bubble or headset icon is an acceptable equivalent for a non-brand utility icon.
- Cart: reuse existing `CartIcon` from `shared/icons.tsx`.

## Text Content (verbatim)
- "Trang chủ", "Tư vấn", "Giỏ hàng"

## Responsive Behavior
- Visible at 390px and 768px, hidden at 1024px+ — implement as `lg:hidden` on the bar container.
- Mount in both `/` (homepage) and `/collections/all` page trees, additively — do not otherwise alter either page's existing JSX beyond adding this one new element at the end of the tree (same position as `FloatingActions`).
