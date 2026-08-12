"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/commerce/CartContext";
import {
  CloseNavIcon,
  CloseIcon,
  PlusIcon,
  MinusIcon,
  CartIcon,
} from "./icons";

function formatVnd(amount: number): string {
  return `${amount.toLocaleString("en-US")}₫`;
}

export function CartDrawer() {
  const { items, subtotal, isOpen, close, setQty, removeItem } = useCart();
  const [checkoutNotice, setCheckoutNotice] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <>
      <div
        onClick={close}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[90] bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label="Giỏ hàng"
        className={cn(
          "fixed top-0 right-0 z-[100] flex h-screen w-full flex-col overflow-hidden bg-white transition-transform duration-300 ease-out lg:w-[420px]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <p className="text-base font-bold uppercase tracking-wide text-foreground">
            Giỏ hàng ({items.reduce((n, i) => n + i.qty, 0)})
          </p>
          <button type="button" onClick={close} aria-label="Đóng">
            <CloseNavIcon className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <CartIcon className="size-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Giỏ hàng của bạn đang trống.</p>
            <Link
              href="/collections/all"
              onClick={close}
              className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-white"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              {items.map((item) => (
                <div
                  key={`${item.slug}::${item.volume ?? ""}`}
                  className="flex gap-3 border-b border-border py-4"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={close}
                    className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-[5px] bg-card"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={close}
                        className="line-clamp-2 text-sm text-foreground hover:underline"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug, item.volume)}
                        aria-label="Xóa sản phẩm"
                        className="shrink-0 text-muted-foreground"
                      >
                        <CloseIcon className="size-3.5" />
                      </button>
                    </div>
                    {item.volume && (
                      <p className="mt-1 text-xs text-muted-foreground">{item.volume}</p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setQty(item.slug, item.volume, item.qty - 1)}
                          className="flex size-7 items-center justify-center rounded-[5px] border border-border"
                          aria-label="Giảm số lượng"
                        >
                          <MinusIcon className="size-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(item.slug, item.volume, item.qty + 1)}
                          className="flex size-7 items-center justify-center rounded-[5px] border border-border"
                          aria-label="Tăng số lượng"
                        >
                          <PlusIcon className="size-3" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-foreground">{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-6 py-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tạm tính</span>
                <span className="text-base font-medium text-foreground">{formatVnd(subtotal)}</span>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutNotice(true)}
                className="w-full rounded-[5px] bg-foreground py-3 text-sm font-medium text-white"
              >
                Thanh toán
              </button>
              {checkoutNotice && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Đây là bản demo tái tạo giao diện — chức năng thanh toán thật không nằm trong phạm
                  vi dự án.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
