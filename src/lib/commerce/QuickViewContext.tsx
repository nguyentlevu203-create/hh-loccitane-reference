"use client";

import { createContext, useContext, useState } from "react";
import type { Product } from "@/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/types";

interface QuickViewContextValue {
  product: Product | null;
  isOpen: boolean;
  open: (product: Product) => void;
  close: () => void;
}

const QuickViewContext = createContext<QuickViewContextValue | null>(null);

/**
 * Mirrors the live site's single global `window.wd.theme.quickview(...)` handler (see
 * docs/research/phase-6-commerce/COMMERCE_STATE_ARCHITECTURE.md) — one shared "slot" that any
 * product card can populate, rather than a modal instance duplicated per grid.
 */
export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);

  return (
    <QuickViewContext.Provider
      value={{
        product,
        isOpen: product !== null,
        open: setProduct,
        close: () => setProduct(null),
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView(): QuickViewContextValue {
  const ctx = useContext(QuickViewContext);
  if (!ctx) throw new Error("useQuickView must be used within QuickViewProvider");
  return ctx;
}
