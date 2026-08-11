import {
  PlusIcon,
  MinusIcon,
} from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Giảm số lượng"
        className="flex size-8 items-center justify-center rounded-[5px] border border-border disabled:opacity-40"
      >
        <MinusIcon className="size-3.5" />
      </button>
      <span className="w-10 text-center text-sm">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Tăng số lượng"
        className="flex size-8 items-center justify-center rounded-[5px] border border-border"
      >
        <PlusIcon className="size-3.5" />
      </button>
    </div>
  );
}
