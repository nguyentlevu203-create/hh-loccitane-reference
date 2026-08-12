import type { Product } from "@/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/types";

/**
 * Real structural template variants found on the live site (see
 * docs/research/COLLECTION_TEMPLATE_MATRIX.md). Each maps to how CollectionHeader/ProductGrid are
 * composed on src/app/collections/[slug]/page.tsx — no template gets its own page implementation.
 */
export type CollectionTemplate =
  | "standard-plp" // title + breadcrumb + filter/sort toolbar + product grid (the /collections/all shape)
  | "category-landing" // + real hero banner, editorial description, subcategory chip row
  | "editorial" // + real editorial description, curated product carousel, no filter toolbar
  | "promotional" // standard-plp shell, but a time-boxed/campaign collection (real slug pattern e.g. retail-t08-2026-*)
  | "legacy-empty"; // real, live collection URL that currently lists zero products

export interface CollectionSubcategoryLink {
  label: string;
  href: string;
}

export interface CollectionRecord {
  slug: string;
  sourceUrl: string;
  title: string;
  breadcrumb: { label: string; href: string }[];
  template: CollectionTemplate;
  /** Real editorial/meta description text observed on the live page, when present. */
  description?: string;
  /** Real hero banner image URL, only present on category-landing pages. */
  heroImage?: string;
  /** Real sub-category quick-link chips shown on category-landing pages. */
  subcategoryLinks?: CollectionSubcategoryLink[];
  /**
   * Real product slugs belonging to this collection, restricted to the 44 products modeled in
   * src/data/products — the live collection may contain more real products than we've modeled;
   * see totalLiveProductCount for the real total observed on the site.
   */
  productSlugs: string[];
  /** Real total product count observed live (may exceed productSlugs.length — see above). */
  totalLiveProductCount: number | null;
  /** Field names not captured for this collection, for QA transparency. */
  missingFields?: string[];
}

export type { Product };
