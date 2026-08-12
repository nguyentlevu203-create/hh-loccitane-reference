import type { CollectionRecord } from "@/data/collections/types";

// Source: https://vn.loccitane.com/collections/best-seller
// Generated via scripts/generate-collection-records-phase5.mjs from scripts/.cache/collections-raw.json
// (itself produced by scripts/crawl-collections-phase5.mjs's static-HTML crawl of the live page).
const collection: CollectionRecord = {
  slug: "best-seller",
  sourceUrl: "https://vn.loccitane.com/collections/best-seller",
  title: "Được Yêu Thích",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
  ],
  template: "editorial",
  description: "Khám phá những sản phẩm chăm sóc da thiên nhiên bán chạy nhất của L’OCCITANE — từ Kem Dưỡng Tay Bơ Hạt Mỡ được yêu thích trên toàn cầu, đến Tinh Chất Immortelle Overnight Reset Serum không thể thiếu và Dầu Tắm Almond biểu tượng. Mua sắm Top 5 sản phẩm làm đẹp thiên nhiên nổi bật bên dưới, hoặc dễ dàng tìm kiếm các sản phẩm “must-have” theo từng danh mục. Chúng tôi tin rằng những biểu tượng được yêu thích trên toàn thế giới này sẽ không làm bạn thất vọng.",
  productSlugs: [
    "dau-tam-hanh-nhan-5",
    "dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml",
    "kem-duong-da-tay-20-bo-dau-mo-l-occitane-150ml-duong-am",
    "kem-duong-da-tay-hoa-oai-huong-trang",
    "kem-duong-da-tay-huong-hoa-cuc-huong-ngai",
    "phien-ban-moi-kem-duong-da-tay-hanh-nhan",
  ],
  totalLiveProductCount: null,
  missingFields: ["totalLiveProductCount"],
};

export default collection;
