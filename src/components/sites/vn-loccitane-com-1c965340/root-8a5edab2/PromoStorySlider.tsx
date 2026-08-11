"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PromoSlide {
  title: string;
  description: string;
  image: string;
  href: string;
  imagePosition: "left" | "right";
}

const slides: PromoSlide[] = [
  {
    title: "Dầu Tắm Hạnh Nhân",
    description:
      "Chuyển hoá từ kết cấu dầu sang lớp sữa mịn màng khi tiếp xúc với nước, nhẹ nhàng làm sạch và nuôi dưỡng làn da. Công thức giàu dầu hạnh nhân ngọt giúp làn da mềm mại, ẩm mượt và lưu lại hương hạnh nhân – vanilla ấm áp đầy mê hoặc.",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/promo-shower-oil.jpg",
    href: "#",
    imagePosition: "left",
  },
  {
    title: "Dầu Dưỡng Thể Hạnh Nhân",
    description:
      "Dầu dưỡng thể nhẹ nhàng nhưng giàu dưỡng chất với dầu hạnh nhân và dầu hạt cải giúp làm mềm, săn chắc và mịn da, đồng thời lưu lại hương thơm hạnh nhân-vani tinh tế, hấp dẫn.",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/promo-body-oil.jpg",
    href: "#",
    imagePosition: "right",
  },
  {
    title: "Tái Nạp, Tái Nạp Yêu Thương",
    description:
      "Chỉ có tại website chính thức và hệ thống cửa hàng. Một thay đổi nhỏ cho thói quen bền vững hơn, giúp giảm thiểu nhựa dùng một lần và trao cho bao bì thêm một vòng đời mới.",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/promo-refill.png",
    href: "#",
    imagePosition: "left",
  },
];

export default function PromoStorySlider() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const count = slides.length;
  const prevIndex = (index - 1 + count) % count;
  const nextIndex = (index + 1) % count;

  const goTo = (target: number) => {
    if (target === index) return;
    setVisible(false);
    window.setTimeout(() => {
      setIndex(target);
      setVisible(true);
    }, 300);
  };

  const slide = slides[index];
  const imageOnLeft = slide.imagePosition === "left";

  return (
    <section className="mt-[30px] w-full">
      <div
        className={cn(
          "flex flex-col transition-opacity duration-300 ease-in-out",
          imageOnLeft ? "md:flex-row" : "md:flex-row-reverse",
          visible ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="w-full md:w-1/2">
          <img
            src={slide.image}
            alt={slide.title}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col justify-center bg-[#f2ebe0] px-6 py-10 text-center md:w-1/2 md:px-16 md:py-0 md:text-left">
          <h2 className="text-[24px] font-medium leading-tight text-foreground">
            {slide.title}
          </h2>
          <p className="mx-auto mt-6 max-w-[480px] text-[14px] leading-[1.5] text-foreground md:mx-0">
            {slide.description}
          </p>
          <a
            href={slide.href}
            className="mt-6 inline-block w-fit self-center text-[14px] text-foreground underline underline-offset-4 md:self-start"
          >
            Khám phá ngay
          </a>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-6 px-4 text-[14px] text-foreground md:gap-16">
        <button
          type="button"
          onClick={() => goTo(prevIndex)}
          className="truncate hover:underline"
        >
          <span aria-hidden="true">&lsaquo; </span>
          {slides[prevIndex].title}
        </button>
        <span className="shrink-0">
          {index + 1} / {count}
        </span>
        <button
          type="button"
          onClick={() => goTo(nextIndex)}
          className="truncate hover:underline"
        >
          {slides[nextIndex].title}
          <span aria-hidden="true"> &rsaquo;</span>
        </button>
      </div>
    </section>
  );
}
