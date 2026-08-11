# BestsellersCarousel Specification

## Overview
- Target file: `src/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/BestsellersCarousel.tsx` (`"use client"`)
- Screenshot: `docs/design-references/vn-loccitane-com-1c965340/root-8a5edab2/bestsellers.png`
- Interaction model: click-driven carousel (Next/Prev arrow buttons advance by one visible page). NOT scroll-driven, NOT autoplay.

## Section wrapper
- `<section>` with `margin-top: 50px`, centered heading: "SẢN PHẨM ĐƯỢC YÊU THÍCH" — `font-size: 24px; font-weight: 500; font-family: var(--font-sans); color: #3f2b2e`, centered, with a short underline rule beneath it (~40px wide, 2px, `bg-foreground`).
- Below the heading: the carousel track + a circular Next button (`NextIcon`, from shared icons) positioned at the vertical center of the track, right edge. Show a Prev button (`PrevIcon`) once the user has advanced past the first page (i.e. `currentIndex > 0`).

## Product data (verbatim from live site — use this exact array)
```ts
const products = [
  { slug: "dau-duong-the-hanh-nhan-almond-supple-skin-oil", name: "[Phiên Bản Mới] Dầu Dưỡng Thể Hạnh Nhân", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-body-oil.png", originalPrice: "2,170,000đ", price: "1,790,000₫" },
  { slug: "kem-duong-am-san-chac-da-hanh-nhan-br-almond-milk-concentrate", name: "[Phiên Bản Mới] Kem Dưỡng Ẩm Săn Chắc Da Hạnh Nhân", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-milk-concentrate.png", originalPrice: "2,480,000đ", price: "1,990,000₫" },
  { slug: "dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml", name: "[Phiên Bản Mới] Dầu tắm Hạnh Nhân", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-shower-oil-a.png", originalPrice: "250 ml", price: "890,000₫" },
  { slug: "dau-tam-hanh-nhan-almond-shower-oil-500ml", name: "[Phiên Bản Mới] Dầu Tắm Hạnh Nhân", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-shower-oil-b.png", originalPrice: "1,880,000đ", price: "1,490,000₫" },
  { slug: "dau-tam-hanh-nhan-5", name: "[Phiên Bản Mới] Refill Dầu tắm Hạnh Nhân", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-body-oil.png", originalPrice: "1,530,000đ", price: "1,290,000₫" },
  { slug: "kem-duong-da-tay-20-bo-dau-mo-l-occitane-150ml-duong-am", name: "Kem Dưỡng Da Tay 20% Bơ Đậu Mỡ", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-milk-concentrate.png", originalPrice: "150ML", price: "990,000₫" },
  { slug: "sua-rua-mat-chong-lao-hoa-cuc-truong-sinh", name: "Sữa Rửa Mặt Tạo Bọt Cúc Trường Sinh", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-shower-oil-a.png", originalPrice: "1,770,000đ", price: "1,390,000₫" },
  { slug: "dau-duong-tre-hoa-da-cuc-truong-sinh-immortelle-divine-youth-oil", name: "Dầu Dưỡng Trẻ Hoá Da Cúc Trường Sinh", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-shower-oil-b.png", originalPrice: "4,310,000đ", price: "3,190,000₫" },
  { slug: "bo-cham-soc-co-the-hanh-nhan-2", name: "[Phiên Bản Mới] Bộ Chăm Sóc Cơ Thể Hạnh Nhân", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-body-oil.png", originalPrice: "4,610,000đ", price: "3,570,000₫" },
  { slug: "bo-dau-duong-the-hanh-nhan-va-chai-refills", name: "[Phiên Bản Mới] Bộ Dầu Dưỡng Thể Hạnh Nhân Và Chai Refill", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-milk-concentrate.png", originalPrice: "4,470,000đ", price: "3,380,000₫" },
  { slug: "bo-dau-tam-hanh-nhan-va-chai-refill-1", name: "[Phiên Bản Mới] Bộ Dầu Tắm Hạnh Nhân Và Chai Refill", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-shower-oil-a.png", originalPrice: "3,870,000đ", price: "2,780,000₫" },
  { slug: "bo-dau-tam-va-dau-duong-the-hanh-nhan-refills", name: "[Phiên Bản Mới] Bộ Refill Dầu Tắm Và Dầu Dưỡng Thể Hạnh Nhân", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-shower-oil-b.png", originalPrice: "3,960,000đ", price: "2,880,000₫" },
];
```
Note: products 5–12 reuse the 4 real downloaded product photos as placeholders (the live carousel virtualizes off-screen slides so their exact photos couldn't be captured) — this is a documented, intentional gap, not a guess at new content.

## Card structure (per product)
- `background-color: #f8f4ef` (`bg-card`), `border-radius: 5px`, `padding: 0 0 10px`, fixed width ~200px on desktop, `overflow: hidden`, `position: relative`.
- Image area: square, `aspect-square`, `object-fit: contain` (product PNGs have transparent backgrounds), padded.
- Wishlist `HeartIcon` button, top-right of the image, 16px, outline style, `absolute top-2 right-2`.
- Quick-view overlay: centered magnifier icon using `/sites/vn-loccitane-com-1c965340/shared/images/quick-view-icon.svg` as an `<img>`, `opacity-0 group-hover:opacity-100 transition-opacity duration-200`, centered absolutely over the image on hover (wrap the card in `className="group"`).
- Below image: product name (`font-size: 14px; line-height: 19.6px; color: #3f2b2e`, 2-line clamp), then price row: if `originalPrice` looks like a price (contains "đ" or "₫") show it with `line-through text-muted-foreground text-sm` above the sale price in `text-destructive font-medium` (#e50000); if `originalPrice` is a size string (e.g. "250 ml", "150ML") render it as plain unstruck text instead of strikethrough.

## Responsive (visible cards per "page")
- Desktop (≥1024px): 4 cards visible.
- Tablet (640–1023px): 3 cards visible.
- Mobile (<640px): 2 cards visible, replace the Next/Prev arrow controls with a thin horizontal progress bar beneath the track reflecting scroll position (a simple `bg-foreground` div whose width/position reflects `currentIndex / totalPages`).
- Implement via a horizontally-scrolling flex track (`overflow-x-hidden`, translateX driven by `currentIndex * cardWidth`) rather than CSS Grid, since this is a slide carousel, not a static grid.

Verify with `npx tsc --noEmit` before finishing.
