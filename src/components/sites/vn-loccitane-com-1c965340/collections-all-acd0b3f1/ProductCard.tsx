"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { HeartIcon } from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";
import { useWishlist } from "@/lib/commerce/WishlistContext";
import type { Product } from "./types";

const QUICK_VIEW_ICON =
  "/sites/vn-loccitane-com-1c965340/shared/images/quick-view-icon.svg";

function discountPercent(price: string, originalPrice: string): number {
  const toNumber = (s: string) => Number(s.replace(/[^\d]/g, ""));
  const current = toNumber(price);
  const original = toNumber(originalPrice);
  if (!original) return 0;
  return Math.round((1 - current / original) * 100);
}

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView: (product: Product) => void;
}) {
  const wishlist = useWishlist();
  const wishlisted = wishlist.isWishlisted(product.slug);
  const onSale = Boolean(product.originalPrice);

  return (
    <div className="group relative overflow-hidden rounded-[5px] bg-card pb-3">
      <div className="relative aspect-square">
        {onSale && (
          <span className="absolute top-2 left-2 z-10 rounded-tl-sm rounded-br-sm bg-foreground px-1.5 py-0.5 text-xs text-white">
            -{discountPercent(product.price, product.originalPrice!)}%
          </span>
        )}
        <Link href={`/products/${product.slug}`} className="block h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </Link>
        <button
          type="button"
          aria-label="Yêu thích"
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
          className="absolute top-2 right-2 z-10"
        >
          <HeartIcon
            className={cn(
              "size-[22px]",
              wishlisted ? "text-destructive" : "text-foreground"
            )}
          />
        </button>
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100"
          aria-label="Xem nhanh"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={QUICK_VIEW_ICON} alt="" className="h-8 w-8" />
        </button>
      </div>
      <Link href={`/products/${product.slug}`} className="block px-3 pt-3">
        <p className="line-clamp-2 text-sm leading-[19.6px] text-foreground">
          {product.name}
        </p>
        {product.volume && (
          <p className="mt-1 text-xs text-muted-foreground">{product.volume}</p>
        )}
        <div className="mt-2">
          {onSale ? (
            <div className="flex items-center gap-2">
              <p className="text-base font-medium text-foreground">
                {product.price}
              </p>
              <p className="text-[13px] text-muted-foreground line-through">
                {product.originalPrice}
              </p>
            </div>
          ) : (
            <p className="text-sm text-foreground">{product.price}</p>
          )}
        </div>
      </Link>
    </div>
  );
}
