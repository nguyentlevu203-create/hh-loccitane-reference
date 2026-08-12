import { notFound } from "next/navigation";

import { ContentPage } from "@/components/sites/vn-loccitane-com-1c965340/pages-content/ContentPage";
import { getAllPageSlugs, getPageRecord } from "@/data/pages";

export async function generateStaticParams() {
  return getAllPageSlugs().map((slug) => ({ slug }));
}

export default async function DynamicContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPageRecord(slug);

  if (!page) {
    notFound();
  }

  return <ContentPage page={page} />;
}
