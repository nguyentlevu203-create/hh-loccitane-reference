"use client";

import { useEffect, useRef, useState } from "react";
import {
  HeartIcon,
  NextIcon,
  PrevIcon,
} from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";
import type { Product } from "./types";

const QUICK_VIEW_ICON =
  "/sites/vn-loccitane-com-1c965340/shared/images/quick-view-icon.svg";

const GAP = 16;

const products: Product[] = [
  {
    slug: "dau-duong-the-hanh-nhan-almond-supple-skin-oil",
    name: "[Phiên Bản Mới] Dầu Dưỡng Thể Hạnh Nhân",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-body-oil.png",
    originalPrice: "2,170,000đ",
    price: "1,790,000₫",
  },
  {
    slug: "kem-duong-am-san-chac-da-hanh-nhan-br-almond-milk-concentrate",
    name: "[Phiên Bản Mới] Kem Dưỡng Ẩm Săn Chắc Da Hạnh Nhân",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-milk-concentrate.png",
    originalPrice: "2,480,000đ",
    price: "1,990,000₫",
  },
  {
    slug: "dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml",
    name: "[Phiên Bản Mới] Dầu tắm Hạnh Nhân",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-shower-oil-a.png",
    originalPrice: "250 ml",
    price: "890,000₫",
  },
  {
    slug: "dau-tam-hanh-nhan-almond-shower-oil-500ml",
    name: "[Phiên Bản Mới] Dầu Tắm Hạnh Nhân",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-shower-oil-b.png",
    originalPrice: "1,880,000đ",
    price: "1,490,000₫",
  },
  {
    slug: "dau-tam-hanh-nhan-5",
    name: "[Phiên Bản Mới] Refill Dầu tắm Hạnh Nhân",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-body-oil.png",
    originalPrice: "1,530,000đ",
    price: "1,290,000₫",
  },
  {
    slug: "kem-duong-da-tay-20-bo-dau-mo-l-occitane-150ml-duong-am",
    name: "Kem Dưỡng Da Tay 20% Bơ Đậu Mỡ",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-milk-concentrate.png",
    originalPrice: "150ML",
    price: "990,000₫",
  },
  {
    slug: "sua-rua-mat-chong-lao-hoa-cuc-truong-sinh",
    name: "Sữa Rửa Mặt Tạo Bọt Cúc Trường Sinh",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-shower-oil-a.png",
    originalPrice: "1,770,000đ",
    price: "1,390,000₫",
  },
  {
    slug: "dau-duong-tre-hoa-da-cuc-truong-sinh-immortelle-divine-youth-oil",
    name: "Dầu Dưỡng Trẻ Hoá Da Cúc Trường Sinh",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-shower-oil-b.png",
    originalPrice: "4,310,000đ",
    price: "3,190,000₫",
  },
  {
    slug: "bo-cham-soc-co-the-hanh-nhan-2",
    name: "[Phiên Bản Mới] Bộ Chăm Sóc Cơ Thể Hạnh Nhân",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-body-oil.png",
    originalPrice: "4,610,000đ",
    price: "3,570,000₫",
  },
  {
    slug: "bo-dau-duong-the-hanh-nhan-va-chai-refills",
    name: "[Phiên Bản Mới] Bộ Dầu Dưỡng Thể Hạnh Nhân Và Chai Refill",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-milk-concentrate.png",
    originalPrice: "4,470,000đ",
    price: "3,380,000₫",
  },
  {
    slug: "bo-dau-tam-hanh-nhan-va-chai-refill-1",
    name: "[Phiên Bản Mới] Bộ Dầu Tắm Hạnh Nhân Và Chai Refill",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-shower-oil-a.png",
    originalPrice: "3,870,000đ",
    price: "2,780,000₫",
  },
  {
    slug: "bo-dau-tam-va-dau-duong-the-hanh-nhan-refills",
    name: "[Phiên Bản Mới] Bộ Refill Dầu Tắm Và Dầu Dưỡng Thể Hạnh Nhân",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-shower-oil-b.png",
    originalPrice: "3,960,000đ",
    price: "2,880,000₫",
  },
];

function isStruckPrice(originalPrice: string | undefined): boolean {
  if (!originalPrice) return false;
  return originalPrice.includes("đ") || originalPrice.includes("₫");
}

export default function BestsellersCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    function updateVisibleCount() {
      const width = window.innerWidth;
      if (width >= 1024) setVisibleCount(4);
      else if (width >= 640) setVisibleCount(3);
      else setVisibleCount(2);
    }
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCount);
  const clampedIndex = Math.min(currentIndex, maxIndex);

  const totalPages = Math.max(1, Math.ceil(products.length / visibleCount));
  const currentPage = Math.round(clampedIndex / visibleCount);

  const cardWidth =
    containerWidth > 0
      ? (containerWidth - GAP * (visibleCount - 1)) / visibleCount
      : 0;
  const translateX = cardWidth > 0 ? clampedIndex * (cardWidth + GAP) : 0;

  const handleNext = () => {
    setCurrentIndex((index) => Math.min(maxIndex, index + visibleCount));
  };

  const handlePrev = () => {
    setCurrentIndex((index) => Math.max(0, index - visibleCount));
  };

  return (
    <section className="mt-[50px]">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-2xl font-medium text-foreground">
          SẢN PHẨM ĐƯỢC YÊU THÍCH
        </h2>
        <span className="mt-2 h-0.5 w-10 bg-foreground" />
      </div>

      <div className="relative mt-8 px-4 sm:px-10">
        <div ref={containerRef} className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ gap: `${GAP}px`, transform: `translateX(-${translateX}px)` }}
          >
            {products.map((product) => {
              const struck = isStruckPrice(product.originalPrice);
              return (
                <div
                  key={product.slug}
                  className="group relative shrink-0 overflow-hidden rounded-[5px] bg-card pb-[10px]"
                  style={{
                    width:
                      cardWidth > 0
                        ? `${cardWidth}px`
                        : `${100 / visibleCount}%`,
                  }}
                >
                  <div className="relative aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                    <button
                      type="button"
                      aria-label="Yêu thích"
                      className="absolute top-2 right-2"
                    >
                      <HeartIcon className="h-4 w-4 text-foreground" />
                    </button>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <img
                        src={QUICK_VIEW_ICON}
                        alt=""
                        className="h-8 w-8"
                      />
                    </div>
                  </div>
                  <div className="px-3 pt-3">
                    <p className="line-clamp-2 text-sm leading-[19.6px] text-foreground">
                      {product.name}
                    </p>
                    <div className="mt-2">
                      {struck ? (
                        <p className="text-sm text-muted-foreground line-through">
                          {product.originalPrice}
                        </p>
                      ) : product.originalPrice ? (
                        <p className="text-sm text-muted-foreground">
                          {product.originalPrice}
                        </p>
                      ) : null}
                      <p className="font-medium text-destructive">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden sm:contents">
          {clampedIndex > 0 && (
            <button
              type="button"
              aria-label="Sản phẩm trước"
              onClick={handlePrev}
              className="absolute top-1/2 left-0 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
            >
              <PrevIcon className="h-3.5 w-3.5 text-foreground" />
            </button>
          )}
          <button
            type="button"
            aria-label="Sản phẩm tiếp theo"
            onClick={handleNext}
            disabled={clampedIndex >= maxIndex}
            className="absolute top-1/2 right-0 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md disabled:opacity-40"
          >
            <NextIcon className="h-3.5 w-3.5 text-foreground" />
          </button>
        </div>

        <div className="mt-4 sm:hidden">
          <div className="relative h-0.5 w-full bg-foreground/15">
            <div
              className="absolute top-0 left-0 h-0.5 bg-foreground transition-all duration-300"
              style={{
                width: `${100 / totalPages}%`,
                transform: `translateX(${currentPage * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
