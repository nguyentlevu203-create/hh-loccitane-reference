/**
 * Real structural templates found on the live site's /pages/... routes — see
 * docs/research/phase-7-content/PAGE_TEMPLATE_MATRIX.md. Each maps to one composition inside
 * ContentPage.tsx; no page gets its own bespoke page implementation.
 */
export type PageTemplate = "standard" | "store-locator" | "contact-form" | "editorial";

export interface Store {
  name: string;
  province: string;
  district: string;
  address: string;
  phone: string;
  hours: string;
  /** The real embeddable Google Maps URL extracted from the source `<iframe src>`. */
  mapEmbedUrl: string;
}

export interface PageRecord {
  slug: string;
  sourceUrl: string;
  title: string;
  breadcrumb: { label: string; href: string }[];
  template: PageTemplate;

  /** standard: real rich-text paragraphs, in document order. */
  bodyParagraphs?: string[];

  /** editorial: real hero image + the first 1-3 real substantial lead paragraphs found on-page. */
  heroImage?: string;
  leadParagraphs?: string[];

  /** store-locator: the real, public store list (see PAGE_TEMPLATE_MATRIX.md for the source JSON). */
  stores?: Store[];

  /** Field names not captured for this page, for QA transparency. */
  missingFields?: string[];
}
