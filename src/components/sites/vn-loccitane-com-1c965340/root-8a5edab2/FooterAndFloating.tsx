"use client";

import { useState } from "react";
import {
  ArrowDownIcon,
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  MessengerIcon,
  PhoneIcon,
  TiktokIcon,
  ZaloIcon,
} from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";
import { cn } from "@/lib/utils";

const ASSET_BASE = "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images";
const LOGO_SRC = "/sites/vn-loccitane-com-1c965340/shared/images/logo.svg";

const banners = [
  {
    title: "Chương Trình Khách Hàng Thân Thiết",
    description:
      "Tham gia chương trình khách hàng thân thiết của L'Occitane để nhận những ưu đãi độc quyền. Tìm hiểu thêm tại đây.",
    image: `${ASSET_BASE}/footer-loyalty.jpg`,
    href: "#",
  },
  {
    title: "Hệ Thống Cửa Hàng",
    description:
      "Nếu bạn cần tư vấn hoặc muốn trải nghiệm sản phẩm của L'Occitane, đội ngũ chuyên gia làm đẹp của chúng tôi luôn sẵn sàng đồng hành cùng bạn. Tìm cửa hàng gần bạn nhất tại đây.",
    image: `${ASSET_BASE}/footer-store.jpg`,
    href: "#",
  },
];

const infoLinks = [
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
];

const careLinks = [
  { label: "Hệ thống cửa hàng", href: "#" },
  { label: "Hướng dẫn mua hàng", href: "#" },
  { label: "Chính sách kiểm hàng", href: "#" },
  { label: "Chính sách bảo mật", href: "#" },
  { label: "Chính sách vận chuyển và giao nhận", href: "#" },
  { label: "Chính sách thanh toán", href: "#" },
  { label: "Chính sách đổi trả và hoàn tiền", href: "#" },
];

const socialLinks = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  {
    label: "Email",
    href: "mailto:vn.customerservice@loccitane.com",
    Icon: EmailIcon,
  },
  { label: "Tiktok", href: "#", Icon: TiktokIcon },
];

function AccordionSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border py-4 lg:border-none lg:py-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left lg:pointer-events-none lg:cursor-default"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold tracking-wide text-foreground">
          {title}
        </span>
        <ArrowDownIcon
          className={cn(
            "h-3 w-3 shrink-0 text-foreground transition-transform duration-200 lg:hidden",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid overflow-hidden transition-all duration-300 lg:!grid-rows-[1fr] lg:!block",
          isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 overflow-hidden lg:min-h-fit lg:overflow-visible lg:mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export function SiteFooter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <footer className="bg-background text-foreground">
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10">
        <div className="grid grid-cols-1 gap-8 border-b border-border pb-10 sm:grid-cols-2">
          {banners.map((banner, index) => (
            <a
              key={banner.title}
              href={banner.href}
              className={cn(
                "flex gap-4",
                index === 0 && "sm:border-r sm:border-border sm:pr-8"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={banner.image}
                alt={banner.title}
                className="h-12 w-12 shrink-0 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-foreground">
                  {banner.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {banner.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-0 py-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-10">
          {/* 1. Company info */}
          <div className="border-b border-border py-4 lg:border-none lg:py-0">
            <h3 className="text-sm font-semibold tracking-wide text-foreground">
              CÔNG TY CỔ PHẦN MỸ PHẨM LOCCITANE EN PROVINCE VIỆT NAM
            </h3>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <p>
                Mã số thuế: 0318493942 GPKD số 0318493942 Cấp ngày 23/06/2025
                tại Sở Tài Chính Thành Phố Hồ Chí Minh
              </p>
              <p>
                Địa chỉ trụ sở: Tầng 8, Tòa nhà Saigon Paragon Building, số 3
                Đường Nguyễn Lương Bằng, Phường Tân Mỹ, TP. Hồ Chí Minh, Việt
                Nam
              </p>
              <p>0911024272</p>
              <p>vn.customerservice@loccitane.com</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${ASSET_BASE}/footer-trust-badge.png`}
              alt="Đã thông báo Bộ Công Thương"
              className="mt-2 w-[120px]"
            />
          </div>

          {/* 2. THÔNG TIN */}
          <AccordionSection
            title="THÔNG TIN"
            isOpen={openIndex === 1}
            onToggle={() => toggle(1)}
          >
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionSection>

          {/* 3. CHĂM SÓC KHÁCH HÀNG */}
          <AccordionSection
            title="CHĂM SÓC KHÁCH HÀNG"
            isOpen={openIndex === 2}
            onToggle={() => toggle(2)}
          >
            <ul className="space-y-2">
              {careLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionSection>

          {/* 4. Mạng xã hội */}
          <AccordionSection
            title="Mạng xã hội"
            isOpen={openIndex === 3}
            onToggle={() => toggle(3)}
          >
            <ul className="space-y-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${ASSET_BASE}/footer-bcorp-badge.png`}
              alt="Certified B Corporation"
              className="mt-3 w-[60px]"
            />
          </AccordionSection>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <a href="#" className="inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_SRC} alt="L'Occitane en Provence" className="mx-auto h-8" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            Copyright © 2026 L&apos;Occitane Việt Nam.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-center gap-3">
      <button
        type="button"
        aria-label="Chat Zalo"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-white shadow-lg"
      >
        <ZaloIcon className="h-6 w-6" />
      </button>
      <a
        href="tel:0911024272"
        aria-label="Gọi điện thoại"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-white shadow-lg"
      >
        <PhoneIcon className="h-5 w-5" />
      </a>
      <a
        href="https://m.me/193955090673746"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn tin Messenger"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-white shadow-lg"
      >
        <MessengerIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
