"use client";

import { cn } from "@/lib/utils";

export function ProductThumbnails({
  images,
  activeIndex,
  onSelect,
}: {
  images: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-3 flex gap-2 overflow-x-auto">
      {images.map((image, index) => (
        <button
          key={image}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Hình ${index + 1}`}
          aria-current={index === activeIndex}
          className={cn(
            "aspect-square w-[70px] shrink-0 overflow-hidden rounded-[5px] border bg-card sm:w-[86px]",
            index === activeIndex ? "border-foreground" : "border-border"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="h-full w-full object-contain"
          />
        </button>
      ))}
    </div>
  );
}
