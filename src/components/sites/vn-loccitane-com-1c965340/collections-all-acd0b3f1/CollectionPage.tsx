"use client";

import { useState } from "react";
import SiteChrome from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/SiteChrome";
import { OffCanvasNav } from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/OffCanvasNav";
import {
  SiteFooter,
  FloatingActions,
} from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/FooterAndFloating";
import FeedbackStrip from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/FeedbackStrip";
import { MobileBottomNav } from "@/components/sites/vn-loccitane-com-1c965340/shared/MobileBottomNav";
import { CollectionHeader } from "./CollectionHeader";
import { ProductGrid } from "./ProductGrid";
import { FilterSortPanel } from "./FilterSortPanel";
import type { CollectionSubcategoryLink } from "@/data/collections/types";
import type { Product } from "./types";

/**
 * Shared interactive shell for every /collections page (both the static /collections/all and the
 * dynamic /collections/[slug]) — owns menu/filter open state and composes the same SiteChrome +
 * header + grid + footer furniture so no collection template gets its own page implementation.
 */
export function CollectionPage({
  title,
  breadcrumb,
  description,
  heroImage,
  subcategoryLinks,
  products,
  total,
  showToolbar = true,
  emptyMessage,
}: {
  title: string;
  breadcrumb: { label: string; href: string }[];
  description?: string;
  heroImage?: string;
  subcategoryLinks?: CollectionSubcategoryLink[];
  products: Product[];
  total: number;
  showToolbar?: boolean;
  emptyMessage?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <SiteChrome onMenuClick={() => setMenuOpen(true)} forceScrolled />
      <OffCanvasNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="mx-auto max-w-[1200px] px-4 pt-[104px] pb-16 lg:px-10">
        <CollectionHeader
          title={title}
          breadcrumb={breadcrumb}
          description={description}
          heroImage={heroImage}
          subcategoryLinks={subcategoryLinks}
        />
        <ProductGrid
          products={products}
          total={total}
          showToolbar={showToolbar}
          emptyMessage={emptyMessage}
          onOpenFilter={() => setFilterOpen(true)}
        />
      </main>
      <FilterSortPanel
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={() => {}}
      />
      <FeedbackStrip />
      <SiteFooter />
      <FloatingActions />
      <MobileBottomNav />
    </>
  );
}
