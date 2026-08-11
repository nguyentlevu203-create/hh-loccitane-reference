# FilterSortPanel Specification

## Overview
- **Target file:** `src/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/FilterSortPanel.tsx`
- **Screenshots:** `desktop-1440-filter-open.png`, `mobile-390-filter-open.png` (both in `docs/design-references/vn-loccitane-com-1c965340/collections-all-acd0b3f1/`)
- **Interaction model:** click-driven (open/close), local `useState` for chip selection (no backend)

## DOM Structure
- Backdrop (fixed, full-viewport, dark, click-to-close)
- Panel (fixed, right-anchored)
  - Header row: "LỌC SẢN PHẨM" + × close button
  - "Sắp xếp theo:" label + chip row (7 options)
  - Divider
  - "Loại sản phẩm" label + chip row (4 visible + "Xem thêm"/"Rút gọn" toggle revealing the rest) + divider
  - "Dung tích" label + chip row (4 visible + "Xem thêm") + divider
  - "Lọc giá" label + chip row (4 visible + "Xem thêm")
  - Sticky footer: "Làm mới" (reset) + "Áp dụng" (apply) buttons

## Computed Styles

### Backdrop
- position: fixed, inset: 0
- backgroundColor: rgb(0,0,0), opacity: 0.5
- z-index: 1040 (implement below panel, above page content — e.g. `z-40` in the app's existing scale, panel above at `z-50`+)

### Panel container
- position: fixed; top: 0; right: 0; height: 100vh
- Desktop/tablet: width 550px, `max-width: 550px`
- Mobile: width 100vw
- background: #ffffff (`bg-background` or plain white — source uses pure white here, not the cream `--background` token; verify against screenshot, use `bg-white` if it reads more neutral than the app's cream background)
- z-index: 99997 (use the app's highest existing z step, e.g. `z-[100]`, above `OffCanvasNav`'s `z-50`)
- transition: 0.3s ease, slide in via `translate-x-full` → `translate-x-0` (mirror the existing `OffCanvasNav` slide pattern, just anchored right instead of left)
- Internal layout: header fixed at top, scrollable content area (`overflow-y-auto`) in the middle, footer fixed/sticky at bottom (`flex flex-col h-full`, footer `mt-auto`)

### Header row
- "LỌC SẢN PHẨM" — bold, uppercase, ~16px
- × close button — reuse existing `CloseNavIcon` from `shared/icons.tsx`

### Chip component (shared by sort + all 3 filter groups — build once, reuse)
- Unselected: `background: #fbf9f6; color: #3f2b2e; border: 1px solid #cccccc; border-radius: 5px; padding: 8px; font-size: 14px`
- Selected: `background: #3f2b2e (var(--foreground)); color: #ffffff; border-radius: 5px` (same padding/size, no visible border needed since bg covers it)
- Layout: `flex flex-wrap gap-2` chip row

### Group label ("Loại sản phẩm" / "Dung tích" / "Lọc giá" / "Sắp xếp theo:")
- fontSize: ~14px, fontWeight: 600 (bold), marginBottom: 12px

### "Xem thêm" / "Rút gọn" expand toggle
- Plain text button, chevron-down icon (reuse `ArrowDownIcon`), rotates 180° when expanded (reuse the same rotate pattern already used in `OffCanvasNav`'s `ExpandableRow`)

### Footer buttons
- Both roughly equal width, side by side (`flex gap-3`, or reset narrower + apply wider per screenshot — screenshot shows near-equal split)
- "Làm mới": outline button, `border border-foreground/30 text-foreground bg-transparent`
- "Áp dụng": filled, `bg-foreground text-white` (matches selected-chip color)
- Row has top border/shadow separating it from scrollable content (`border-t border-border`, sits fixed at panel bottom)

## States & Behaviors

### Open/close
- **Trigger:** `open` prop controlled by parent (same pattern as `OffCanvasNav`).
- **Closed → Open:** backdrop fades in (opacity 0→0.5), panel slides in from right (`translate-x-full` → `translate-x-0`), 0.3s ease.
- **Close triggers:** × button, backdrop click, "Áp dụng" click (apply-and-close).

### Chip selection
- Click toggles a chip's selected visual state via local component state.
- Sort chips: single-select (only one sort option active at a time — "Mới nhất" was the observed default-selected state).
- Filter chips (Loại sản phẩm / Dung tích / Lọc giá): multi-select (independent toggles, no evidence of mutual exclusivity within a group).
- "Làm mới" clears all selections back to defaults.

### Accordion expand ("Xem thêm")
- Click reveals additional chips in that group (grid/flex row grows), button label flips to "Rút gọn" with rotated chevron; click again to collapse. Reuse the same `grid-template-rows: 0fr → 1fr` collapse technique already used in `OffCanvasNav.tsx`'s `ExpandableRow` and `FooterAndFloating.tsx`'s `AccordionSection` for consistency (per SHARED_DESIGN_SYSTEM.md's noted duplication — this is a 3rd instance; still don't refactor the existing two into a shared primitive as part of this page, that's a separate future cleanup, not required here).

## Per-content data (mock, verbatim from source where captured)
- Sort options: Bán chạy, Mới nhất (default selected), Giá cao đến thấp, Giá thấp đến cao, A-Z, Z-A, Tồn kho: Giảm dần
- Loại sản phẩm (show 4, expand to all): CHĂM SÓC CƠ THỂ, Ưu Đãi, CHĂM SÓC TÓC, TẮM & DƯỠNG THỂ, Ưu Đãi Cửa Hàng, CHĂM SÓC DA MẶT, Khác, Gift, KHÁC, NƯỚC HOA, KHÔNG GIAN SỐNG, Deal Tháng 8, COMBO
- Dung tích (show 4): 30ml, 50ml, 75ml, 150ml
- Lọc giá (show 4): Dưới 1,000,000₫, Từ 1,000,000₫ - 2,000,000₫, Từ 2,000,000₫ - 3,000,000₫, Từ 3,000,000₫ - 4,000,000₫
- Footer: "Làm mới", "Áp dụng"

## Responsive Behavior
- **Desktop 1440px & Tablet 768px:** panel width 550px, right-anchored.
- **Mobile 390px:** panel width 100vw (full screen), otherwise identical content/behavior.
- Implement via `w-full lg:w-[550px]` on the panel container.
