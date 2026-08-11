# Responsive Behavior — /collections/all

Tested at 1440×1000 (desktop), 768×1024 (tablet), 390×844 (mobile) via Playwright MCP against the live site.

## Header
- **≥ ~640px (`sm`):** single-row layout — hamburger + search input on the left, centered logo, flag/account/location/wishlist/cart icons on the right. Matches existing `SiteHeader` desktop branch.
- **< 640px:** two-row layout — hamburger + logo + account/wishlist icons on row 1, full-width search input on row 2. Matches existing `SiteHeader` mobile branch.
- On this template only (`tp-collection`), header is always in the light/"scrolled" visual state at all 3 widths (see BEHAVIORS.md) — this is orthogonal to the responsive row-layout switch.

## Product grid columns
- **Desktop 1440px:** 4 columns, fixed ~281px tracks, 15px gap, container ~1170px.
- **Tablet 768px:** 3 columns (confirmed via screenshot).
- **Mobile 390px:** 2 columns (confirmed via screenshot).
- Recommend implementing as `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4` with the existing Tailwind config (adjust exact breakpoint values only if visual QA shows a mismatch).

## Filter/Sort panel
- **Desktop 1440px & tablet 768px:** fixed right-side drawer, 550px wide, full viewport height.
- **Mobile 390px:** fixed full-width (100vw) sheet, same internal content, same slide-in-from-right + backdrop pattern.
- Implement as one component with a responsive width class (`w-full lg:w-[550px]`) rather than two separate components — content/structure is identical, only the width changes.

## Mobile bottom navigation
- Visible at 390px and 768px.
- Hidden at 1024px+ (and therefore at the 1440px desktop viewport).
- Implement visibility as `lg:hidden` (Tailwind `lg` = 1024px matches the observed 768px-visible/1024px-hidden cutoff).

## Toolbar row
- Result count + "Bộ Lọc" button stay on one row at all 3 tested widths (text wraps/truncates naturally at 390px width, button stays right-aligned).

## Breadcrumb / H1
- No structural change across breakpoints observed; font sizes may scale down slightly on mobile per existing global typography scale — verify against homepage's existing heading scale rather than inventing new sizes.
