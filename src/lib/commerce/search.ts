import { productCatalog, toGridProduct } from "@/data/products";
import { collectionCatalog } from "@/data/collections";
import type { Product } from "@/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/types";

export interface SearchCollectionResult {
  slug: string;
  title: string;
}

export interface SearchResults {
  products: Product[];
  collections: SearchCollectionResult[];
}

// Real slugs, pulled from the site's own header search-overlay "popular searches" list captured
// live in Phase 5 (docs/research/FULL_COLLECTION_INVENTORY.md) — filtered to the ones we actually
// modeled, so every link resolves instead of hitting notFound().
const POPULAR_SEARCH_SLUGS = ["tam-va-duong-the", "cham-soc-da-mat-1", "cham-soc-da-tay"];

export function getPopularSearches(): SearchCollectionResult[] {
  return POPULAR_SEARCH_SLUGS.map((slug) => collectionCatalog[slug])
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => ({ slug: c.slug, title: c.title }));
}

// The real "best-seller" collection's own modeled products — same source used to model that
// collection page itself (src/data/collections/records/best-seller.ts).
export function getSearchSuggestions(): Product[] {
  const bestSeller = collectionCatalog["best-seller"];
  if (!bestSeller) return [];
  return bestSeller.productSlugs
    .map((slug) => productCatalog[slug])
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map(toGridProduct);
}

const MAX_RESULTS = 8;

/** Deterministic local search — no backend exists to query, so this filters our real modeled catalogue directly (see AGENTS.md scope decision for Phase 6). */
export function search(query: string): SearchResults {
  const q = query.trim().toLowerCase();
  if (!q) return { products: [], collections: [] };

  const products = Object.values(productCatalog)
    .filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))
    .slice(0, MAX_RESULTS)
    .map(toGridProduct);

  const collections = Object.values(collectionCatalog)
    .filter((c) => c.title.toLowerCase().includes(q))
    .slice(0, MAX_RESULTS)
    .map((c) => ({ slug: c.slug, title: c.title }));

  return { products, collections };
}
