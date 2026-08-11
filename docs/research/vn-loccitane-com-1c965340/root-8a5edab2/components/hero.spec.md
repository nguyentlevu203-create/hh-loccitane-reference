# Hero Specification

## Overview
- Target file: `src/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/Hero.tsx`
- Screenshot: `docs/design-references/vn-loccitane-com-1c965340/root-8a5edab2/hero-header.png` (and `desktop-1440-full.png` top section)
- Interaction model: static (video autoplays on load, loops, muted — no user interaction)

## DOM structure
- Full-bleed section, `height: 100vh` on desktop (observed 1000px at 1440×1000 viewport; use `h-screen min-h-[600px]`), `position: relative`, `overflow: hidden`.
- `<video>` fills the container: `autoPlay muted loop playsInline`, `className="absolute inset-0 h-full w-full object-cover"`.
  - `src="/sites/vn-loccitane-com-1c965340/root-8a5edab2/videos/hero.mp4"`
  - `poster="/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/hero-poster.jpg"`
- Text overlay, bottom-left, `position: absolute; left: 40px; bottom: 64px` (desktop), white text with a subtle dark gradient behind it for legibility (`bg-gradient-to-t from-black/40 to-transparent` applied as a full-width absolute layer at the bottom of the hero, height ~300px, `z-index` below the text but above the video).
  - Heading: "Same Iconic Formula" — `font-size: 40px; font-weight: 500; line-height: 56px; color: white; font-family: var(--font-sans)` (serif).
  - CTA link below, ~16px gap: "Khám phá ngay" with a trailing chevron (`ArrowIcon` from shared icons, 12px, rotated -90deg or just inline after text), `color: white; font-size: 14px`, underline-on-hover.

## Text content (verbatim)
- Headline: "Same Iconic Formula"
- CTA: "Khám phá ngay"

## Responsive
- Desktop (1440): as described, text positioned bottom-left with generous padding (40px+).
- Tablet (768): same layout, text/padding scale down proportionally (`left-6 bottom-10`, heading `text-3xl`).
- Mobile (390): text block padding reduces further (`left-4 bottom-8`), heading wraps to ~2 lines comfortably at `text-3xl` (~32px).

Verify with `npx tsc --noEmit` before finishing.
