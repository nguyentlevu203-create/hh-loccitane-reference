"use client";

import { CollectionPage } from "@/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/CollectionPage";
import { products } from "@/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/products";

const TOTAL_PRODUCTS = 304;

export default function CollectionsAllPage() {
  return (
    <CollectionPage
      title="Tất cả sản phẩm"
      breadcrumb={[{ label: "Trang chủ", href: "/" }]}
      products={products}
      total={TOTAL_PRODUCTS}
    />
  );
}
