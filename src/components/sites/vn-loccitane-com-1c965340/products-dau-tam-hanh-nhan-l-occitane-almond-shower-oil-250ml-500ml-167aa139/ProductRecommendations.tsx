"use client";

import { useState } from "react";
import { ProductCard } from "../collections-all-acd0b3f1/ProductCard";
import { QuickViewModal } from "../collections-all-acd0b3f1/QuickViewModal";
import type { Product } from "../collections-all-acd0b3f1/types";

export function ProductRecommendations({ products }: { products: Product[] }) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

  if (products.length === 0) return null;

  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="text-center text-2xl font-medium text-foreground">
          Gợi ý
        </h2>
        <span className="mt-2 h-0.5 w-10 bg-foreground" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
