import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

// Source: https://vn.loccitane.com/products/combo-qua-tang-8
// Scraped via scripts/scrape-products-phase4.mjs from the live page's server-rendered
// window.wd.productjson + real breadcrumb markup. promoCodes/giftPanel/recommendations are
// client-side-injected on the live site and were not captured here — see missingFields.
const product: ProductDetail = {
  slug: "combo-qua-tang-8",
  sku: "Comboquatang8",
  name: "Combo quà tặng 8",
  category: "gifts",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
  ],
  images: [
    "/products/combo-qua-tang-8/image-01.png",
  ],
  optionLabel: "Dung tích",
  variants: [
    { id: "1173033309", value: "Default Title", price: "680,000₫", sku: "Comboquatang8", available: false },
  ],
  price: "680,000₫",
  promoCodes: [],
  stock: "out_of_stock",
  descriptionSections: [
    {
      heading: "MÔ TẢ SẢN PHẨM",
      body: "Combo quà tặng bao gồm :\n* Khăn quàng cổ Holiday 2025\n* Tinh chất dưỡng da dạng dầu Oil In Serum 5ml\n* Dầu tẩy trang Précieuse Cleansing Oil 30ml\n* Set quà tặng bí mật",
    },
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  shareUrl: "https://vn.loccitane.com/products/combo-qua-tang-8",
  missingFields: ["promoCodes", "giftPanel", "recommendations"],
};

export default product;
