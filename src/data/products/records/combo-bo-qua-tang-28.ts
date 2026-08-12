import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

// Source: https://vn.loccitane.com/products/combo-bo-qua-tang-28
// Scraped via scripts/scrape-products-phase4.mjs from the live page's server-rendered
// window.wd.productjson + real breadcrumb markup. promoCodes/giftPanel/recommendations are
// client-side-injected on the live site and were not captured here — see missingFields.
const product: ProductDetail = {
  slug: "combo-bo-qua-tang-28",
  sku: "49HD030I23-49MA010K26-50Y",
  name: "Bộ Quà Tặng",
  category: "gifts",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
  ],
  images: [
    "/products/combo-bo-qua-tang-28/image-01.png",
  ],
  optionLabel: "Dung tích",
  variants: [
    { id: "1173060850", value: "Bộ Quà Tặng", price: "340,000₫", sku: "49HD030I23-49MA010K26-50Y", available: true },
  ],
  price: "340,000₫",
  promoCodes: [],
  stock: "in_stock",
  descriptionSections: [
    {
      heading: "MÔ TẢ SẢN PHẨM",
      body: "Combo quà tặng bao gồm :\nDầu tẩy trang Précieuse Cleansing Oil 30ml\nKem dưỡng da tay Shea Hand Cream 10ml\nSet quà tặng bí mật",
    },
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  shareUrl: "https://vn.loccitane.com/products/combo-bo-qua-tang-28",
  missingFields: ["promoCodes", "giftPanel", "recommendations"],
};

export default product;
