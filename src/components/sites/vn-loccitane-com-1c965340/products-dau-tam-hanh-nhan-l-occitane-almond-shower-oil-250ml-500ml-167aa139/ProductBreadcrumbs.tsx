import Link from "next/link";

export function ProductBreadcrumbs({
  items,
  current,
}: {
  items: { label: string; href: string }[];
  current: string;
}) {
  return (
    <nav className="text-[13px] text-foreground" aria-label="Breadcrumb">
      {items.map((item) => (
        <span key={item.href}>
          <Link href={item.href} className="hover:underline">
            {item.label}
          </Link>
          <span className="mx-1.5">/</span>
        </span>
      ))}
      <span>{current}</span>
    </nav>
  );
}
