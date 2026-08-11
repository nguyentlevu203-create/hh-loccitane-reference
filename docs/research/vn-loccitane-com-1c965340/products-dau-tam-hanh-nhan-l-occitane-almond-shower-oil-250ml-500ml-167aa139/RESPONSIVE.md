# Responsive Behavior — Product Detail Page (Almond Shower Oil)

Tested at 1440×1000 (desktop), 768×1024 (tablet), 390×844 (mobile) via Playwright MCP against the
live site (fresh navigation at each width). Screenshots: see
`docs/design-references/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/`.

## Header

Same as `/collections/all` — always renders in the light/"scrolled" state at all 3 widths (see
BEHAVIORS.md). Row-layout switch (single-row desktop/tablet → two-row mobile with hamburger/logo/
account/wishlist on row 1, full-width search on row 2) matches the existing `SiteHeader` breakpoint
already in place — no new breakpoint needed. Note: the header's cart icon is not shown in the mobile
two-row header at all (only wishlist heart remains); cart access on mobile is via `MobileBottomNav`'s
"Giỏ hàng" item instead.

## Hero row (gallery + info)

- **Desktop 1440px & Tablet 768px:** 2-column layout — gallery left (~50%), product info right
  (~50%), confirmed via screenshot at both widths (`desktop-1440-gallery-info.png`,
  `tablet-768-gallery.png`). Only the column width shrinks with viewport, structure is unchanged.
- **Mobile 390px:** stacks to 1 column — gallery full-width on top, product info full-width below
  (`mobile-390-gallery.png`). Implement as `grid-cols-1 lg:grid-cols-2` (or `md:grid-cols-2` if the
  actual stack point sits below 768px — the tablet screenshot at exactly 768px still shows 2 columns,
  so `lg:` (1024px doesn't apply either since 768 < 1024 and still 2-col) — recommend testing the
  built page against `md:grid-cols-2` first since Tailwind's `md` is 768px and the tablet capture at
  exactly that width is 2-column already).

## Product gallery

Same slide-0-gift-panel / other-slides-full-width split at all 3 widths — no structural change, only
scales down. Thumbnail strip stays a horizontal row (not a wrapping grid) at all widths, including
390px.

## Product info column

- **Row order/grouping changes at mobile** (see BEHAVIORS.md): desktop keeps "Số lượng" and "Chia sẻ"
  as two separate full-width rows (share row last, after the CTA buttons). Mobile merges them into one
  row (qty left, share right) positioned directly above the "Mã khuyến mãi" box, ahead of the CTA
  buttons. This is the one real structural (not just visual-scaling) difference in the info column
  across breakpoints.
- Variant selector, promo box, and CTA buttons keep the same relative order and full-width sizing at
  all 3 widths.

## Content section (description)

- **Desktop & Tablet:** plain heading "MÔ TẢ SẢN PHẨM" (non-toggleable), content truncates behind a
  centered "Xem thêm nội dung +" button (no outer accordion wrapper).
- **Mobile only:** the same content is wrapped in an *additional* accordion headed "Chi tiết sản
  phẩm" with a down-chevron toggle, expanded by default (`active-show`). The inner truncate/expand
  button still exists nested inside it. Confirmed via DOM: the accordion header element carries
  `hidden-sm hidden-md hidden-lg` classes — i.e. it is architecturally mobile-only in the source site,
  not just visually hidden. Implement as a responsive prop/conditional wrapper on `ProductAccordion`
  (render the extra collapsible header only below the `md` breakpoint) rather than two separate
  components.

## Reviews / Recommendations

No structural differences observed across the 3 widths beyond normal column-width reflow (review
form's 3-column Tên/Email/Số điện thoại row would be expected to stack on mobile per standard form
patterns, though not independently confirmed by scrolling that far on the mobile viewport during this
pass — reasonable low-risk assumption, flag as inferred).

## Mobile bottom navigation

Present at 390px and 768px, hidden at 1440px — same cutoff already implemented for `/` and
`/collections/all` (`lg:hidden`). No PDP-specific change.

## No sticky Add-to-Cart bar at any width

Explicitly checked via computed style at mobile width — the ATC/Buy Now button container is
`position: relative` throughout, not fixed/sticky. Confirmed absent at 390px (see BEHAVIORS.md for
the specific DOM check). Do not build one.
