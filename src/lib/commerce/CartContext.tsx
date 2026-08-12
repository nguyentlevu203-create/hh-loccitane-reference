"use client";

import { createContext, useContext, useState, useSyncExternalStore } from "react";
import type { CartItem } from "./types";
import { createPersistedStore } from "./createPersistedStore";

const STORAGE_KEY = "loccitane-reference:cart";
const cartStore = createPersistedStore<CartItem[]>(STORAGE_KEY, []);

function lineKey(slug: string, volume?: string) {
  return `${slug}::${volume ?? ""}`;
}

interface CartContextValue {
  items: CartItem[];
  count: number; // total units, matches the header badge on the live site
  subtotal: number; // sum of price * qty, in raw VND (prices are stored as formatted strings)
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (slug: string, volume?: string) => void;
  setQty: (slug: string, volume: string | undefined, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function parsePrice(price: string): number {
  return Number(price.replace(/[^\d]/g, "")) || 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);

  const addItem: CartContextValue["addItem"] = (item, qty = 1) => {
    cartStore.setValue((prev) => {
      const key = lineKey(item.slug, item.volume);
      const existing = prev.find((i) => lineKey(i.slug, i.volume) === key);
      if (existing) {
        return prev.map((i) =>
          lineKey(i.slug, i.volume) === key ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { ...item, qty }];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (slug, volume) => {
    cartStore.setValue((prev) => prev.filter((i) => lineKey(i.slug, i.volume) !== lineKey(slug, volume)));
  };

  const setQty: CartContextValue["setQty"] = (slug, volume, qty) => {
    if (qty <= 0) {
      removeItem(slug, volume);
      return;
    }
    cartStore.setValue((prev) =>
      prev.map((i) => (lineKey(i.slug, i.volume) === lineKey(slug, volume) ? { ...i, qty } : i)),
    );
  };

  const clear = () => cartStore.setValue([]);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        addItem,
        removeItem,
        setQty,
        clear,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
