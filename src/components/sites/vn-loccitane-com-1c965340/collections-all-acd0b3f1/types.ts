export interface Product {
  slug: string;
  sku: string;
  name: string;
  image: string;
  volume?: string;
  price: string;
  originalPrice?: string;
}

export interface FilterGroup {
  key: string;
  label: string;
  options: string[];
  visibleCount: number;
}

export interface SortOption {
  key: string;
  label: string;
}
