"use client";

import { CollectionPage } from "@/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/CollectionPage";
import { useWishlist } from "@/lib/commerce/WishlistContext";

export default function WishlistPage() {
  const wishlist = useWishlist();

  return (
    <CollectionPage
      title="Được yêu thích"
      breadcrumb={[{ label: "Trang chủ", href: "/" }]}
      products={wishlist.items}
      total={wishlist.items.length}
      showToolbar={false}
      emptyMessage="Bạn chưa yêu thích sản phẩm nào — nhấn biểu tượng trái tim trên một sản phẩm để lưu vào đây."
    />
  );
}
