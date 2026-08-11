"use client";

import type { ProductVariant } from "./types";

export function VariantSelector({
  optionLabel,
  variants,
  selected,
  onChange,
}: {
  optionLabel: string;
  variants: ProductVariant[];
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="variant-select" className="text-sm text-foreground">
        {optionLabel}:
      </label>
      <select
        id="variant-select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-[5px] border border-border bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none"
      >
        {variants.map((variant) => (
          <option
            key={variant.id}
            value={variant.value}
            disabled={!variant.available}
          >
            {variant.value}
          </option>
        ))}
      </select>
    </div>
  );
}
