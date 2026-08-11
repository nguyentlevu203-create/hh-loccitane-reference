export function ProductActions({
  onAddToCart,
  onBuyNow,
  addToCartLabel = "THÊM VÀO GIỎ HÀNG",
  buyNowLabel = "MUA NGAY",
}: {
  onAddToCart: () => void;
  onBuyNow: () => void;
  addToCartLabel?: string;
  buyNowLabel?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onAddToCart}
        className="rounded-[5px] border border-foreground px-4 py-3 text-sm font-medium text-foreground"
      >
        {addToCartLabel}
      </button>
      <button
        type="button"
        onClick={onBuyNow}
        className="rounded-[5px] bg-foreground px-4 py-3 text-sm font-medium text-white"
      >
        {buyNowLabel}
      </button>
    </div>
  );
}
