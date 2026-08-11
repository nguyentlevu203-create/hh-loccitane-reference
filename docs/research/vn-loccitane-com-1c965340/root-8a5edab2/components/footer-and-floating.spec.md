# SiteFooter + FloatingActions Specification

## Overview
- Target file: `src/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/FooterAndFloating.tsx` (`"use client"` — footer accordion needs local state)
- Exports: `SiteFooter`, `FloatingActions`
- Screenshot: `docs/design-references/vn-loccitane-com-1c965340/root-8a5edab2/footer.png`
- Interaction model: static content; RESPONSIVE structural change (desktop = expanded columns, tablet/mobile = accordion). FloatingActions is static/fixed.
- Import icons from shared: `FacebookIcon`, `InstagramIcon`, `TiktokIcon`, `EmailIcon`, `PhoneIcon`, `MessengerIcon`, `ZaloIcon`, `ArrowDownIcon`

## SiteFooter — loyalty/store banner (top of footer, 2 columns desktop → 1 column mobile)
```ts
const banners = [
  { title: "Chương Trình Khách Hàng Thân Thiết", description: "Tham gia chương trình khách hàng thân thiết của L'Occitane để nhận những ưu đãi độc quyền. Tìm hiểu thêm tại đây.", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/footer-loyalty.jpg", href: "#" },
  { title: "Hệ Thống Cửa Hàng", description: "Nếu bạn cần tư vấn hoặc muốn trải nghiệm sản phẩm của L'Occitane, đội ngũ chuyên gia làm đẹp của chúng tôi luôn sẵn sàng đồng hành cùng bạn. Tìm cửa hàng gần bạn nhất tại đây.", image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/footer-store.jpg", href: "#" },
];
```
Each: small icon/thumbnail image (~48px) + heading (`font-weight 600`) + description (`text-sm text-muted-foreground`), 2-column grid on desktop/tablet with a vertical divider between them, single column on mobile.

## SiteFooter — link groups
```ts
const linkGroups = [
  { title: "THÔNG TIN", links: [
    { label: "Về chúng tôi", href: "#" },
    { label: "Kỉ niệm 50 năm thành lập", href: "#" },
    { label: "Giá trị của chúng tôi", href: "#" },
    { label: "Doanh nghiệp B Corp™", href: "#" },
    { label: "Big Little Things", href: "#" },
    { label: "Sức khỏe & Làm đẹp", href: "#" },
    { label: "Chuỗi cung bền vững", href: "#" },
    { label: "Dịch vụ dành cho khách sạn", href: "#" },
    { label: "Quà tặng doanh nghiệp", href: "#" },
    { label: "L'Occitane Spa", href: "#" },
  ]},
  { title: "CHĂM SÓC KHÁCH HÀNG", links: [
    { label: "Hệ thống cửa hàng", href: "#" },
    { label: "Hướng dẫn mua hàng", href: "#" },
    { label: "Chính sách kiểm hàng", href: "#" },
    { label: "Chính sách bảo mật", href: "#" },
    { label: "Chính sách vận chuyển và giao nhận", href: "#" },
    { label: "Chính sách thanh toán", href: "#" },
    { label: "Chính sách đổi trả và hoàn tiền", href: "#" },
  ]},
];
```
Plus a first "company info" block (not a link list, just text): "CÔNG TY CỔ PHẦN MỸ PHẨM LOCCITANE EN PROVINCE VIỆT NAM" (heading), then: "Mã số thuế: 0318493942 GPKD số 0318493942 Cấp ngày 23/06/2025 tại Sở Tài Chính Thành Phố Hồ Chí Minh", address "Địa chỉ trụ sở: Tầng 8, Tòa nhà Saigon Paragon Building, số 3 Đường Nguyễn Lương Bằng, Phường Tân Mỹ, TP. Hồ Chí Minh, Việt Nam", phone "0911024272", email "vn.customerservice@loccitane.com" — all `text-xs text-muted-foreground` — plus the trust badge image `/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/footer-trust-badge.png` (small, ~120px wide) below.
Plus a 4th "Mạng xã hội" block: social links using `FacebookIcon`, `InstagramIcon`, `EmailIcon` (mailto), `TiktokIcon`, each icon + label inline, plus the B-Corp badge image `/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/footer-bcorp-badge.png` (~60px) beneath.

So the full footer is 4 blocks total, in this order: [Company info] [THÔNG TIN] [CHĂM SÓC KHÁCH HÀNG] [Mạng xã hội].

## Responsive structural change (not just reflow)
- **Desktop (≥1024px, Tailwind `lg:`):** all 4 blocks render as static expanded columns in a `grid grid-cols-4 gap-8` — no accordion chrome, `ArrowDownIcon` not rendered.
- **Tablet (768px) & Mobile (390px, i.e. `<lg`):** the SAME 4 blocks render as accordion rows — each block header is a button with the title + `ArrowDownIcon` (rotates 180deg when open) that toggles a `max-height`/`grid-rows` reveal of its content; collapsed by default. `grid-cols-2` at `sm:` (tablet), `grid-cols-1` below `sm:` (mobile) for the accordion row container itself (2 rows of 2 at tablet, 4 stacked rows at mobile).
- Implement with one `<details>`-free approach: local `openIndex: number | null` state array, conditionally apply the accordion classes only below `lg:` via Tailwind responsive variants on a SINGLE shared markup tree (e.g. always render a clickable header, but only show the chevron and constrain the content height below `lg:`; at `lg:` and above, force content to always be visible via `lg:!grid-rows-[1fr] lg:!block` overrides). Simplest correct approach: render two variants conditionally is also acceptable if it's cleaner — either is fine as long as the desktop screenshot (expanded, no chevron) and tablet/mobile screenshots (collapsed accordion) both match.

## Bottom bar
- Centered logo: `<img src="/sites/vn-loccitane-com-1c965340/shared/images/logo.svg" className="h-8 mx-auto" />`
- Copyright line centered beneath: "Copyright © 2026 L'Occitane Việt Nam." (link the site name to `#`).

## FloatingActions (separate export, rendered once at the page root, NOT inside the footer)
- Fixed bottom-right, `position: fixed; right: 24px; bottom: 24px`, stacked vertically with 12px gaps, 2 circular buttons (~48px, `bg-foreground text-white rounded-full flex items-center justify-center shadow-lg`):
  1. `PhoneIcon` — `href="tel:0911024272"`
  2. `MessengerIcon` — `href="https://m.me/193955090673746"` (icon has its own white/dark fill baked in, render at natural colors, no `currentColor` override needed)
- A third static circular button using `ZaloIcon` sits above these two (visual placeholder only — do not implement a real chat widget/iframe).

Verify with `npx tsc --noEmit` before finishing.
