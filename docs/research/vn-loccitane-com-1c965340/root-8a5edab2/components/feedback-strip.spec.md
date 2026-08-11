# FeedbackStrip Specification

## Overview
- Target file: `src/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/FeedbackStrip.tsx`
- Screenshot: `docs/design-references/vn-loccitane-com-1c965340/root-8a5edab2/membership-feedback.png` (bottom portion, if visible) — otherwise match general spacing/typography from the desktop full-page reference.
- Interaction model: static

## Structure
- Centered content block, `max-width: 1170px`, `padding-bottom: 30px; margin-bottom: 30px`, `text-align: center`.
- Heading: "Giúp chúng tôi phục vụ bạn tốt hơn!" — `font-size: 24px; font-weight: 700; text-transform: uppercase; line-height: 33.6px`.
- Paragraph: "Chúng tôi cam kết không ngừng nâng cao chất lượng sản phẩm và dịch vụ. Rất mong bạn phản hồi một vài câu hỏi liên quan đến trải nghiệm mua sắm gần đây" — `font-size: 14px; color: #3f2b2e; max-width: 600px; margin: 0 auto`.
- CTA button below: "Bắt đầu" (links to `https://loccitane.typeform.com/vnnps` — this external survey link is fine to keep real since it's not app backend), styled as a solid button: `bg-primary text-foreground px-8 py-2 rounded-full text-sm font-medium mt-4`.

## Service tiles grid (6 tiles, real text content — no real thumbnail images were recoverable from the live site's lazy-loaded carousel, so use a flat icon-less tile: colored `bg-secondary` (#f2e9db) square with a simple centered Lucide icon as a stand-in, NOT a fabricated photo)
```ts
const tiles = [
  { title: "DỊCH VỤ GÓI QUÀ", description: "Liên hệ chăm sóc khách hàng để tìm hiểu thêm.", href: "#" },
  { title: "CHĂM SÓC KHÁCH HÀNG", description: "Đội ngũ chuyên viên của L'Occitane luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn.", href: "#" },
  { title: "GIAO HÀNG MIỄN PHÍ", description: "Miễn phí vận chuyển cho mọi đơn hàng từ 1.500.000 VND trở lên.", href: "#" },
  { title: "HỆ THỐNG CỬA HÀNG", description: "Khám phá cửa hàng L'OCCITANE gần bạn nhất để trải nghiệm trực tiếp sản phẩm.", href: "#" },
  { title: "MẪU THỬ MIỄN PHÍ", description: "Mỗi đơn hàng đều đi kèm sản phẩm mẫu để bạn khám phá và trải nghiệm thêm.", href: "#" },
  { title: "CHƯƠNG TRÌNH THÀNH VIÊN", description: "Tham gia thành viên để nhận quà tặng, ưu đãi và quyền lợi độc quyền.", href: "#" },
];
```
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`, each tile a link card: thumbnail block on the left (`bg-secondary size-16 rounded-sm flex items-center justify-center`, put a small `Gift`/`Headset`/`Truck`/`Store`/`Package`/`Users` Lucide icon matching each title's meaning inside — import from `lucide-react`), title + description stacked to the right (`title: font-weight 600 text-sm uppercase`, `description: text-xs text-muted-foreground`).

## Responsive
- Desktop 1440: 3 columns (2 rows of 3).
- Tablet 768: 2 columns.
- Mobile 390: 1 column, stacked.

Verify with `npx tsc --noEmit` before finishing.
