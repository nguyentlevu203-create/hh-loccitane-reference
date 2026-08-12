export interface CartItem {
  slug: string;
  sku: string;
  name: string;
  image: string;
  /** Formatted display price for the line, e.g. "890,000₫" — snapshotted at add-time. */
  price: string;
  volume?: string;
  qty: number;
}

export interface WishlistItem {
  slug: string;
  sku: string;
  name: string;
  image: string;
  price: string;
  volume?: string;
}
