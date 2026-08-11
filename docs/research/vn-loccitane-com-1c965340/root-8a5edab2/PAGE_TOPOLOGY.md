# Page Topology — vn.loccitane.com (`/`)

`site-key`: vn-loccitane-com-1c965340 · `page-key`: root-8a5edab2

## Layers (z-index / overlay stack, top to bottom in paint order)
1. Promo modal (session-gated, dismissible) — highest z-index, dim backdrop, optional/lower priority
2. Off-canvas nav panel + backdrop (click-driven, hidden by default)
3. Header (fixed, top:32px, z-index 121) + Announcement bar (sticky, above header, height 32px)
4. Floating action buttons (phone, messenger) + Zalo widget iframe — fixed bottom-right
5. Bottom tab bar (mobile/tablet only, fixed bottom) — Trang chủ / Tư vấn / Giỏ hàng
6. Main flow content (sections below)

## Main flow sections, top to bottom

| # | Section (id) | Component name | Interaction model | Notes |
|---|---|---|---|---|
| 1 | `#home-slider` | Hero | static (video autoplay loop) | full-bleed `<video>` bg, headline + CTA bottom-left, header overlays transparently at top |
| 2 | `#section-h-top-product` | BestsellersCarousel | click-driven carousel | 12 products, 4/3/2 visible per breakpoint, hover reveals quick-view icon |
| 3 | `#section-category-2` | CategoryGrid | static | 7 category tiles, image + label |
| 4 | `#section-home-pro-swipper` | PromoStorySlider | click-driven carousel | 3 slides, prev/next text buttons show adjacent titles |
| 5 | `#section-h-block-video` | RefillsBanner | static (video autoplay loop) | full-bleed `<video>`, "REFILLS REIMAGINED" text + CTA |
| 6 | `#section-h-member-privilege` | MembershipPerks | static | 3-card row |
| 7 | (unnamed, between main and footer) | FeedbackStrip | static | survey CTA + 6-tile service grid (3×2 desktop) |
| 8 | `<footer>` | SiteFooter | responsive accordion (desktop expanded, tablet/mobile collapsed) | loyalty/store 2-col banner + 4 link groups + copyright |

## Dependencies / overlay relationships
- Header is `position: fixed` and overlays the Hero section at scroll 0 (transparent bg + dark gradient shadow for legibility); becomes opaque after scrolling ~90px past the top (see BEHAVIORS.md).
- Off-canvas nav is triggered from the header's hamburger button and overlays everything below it when open.
- Bottom tab bar only exists at tablet/mobile widths (≤768px) and is NOT part of the desktop layout — it's an additive element, not a reflow of an existing one.
- Floating phone/messenger buttons and the Zalo iframe render outside `<main>`, fixed to viewport, present at all breakpoints and all scroll positions.

## Column/grid structure summary
- Global content max-width: ~1170–1432px depending on section container padding (site uses a ~1432px outer content width on 1440px viewport, i.e. ~4px/side gutter beyond a 1170px inner content column for text blocks like the feedback strip).
- Product/category grids: CSS flex/grid row-based carousels, not native CSS Grid — column count changes are carousel "visible slide count" changes, not `grid-template-columns` breakpoint changes.

## Out of scope (per skill defaults + this site)
- Real search, cart, wishlist, account backend — build as non-functional UI stubs with local state only (e.g., cart badge count stays "0").
- Zalo live chat — static button only, no iframe/chat backend.
- Promo modal — optional, build last if time allows.
