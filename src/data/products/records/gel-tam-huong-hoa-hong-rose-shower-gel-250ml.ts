import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

// Source: https://vn.loccitane.com/products/gel-tam-huong-hoa-hong-rose-shower-gel-250ml
// Scraped via scripts/scrape-products-phase4.mjs from the live page's server-rendered
// window.wd.productjson + real breadcrumb markup. promoCodes/giftPanel/recommendations are
// client-side-injected on the live site and were not captured here — see missingFields.
const product: ProductDetail = {
  slug: "gel-tam-huong-hoa-hong-rose-shower-gel-250ml",
  sku: "24GD250RR25",
  name: "Gel Tắm Hương Hoa Hồng Rose",
  category: "body-care",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
  ],
  images: [
    "/products/gel-tam-huong-hoa-hong-rose-shower-gel-250ml/image-01.png",
  ],
  optionLabel: "Dung tích",
  variants: [
    { id: "1173208058", value: "250ml", price: "750,000₫", sku: "24GD250RR25", available: true },
  ],
  price: "750,000₫",
  promoCodes: [],
  stock: "in_stock",
  descriptionSections: [
    {
      heading: "1. THÔNG TIN CHUNG",
      body: "- Xuất xứ: Pháp\n- Thương hiêu: L'Occitane\n- Dung tích: 250ml\n- Hạn sử dụng: 3 năm kể từ ngày sản xuất",
    },
    {
      heading: "2. THÀNH PHẦN",
      body: "AQUA/WATER - SODIUM LAURETH SULFATE - COCO-GLUCOSIDE - GLYCERIN - DECYL GLUCOSIDE - COCO-BETAINE - PARFUM/FRAGRANCE - ROSA CENTIFOLIA FLOWER WATER - SODIUM CHLORIDE - SODIUM BENZOATE - CITRIC ACID - CITRONELLOL - LINALOOL - LIMONENE - GERANIOL",
    },
    {
      heading: "3. ĐỐI TƯỢNG SỬ DỤNG",
      body: "Mọi loại da",
    },
    {
      heading: "4. CÔNG DỤNG",
      body: "- Nhẹ nhàng làm sạch làn da cơ thể\n- Là sự kết hợp giữa hương thơm dịu dàng của lá non xanh mướt, dư vị ngọt thanh của trái cây.",
    },
    {
      heading: "5. HƯỚNG DẪN SỬ DỤNG",
      body: "Sử dụng trực tiếp lên da sau khi làm ướt cơ thể. Có thể sử dụng bông tắm nếu bạn muốn có nhiều bọt hơn. Kết hợp massage nhẹ nhàng để cơ thể được làm sạch và thư giãn trong hương thơm ngọt ngào của Hoa Hồng. Tắm sạch lại với nước. Kết hợp với Sữa Dưỡng Thể Hương Hoa Hồng để tăng cường nuôi dưỡng từ sâu bên trong và lưu lại hương thơm lôi cuốn.",
    },
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  shareUrl: "https://vn.loccitane.com/products/gel-tam-huong-hoa-hong-rose-shower-gel-250ml",
  missingFields: ["promoCodes", "giftPanel", "recommendations"],
};

export default product;
