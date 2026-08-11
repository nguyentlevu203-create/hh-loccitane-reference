import { FilterIcon } from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";

export function CollectionToolbar({
  shown,
  total,
  onOpenFilter,
}: {
  shown: number;
  total: number;
  onOpenFilter: () => void;
}) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Hiển thị {shown} trên {total}
      </p>
      <button
        type="button"
        onClick={onOpenFilter}
        className="flex items-center gap-2 rounded-[5px] border border-[#cccccc] px-2 py-1.5 text-sm text-foreground"
      >
        <FilterIcon className="size-[18px]" />
        Bộ Lọc
      </button>
    </div>
  );
}
