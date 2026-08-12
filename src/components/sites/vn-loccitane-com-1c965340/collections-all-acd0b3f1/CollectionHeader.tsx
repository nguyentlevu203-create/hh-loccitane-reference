import Link from "next/link";

import type { CollectionSubcategoryLink } from "@/data/collections/types";

export interface CollectionHeaderProps {
  title: string;
  breadcrumb: { label: string; href: string }[];
  /** Real editorial description text — only category-landing/editorial collections have this. */
  description?: string;
  /** Real hero banner image — only category-landing collections have this. */
  heroImage?: string;
  /** Real sub-category quick-link chips — only category-landing collections have these. */
  subcategoryLinks?: CollectionSubcategoryLink[];
}

export function CollectionHeader({
  title,
  breadcrumb,
  description,
  heroImage,
  subcategoryLinks,
}: CollectionHeaderProps) {
  return (
    <div>
      <nav className="text-[13px] text-foreground" aria-label="Breadcrumb">
        {breadcrumb.map((crumb) => (
          <span key={crumb.href}>
            <Link href={crumb.href} className="hover:underline">
              {crumb.label}
            </Link>
            <span className="mx-1.5">/</span>
          </span>
        ))}
        <span>{title}</span>
      </nav>
      <h1 className="mt-4 mb-[13px] text-center text-4xl font-semibold text-foreground lg:text-[40px] lg:leading-[56px]">
        {title}
      </h1>

      {heroImage && (
        <div className="relative mb-6 aspect-[1400/440] w-full overflow-hidden rounded-[5px] bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {description && (
        <p className="mx-auto mb-6 max-w-[820px] text-center text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      {subcategoryLinks && subcategoryLinks.length > 0 && (
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {subcategoryLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="shrink-0 rounded-full border border-[#cccccc] px-3 py-1.5 text-xs whitespace-nowrap text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
