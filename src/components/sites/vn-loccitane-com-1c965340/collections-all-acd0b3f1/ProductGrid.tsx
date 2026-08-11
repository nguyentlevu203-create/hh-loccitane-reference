"use client";

import { useState } from "react";
import { CollectionToolbar } from "./CollectionToolbar";
import { ProductCard } from "./ProductCard";
import { QuickViewModal } from "./QuickViewModal";
import { products } from "./products";
import type { Product } from "./types";

const PAGE_SIZE = 20;
const MOCK_TOTAL = 304;

export function ProductGrid({ onOpenFilter }: { onOpenFilter: () => void }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <section>
      <CollectionToolbar
        shown={visibleProducts.length}
        total={MOCK_TOTAL}
        onOpenFilter={onOpenFilter}
      />

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((v) => Math.min(products.length, v + PAGE_SIZE))}
            className="rounded-full bg-foreground px-8 py-2 text-sm font-medium text-white"
          >
            Xem thêm
          </button>
        </div>
      )}

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}
