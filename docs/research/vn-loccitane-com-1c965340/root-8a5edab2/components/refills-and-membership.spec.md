# RefillsBanner + MembershipPerks Specification

Two small static sections, bundled into one file since both are simple and adjacent in the page flow.

- Target file: `src/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/RefillsAndMembership.tsx`
- Exports: `RefillsBanner`, `MembershipPerks` (both default-exportable or named — export both named)
- Screenshots: `docs/design-references/vn-loccitane-com-1c965340/root-8a5edab2/refills-banner.png`, `.../membership-feedback.png` (top portion)
- Interaction model: static (RefillsBanner has an autoplaying video; MembershipPerks is fully static)

## RefillsBanner
- Full-bleed section, `margin-top: 30px`, `position: relative`, similar treatment to Hero: `<video autoPlay muted loop playsInline>` filling the container, `object-cover`.
  - `src="/sites/vn-loccitane-com-1c965340/root-8a5edab2/videos/refills.mp4"`
- Text overlay, this time centered (not bottom-left like Hero): "REFILLS REIMAGINED" in large uppercase serif, white, `letter-spacing: 0.05em`, plus a "Khám phá ngay" CTA link beneath it, both centered both horizontally and vertically over the video. Add a `bg-black/30` full-cover scrim behind the text for legibility.
- Height: `aspect-[16/9]` or `min-h-[500px]` on desktop, scales down proportionally on mobile (`min-h-[300px]`).

## MembershipPerks
- `<section>` with `padding-top: 30px`, centered heading "ĐẶC QUYỀN CHO THÀNH VIÊN" (same style as other section headings: 24px/500/serif/centered/underline rule).
- 3-column row (`grid grid-cols-1 md:grid-cols-3 gap-6`) of cards:
```ts
const perks = [
  {
    title: "VOUCHER 10% & MIỄN PHÍ VẬN CHUYỂN",
    description: "Ưu đãi dành riêng thành viên của L'Occitane",
    image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/membership-voucher.jpg",
    href: "#",
    ctaLabel: "Đăng ký ngay ›",
  },
  {
    title: "MUA HÀNG VÀ TÍCH ĐIỂM",
    description: "Trở thành thành viên L'Occitane để nhận ưu đãi mua hàng và tích điểm dành riêng website",
    image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/membership-points.jpg",
    href: "#",
    ctaLabel: "Khám phá ngay ›",
  },
  {
    title: "ƯU ĐÃI ĐỘC QUYỀN",
    description: "Ưu đãi độc quyền dành riêng khách hàng tại kênh website",
    image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/membership-exclusive.jpg",
    href: "#",
    ctaLabel: "Khám phá ngay ›",
  },
];
```
- Card: image on top (`aspect-[4/3] object-cover rounded-sm`), then title (`font-weight: 700; font-size: 16px; uppercase`), description (`text-sm text-muted-foreground`), then the CTA link (`text-sm underline-on-hover`) — all left-aligned within the card, image full-bleed to card edges, text padded (~16px).

Verify with `npx tsc --noEmit` before finishing.
