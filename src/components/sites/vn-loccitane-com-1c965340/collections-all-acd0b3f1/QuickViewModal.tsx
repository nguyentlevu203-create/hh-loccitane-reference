"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  CloseNavIcon,
  CartIcon,
  HeartIcon,
  PlusIcon,
  MinusIcon,
} from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";
import { useCart } from "@/lib/commerce/CartContext";
import { useWishlist } from "@/lib/commerce/WishlistContext";
import { useQuickView } from "@/lib/commerce/QuickViewContext";
import type { Product } from "./types";

// Keyed by product.slug from the parent below, so qty/added reset for free on remount whenever a
// different product opens — no effect needed to sync state to the changing `product` prop.
function QuickViewModalContent({ product, onClose }: { product: Product; onClose: () => void }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const cart = useCart();
  const wishlist = useWishlist();
  const wishlisted = wishlist.isWishlisted(product.slug);

  const handleAddToCart = () => {
    cart.addItem(
      {
        slug: product.slug,
        sku: product.sku,
        name: product.name,
        image: product.image,
        price: product.price,
        volume: product.volume,
      },
      qty,
    );
    setAdded(true);
  };

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-[110] bg-black/50"
      />
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className="relative flex w-full max-w-[900px] flex-col gap-6 rounded-lg bg-white p-4 shadow-xl sm:flex-row sm:p-6"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="absolute top-4 right-4"
          >
            <CloseNavIcon className="size-5" />
          </button>

          <button
            type="button"
            onClick={() =>
              wishlist.toggle({
                slug: product.slug,
                sku: product.sku,
                name: product.name,
                image: product.image,
                price: product.price,
                volume: product.volume,
              })
            }
            aria-label="Yêu thích"
            className="absolute top-4 right-14"
          >
            <HeartIcon className={cn("size-5", wishlisted ? "text-destructive" : "text-foreground")} />
          </button>

          <div className="mx-auto w-full max-w-[280px] shrink-0 sm:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-contain"
            />
          </div>

          <div className="flex flex-1 flex-col pt-2">
            <h3 className="text-xl font-medium text-foreground">{product.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              SKU:{" "}
              <span className="text-foreground">{product.sku}</span>{" "}
              <span className="ml-2 rounded-[3px] bg-[#38bf57] px-[7px] py-[2px] text-[11px] text-white">
                Còn hàng
              </span>
            </p>
            <p className="mt-3 text-lg font-medium text-foreground">{product.price}</p>

            {product.volume && (
              <div className="mt-4">
                <p className="mb-2 text-sm text-foreground">
                  Dung tích: {product.volume}
                </p>
                <span className="inline-block rounded-[5px] border border-foreground bg-foreground px-2 py-2 text-sm text-white">
                  {product.volume}
                </span>
              </div>
            )}

            <div className="mt-4 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setQty((v) => Math.max(1, v - 1))}
                className="flex size-8 items-center justify-center rounded-[5px] border border-border"
                aria-label="Giảm số lượng"
              >
                <MinusIcon className="size-3.5" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((v) => v + 1)}
                className="flex size-8 items-center justify-center rounded-[5px] border border-border"
                aria-label="Tăng số lượng"
              >
                <PlusIcon className="size-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-4 flex items-center justify-center gap-2 rounded-[5px] bg-foreground py-3 text-sm font-medium text-white"
            >
              <CartIcon className="size-4 text-white" />
              {added ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}
            </button>

            <a href={`/products/${product.slug}`} className="mt-3 text-sm text-foreground underline">
              Xem chi tiết »
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function QuickViewModal() {
  const { product, close } = useQuickView();
  if (!product) return null;
  return <QuickViewModalContent key={product.slug} product={product} onClose={close} />;
}
