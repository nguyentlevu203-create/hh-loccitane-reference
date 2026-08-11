import { ProductPrice } from "./ProductPrice";
import { VariantSelector } from "./VariantSelector";
import { QuantitySelector } from "./QuantitySelector";
import { PromoCodeBox } from "./PromoCodeBox";
import { ProductActions } from "./ProductActions";
import { ShareRow } from "./ShareRow";
import type { ProductDetail } from "./types";

export function ProductInfo({
  product,
  selectedVariant,
  onVariantChange,
  qty,
  onQtyChange,
  onAddToCart,
  onBuyNow,
}: {
  product: ProductDetail;
  selectedVariant: string;
  onVariantChange: (value: string) => void;
  qty: number;
  onQtyChange: (value: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-medium text-foreground lg:text-[28px]">
        {product.name}
      </h1>

      <ProductPrice price={product.price} originalPrice={product.originalPrice} />

      <VariantSelector
        optionLabel={product.optionLabel}
        variants={product.variants}
        selected={selectedVariant}
        onChange={onVariantChange}
      />

      {/* Mobile: qty + share merged onto one row. Desktop: qty is its own row, share moves to the end. */}
      <div className="flex items-center justify-between md:hidden">
        <div>
          <p className="mb-2 text-sm text-foreground">Số lượng:</p>
          <QuantitySelector value={qty} onChange={onQtyChange} />
        </div>
        <ShareRow url={product.shareUrl} />
      </div>
      <div className="hidden md:block">
        <p className="mb-2 text-sm text-foreground">Số lượng:</p>
        <QuantitySelector value={qty} onChange={onQtyChange} />
      </div>

      <PromoCodeBox codes={product.promoCodes} />

      <ProductActions onAddToCart={onAddToCart} onBuyNow={onBuyNow} />

      <div className="hidden md:block">
        <ShareRow url={product.shareUrl} />
      </div>
    </div>
  );
}
