"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MenuIcon,
  SearchIcon,
  AccountIcon,
  LocationIcon,
  HeartIcon,
  CartIcon,
  CloseIcon,
} from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";

const LOGO_SRC = "/sites/vn-loccitane-com-1c965340/shared/images/logo.png";

export function AnnouncementBar({
  onDismiss,
}: {
  onDismiss: () => void;
}) {
  return (
    <div className="sticky top-0 z-50 flex h-8 w-full items-center justify-center bg-secondary px-4 text-sm text-foreground">
      <a href="#" className="text-center">
        Gợi Ý Quà Tặng Rạng Rỡ Ngày Hè
      </a>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Đóng"
        className="absolute right-4 flex items-center justify-center"
      >
        <CloseIcon className="size-3" />
      </button>
    </div>
  );
}

interface SiteHeaderProps {
  onMenuClick: () => void;
  offsetTop?: number;
}

export function SiteHeader({ onMenuClick, offsetTop = 0 }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 90);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iconColorClass = scrolled ? "text-foreground" : "text-white";

  return (
    <header
      style={{ top: offsetTop }}
      className={`fixed z-50 w-full transition-all duration-300 ease-out ${
        scrolled
          ? "h-[62px] bg-[rgb(249,245,240)] shadow-[0_0_6px_0_rgba(0,0,0,0.15)]"
          : "h-[72px] bg-[rgba(0,0,0,0.47)] shadow-[0_10px_90px_60px_rgba(0,0,0,0.5)]"
      }`}
    >
      <div className="mx-auto hidden h-full max-w-[1600px] items-center justify-between px-10 sm:flex">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Mở menu"
            className={iconColorClass}
          >
            <MenuIcon className="size-[22px]" />
          </button>
          <div className="relative flex w-[280px] items-center">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className={`h-9 w-full rounded-full border bg-transparent pl-4 pr-9 text-sm placeholder:text-current focus:outline-none ${
                scrolled
                  ? "border-foreground/30 text-foreground"
                  : "border-white/40 text-white"
              }`}
            />
            <button
              type="button"
              aria-label="Tìm kiếm"
              className={`absolute right-3 flex items-center justify-center ${iconColorClass}`}
            >
              <SearchIcon className="size-4" />
            </button>
          </div>
        </div>

        <Link href="/" className="flex items-center">
          <img
            src={LOGO_SRC}
            alt="L'Occitane Việt Nam"
            className={`h-10 w-auto ${scrolled ? "" : "brightness-0 invert"}`}
          />
        </Link>

        <div className={`flex items-center gap-5 ${iconColorClass}`}>
          <a href="#" aria-label="Tài khoản">
            <AccountIcon className="size-[22px]" />
          </a>
          <a href="#" aria-label="Cửa hàng gần bạn">
            <LocationIcon className="size-[22px]" />
          </a>
          <button type="button" aria-label="Yêu thích" className="relative">
            <HeartIcon className="size-[22px]" />
            <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-foreground">
              0
            </span>
          </button>
          <button
            type="button"
            aria-label="Giỏ hàng"
            className="relative hidden sm:flex"
          >
            <CartIcon className="size-[22px]" />
            <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-foreground">
              0
            </span>
          </button>
        </div>
      </div>

      <div className="flex h-full flex-col justify-center gap-2 px-4 py-2 sm:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Mở menu"
              className={iconColorClass}
            >
              <MenuIcon className="size-[22px]" />
            </button>
            <Link href="/" className="flex items-center">
              <img
                src={LOGO_SRC}
                alt="L'Occitane Việt Nam"
                className={`h-8 w-auto ${
                  scrolled ? "" : "brightness-0 invert"
                }`}
              />
            </Link>
          </div>
          <div className={`flex items-center gap-4 ${iconColorClass}`}>
            <a href="#" aria-label="Tài khoản">
              <AccountIcon className="size-5" />
            </a>
            <button type="button" aria-label="Yêu thích" className="relative">
              <HeartIcon className="size-5" />
              <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-foreground">
                0
              </span>
            </button>
          </div>
        </div>
        <div className="relative flex w-full items-center">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className={`h-9 w-full rounded-full border bg-transparent pl-4 pr-9 text-sm placeholder:text-current focus:outline-none ${
              scrolled
                ? "border-foreground/30 text-foreground"
                : "border-white/40 text-white"
            }`}
          />
          <button
            type="button"
            aria-label="Tìm kiếm"
            className={`absolute right-3 flex items-center justify-center ${iconColorClass}`}
          >
            <SearchIcon className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default function SiteChrome({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  return (
    <>
      {announcementVisible && (
        <AnnouncementBar onDismiss={() => setAnnouncementVisible(false)} />
      )}
      <SiteHeader
        onMenuClick={onMenuClick}
        offsetTop={announcementVisible ? 32 : 0}
      />
    </>
  );
}
