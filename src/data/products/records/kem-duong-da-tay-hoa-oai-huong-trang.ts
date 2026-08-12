import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

// Source: https://vn.loccitane.com/products/kem-duong-da-tay-hoa-oai-huong-trang
// Scraped via scripts/scrape-products-phase4.mjs from the live page's server-rendered
// window.wd.productjson + real breadcrumb markup. promoCodes/giftPanel/recommendations are
// client-side-injected on the live site and were not captured here — see missingFields.
const product: ProductDetail = {
  slug: "kem-duong-da-tay-hoa-oai-huong-trang",
  sku: "15MA075LBR25",
  name: "Kem Dưỡng Da Tay Hoa Oải Hương Trắng",
  category: "hand-care",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
    { label: "Dưỡng Da Tay", href: "/collections/duong-da-tay" },
  ],
  images: [
    "/products/kem-duong-da-tay-hoa-oai-huong-trang/image-01.png",
  ],
  optionLabel: "Dung tích",
  variants: [
    { id: "1173208001", value: "75ml", price: "690,000₫", sku: "15MA075LBR25", available: true },
  ],
  price: "690,000₫",
  promoCodes: [],
  stock: "in_stock",
  descriptionSections: [
    {
      heading: "MÔ TẢ SẢN PHẨM",
      body: "Kem Dưỡng Da Tay L'Occitane Giúp Nuôi Dưỡng Và Bảo Vệ Da Tay Mềm Mịn, Hương Thơm Tinh Tế 75ML\nTHÔNG TIN SẢN PHẨM\nThương hiệu: L'Occitane\nXuất xứ: Pháp\nNơi sản xuất: Pháp\nNgày sản xuất: Vui lòng xem trên bao bìa sản phẩm\nHạn sử dụng: 3 năm kể từ ngày sản xuất",
    },
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  shareUrl: "https://vn.loccitane.com/products/kem-duong-da-tay-hoa-oai-huong-trang",
  missingFields: ["promoCodes", "giftPanel", "recommendations"],
};

export default product;
