export interface ProductVariant {
  id: string;
  value: string;
  price: string;
  sku: string;
  available: boolean;
  image?: string;
}

export interface ProductPromoCode {
  label: string;
  title: string;
  description: string;
  expiry: string;
  code?: string;
}

export interface ProductDescriptionSection {
  heading: string;
  body: string;
}

export interface ProductGiftPanelTile {
  threshold: string;
  caption: string;
}

export interface ProductReviewSummary {
  average: number;
  count: number;
}

export interface ProductDetail {
  slug: string;
  sku: string;
  name: string;
  subtitle?: string;
  breadcrumb: { label: string; href: string }[];
  images: string[];
  giftPanel?: ProductGiftPanelTile[];
  videos?: string[];
  optionLabel: string;
  variants: ProductVariant[];
  price: string;
  originalPrice?: string;
  promoCodes: ProductPromoCode[];
  stock: "in_stock" | "out_of_stock";
  descriptionSections: ProductDescriptionSection[];
  reviews: {
    summary: ProductReviewSummary;
    items: never[];
  };
  shareUrl: string;
}
