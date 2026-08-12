"use client";

import { useState } from "react";
import { CollectionToolbar } from "./CollectionToolbar";
import { ProductCard } from "./ProductCard";
import { useQuickView } from "@/lib/commerce/QuickViewContext";
import type { Product } from "./types";

const PAGE_SIZE = 20;

export function ProductGrid({
  products,
  total,
  showToolbar = true,
  emptyMessage = "Hiện chưa có sản phẩm trong bộ sưu tập này.",
  onOpenFilter,
}: {
  products: Product[];
  total: number;
  showToolbar?: boolean;
  emptyMessage?: string;
  onOpenFilter: () => void;
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const quickView = useQuickView();

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <section>
      {showToolbar && (
        <CollectionToolbar
          shown={visibleProducts.length}
          total={total}
          onOpenFilter={onOpenFilter}
        />
      )}

      {products.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">{emptyMessage}</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              onQuickView={quickView.open}
            />
          ))}
        </div>
      )}

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
    </section>
  );
}
