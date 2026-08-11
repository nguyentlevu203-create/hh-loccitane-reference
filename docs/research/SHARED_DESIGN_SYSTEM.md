# Shared Design System — Phase 2 Baseline

**Status:** `/` (homepage) is the visual regression baseline as of the "Complete Loccitane homepage reference clone" commit (`2117cb3`). `npm run check` passes clean (lint: 0 errors / 7 pre-existing `no-img-element` warnings, typecheck: clean, build: static, 2 routes).

This document inventories every component currently under
`src/components/sites/vn-loccitane-com-1c965340/` and classifies each as
**GLOBAL SHARED**, **HOMEPAGE SPECIFIC**, or **REUSABLE WITH VARIANTS**, so
Phase 2 pages (PLP, PDP, cart, account, etc.) can reuse chrome and primitives
without redesigning or touching the homepage's working code.

> Rule for Phase 2: never edit a `GLOBAL SHARED` component's existing markup/props
> in a way that changes homepage rendering. Extend via new optional props (with
> safe defaults matching current behavior) or wrap/compose instead of rewriting.

---

## Current file map

```
src/components/sites/vn-loccitane-com-1c965340/
  root-8a5edab2/
    SiteChrome.tsx          AnnouncementBar + SiteHeader (site chrome)
    OffCanvasNav.tsx         Mobile/desktop off-canvas nav drawer
    Hero.tsx                 Full-bleed video hero (homepage only)
    BestsellersCarousel.tsx  Product carousel + ProductCard markup (inline)
    CategoryGrid.tsx         Horizontal scroll category tiles
    PromoStorySlider.tsx     Alternating image/text story slider
    RefillsAndMembership.tsx RefillsBanner (video) + MembershipPerks grid
    FeedbackStrip.tsx        NPS CTA + 6-tile icon/benefit grid
    FooterAndFloating.tsx    SiteFooter + FloatingActions (Zalo/Phone/Messenger)
    types.ts                 Shared content-shape interfaces
  shared/
    icons.tsx                Hand-authored inline SVG icon set (not lucide, except FeedbackStrip)
```

`src/app/page.tsx` composes these directly — no shared `<Layout>` wrapper
exists yet. Every non-homepage page built in Phase 2 needs to replicate the
`SiteChrome` + `OffCanvasNav` + `main` + `SiteFooter` + `FloatingActions`
shell shown there (see "Recommended layout extraction" below).

---

## Classification

### GLOBAL SHARED
Used, or clearly intended to be used, on every page of the site. Reuse as-is.

| Component | File | Notes |
|---|---|---|
| `AnnouncementBar` | `SiteChrome.tsx` | Sticky dismiss-able top bar. Self-contained state (`onDismiss` callback only). Height `h-8`, `z-50`. |
| `SiteHeader` | `SiteChrome.tsx` | Fixed header, scroll-aware (`scrolled` state flips at `scrollY >= 90`), takes `offsetTop` prop to sit below the announcement bar. Contains logo, menu button, search input, account/location/heart/cart icons. Desktop (`sm:flex`) and mobile (`sm:hidden`) markup are two full branches in the same component — not a separate mobile file. |
| `SiteChrome` (default export) | `SiteChrome.tsx` | Composes `AnnouncementBar` + `SiteHeader`, owns `announcementVisible` state, computes `offsetTop`. This is the component every page should mount. Takes `onMenuClick`. |
| `OffCanvasNav` | `OffCanvasNav.tsx` | Full nav drawer (left slide-in, `max-w-[416px]`), owns its own `openKeys` accordion state. Controlled via `open`/`onClose` props from the parent page. Nav content (categories, links) is currently hardcoded inline — see "Data extraction" below. |
| `SiteFooter` | `FooterAndFloating.tsx` | Full footer: loyalty/store banners, company info, 3 accordion link groups (desktop: always open via `lg:` overrides; mobile: accordion), social links, bottom logo/copyright. Owns `openIndex` accordion state. |
| `FloatingActions` | `FooterAndFloating.tsx` | Fixed bottom-right Zalo/Phone/Messenger stack. Static, no props. |
| `shared/icons.tsx` | `icons.tsx` | Hand-drawn SVG icon set used across chrome, nav, footer, carousel. Treat as the icon source of truth for chrome; `FeedbackStrip.tsx` separately pulls `lucide-react` icons for its benefit tiles (fine to keep — different visual language, contained to that section). |

### HOMEPAGE SPECIFIC
Content and/or layout tied to the homepage narrative. Do not reuse verbatim on other page types; may inform a variant later if a similar layout appears (e.g. category landing pages).

| Component | File | Notes |
|---|---|---|
| `Hero` | `Hero.tsx` | Full-viewport (`h-screen`) autoplay video hero with hardcoded copy ("Same Iconic Formula"). Homepage-only pattern; a PLP/PDP hero would need its own component even if visually similar. |
| `CategoryGrid` | `CategoryGrid.tsx` | Homepage's specific 8-category horizontal scroller with hardcoded `categories` array pointing at homepage image assets. The *shape* (horizontal-scroll tile list) is reusable (see REUSABLE below) but this exact instance/data is homepage-specific. |
| `PromoStorySlider` | `PromoStorySlider.tsx` | 3-slide manual story slider with homepage promo copy/images (almond line, refill campaign). Structure is a good candidate for a generic "story slider" if another campaign page needs it, but not global chrome. |
| `RefillsBanner` | `RefillsAndMembership.tsx` | Homepage-specific autoplay video banner ("Refills Reimagined") with hardcoded copy. |
| `MembershipPerks` | `RefillsAndMembership.tsx` | 3-card perks grid with homepage-specific copy/images/CTAs. |
| `FeedbackStrip` | `FeedbackStrip.tsx` | NPS survey CTA + 6-tile benefits grid, homepage-specific copy (typeform link, benefit text). The 6-tile icon/label/description grid pattern could be reused on an About/Help page later, but treat as homepage-owned for now. |

### REUSABLE WITH VARIANTS
Structural/visual patterns worth promoting to a shared primitive once a second page needs them. Currently only exist inline inside homepage-specific files — **do not extract yet unless a Phase 2 page actually needs the pattern**, to avoid refactoring working homepage code without cause.

| Pattern | Current home | Reuse candidate | Notes |
|---|---|---|---|
| Product card (image, heart-wishlist icon, quick-view hover overlay, name, struck/current price) | Inline JSX inside `BestsellersCarousel.tsx` (lines ~184-238) | PLP grid, PDP "related products", search results | Not a standalone component yet — it's inline markup inside the carousel's `.map()`. `Product` type already exists in `types.ts` and is reusable. When PLP work starts, extract this into `ProductCard.tsx` accepting a `Product`, and have `BestsellersCarousel` import it (verify homepage renders identically after extraction before committing). |
| Carousel primitive (drag-free, button-driven, `translateX` slide math, responsive `visibleCount` breakpoints, mobile progress bar) | Inline inside `BestsellersCarousel.tsx` | Any future "related products" or "recently viewed" rail | Logic (`visibleCount`, `containerWidth`, `translateX`, prev/next handlers) is generic enough to lift into a `useCarousel` hook or generic `<Carousel>` wrapper that takes `renderItem`. Only do this when a second carousel is needed — premature to extract for one caller. |
| Horizontal scroll tile list (image + label, `overflow-x-auto`) | `CategoryGrid.tsx` | Any "browse by X" rail (e.g. brand/collection rails) | Simple enough (`CategoryTile` type already generic) to parameterize by passing a `tiles: CategoryTile[]` prop later. |
| Accordion section (title + chevron + animated `grid-template-rows` collapse, desktop-always-open via `lg:` override) | Duplicated independently in `OffCanvasNav.tsx` (`ExpandableRow`) and `FooterAndFloating.tsx` (`AccordionSection`) | Any future FAQ/help/filter accordion | **Already duplicated with near-identical animation technique but different markup/props.** Worth unifying into one `Accordion`/`AccordionItem` primitive under `components/ui/` when touched next, since two independent implementations already drifted. Not required for Phase 2 unless a new accordion use case appears — don't refactor the existing two without reason. |
| Alternating media/text split section (`PromoStorySlider`'s single-slide layout: image half + text half, side alternates) | `PromoStorySlider.tsx` | Editorial/story pages | The per-slide layout (not the slider mechanics) could become a `MediaSplit` building block for CMS-driven story pages. |

---

## Data extraction status

All content is currently **hardcoded as TypeScript literals** inside each component file (products, categories, nav links, footer links, promo slides, perks, feedback tiles). There is no CMS/data-layer abstraction yet. `types.ts` already defines shapes for most of these (`Product`, `CategoryTile`, `PromoSlide`, `MembershipCard`, `ServiceTile`, `FooterLinkGroup`, `NavCategoryItem`) — some of these types (`PromoSlide`, `ServiceTile`, `FooterLinkGroup`, `NavCategoryItem`) are defined but not actually imported/used yet (each component re-declares its own local interface instead, e.g. `PromoStorySlider.tsx` has a local `PromoSlide` duplicate of `types.ts`'s). Worth reconciling when Phase 2 introduces real data fetching, not before.

For Phase 2 (PLP/PDP/etc.), expect to need:
- A real product data source (currently 12 hardcoded products reused across 4 placeholder images in `BestsellersCarousel.tsx`)
- Real nav taxonomy (currently hardcoded Vietnamese category labels in `OffCanvasNav.tsx` with `href="#"` placeholders)
- Real footer link targets (currently all `href="#"` in `FooterAndFloating.tsx`)

---

## Recommended layout extraction (no homepage changes required)

`page.tsx` currently inlines the full chrome composition:
`SiteChrome` → `OffCanvasNav` → `<main>` → `SiteFooter` → `FloatingActions`,
with `menuOpen` state owned locally via `useState`.

For Phase 2, the lowest-risk path is to create a new shared layout component
(e.g. `SiteShell.tsx` or use a route group layout) that wraps this exact same
composition, and then **migrate `page.tsx` to use it** as a mechanical,
behavior-preserving refactor (verify visually before/after) — rather than
duplicating the chrome-mounting logic into every new page file. This is additive:
it does not require changing `SiteChrome`, `OffCanvasNav`, `SiteFooter`, or
`FloatingActions` internals at all.

```tsx
// proposed: src/components/sites/.../root-8a5edab2/SiteShell.tsx
"use client";
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <SiteChrome onMenuClick={() => setMenuOpen(true)} />
      <OffCanvasNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>{children}</main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}
```

Not implemented in this pass — flagged as the recommended next step so Phase 2
page-builder agents don't each reinvent chrome-mounting independently.

---

## Design tokens (reference, already established — do not redefine)

Source: `src/app/globals.css`. Full palette already exists as CSS variables
(`--background`, `--foreground`, `--primary` (#ffc700 brand yellow),
`--secondary` (#f2e9db tan), `--destructive` (#e50000 sale red), `--border`
(#ece3d6), `--muted-foreground` (#666), plus `--brand-cream`, `--brand-tan`,
`--brand-wine`, `--brand-yellow`, `--brand-sale` raw brand values). Font is
`--font-cormorant` (Cormorant Garamond) mapped to `--font-sans`/`--font-heading`.
Phase 2 pages should consume these via existing Tailwind tokens
(`bg-background`, `text-foreground`, `bg-primary`, etc.) — do not hardcode
new hex values or introduce a second token set.

---

## Summary for Phase 2 planning

- **Build new pages against:** `SiteChrome`, `OffCanvasNav`, `SiteFooter`, `FloatingActions`, `shared/icons.tsx`, and existing design tokens — all stable, homepage-tested.
- **Do not reuse as-is:** `Hero`, `CategoryGrid`, `PromoStorySlider`, `RefillsBanner`, `MembershipPerks`, `FeedbackStrip` — homepage narrative content.
- **Extract when (and only when) a second consumer appears:** product card markup out of `BestsellersCarousel`, the carousel mechanics, the two duplicated accordion implementations.
- **No homepage component was modified to produce this document.**
