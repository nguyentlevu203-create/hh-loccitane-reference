import type { CategoryTile } from "./types";

const categories: CategoryTile[] = [
  {
    label: "Ưu Đãi Đặc Biệt",
    href: "#",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-uu-dai.png",
  },
  {
    label: "Sản phẩm yêu thích",
    href: "#",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-yeu-thich.png",
  },
  {
    label: "Chăm sóc cơ thể",
    href: "#",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-co-the.png",
  },
  {
    label: "Chăm sóc da mặt",
    href: "#",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-da-mat.png",
  },
  {
    label: "Chăm sóc da tay",
    href: "#",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-da-tay.jpg",
  },
  {
    label: "Chăm sóc tóc",
    href: "#",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-toc.jpg",
  },
  {
    label: "Refills",
    href: "#",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-refills.png",
  },
  {
    label: "Quà tặng",
    href: "#",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/category-qua-tang.png",
  },
];

export default function CategoryGrid() {
  return (
    <section className="pt-[30px]">
      <h2 className="text-center text-2xl font-medium text-foreground">
        KHÁM PHÁ DANH MỤC SẢN PHẨM
      </h2>
      <div className="mx-auto mt-3 h-0.5 w-10 bg-foreground" />
      <div className="mt-8 flex gap-4 overflow-x-auto px-4">
        {categories.map((category) => (
          <a
            key={category.label}
            href={category.href}
            className="w-[180px] flex-shrink-0"
          >
            <img
              src={category.image}
              alt={category.label}
              className="aspect-[3/4] w-full rounded-sm object-cover"
            />
            <p className="mt-2 text-center text-sm text-foreground">
              {category.label}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
