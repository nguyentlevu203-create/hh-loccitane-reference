"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  HeartIcon,
  PrevIcon,
  NextIcon,
} from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";
import { ProductThumbnails } from "./ProductThumbnails";
import type { ProductGiftPanelTile } from "./types";

export function ProductGallery({
  images,
  giftPanel,
  productLabel,
  wishlisted,
  onToggleWishlist,
}: {
  images: string[];
  giftPanel?: ProductGiftPanelTile[];
  productLabel?: string;
  wishlisted: boolean;
  onToggleWishlist: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const showGiftPanel = activeIndex === 0 && giftPanel && giftPanel.length > 0;

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () =>
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          onClick={onToggleWishlist}
          aria-label="Yêu thích"
          className="absolute top-2 right-2 z-10"
        >
          <HeartIcon
            className={cn(
              "size-5 text-foreground",
              wishlisted && "fill-current"
            )}
          />
        </button>

        <div
          className={cn(
            "flex items-stretch gap-3",
            !showGiftPanel && "block"
          )}
        >
          <div className="relative aspect-square flex-1 bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activeIndex]}
              alt=""
              className="h-full w-full object-contain"
            />
          </div>

          {showGiftPanel && (
            <div className="hidden w-[38%] shrink-0 flex-col gap-3 sm:flex">
              {giftPanel.map((tile) => (
                <div
                  key={tile.threshold}
                  className="flex flex-1 flex-col items-center justify-center rounded-[5px] bg-secondary p-3 text-center"
                >
                  <span className="text-xs font-medium text-foreground">
                    🎁 {tile.threshold}
                  </span>
                  <span className="mt-1 text-[11px] text-muted-foreground">
                    {tile.caption}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Hình trước"
              className="absolute top-1/2 left-0 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
            >
              <PrevIcon className="h-3 w-3 text-foreground" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Hình tiếp theo"
              className="absolute top-1/2 right-0 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
            >
              <NextIcon className="h-3 w-3 text-foreground" />
            </button>
          </>
        )}
      </div>

      {productLabel && activeIndex === 0 && (
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {productLabel}
        </p>
      )}

      <ProductThumbnails
        images={images}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
    </div>
  );
}
