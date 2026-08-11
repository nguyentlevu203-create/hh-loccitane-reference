import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Gift, Headset, Truck, Store, Package, Users } from "lucide-react";

interface FeedbackTile {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const tiles: FeedbackTile[] = [
  {
    title: "DỊCH VỤ GÓI QUÀ",
    description: "Liên hệ chăm sóc khách hàng để tìm hiểu thêm.",
    href: "#",
    icon: Gift,
  },
  {
    title: "CHĂM SÓC KHÁCH HÀNG",
    description:
      "Đội ngũ chuyên viên của L'Occitane luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn.",
    href: "#",
    icon: Headset,
  },
  {
    title: "GIAO HÀNG MIỄN PHÍ",
    description: "Miễn phí vận chuyển cho mọi đơn hàng từ 1.500.000 VND trở lên.",
    href: "#",
    icon: Truck,
  },
  {
    title: "HỆ THỐNG CỬA HÀNG",
    description:
      "Khám phá cửa hàng L'OCCITANE gần bạn nhất để trải nghiệm trực tiếp sản phẩm.",
    href: "#",
    icon: Store,
  },
  {
    title: "MẪU THỬ MIỄN PHÍ",
    description:
      "Mỗi đơn hàng đều đi kèm sản phẩm mẫu để bạn khám phá và trải nghiệm thêm.",
    href: "#",
    icon: Package,
  },
  {
    title: "CHƯƠNG TRÌNH THÀNH VIÊN",
    description:
      "Tham gia thành viên để nhận quà tặng, ưu đãi và quyền lợi độc quyền.",
    href: "#",
    icon: Users,
  },
];

export default function FeedbackStrip() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-[1170px] pb-[30px] mb-[30px] text-center">
        <h2 className="text-2xl font-bold uppercase leading-[33.6px]">
          Giúp chúng tôi phục vụ bạn tốt hơn!
        </h2>
        <p className="mx-auto max-w-[600px] text-sm">
          Chúng tôi cam kết không ngừng nâng cao chất lượng sản phẩm và dịch vụ. Rất
          mong bạn phản hồi một vài câu hỏi liên quan đến trải nghiệm mua sắm gần đây
        </p>
        <a
          href="https://loccitane.typeform.com/vnnps"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-full bg-primary px-8 py-2 text-sm font-medium text-foreground"
        >
          Bắt đầu
        </a>
      </div>

      <div className="mx-auto grid max-w-[1170px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.title}
              href={tile.href}
              className="flex items-center gap-4"
            >
              <div className="flex size-16 shrink-0 items-center justify-center rounded-sm bg-secondary">
                <Icon size={24} className="text-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase">{tile.title}</p>
                <p className="text-xs text-muted-foreground">{tile.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
