import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

// Source: https://vn.loccitane.com/products/combo-bo-qua-tang-21
// Scraped via scripts/scrape-products-phase4.mjs from the live page's server-rendered
// window.wd.productjson + real breadcrumb markup. promoCodes/giftPanel/recommendations are
// client-side-injected on the live site and were not captured here — see missingFields.
const product: ProductDetail = {
  slug: "combo-bo-qua-tang-21",
  sku: "ComboBoQuaTang21",
  name: "Bộ Quà Tặng",
  category: "gifts",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
  ],
  images: [
    "/products/combo-bo-qua-tang-21/image-01.png",
  ],
  optionLabel: "Dung tích",
  variants: [
    { id: "1173060849", value: "Bộ Quà Tặng", price: "1,010,000₫", sku: "ComboBoQuaTang21", available: true },
  ],
  price: "1,010,000₫",
  promoCodes: [],
  stock: "in_stock",
  descriptionSections: [
    {
      heading: "MÔ TẢ SẢN PHẨM",
      body: "Combo quà tặng bao gồm :\nDầu tắm hạnh nhân Almond Shower Oil 75ml\nTinh chất dưỡng da dạng dầu Oil In Serum 5ml\nSữa rửa mặt tạo bọt Divine Foaming Cleansing Cream 14ml\nNước hoa hồng tái tạo da Divine Resurfacing Lotion 30ml\nSet quà tặng bí mật",
    },
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  shareUrl: "https://vn.loccitane.com/products/combo-bo-qua-tang-21",
  missingFields: ["promoCodes", "giftPanel", "recommendations"],
};

export default product;
