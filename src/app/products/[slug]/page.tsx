import { notFound } from "next/navigation";

import { ProductDetailPage } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/ProductDetailPage";
import { getAllProductSlugs, getProductDetail } from "@/data/products";

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductDetail(slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailPage
      product={product}
      recommendations={product.recommendations ?? []}
    />
  );
}
