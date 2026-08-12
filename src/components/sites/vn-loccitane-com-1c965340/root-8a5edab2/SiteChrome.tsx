"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  MenuIcon,
  SearchIcon,
  AccountIcon,
  LocationIcon,
  HeartIcon,
  CartIcon,
  CloseIcon,
} from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";
import { CartDrawer } from "@/components/sites/vn-loccitane-com-1c965340/shared/CartDrawer";
import { SearchOverlay } from "@/components/sites/vn-loccitane-com-1c965340/shared/SearchOverlay";
import { QuickViewModal } from "@/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/QuickViewModal";
import { useCart } from "@/lib/commerce/CartContext";
import { useWishlist } from "@/lib/commerce/WishlistContext";
import { useSearchOverlay } from "@/lib/commerce/SearchContext";

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
  forceScrolled?: boolean;
}

export function SiteHeader({
  onMenuClick,
  offsetTop = 0,
  forceScrolled = false,
}: SiteHeaderProps) {
  const [scrolledState, setScrolledState] = useState(false);
  const scrolled = forceScrolled || scrolledState;
  const cart = useCart();
  const wishlist = useWishlist();
  const searchOverlay = useSearchOverlay();

  useEffect(() => {
    if (forceScrolled) return;
    const handleScroll = () => {
      setScrolledState(window.scrollY >= 90);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceScrolled]);

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
            <button
              type="button"
              onClick={searchOverlay.open}
              className={`h-9 w-full rounded-full border bg-transparent pl-4 pr-9 text-left text-sm ${
                scrolled
                  ? "border-foreground/30 text-foreground/60"
                  : "border-white/40 text-white/70"
              }`}
            >
              Tìm kiếm
            </button>
            <button
              type="button"
              onClick={searchOverlay.open}
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
          <Link href="/wishlist" aria-label="Yêu thích" className="relative">
            <HeartIcon className={cn("size-[22px]", wishlist.count > 0 && "text-destructive")} />
            <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-foreground">
              {wishlist.count}
            </span>
          </Link>
          <button
            type="button"
            aria-label="Giỏ hàng"
            onClick={cart.open}
            className="relative hidden sm:flex"
          >
            <CartIcon className="size-[22px]" />
            <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-foreground">
              {cart.count}
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
            <Link href="/wishlist" aria-label="Yêu thích" className="relative">
              <HeartIcon className={cn("size-5", wishlist.count > 0 && "text-destructive")} />
              <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-foreground">
                {wishlist.count}
              </span>
            </Link>
          </div>
        </div>
        <div className="relative flex w-full items-center">
          <button
            type="button"
            onClick={searchOverlay.open}
            className={`h-9 w-full rounded-full border bg-transparent pl-4 pr-9 text-left text-sm ${
              scrolled
                ? "border-foreground/30 text-foreground/60"
                : "border-white/40 text-white/70"
            }`}
          >
            Tìm kiếm
          </button>
          <button
            type="button"
            onClick={searchOverlay.open}
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
  forceScrolled = false,
}: {
  onMenuClick: () => void;
  forceScrolled?: boolean;
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
        forceScrolled={forceScrolled}
      />
      <CartDrawer />
      <SearchOverlay />
      <QuickViewModal />
    </>
  );
}
