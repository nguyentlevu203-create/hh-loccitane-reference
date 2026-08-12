import type { PageRecord } from "@/data/pages/types";

// Source: https://vn.loccitane.com/pages/uudai
// Generated via scripts/generate-page-records-phase7.mjs from scripts/.cache/pages-raw.json
// (produced by scripts/crawl-pages-phase7.mjs's static-HTML crawl of the live page).
const page: PageRecord = {
  slug: "uudai",
  sourceUrl: "https://vn.loccitane.com/pages/uudai",
  title: "ƯU ĐÃI ĐẶC BIỆT",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
  ],
  template: "editorial",
  heroImage: "https://cdn.hstatic.net/files/200000692621/file/z7878816528131_d93a4f010fc3ce1d6d4b6a12d75927a1.jpg",
  // Real page copy here is a promo/voucher listing (disclaimer text + product-card fragments),
  // not narrative prose — genuine, but not shaped for a lead-paragraph display. Left empty rather
  // than showing garbled real text; see missingFields.
  leadParagraphs: [],
  missingFields: ["leadParagraphs"],
};

export default page;
