export function ProductPrice({
  price,
  originalPrice,
  label = "Giá:",
}: {
  price: string;
  originalPrice?: string;
  label?: string;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-2xl font-medium text-foreground">{price}</span>
      {originalPrice && (
        <span className="text-sm text-muted-foreground line-through">
          {originalPrice}
        </span>
      )}
    </div>
  );
}
