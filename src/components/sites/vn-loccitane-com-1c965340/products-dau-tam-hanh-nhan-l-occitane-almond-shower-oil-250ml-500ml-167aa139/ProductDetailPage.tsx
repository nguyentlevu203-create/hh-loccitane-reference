"use client";

import { useEffect, useState } from "react";
import SiteChrome from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/SiteChrome";
import { OffCanvasNav } from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/OffCanvasNav";
import {
  SiteFooter,
  FloatingActions,
} from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/FooterAndFloating";
import FeedbackStrip from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/FeedbackStrip";
import { MobileBottomNav } from "@/components/sites/vn-loccitane-com-1c965340/shared/MobileBottomNav";
import { useCart } from "@/lib/commerce/CartContext";
import { useWishlist } from "@/lib/commerce/WishlistContext";
import type { Product } from "../collections-all-acd0b3f1/types";
import { ProductBreadcrumbs } from "./ProductBreadcrumbs";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductAccordion } from "./ProductAccordion";
import { ProductReviews } from "./ProductReviews";
import { ProductRecommendations } from "./ProductRecommendations";
import type { ProductDetail } from "./types";

export function ProductDetailPage({
  product,
  recommendations,
}: {
  product: ProductDetail;
  recommendations: Product[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.value ?? ""
  );
  const [toast, setToast] = useState<string | null>(null);
  const cart = useCart();
  const wishlist = useWishlist();
  const wishlisted = wishlist.isWishlisted(product.slug);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const activeVariant = product.variants.find((v) => v.value === selectedVariant);

  // Add to Cart / Buy Now push into the shared, localStorage-persisted cart
  // (src/lib/commerce/CartContext.tsx) rather than a real checkout backend —
  // the live site's actual checkout/order system is out of scope (private).
  const addToCart = () => {
    cart.addItem(
      {
        slug: product.slug,
        sku: activeVariant?.sku ?? product.sku,
        name: product.name,
        image: product.images[0] ?? "",
        price: activeVariant?.price ?? product.price,
        volume: activeVariant?.value,
      },
      qty,
    );
  };

  const handleAddToCart = () => {
    addToCart();
    setToast("Đã thêm vào giỏ hàng");
  };

  const handleBuyNow = () => {
    addToCart();
    cart.open();
  };

  const toggleWishlist = () => {
    wishlist.toggle({
      slug: product.slug,
      sku: product.sku,
      name: product.name,
      image: product.images[0] ?? "",
      price: product.price,
      volume: product.variants[0]?.value,
    });
  };

  return (
    <>
      <SiteChrome onMenuClick={() => setMenuOpen(true)} forceScrolled />
      <OffCanvasNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="mx-auto max-w-[1200px] px-4 pt-[104px] pb-16 lg:px-10">
        <ProductBreadcrumbs items={product.breadcrumb} current={product.name} />

        <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          <ProductGallery
            images={product.images}
            giftPanel={product.giftPanel}
            productLabel={product.variants.find((v) => v.value === selectedVariant)?.value}
            wishlisted={wishlisted}
            onToggleWishlist={toggleWishlist}
          />
          <ProductInfo
            product={product}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
            qty={qty}
            onQtyChange={setQty}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        </div>

        <div className="mt-12">
          <ProductAccordion sections={product.descriptionSections} />
        </div>

        <div className="mt-12">
          <ProductReviews summary={product.reviews.summary} />
        </div>

        <div className="mt-12">
          <ProductRecommendations products={recommendations} />
        </div>
      </main>

      <FeedbackStrip />
      <SiteFooter />
      <FloatingActions />
      <MobileBottomNav />

      {toast && (
        <div className="fixed bottom-20 left-1/2 z-[130] -translate-x-1/2 rounded-full bg-foreground px-5 py-2.5 text-sm text-white shadow-lg lg:bottom-8">
          {toast}
        </div>
      )}
    </>
  );
}
