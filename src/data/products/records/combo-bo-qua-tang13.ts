import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

// Source: https://vn.loccitane.com/products/combo-bo-qua-tang13
// Scraped via scripts/scrape-products-phase4.mjs from the live page's server-rendered
// window.wd.productjson + real breadcrumb markup. promoCodes/giftPanel/recommendations are
// client-side-injected on the live site and were not captured here — see missingFields.
const product: ProductDetail = {
  slug: "combo-bo-qua-tang13",
  sku: "ComboBoQuaTang13",
  name: "Bộ Quà Tặng",
  category: "gifts",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
  ],
  images: [
    "/products/combo-bo-qua-tang13/image-01.png",
  ],
  optionLabel: "Dung tích",
  variants: [
    { id: "1173060856", value: "Bộ Quà Tặng", price: "1,030,000₫", sku: "ComboBoQuaTang13", available: true },
  ],
  price: "1,030,000₫",
  promoCodes: [],
  stock: "in_stock",
  descriptionSections: [
    {
      heading: "MÔ TẢ SẢN PHẨM",
      body: "Combo quà tặng bao gồm :\n* Kem dưỡng da tay Neroli & Orchidée 30ml\n* Khăn quàng cổ Holiday 2025\n* Tinh chất dưỡng da dạng dầu Oil In Serum 5ml\n* Dầu tẩy trang Précieuse Cleansing Oil 30ml\n* Set quà tặng bí mật",
    },
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  shareUrl: "https://vn.loccitane.com/products/combo-bo-qua-tang13",
  missingFields: ["promoCodes", "giftPanel", "recommendations"],
};

export default product;
