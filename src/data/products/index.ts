import type { ProductDetail } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/types";

import almondShowerOil from "./records/dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml";

// One entry per file in ./records — added here as each product is scraped.
// Each record file is a standalone module (one product per file) so parallel
// contributors never collide on this aggregator.
const records: ProductDetail[] = [almondShowerOil];

export const productCatalog: Record<string, ProductDetail> = Object.fromEntries(
  records.map((product) => [product.slug, product]),
);

export function getProductDetail(slug: string): ProductDetail | undefined {
  return productCatalog[slug];
}

export function getAllProductSlugs(): string[] {
  return Object.keys(productCatalog);
}
