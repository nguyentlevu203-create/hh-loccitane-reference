# ProductGrid Specification

## Overview
- **Target file:** `src/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/ProductGrid.tsx`
- **Screenshot:** `desktop-1440-toolbar-viewport.png`
- **Interaction model:** click-driven pagination ("load more"), confirmed via live AJAX test (20→40 cards on one click, same URL, no scroll-triggered fetch)

## DOM Structure
CSS grid of `ProductCard`s + a centered "Xem thêm" button below.

## Computed Styles
### Grid container
- display: grid
- gridTemplateColumns: 4 equal tracks desktop (fixed ~281px observed in a 1170px container — implement as `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`, letting Tailwind handle fluid track sizing rather than hardcoding px)
- gap: 15px both axes (`gap-4`, close enough to 15px within the app's existing spacing scale — verify against screenshot)

### Load more button
- Centered below grid, dark filled button matching existing button styling conventions in this codebase (check `components/ui/button.tsx` — reuse the shadcn `Button` component's default/primary variant if it visually matches the dark wine-filled pill in the screenshot; otherwise a simple `bg-foreground text-white rounded-full px-8 py-2` matches the existing `FeedbackStrip` "Bắt đầu" button pattern already in this codebase — reuse that same visual treatment for consistency, but note the source's load-more button reads as a dark solid rounded pill in the screenshot, similar to `FeedbackStrip`'s CTA but in wine/foreground color rather than the primary yellow).

## States & Behaviors
### Load more
- **Trigger:** click.
- **Before:** N mock products rendered (start with 8, a manageable initial slice of the 20-item mock catalog so "load more" has a visible effect).
- **After:** append the next batch (remaining items) to the grid, no page reload, button hides once all mock items are exhausted (mirrors source disabling/removing the button at the end of the real 304-item catalog).
- Implementation: simple `useState<number>` slice-count into the local mock array — no real pagination API.

## Text Content
- "Xem thêm" (load more button label)

## Responsive Behavior
- 4 cols → 3 cols (tablet 768px) → 2 cols (mobile 390px), see RESPONSIVE.md.
