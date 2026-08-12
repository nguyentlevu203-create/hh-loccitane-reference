"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/commerce/CartContext";
import { HomeIcon, ConsultIcon, CartIcon } from "./icons";

const navLinks = [
  { key: "home", label: "Trang chủ", href: "/", Icon: HomeIcon },
  { key: "consult", label: "Tư vấn", href: "#", Icon: ConsultIcon },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();
  const cart = useCart();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[60] flex h-[50px] items-center justify-around bg-background px-2.5 py-1 shadow-[0_-1px_3px_rgba(0,0,0,0.1)] lg:hidden"
      aria-label="Điều hướng nhanh"
    >
      {navLinks.map(({ key, label, href, Icon }) => {
        const active = href === pathname;
        return (
          <Link
            key={key}
            href={href}
            className={cn(
              "flex flex-col items-center gap-0.5 text-[11px]",
              active ? "text-foreground" : "text-foreground/60"
            )}
          >
            <Icon className="size-5" />
            <span>{label}</span>
          </Link>
        );
      })}
      <button
        type="button"
        onClick={cart.open}
        className="flex flex-col items-center gap-0.5 text-[11px] text-foreground/60"
      >
        <span className="relative">
          <CartIcon className="size-5" />
          <span className="absolute -right-2 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-primary text-[8px] text-foreground">
            {cart.count}
          </span>
        </span>
        <span>Giỏ hàng</span>
      </button>
    </nav>
  );
}
