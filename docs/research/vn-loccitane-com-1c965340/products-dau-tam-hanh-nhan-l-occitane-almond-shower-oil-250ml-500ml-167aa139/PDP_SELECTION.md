# Phase 3 — Representative PDP Selection

**Chosen page:** `/products/dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml`
("[Phiên Bản Mới] Dầu Tắm Hạnh Nhân" — Almond Shower Oil)

**Page key:** `products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139`
(slug `products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml` + first 8 hex
chars of SHA-256 of the pathname `167aa139`, per the convention established in
`root-8a5edab2` and `collections-all-acd0b3f1`.)

## Candidates surveyed

| Candidate | URL | Why rejected / accepted |
|---|---|---|
| `[Phiên Bản Mới] Kem Dưỡng Da Tay Hạnh Nhân` (Almond hand cream) | `/products/phien-ban-moi-kem-duong-da-tay-hanh-nhan` | Single size (150ml, static text not a selector), no promo pricing, 0 reviews. Rejected — no variant selector. |
| `Dầu Trẻ Hóa Da Hoa Cúc Trường Sinh` (Immortelle Precious Oil) | `/products/dau-tre-hoa-da-hoa-cuc-truong-sinh` | Single size (15ml), no promo pricing, 0 reviews. Rejected — no variant selector. |
| `Kem Tắm Bơ Đậu Mỡ Shea Shower Cream` | (search result only) | Out-of-stock ("Hết hàng") badge is useful for stock-state reference, but single size, no promo, thin content. Kept as a secondary reference for the out-of-stock badge, not primary. |
| **`[Phiên Bản Mới] Dầu Tắm Hạnh Nhân` (Almond Shower Oil)** | `/products/dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml` | **Selected.** Only candidate found with a real, working size **variant selector** (250ml / 500ml — confirmed via DOM as both a `combobox` and a `radio` group), a promo-code chip ("Giảm 5%") plus "Xem tất cả" voucher list, a gallery that mixes the product bottle shot with gift-with-purchase promo tiles, wishlist heart, quantity stepper, **both** Add to Cart and Buy Now (Mua Ngay) CTAs, share row (Facebook/Messenger/Twitter/Pinterest/copy-link), a numbered structured description (general info → ingredients → skin type → benefits → usage → storage) behind a "Xem thêm nội dung +" expand toggle, and a full review-widget shell (star summary, Viết đánh giá / Đặt câu hỏi CTAs, Đánh giá/Câu hỏi & trả lời tabs). |

## Known gaps on the live page (documented, not fabricated)

- **Reviews:** widget renders "Dựa trên 0 đánh giá" — this appears to be true site-wide (every
  product checked, across multiple categories, shows 0 reviews). The review **UI shell** is real
  and public; we clone that shell with an empty state rather than inventing review content.
- **Recommendations ("Gợi ý"):** heading renders with no product rail beneath it on this SKU (checked
  on fresh load and after building browsing history via `Sản phẩm đã xem`). Rather than leaving this
  empty, the PDP's own usage copy explicitly names two real, already-catalogued companion products —
  "Dầu Dưỡng Thể Hạnh Nhân (Almond Supple Skin Oil)" and "Kem Dưỡng Ẩm Da Hạnh Nhân (Almond Milk
  Concentrate)" — both of which already exist as real entries with real slugs/images/prices in
  `root-8a5edab2`'s `BestsellersCarousel.tsx` product data. The recommendations rail is seeded from
  that existing real catalog data, not placeholder content.

## Why this maximizes Phase 3 coverage

This single PDP is the only one found on the live catalogue that exercises essentially the full
checklist in one page: gallery + promo tiles, real variant selector, promo/voucher pricing UI,
qty stepper, wishlist, add-to-cart, buy-now, share, structured multi-section description, a real
(if emptied) reviews subsystem, and a recommendations slot — without requiring us to stitch
features together from multiple unrelated products.
