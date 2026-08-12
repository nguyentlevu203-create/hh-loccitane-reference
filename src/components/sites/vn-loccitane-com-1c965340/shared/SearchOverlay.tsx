"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchOverlay } from "@/lib/commerce/SearchContext";
import { getPopularSearches, getSearchSuggestions } from "@/lib/commerce/search";
import type { Product } from "@/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/types";
import { SearchIcon, CloseIcon } from "./icons";

function ResultTile({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      onClick={onClick}
      className="flex items-center gap-3 rounded-[5px] p-2 hover:bg-secondary"
    >
      <div className="relative aspect-square w-14 shrink-0 overflow-hidden rounded-[5px] bg-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
      </div>
      <div className="min-w-0">
        <p className="line-clamp-2 text-sm text-foreground">{product.name}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{product.price}</p>
      </div>
    </Link>
  );
}

export function SearchOverlay() {
  const { query, results, setQuery, isOpen, close } = useSearchOverlay();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const popularSearches = useMemo(() => getPopularSearches(), []);
  const suggestions = useMemo(() => getSearchSuggestions(), []);
  const hasQuery = query.trim().length > 0;
  const noResults = hasQuery && results.products.length === 0 && results.collections.length === 0;

  return (
    <>
      <div
        onClick={close}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[90] bg-black/40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label="Tìm kiếm"
        className={cn(
          "fixed inset-x-0 top-0 z-[100] max-h-[85vh] overflow-y-auto bg-white shadow-lg transition-transform duration-300 ease-out",
          isOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="mx-auto max-w-[900px] px-4 py-6 lg:px-10">
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-4 size-4 text-muted-foreground" />
            <input
              autoFocus={isOpen}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm, bộ sưu tập..."
              className="h-11 w-full rounded-full border border-foreground/30 bg-transparent pr-10 pl-11 text-sm text-foreground focus:outline-none"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Đóng tìm kiếm"
              className="absolute right-3 flex items-center justify-center"
            >
              <CloseIcon className="size-4 text-foreground" />
            </button>
          </div>

          {!hasQuery && (
            <div className="mt-6 grid gap-8 sm:grid-cols-[200px_1fr]">
              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  Tìm kiếm phổ biến
                </h4>
                <ul className="space-y-2">
                  {popularSearches.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/collections/${c.slug}`}
                        onClick={close}
                        className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                      >
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  Được yêu thích
                </h4>
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                  {suggestions.map((p) => (
                    <ResultTile key={p.slug} product={p} onClick={close} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {hasQuery && (
            <div className="mt-6">
              {noResults ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Không tìm thấy kết quả cho “{query}”.
                </p>
              ) : (
                <div className="grid gap-8 sm:grid-cols-[200px_1fr]">
                  {results.collections.length > 0 && (
                    <div>
                      <h4 className="mb-3 text-sm font-semibold text-foreground">
                        Bộ sưu tập
                      </h4>
                      <ul className="space-y-2">
                        {results.collections.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/collections/${c.slug}`}
                              onClick={close}
                              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                            >
                              {c.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {results.products.length > 0 && (
                    <div>
                      <h4 className="mb-3 text-sm font-semibold text-foreground">
                        Sản phẩm
                      </h4>
                      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                        {results.products.map((p) => (
                          <ResultTile key={p.slug} product={p} onClick={close} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
