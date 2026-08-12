"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { search, type SearchResults } from "./search";

interface SearchContextValue {
  query: string;
  results: SearchResults;
  setQuery: (query: string) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const EMPTY_RESULTS: SearchResults = { products: [], collections: [] };

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => (query.trim() ? search(query) : EMPTY_RESULTS), [query]);

  return (
    <SearchContext.Provider
      value={{
        query,
        results,
        setQuery,
        isOpen,
        open: () => setIsOpen(true),
        // Every close path in the app goes through this one function, so clearing the query here
        // (rather than reacting to `isOpen` in an effect) is enough to guarantee the overlay always
        // reopens blank — see SearchOverlay.tsx's original comment on why this isn't an effect.
        close: () => {
          setIsOpen(false);
          setQuery("");
        },
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchOverlay(): SearchContextValue {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearchOverlay must be used within SearchProvider");
  return ctx;
}
