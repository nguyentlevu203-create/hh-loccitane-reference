# SiteChrome (AnnouncementBar + Header) Specification

## Overview
- Target file: `src/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/SiteChrome.tsx`
- Exports: `AnnouncementBar`, `SiteHeader` (client components, `"use client"`)
- Screenshot: `docs/design-references/vn-loccitane-com-1c965340/root-8a5edab2/hero-header.png`
- Interaction model: scroll-driven (header) + click-driven (announcement dismiss, hamburger toggle)
- Import icons from `@/components/sites/vn-loccitane-com-1c965340/shared/icons`: `MenuIcon`, `SearchIcon`, `AccountIcon`, `LocationIcon`, `HeartIcon`, `CartIcon`, `CloseIcon`

## AnnouncementBar
- `position: sticky; top: 0`, height 32px, full width, `background-color: #f2e9db` (var `--brand-tan`), `color: #3f2b2e`, `font-size: 14px`, centered text.
- Content: a single link "Gợi Ý Quà Tặng Rạng Rỡ Ngày Hè" (href `#`, target site links to `/pages/uudai` — use `#` since real pages are out of scope) filling the bar, centered.
- Right-aligned dismiss button using `CloseIcon` at 12px, clicking sets local `visible` state to `false` and the bar unmounts (height collapses to 0, header below moves up).

## SiteHeader
- `position: fixed`, `top: 0` (or `top: 32px` when AnnouncementBar is still visible — track announcement visibility in a shared parent state, e.g. `SiteChrome` wrapper component that composes both and passes `announcementVisible` down so header's `top` offset updates when dismissed), `width: 100%`, `z-index: 50`.
- Two states, toggled by a scroll listener on `window.scrollY` with threshold **90px**:
  - **Top state (scrollY < 90):** height 72px, `background-color: rgba(0,0,0,0.47)`, box-shadow `0 10px 90px 60px rgba(0,0,0,0.5)`, all icons/text/logo rendered in white (`text-white`, and the logo image should be a white/light variant — since only one logo asset was downloaded, apply `className="brightness-0 invert"` to the logo `<img>` in this state to force it white).
  - **Scrolled state (scrollY >= 90):** height 62px, `background-color: rgb(249,245,240)`, box-shadow `0 0 6px 0 rgba(0,0,0,0.15)`, icons/text in `text-foreground` (#3f2b2e), logo rendered normally (no filter).
  - Apply `transition-all duration-300 ease-out` on the header for a smooth cross-fade between states.
- Layout (desktop, single row, `flex items-center justify-between px-10`):
  - **Left group:** `MenuIcon` button (22px, calls an `onMenuClick` prop passed from the page to open `OffCanvasNav`), then a search `<input placeholder="Tìm kiếm">` (rounded-full border, ~280px wide) with a `SearchIcon` button inside it on the right edge.
  - **Center:** logo — `<img src="/sites/vn-loccitane-com-1c965340/shared/images/logo.png" alt="L'Occitane Việt Nam" className="h-10 w-auto" />`
  - **Right group (icon row, gap 20px):** a small flag/language toggle stub (skip — optional, can omit), `AccountIcon` link (non-functional `href="#"`), `LocationIcon` link, `HeartIcon` button with a small "0" badge, `CartIcon` button with a small "0" badge (yellow circle badge, `bg-primary text-foreground text-[10px]`).
- **Mobile (<640px):** header becomes two stacked rows: row 1 = `MenuIcon` + logo (left-aligned, not centered) + `AccountIcon`/`HeartIcon` icons only (drop store-locator icon); row 2 = full-width search input. Cart icon is REMOVED from the header entirely on mobile (it moves to a separate bottom tab bar built by another component — do not build the tab bar here, just omit the cart icon at `<sm:` breakpoint using Tailwind `hidden sm:flex`).

## Text content (verbatim)
- Announcement: "Gợi Ý Quà Tặng Rạng Rỡ Ngày Hè"
- Search placeholder: "Tìm kiếm"
- Logo alt: "L'Occitane Việt Nam"

## Props
```ts
interface SiteHeaderProps {
  onMenuClick: () => void;
}
```
Compose both in a default-exported `SiteChrome({ onMenuClick }: { onMenuClick: () => void })` that renders `<AnnouncementBar />` then `<SiteHeader onMenuClick={onMenuClick} />`, tracking announcement visibility internally to offset the header's `top`.

## Responsive
- Desktop 1440 & Tablet 768: single-row header as described.
- Mobile 390: two-row header, cart icon hidden (see above). Breakpoint: Tailwind `sm` (640px).

Verify with `npx tsc --noEmit` before finishing.
