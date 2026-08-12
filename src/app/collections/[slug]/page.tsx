import { notFound } from "next/navigation";

import { CollectionPage } from "@/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/CollectionPage";
import { getAllCollectionSlugs, getCollectionRecord } from "@/data/collections";
import { getGridProducts } from "@/data/products";

export async function generateStaticParams() {
  return getAllCollectionSlugs()
    .filter((slug) => slug !== "all") // /collections/all is its own static route
    .map((slug) => ({ slug }));
}

export default async function DynamicCollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionRecord(slug);

  if (!collection) {
    notFound();
  }

  const products = getGridProducts(collection.productSlugs);
  const total = collection.totalLiveProductCount ?? products.length;
  const showToolbar = collection.template !== "editorial" && collection.template !== "category-landing";

  return (
    <CollectionPage
      title={collection.title}
      breadcrumb={collection.breadcrumb}
      description={collection.description}
      heroImage={collection.heroImage}
      subcategoryLinks={collection.subcategoryLinks}
      products={products}
      total={total}
      showToolbar={showToolbar}
    />
  );
}
