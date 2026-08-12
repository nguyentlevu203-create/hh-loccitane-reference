"use client";

import { useMemo, useState } from "react";
import type { PageRecord, Store } from "@/data/pages/types";
import { LocationIcon, PhoneIcon } from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";

function StoreCard({ store, active, onSelect }: { store: Store; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`block w-full rounded-[5px] border p-4 text-left text-sm transition-colors ${
        active ? "border-foreground bg-secondary" : "border-border"
      }`}
    >
      <p className="flex items-start gap-2 font-medium text-foreground">
        <LocationIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        {store.name}
      </p>
      <p className="mt-1 ml-6 text-muted-foreground">{store.address}</p>
      <p className="mt-1 ml-6 flex items-center gap-2 text-muted-foreground">
        <PhoneIcon className="size-3.5 shrink-0" />
        {store.phone}
      </p>
      <p className="mt-1 ml-6 text-xs text-muted-foreground">{store.hours}</p>
    </button>
  );
}

export function StoreLocator({ page }: { page: PageRecord }) {
  const stores = useMemo(() => page.stores ?? [], [page.stores]);
  const provinces = useMemo(
    () => Array.from(new Set(stores.map((s) => s.province))),
    [stores],
  );
  const [province, setProvince] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = province === "all" ? stores : stores.filter((s) => s.province === province);
  const activeStore = filtered[activeIndex] ?? filtered[0];

  return (
    <article>
      <h1 className="mb-6 text-center text-3xl font-medium text-foreground">{page.title}</h1>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_1.2fr]">
        <div>
          <select
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              setActiveIndex(0);
            }}
            className="mb-4 w-full rounded-[5px] border border-border px-3 py-2 text-sm"
          >
            <option value="all">Chọn tỉnh/thành phố</option>
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <div className="space-y-3">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground">Hiện chưa có cửa hàng</p>
            ) : (
              filtered.map((store, i) => (
                <StoreCard
                  key={store.name}
                  store={store}
                  active={store === activeStore}
                  onSelect={() => setActiveIndex(i)}
                />
              ))
            )}
          </div>
        </div>

        <div className="aspect-[4/3] w-full overflow-hidden rounded-[5px] bg-card md:aspect-auto md:h-full">
          {activeStore && (
            <iframe
              key={activeStore.name}
              src={activeStore.mapEmbedUrl}
              className="h-full min-h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={activeStore.name}
            />
          )}
        </div>
      </div>
    </article>
  );
}
