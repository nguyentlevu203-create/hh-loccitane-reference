import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

// Source: https://vn.loccitane.com/products/combo-bo-qua-tang17
// Scraped via scripts/scrape-products-phase4.mjs from the live page's server-rendered
// window.wd.productjson + real breadcrumb markup. promoCodes/giftPanel/recommendations are
// client-side-injected on the live site and were not captured here — see missingFields.
const product: ProductDetail = {
  slug: "combo-bo-qua-tang17",
  sku: "01MA075K26-01CP030K26-50Y",
  name: "Bộ Quà Tặng",
  category: "gifts",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
  ],
  images: [
    "/products/combo-bo-qua-tang17/image-01.png",
  ],
  optionLabel: "Dung tích",
  variants: [
    { id: "1173060857", value: "Bộ Quà Tặng", price: "1,040,000₫", sku: "01MA075K26-01CP030K26-50Y", available: true },
  ],
  price: "1,040,000₫",
  promoCodes: [],
  stock: "in_stock",
  descriptionSections: [
    {
      heading: "MÔ TẢ SẢN PHẨM",
      body: "Combo quà tặng bao gồm :\n* Kem dưỡng da tay Shea Hand Cream 75ml\n* Kem dưỡng da chân Shea Butter Foot Cream 30ml\n* Set quà tặng bí mật",
    },
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  shareUrl: "https://vn.loccitane.com/products/combo-bo-qua-tang17",
  missingFields: ["promoCodes", "giftPanel", "recommendations"],
};

export default product;
