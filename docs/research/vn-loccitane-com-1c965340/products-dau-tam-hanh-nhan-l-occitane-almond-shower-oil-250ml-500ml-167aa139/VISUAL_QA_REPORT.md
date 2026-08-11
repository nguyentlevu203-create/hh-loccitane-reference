# Visual QA Report — Product Detail Page (Almond Shower Oil)

Compared local build (`npm run dev`, `/products/dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml`)
against the live source page at exactly 1440×1000, 768×1024, 390×844, using Playwright MCP.
Reference screenshots: `docs/design-references/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/*.png`
(source captures from the reconnaissance pass, `qa-local-*` captures from the local build).

Classification: P0 = broken, P1 = obvious mismatch, P2 = minor mismatch, P3 = negligible.

## Findings

### P1 — Description truncation didn't visibly clip content (fixed)
Initial `collapsedHeight` of 460px (taken directly from the source page's raw pixel
measurement) didn't produce a visible clip locally, because this codebase's typography
(Cormorant Garamond, different line-height/spacing than the source's compiled CSS) renders
the same 5 description sections more compactly — all 5 sections fit under 460px, so the
"Xem thêm nội dung +" toggle appeared functionally inert (nothing to reveal). Source page
truncates mid-way through section 4. **Fix:** reduced `collapsedHeight` default to `400` in
`ProductAccordion.tsx`, re-verified visually — now clips after section 3 / into the start of
section 4, matching the source's truncation point. Toggle confirmed working both directions
(`Xem thêm nội dung +` ⇄ `Rút gọn -`) via live click test.

### P3 — Full-page screenshot shows fixed elements overlapping content (not a real bug)
`mobile-390-full` and `qa-local-mobile-390-full` both show `FloatingActions` (Zalo/phone/
Messenger) and the Next.js dev-mode badge appearing to overlap the price row. This is a
known Playwright `fullPage` screenshot artifact: fixed-position elements get composited at
their fixed-to-viewport position at every scroll offset during the stitched capture. Verified
against a plain viewport screenshot (`qa-local-mobile-390-viewport.png`) — no overlap exists
in normal scrolling use. No fix needed. (The reconnaissance pass hit the identical artifact
and documented it under the same reasoning for `mobile-390-sticky-actions.png`.)

### P3 — Route `<title>` is inherited from the root layout, not product-specific
The new route doesn't set its own `<title>`/metadata, so the browser tab shows the generic
site title instead of the product name. Not part of the Phase 3 checklist (no metadata/SEO
requirement listed) and doesn't affect any visible page content. Left as-is; flagged for a
future pass if per-page metadata is required.

### P3 — Native `<select>` caret vs. source's custom dropdown affordance
`VariantSelector` uses a plain native `<select>` (browser-default caret) rather than the
source's `.custom-dropdown` styling with its small pencil/edit icon overlay. Documented as a
P2/optional nicety in ASSETS.md and COMPONENT_MAP.md — the functional behavior (real
`<select>`, single "250 ml" option) is correct; only the caret icon styling differs. Not
fixed — cosmetic only, low value given there's only one option to select from on this SKU.

## Verified matching (no discrepancy)

- Global structure: header renders in `forceScrolled` state at all 3 breakpoints; breadcrumb
  text/links match real observed values exactly (`Trang chủ / Ưu đãi web - Nhóm áp dụng
  voucher / [Phiên Bản Mới] Dầu Tắm Hạnh Nhân`); container width, spacing, footer all reuse
  existing homepage/collections chrome unchanged.
- Gallery: 6-image slider order matches ASSETS.md; slide-0-only gift-tile panel confirmed
  (panel disappears on thumbnails 2-6); prev/next arrows functional; thumbnail active-state
  border; wishlist heart top-right of gallery.
- Hero row: genuine 2-column CSS grid at both 1440px and 768px (verified via
  `getComputedStyle` — `grid-template-columns: 348px 348px` at 768px, not just visual
  coincidence), stacks to 1 column at 390px.
- Buy box: price format, "Dung tích" select (single real option), quantity stepper
  (min-1 floor, `−` disables at 1, `+` uncapped), promo box + "Xem tất cả" modal (title,
  gift icon, "Giảm 5% tối đa 150k", "Cho đơn hàng tối thiểu 1,500k", "HSD: 31/08/2026",
  "Chi tiết", "Sao chép") all pixel/content-match the live modal captured during
  reconnaissance.
- Mobile-only qty+share row merge confirmed at 390px (qty left, share right, positioned
  above the promo box) vs. desktop's separate qty row + trailing share row — matches
  RESPONSIVE.md.
- Mobile-only outer "Chi tiết sản phẩm" accordion wrapper (chevron, open by default) present
  only below `md`, confirmed via DOM (`hidden md:block` / mobile branch) — both instances
  exist in the DOM simultaneously (same pattern already used by `SiteHeader`'s desktop/mobile
  branches), toggled via CSS, not JS-conditional rendering — consistent with existing
  codebase convention.
- Reviews: exact real empty-state shell (5 outline stars, "Dựa trên 0 đánh giá", "Viết đánh
  giá"/"Đặt câu hỏi" buttons, "Đánh giá 0"/"Câu hỏi & trả lời 0" tabs).
- Recommendations: "Gợi ý" heading + 2 real companion products (Almond Supple Skin Oil,
  Almond Milk Concentrate) rendered via the existing `ProductCard`/`ProductGrid` components
  unchanged — confirmed visually identical card treatment to `/collections/all`.
- Interactive cross-component state: wishlist toggle fills the heart solid and increments
  `SiteHeader`'s wishlist badge (0→1, confirmed live); Add to Cart increments both
  `SiteHeader`'s and `MobileBottomNav`'s cart badges and shows a toast confirmation
  ("Đã thêm vào giỏ hàng") — the documented local-mock scope decision (BEHAVIORS.md) instead
  of navigating to a real `/cart` page.
- No sticky/fixed Add-to-Cart bar at any breakpoint (confirmed absent, matching BEHAVIORS.md).
- `MobileBottomNav` present at 390/768, hidden at 1440 — unchanged shared component.

## Outcome

All P0 and P1 findings fixed. No unfixed P2s. Remaining P3s are cosmetic/non-functional and
left as documented, deliberate simplifications.
