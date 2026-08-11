# CollectionToolbar Specification

## Overview
- **Target file:** `src/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/CollectionToolbar.tsx`
- **Screenshot:** `docs/design-references/vn-loccitane-com-1c965340/collections-all-acd0b3f1/desktop-1440-toolbar-viewport.png`
- **Interaction model:** click-driven (opens `FilterSortPanel`)

## DOM Structure
Single flex row: result-count text (left) + filter trigger button (right), `justify-content: space-between`.

## Computed Styles
### Row container
- display: flex, justify-content: space-between, align-items: center
- margin: ~24px above product grid

### Result count text
- fontSize: 14px (approx, not hard-captured — treat as `text-sm`)
- color: #3f2b2e (default foreground) — appears slightly muted in screenshot, acceptable as `text-muted-foreground` or `text-foreground/70`

### Filter button ("Bộ Lọc")
- fontSize: 14px
- color: #3f2b2e
- border: 1px solid #cccccc
- borderRadius: 5px
- padding: 5px 8px
- backgroundColor: transparent
- Contains a small filter/sliders icon (left of label) — build a simple new `FilterIcon` (3 horizontal lines with slider dots), source uses a sprite reference (`#icon-filter-mob`) so no extractable path data; a generic sliders icon is an acceptable equivalent.

## States & Behaviors
- Click filter button → opens `FilterSortPanel` (owned by parent page/wrapper state, same pattern as `OffCanvasNav`).
- No hover-state changes captured beyond default button affordance (cursor pointer).

## Text Content (verbatim)
- "Hiển thị 20 trên 304" (dynamic: `Hiển thị {shown} trên {total}` — use mock counts: `shown` = number of rendered mock products, `total` = a static mock total like 304 to match source, or the actual mock array length if simpler; either is acceptable since there's no real backend catalog)
- "Bộ Lọc"

## Responsive Behavior
- Stays a single row (space-between) at all 3 tested widths — text truncates/wraps naturally at 390px, button stays right-aligned and doesn't shrink below its padding.
