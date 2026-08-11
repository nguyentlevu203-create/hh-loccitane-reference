# PromoStorySlider Specification

## Overview
- Target file: `src/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/PromoStorySlider.tsx` (`"use client"`)
- Screenshot: `docs/design-references/vn-loccitane-com-1c965340/root-8a5edab2/promo-carousel.png`
- Interaction model: click-driven carousel, 3 unique slides that loop. NOT scroll-driven, NOT autoplay. No heading above this section (starts directly with the slide content).

## Slide data (verbatim, real images)
```ts
const slides = [
  {
    title: "Dầu Tắm Hạnh Nhân",
    description: "Chuyển hoá từ kết cấu dầu sang lớp sữa mịn màng khi tiếp xúc với nước, nhẹ nhàng làm sạch và nuôi dưỡng làn da. Công thức giàu dầu hạnh nhân ngọt giúp làn da mềm mại, ẩm mượt và lưu lại hương hạnh nhân – vanilla ấm áp đầy mê hoặc.",
    image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/promo-shower-oil.jpg",
    href: "#",
    imagePosition: "left",
  },
  {
    title: "Dầu Dưỡng Thể Hạnh Nhân",
    description: "Dầu dưỡng thể nhẹ nhàng nhưng giàu dưỡng chất với dầu hạnh nhân và dầu hạt cải giúp làm mềm, săn chắc và mịn da, đồng thời lưu lại hương thơm hạnh nhân-vani tinh tế, hấp dẫn.",
    image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/promo-body-oil.jpg",
    href: "#",
    imagePosition: "right",
  },
  {
    title: "Tái Nạp, Tái Nạp Yêu Thương",
    description: "Chỉ có tại website chính thức và hệ thống cửa hàng. Một thay đổi nhỏ cho thói quen bền vững hơn, giúp giảm thiểu nhựa dùng một lần và trao cho bao bì thêm một vòng đời mới.",
    image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/promo-refill.png",
    href: "#",
    imagePosition: "left",
  },
];
```

## Structure
- Full-width section, `margin-top: 30px`, each slide: large image (roughly half-width, `aspect-[4/5]` or `aspect-square`, `object-cover`) paired with a text block (heading + paragraph + "Khám phá ngay" link) on the opposite side, alternating left/right per `imagePosition`.
- Only the active slide renders (simple index-based show/hide or a translateX track — either is fine); crossfade or slide transition ~300ms on index change.
- Controls row below the slide, centered, 3 parts:
  - Left: `‹ {previous slide's title}` (clicking goes to previous slide, wraps around)
  - Center: `{currentIndex + 1} / {slides.length}` e.g. "1 / 3"
  - Right: `{next slide's title} ›` (clicking goes to next slide, wraps around)
  - Use `PrevIcon`/`NextIcon` or literal `‹`/`›` characters inline before/after the text (site used literal `‹`/`›` characters) — `font-size: 14px`, `color: #3f2b2e`, hover underline.

## Heading/paragraph typography
- Heading: `font-size: 24px; font-weight: 500` (matches other section headings but left/right aligned with the text block, not centered).
- Paragraph: `font-size: 14px; line-height: 1.5; color: #3f2b2e; max-width: 480px`.
- CTA: "Khám phá ngay" link below paragraph, same style as Hero's CTA.

## Responsive
- Desktop 1440 & Tablet 768: side-by-side image + text (50/50 split).
- Mobile 390: stacks — image on top (full width), text block below, controls row remains centered beneath.

Verify with `npx tsc --noEmit` before finishing.
