import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

// Source: https://vn.loccitane.com/products/combo-qua-tang
// Scraped via scripts/scrape-products-phase4.mjs from the live page's server-rendered
// window.wd.productjson + real breadcrumb markup. promoCodes/giftPanel/recommendations are
// client-side-injected on the live site and were not captured here — see missingFields.
const product: ProductDetail = {
  slug: "combo-qua-tang",
  sku: "49CC020A26-49DISCRNO24-50Y",
  name: "Combo Quà Tặng",
  category: "gifts",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
  ],
  images: [
    "/products/combo-qua-tang/image-01.png",
  ],
  optionLabel: "Dung tích",
  variants: [
    { id: "1173032063", value: "Default Title", price: "390,000₫", sku: "49CC020A26-49DISCRNO24-50Y", available: false },
  ],
  price: "390,000₫",
  promoCodes: [],
  stock: "out_of_stock",
  descriptionSections: [
    {
      heading: "MÔ TẢ SẢN PHẨM",
      body: "Bộ quà tặng bao gồm\n- Kem dưỡng thể hạnh nhân 20ml\n- Túi L'Occitane\n- Set quà bí mật",
    },
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  shareUrl: "https://vn.loccitane.com/products/combo-qua-tang",
  missingFields: ["promoCodes", "giftPanel", "recommendations"],
};

export default product;
