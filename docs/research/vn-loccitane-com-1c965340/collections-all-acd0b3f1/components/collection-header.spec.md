# CollectionHeader Specification

## Overview
- **Target file:** `src/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/CollectionHeader.tsx`
- **Screenshot:** `docs/design-references/vn-loccitane-com-1c965340/collections-all-acd0b3f1/desktop-1440-toolbar-viewport.png`
- **Interaction model:** static

## DOM Structure
`<div>` containing a breadcrumb `<nav>`/list, then an `<h1>`.

## Computed Styles
### Breadcrumb row
- fontSize: 13px
- color: #3f2b2e (`text-foreground`)
- margin-bottom: ~16px before H1
- Separator: `/` between items, plain text, no icon.
- "Trang chủ" is a link to `/`; current page ("Tất cả sản phẩm") is plain text, not a link.

### H1
- fontSize: 40px
- fontWeight: 600
- lineHeight: 56px
- fontFamily: existing serif heading token (`font-sans`/`font-heading` — reuse `--font-cormorant`, do not add new font)
- color: #3f2b2e
- marginBottom: 13px
- textAlign: center (confirmed via desktop screenshot — heading is horizontally centered within the content column, unlike the breadcrumb which is left-aligned)

## States & Behaviors
N/A — fully static text block.

## Text Content (verbatim)
- Breadcrumb: "Trang chủ" (link to `/`) / "Tất cả sản phẩm" (current)
- H1: "Tất cả sản phẩm"

## Responsive Behavior
- No structural changes observed across 1440/768/390. Font size may be allowed to scale down slightly on mobile via existing responsive type utilities if visual QA shows overflow, but default to the same size unless proven otherwise.
