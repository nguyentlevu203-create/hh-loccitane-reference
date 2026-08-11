export interface Product {
  slug: string;
  name: string;
  image: string;
  originalPrice?: string;
  price: string;
}

export interface CategoryTile {
  label: string;
  href: string;
  image: string;
}

export interface PromoSlide {
  title: string;
  description: string;
  image: string;
  href: string;
  imagePosition: "left" | "right";
}

export interface MembershipCard {
  title: string;
  description: string;
  image: string;
  href: string;
  ctaLabel: string;
}

export interface ServiceTile {
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface NavCategoryItem {
  label: string;
  href: string;
  expandable: boolean;
}
