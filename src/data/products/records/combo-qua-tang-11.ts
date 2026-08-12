import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

// Source: https://vn.loccitane.com/products/combo-qua-tang-11
// Scraped via scripts/scrape-products-phase4.mjs from the live page's server-rendered
// window.wd.productjson + real breadcrumb markup. promoCodes/giftPanel/recommendations are
// client-side-injected on the live site and were not captured here — see missingFields.
const product: ProductDetail = {
  slug: "combo-qua-tang-11",
  sku: "49CC020A26-50Y",
  name: "Bộ Quà Tặng",
  category: "gifts",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
  ],
  images: [
    "/products/combo-qua-tang-11/image-01.png",
  ],
  optionLabel: "Dung tích",
  variants: [
    { id: "1173034741", value: "Bộ Quà Tặng", price: "390,000₫", sku: "49CC020A26-50Y", available: true },
  ],
  price: "390,000₫",
  promoCodes: [],
  stock: "in_stock",
  descriptionSections: [
    {
      heading: "MÔ TẢ SẢN PHẨM",
      body: "Bộ quà tặng bao gồm\n- Kem dưỡng thể hạnh nhân 20ml\n- Set quà bí mật",
    },
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  shareUrl: "https://vn.loccitane.com/products/combo-qua-tang-11",
  missingFields: ["promoCodes", "giftPanel", "recommendations"],
};

export default product;
