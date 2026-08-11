import Link from "next/link";

export function CollectionHeader() {
  return (
    <div>
      <nav className="text-[13px] text-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">
          Trang chủ
        </Link>
        <span className="mx-1.5">/</span>
        <span>Tất cả sản phẩm</span>
      </nav>
      <h1 className="mt-4 mb-[13px] text-center text-4xl font-semibold text-foreground lg:text-[40px] lg:leading-[56px]">
        Tất cả sản phẩm
      </h1>
    </div>
  );
}
