# OffCanvasNav Specification

## Overview
- Target file: `src/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/OffCanvasNav.tsx` (`"use client"`)
- Screenshot: `docs/design-references/vn-loccitane-com-1c965340/root-8a5edab2/off-canvas-nav.png`
- Interaction model: click-driven. Triggered externally by the header's hamburger (`onMenuClick`); this component owns its own open/closed slide transition and per-row accordion state.
- Import icons: `CloseNavIcon`, `SearchIcon`, `ArrowDownIcon` from `@/components/sites/vn-loccitane-com-1c965340/shared/icons`

## Props
```ts
interface OffCanvasNavProps {
  open: boolean;
  onClose: () => void;
}
```

## Structure
- Fixed full-screen dim backdrop (`bg-black/40`) covering the viewport when `open`, click closes.
- Panel: `position: fixed; top: 0; left: 0; height: 100vh; width: 416px` (cap `max-w-[90vw]` for mobile), `background: #fffefa`, slides in via `transform: translateX(-100%)` → `translateX(0)` with `transition-transform duration-300 ease-out`.
- Panel header row: `CloseNavIcon` button (24px) on the left, a small search button (`SearchIcon`) on the right.
- Primary nav list (`<ul>`, each item ~48px tall, border-bottom `1px solid #ece3d6`, `font-size: 15px`):
  1. "Tất Cả Sản Phẩm" (plain link, href `#`)
  2. "LỢI ÍCH VÀ ƯU ĐÃI ĐẶC BIỆT ✨" (plain link)
  3. "BST SET VÀ QUÀ TẶNG" (plain link)
  4. "Được Yêu Thích" (plain link)
  5. "Chăm Sóc Cơ Thể" — expandable row: label + trailing chevron button (`ArrowDownIcon`, 12px) that rotates 180deg and reveals an indented sub-list when clicked. Use placeholder sub-items: "Xem tất cả", "Sữa tắm", "Dưỡng thể" (mock — real submenu content wasn't captured, use these as reasonable category children).
  6. "Chăm Sóc Da Mặt" — same expandable pattern, sub-items: "Xem tất cả", "Làm sạch da", "Dưỡng da".
  7. "Chăm Sóc Da Tay" — expandable, sub-items: "Xem tất cả", "Kem dưỡng da tay".
  8. "Chăm Sóc Tóc" — expandable, sub-items: "Xem tất cả", "Dầu gội", "Dầu xả".
  9. "Dành Cho Nam" (plain link)
  10. "Eco-Refills" — expandable, sub-items: "Xem tất cả", "Refill dầu tắm".
- Secondary list (smaller text, `text-sm text-muted-foreground`, own section with top border):
  - "Tìm kiếm", "Điều khoản & điều kiện"
- Tertiary list, headed by an expandable "Về chúng tôi" row, revealing:
  - "Kỉ niệm 50 năm thành lập", "Giá trị của chúng tôi", "Doanh nghiệp B Corp™", "Big Little Things", "Sức khỏe & Làm đẹp", "Chuỗi cung bền vững", "Dịch vụ dành cho khách sạn", "Quà tặng doanh nghiệp", "L'Occitane Spa"

## Accordion behavior
- Each expandable row manages its own boolean state (array of open indices, or per-row `useState`), independent of the panel's own open/close state.
- Expand transition: `grid-template-rows: 0fr → 1fr` (or a simple `max-height` transition) over ~200ms; chevron rotates `rotate-0` → `rotate-180`.

## Responsive
- Same drawer component/content at all breakpoints; only the panel width narrows on small screens (`w-full max-w-[416px]`, effectively full-width below 416px viewport).

Verify with `npx tsc --noEmit` before finishing.
