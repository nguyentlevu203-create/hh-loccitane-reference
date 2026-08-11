"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  CloseNavIcon,
  ArrowDownIcon,
} from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";
import type { FilterGroup, SortOption } from "./types";

const sortOptions: SortOption[] = [
  { key: "best-selling", label: "Bán chạy" },
  { key: "newest", label: "Mới nhất" },
  { key: "price-desc", label: "Giá cao đến thấp" },
  { key: "price-asc", label: "Giá thấp đến cao" },
  { key: "az", label: "A-Z" },
  { key: "za", label: "Z-A" },
  { key: "stock-desc", label: "Tồn kho: Giảm dần" },
];

const filterGroups: FilterGroup[] = [
  {
    key: "type",
    label: "Loại sản phẩm",
    visibleCount: 4,
    options: [
      "CHĂM SÓC CƠ THỂ",
      "Ưu Đãi",
      "CHĂM SÓC TÓC",
      "TẮM & DƯỠNG THỂ",
      "Ưu Đãi Cửa Hàng",
      "CHĂM SÓC DA MẶT",
      "Khác",
      "Gift",
      "KHÁC",
      "NƯỚC HOA",
      "KHÔNG GIAN SỐNG",
      "Deal Tháng 8",
      "COMBO",
    ],
  },
  {
    key: "volume",
    label: "Dung tích",
    visibleCount: 4,
    options: ["30ml", "50ml", "75ml", "150ml"],
  },
  {
    key: "price",
    label: "Lọc giá",
    visibleCount: 4,
    options: [
      "Dưới 1,000,000₫",
      "Từ 1,000,000₫ - 2,000,000₫",
      "Từ 2,000,000₫ - 3,000,000₫",
      "Từ 3,000,000₫ - 4,000,000₫",
    ],
  },
];

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[5px] border px-2 py-2 text-sm whitespace-nowrap",
        selected
          ? "border-foreground bg-foreground text-white"
          : "border-[#cccccc] bg-[#fbf9f6] text-foreground"
      )}
    >
      {label}
    </button>
  );
}

function FilterGroupSection({
  group,
  selected,
  onToggle,
}: {
  group: FilterGroup;
  selected: Set<string>;
  onToggle: (value: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? group.options : group.options.slice(0, group.visibleCount);
  const hasMore = group.options.length > group.visibleCount;

  return (
    <div className="border-t border-border py-5">
      <p className="mb-3 text-sm font-semibold text-foreground">{group.label}</p>
      <div className="flex flex-wrap gap-2">
        {visible.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={selected.has(option)}
            onClick={() => onToggle(option)}
          />
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 flex items-center gap-1 text-sm text-foreground"
        >
          {expanded ? "Rút gọn" : "Xem thêm"}
          <ArrowDownIcon
            className={cn(
              "h-3 w-3 transition-transform duration-200",
              expanded ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
      )}
    </div>
  );
}

export interface FilterState {
  sort: string;
  type: Set<string>;
  volume: Set<string>;
  price: Set<string>;
}

export function FilterSortPanel({
  open,
  onClose,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  onApply: (state: FilterState) => void;
}) {
  const [sort, setSort] = useState("newest");
  const [type, setType] = useState<Set<string>>(new Set());
  const [volume, setVolume] = useState<Set<string>>(new Set());
  const [price, setPrice] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, setter: (s: Set<string>) => void, value: string) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const reset = () => {
    setSort("newest");
    setType(new Set());
    setVolume(new Set());
    setPrice(new Set());
  };

  const apply = () => {
    onApply({ sort, type, volume, price });
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[90] bg-black/50 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn(
          "fixed top-0 right-0 z-[100] flex h-screen w-full flex-col overflow-hidden bg-white transition-transform duration-300 ease-out lg:w-[550px]",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <p className="text-base font-bold uppercase tracking-wide text-foreground">
            Lọc sản phẩm
          </p>
          <button type="button" onClick={onClose} aria-label="Đóng">
            <CloseNavIcon className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="border-t border-border py-5">
            <p className="mb-3 text-sm font-semibold text-foreground">Sắp xếp theo:</p>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <Chip
                  key={option.key}
                  label={option.label}
                  selected={sort === option.key}
                  onClick={() => setSort(option.key)}
                />
              ))}
            </div>
          </div>

          <FilterGroupSection
            group={filterGroups[0]}
            selected={type}
            onToggle={(v) => toggle(type, setType, v)}
          />
          <FilterGroupSection
            group={filterGroups[1]}
            selected={volume}
            onToggle={(v) => toggle(volume, setVolume, v)}
          />
          <FilterGroupSection
            group={filterGroups[2]}
            selected={price}
            onToggle={(v) => toggle(price, setPrice, v)}
          />
        </div>

        <div className="flex gap-3 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={reset}
            className="flex-1 rounded-[5px] border border-foreground/30 py-2.5 text-sm text-foreground"
          >
            Làm mới
          </button>
          <button
            type="button"
            onClick={apply}
            className="flex-1 rounded-[5px] bg-foreground py-2.5 text-sm text-white"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </>
  );
}
