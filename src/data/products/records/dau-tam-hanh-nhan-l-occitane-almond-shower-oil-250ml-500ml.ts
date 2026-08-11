import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

const IMAGES_BASE =
  "/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/images";
const ROOT_IMAGES_BASE = "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images";

// Source: https://vn.loccitane.com/products/dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml
// See docs/research/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/
const product: ProductDetail = {
  slug: "dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml",
  sku: "29HD250A26",
  name: "[Phiên Bản Mới] Dầu Tắm Hạnh Nhân",
  category: "body-care",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
    {
      label: "Ưu đãi web - Nhóm áp dụng voucher",
      href: "/collections/nhom-ap-dung-voucher",
    },
  ],
  images: [
    `${IMAGES_BASE}/gallery-01-main-bottle.png`,
    `${IMAGES_BASE}/gallery-02-alt-bottle-shadow.png`,
    `${IMAGES_BASE}/gallery-03-claim-25-moisture.png`,
    `${IMAGES_BASE}/gallery-04-claim-40-natural-oil.png`,
    `${IMAGES_BASE}/gallery-05-lifestyle-hand-massage.png`,
    `${IMAGES_BASE}/gallery-06-campaign-group-shot.png`,
  ],
  giftPanel: [
    { threshold: "ĐƠN HÀNG TỪ 990K", caption: "Set quà bí mật" },
    { threshold: "ĐƠN HÀNG TỪ 1TR5", caption: "Set quà bí mật" },
  ],
  optionLabel: "Dung tích",
  variants: [
    {
      id: "1158119592",
      value: "250 ml",
      price: "890,000₫",
      sku: "29HD250A26",
      available: true,
    },
  ],
  price: "890,000₫",
  promoCodes: [
    {
      label: "Giảm 5%",
      title: "Giảm 5% tối đa 150k",
      description: "Cho đơn hàng tối thiểu 1,500k",
      expiry: "HSD: 31/08/2026",
    },
  ],
  stock: "in_stock",
  descriptionSections: [
    {
      heading: "1. THÔNG TIN CHUNG",
      body: "- Xuất xứ: Pháp\n- Thương hiêu: L'Occitane\n- Dung tích: 250ml\n- Hạn sử dụng: 3 năm kể từ ngày sản xuất\n\nĐơn vị chịu trách nhiệm về hàng hóa là CÔNG TY CỔ PHẦN MỸ PHẨM LOCCITANE EN PROVINCE VIỆT NAM",
    },
    {
      heading: "2. THÀNH PHẦN",
      body: "VITIS VINIFERA (GRAPE) SEED OIL - TIPA-LAURETH SULFATE - LAURETH-3 - CAPRYLIC/CAPRIC TRIGLYCERIDE - PARFUM/FRAGRANCE - COCAMIDE MEA - PROPYLENE GLYCOL - SORBITAN OLEATE - PRUNUS AMYGDALUS DULCIS (SWEET ALMOND) OIL - CITRUS AURANTIUM BERGAMIA (BERGAMOT) FRUIT OIL - HELIANTHUS ANNUUS (SUNFLOWER) SEED OIL - ROSMARINUS OFFICINALIS (ROSEMARY) LEAF EXTRACT - TOCOPHEROL - AQUA/WATER - LIMONENE - COUMARIN – LINALOOL",
    },
    {
      heading: "3. ĐỐI TƯỢNG SỬ DỤNG",
      body: "Mọi loại da",
    },
    {
      heading: "4. CÔNG DỤNG",
      body: "Sản phẩm có kết cấu dạng dầu, khi tiếp xúc với nước sẽ thành dạng sữa, giúp nhẹ nhàng làm sạch cơ thể, xoa dịu làn da.",
    },
    {
      heading: "5. HƯỚNG DẪN SỬ DỤNG",
      body: "- Lấy một lượng vừa đủ dầu tắm ra tay hoặc bông tắm, nhẹ nhàng massage lên da dưới vòi nước. Cảm nhận kết cấu dầu mượt mà dần chuyển thành lớp bọt sữa mềm mịn. Sau đó, rửa sạch hoàn toàn với nước.\n- Có thể đổ trực tiếp dầu vào bồn tắm để tạo nên một làn nước ngâm thơm ngát, dưỡng da đầy thư giãn.\n- Kết hợp với Dầu Dưỡng Thể Hạnh Nhân (Almond Supple Skin Oil) và Kem Dưỡng Ẩm Da Hạnh Nhân (Almond Milk Concentrate) sau đó, hỗ trơ dưỡng da săn chắc và sáng mịn.",
    },
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  // "Gợi ý" (recommendations) is disabled store-wide on the live site
  // (checkproductrelated: "false"). Seeded here with the two real companion
  // products this product's own usage instructions (section 5 above) name by
  // name, using their real SKUs/prices confirmed live.
  recommendations: [
    {
      slug: "dau-duong-the-hanh-nhan-almond-supple-skin-oil",
      sku: "29HC100A26",
      name: "[Phiên Bản Mới] Dầu Dưỡng Thể Hạnh Nhân",
      image: `${ROOT_IMAGES_BASE}/product-almond-body-oil.png`,
      price: "1,790,000₫",
    },
    {
      slug: "kem-duong-am-san-chac-da-hanh-nhan-br-almond-milk-concentrate",
      sku: "29CC200A26",
      name: "[Phiên Bản Mới] Kem Dưỡng Ẩm Săn Chắc Da Hạnh Nhân",
      image: `${ROOT_IMAGES_BASE}/product-almond-milk-concentrate.png`,
      price: "1,990,000₫",
    },
  ],
  shareUrl:
    "https://vn.loccitane.com/products/dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml",
};

export default product;
