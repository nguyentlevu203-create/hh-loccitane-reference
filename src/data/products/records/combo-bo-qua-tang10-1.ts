import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

// Source: https://vn.loccitane.com/products/combo-bo-qua-tang10-1
// Scraped via scripts/scrape-products-phase4.mjs from the live page's server-rendered
// window.wd.productjson + real breadcrumb markup. promoCodes/giftPanel/recommendations are
// client-side-injected on the live site and were not captured here — see missingFields.
const product: ProductDetail = {
  slug: "combo-bo-qua-tang10-1",
  sku: "ComboBoQuaTang10",
  name: "Bộ Quà Tặng",
  category: "gifts",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
  ],
  images: [
    "/products/combo-bo-qua-tang10-1/image-01.png",
  ],
  optionLabel: "Dung tích",
  variants: [
    { id: "1173060853", value: "Bộ Quà Tặng", price: "970,000₫", sku: "ComboBoQuaTang10", available: true },
  ],
  price: "970,000₫",
  promoCodes: [],
  stock: "in_stock",
  descriptionSections: [
    {
      heading: "MÔ TẢ SẢN PHẨM",
      body: "Combo quà tặng bao gồm :\n* Dầu tắm hạnh nhân Almond Shower Oil 75ml\n* Bộ quà tặng Hugs & Kisses Holiday 2025\n* Kem dưỡng da tay Shea Hand Cream 30ml\n* Son dưỡng Shea Ultra-Rich 4.5g\n* Set quà tặng bí mật",
    },
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  shareUrl: "https://vn.loccitane.com/products/combo-bo-qua-tang10-1",
  missingFields: ["promoCodes", "giftPanel", "recommendations"],
};

export default product;
