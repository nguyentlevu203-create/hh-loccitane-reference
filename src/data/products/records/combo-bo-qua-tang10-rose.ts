import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

// Source: https://vn.loccitane.com/products/combo-bo-qua-tang10-rose
// Scraped via scripts/scrape-products-phase4.mjs from the live page's server-rendered
// window.wd.productjson + real breadcrumb markup. promoCodes/giftPanel/recommendations are
// client-side-injected on the live site and were not captured here — see missingFields.
const product: ProductDetail = {
  slug: "combo-bo-qua-tang10-rose",
  sku: "29HD075A26-52HKNO25-01MA030K26-24BL012RR25-50Y",
  name: "Bộ Quà Tặng",
  category: "gifts",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
  ],
  images: [
    "/products/combo-bo-qua-tang10-rose/image-01.png",
  ],
  optionLabel: "Dung tích",
  variants: [
    { id: "1173060854", value: "Bộ Quà Tặng", price: "970,000₫", sku: "29HD075A26-52HKNO25-01MA030K26-24BL012RR25-50Y", available: true },
  ],
  price: "970,000₫",
  promoCodes: [],
  stock: "in_stock",
  descriptionSections: [
    {
      heading: "MÔ TẢ SẢN PHẨM",
      body: "Combo quà tặng bao gồm :\n* Dầu tắm hạnh nhân Almond Shower Oil 75ml\n* Bộ quà tặng Hugs & Kisses Holiday 2025\n* Kem dưỡng da tay Shea Hand Cream 30ml\n* Son dưỡng Môi Hoa Hồng 4.5g\n* Set quà tặng bí mật",
    },
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  shareUrl: "https://vn.loccitane.com/products/combo-bo-qua-tang10-rose",
  missingFields: ["promoCodes", "giftPanel", "recommendations"],
};

export default product;
