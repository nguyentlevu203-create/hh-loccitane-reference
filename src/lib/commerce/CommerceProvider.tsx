"use client";

import { CartProvider } from "./CartContext";
import { QuickViewProvider } from "./QuickViewContext";
import { SearchProvider } from "./SearchContext";

// Wishlist has no Provider here by design — see COMMERCE_STATE_ARCHITECTURE.md's
// "Provider location" section for why (its persisted store is already a module-level singleton).
export function CommerceProvider({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <QuickViewProvider>
        <SearchProvider>{children}</SearchProvider>
      </QuickViewProvider>
    </CartProvider>
  );
}
