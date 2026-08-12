import type { CollectionRecord } from "@/data/collections/types";

// Source: https://vn.loccitane.com/collections/refills
// Generated via scripts/generate-collection-records-phase5.mjs from scripts/.cache/collections-raw.json
// (itself produced by scripts/crawl-collections-phase5.mjs's static-HTML crawl of the live page).
const collection: CollectionRecord = {
  slug: "refills",
  sourceUrl: "https://vn.loccitane.com/collections/refills",
  title: "Refills Dầu Tắm",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
  ],
  template: "standard-plp",
  productSlugs: [
    "dau-tam-hanh-nhan-5",
  ],
  totalLiveProductCount: 3,
  missingFields: ["description"],
};

export default collection;
