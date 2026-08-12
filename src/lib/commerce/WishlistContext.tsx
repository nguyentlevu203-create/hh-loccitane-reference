"use client";

import { useSyncExternalStore } from "react";
import type { WishlistItem } from "./types";
import { createPersistedStore } from "./createPersistedStore";

const STORAGE_KEY = "loccitane-reference:wishlist";
const wishlistStore = createPersistedStore<WishlistItem[]>(STORAGE_KEY, []);

interface WishlistApi {
  items: WishlistItem[];
  count: number;
  isWishlisted: (slug: string) => boolean;
  toggle: (item: WishlistItem) => void;
  remove: (slug: string) => void;
}

/**
 * No Context/Provider needed — the underlying store (createPersistedStore) is already a shared
 * module-level singleton, so every component calling this hook reads and writes the same data.
 */
export function useWishlist(): WishlistApi {
  const items = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.getSnapshot,
    wishlistStore.getServerSnapshot,
  );

  return {
    items,
    count: items.length,
    isWishlisted: (slug) => items.some((i) => i.slug === slug),
    toggle: (item) =>
      wishlistStore.setValue((prev) =>
        prev.some((i) => i.slug === item.slug)
          ? prev.filter((i) => i.slug !== item.slug)
          : [...prev, item],
      ),
    remove: (slug) => wishlistStore.setValue((prev) => prev.filter((i) => i.slug !== slug)),
  };
}
