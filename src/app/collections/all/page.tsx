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
import { CollectionHeader } from "@/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/CollectionHeader";
import { ProductGrid } from "@/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/ProductGrid";
import { FilterSortPanel } from "@/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/FilterSortPanel";

export default function CollectionsAllPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <SiteChrome onMenuClick={() => setMenuOpen(true)} forceScrolled />
      <OffCanvasNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="mx-auto max-w-[1200px] px-4 pt-[104px] pb-16 lg:px-10">
        <CollectionHeader />
        <ProductGrid onOpenFilter={() => setFilterOpen(true)} />
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
