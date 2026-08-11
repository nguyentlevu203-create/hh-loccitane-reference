# CategoryGrid Specification

## Overview
- Target file: `src/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/CategoryGrid.tsx`
- Screenshot: `docs/design-references/vn-loccitane-com-1c965340/root-8a5edab2/category-grid.png`
- Interaction model: static (standard link hover only — underline/opacity shift on the label, no confirmed custom hover transform)

## Section wrapper
- `padding-top: 30px`, centered heading "KHÁM PHÁ DANH MỤC SẢN PHẨM" — same heading style as BestsellersCarousel (24px/500/serif, centered, short underline rule).
- Track is a horizontally-scrollable row of tiles (same carousel shell pattern as bestsellers is fine, or a simple `overflow-x-auto flex gap-4` row if no arrows were observed — no next/prev controls were captured for this section, so implement it as a plain scrollable flex row, no arrow buttons).

## Category data (verbatim, all real downloaded images)
```ts
const categories = [
  { label: "Ưu Đãi Đặc Biệt", href: "#", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-uu-dai.png" },
  { label: "Sản phẩm yêu thích", href: "#", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-yeu-thich.png" },
  { label: "Chăm sóc cơ thể", href: "#", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-co-the.png" },
  { label: "Chăm sóc da mặt", href: "#", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-da-mat.png" },
  { label: "Chăm sóc da tay", href: "#", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-da-tay.jpg" },
  { label: "Chăm sóc tóc", href: "#", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-toc.jpg" },
  { label: "Refills", href: "#", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-refills.png" },
  { label: "Quà tặng", href: "#", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-qua-tang.png" },
];
```

## Tile structure
- Each tile: portrait image (`aspect-[3/4]`, `object-cover`, `rounded-sm`), label centered below or overlaid at the bottom of the image with a subtle gradient (screenshot shows the label as its own caption below the image, not overlaid — build it as image + caption below, `text-center text-sm mt-2`).
- Fixed tile width ~180px desktop; tiles do not resize per breakpoint, the row simply becomes horizontally scrollable/swipeable on narrower viewports (same "4 visible → 3 → 2" visual density as the bestsellers carousel is acceptable here too, achieved naturally by the fixed tile width plus container padding).

## Responsive
- Desktop 1440: ~7-8 tiles visible without scrolling (full row fits).
- Tablet 768: ~4 visible, rest reachable by horizontal scroll/swipe.
- Mobile 390: ~2 visible, rest by swipe.

Verify with `npx tsc --noEmit` before finishing.
