# Phase 6 — Shared Commerce State Architecture

Design for the client-side state layer backing Search, Quick View, Wishlist, and Cart. Written
before implementation, per the Phase 6 process. Scope is bounded by `AGENTS.md`'s standing
instruction: no real payment, checkout backend, accounts, orders, or private APIs — this is local,
deterministic frontend state standing in for those systems.

## Grounding in confirmed live behavior

Two real, previously-documented facts about `vn.loccitane.com` directly shape this design, both
from `docs/research/vn-loccitane-com-1c965340/collections-all-acd0b3f1/BEHAVIORS.md`:

1. **Quick View is a single shared global affordance on the live site, not a per-card modal
   instance.** The real theme calls a global `window.wd.theme.quickview(...)` handler from every
   product card — i.e. there is exactly one Quick View "slot" for the whole page, and any card can
   populate it. Our previous implementation (two independent `useState` instances, one in
   `ProductGrid`, one in `ProductRecommendations`, each rendering its own `<QuickViewModal>`) does
   not mirror this — it's the one component in this codebase where the *shape* of the state was
   wrong, not just its scope. This doc corrects that: Quick View becomes one shared context, exactly
   like the real site's one global handler.
2. **The wishlist heart is always visible on every card** (not hover-gated) and **cart/wishlist
   counts render as header badges** — confirming badge-driven, count-based state (not e.g. a toast
   log) is the right real-world shape for both, which is what was already built.

The header's real search-overlay markup (captured live in Phase 5 — see
`docs/research/FULL_COLLECTION_INVENTORY.md` and `scripts/crawl-collections-phase5.mjs`) confirmed a
single search surface with a query input, a "popular searches" list, and a suggestions grid — one
open/closed state, one query, one result set. No live behavior suggests more than one concurrent
search session, so a single shared `query`/`results` pair is sufficient.

## Why Context, not Redux/Zustand

Four small, independent pieces of state (cart, wishlist, quick view, search), each with a handful of
actions and no cross-cutting middleware/selector needs. React's built-in `useContext` +
`useSyncExternalStore` covers this completely:

- `useSyncExternalStore` for the two **persisted** stores (cart, wishlist) — the React-endorsed
  primitive for syncing to an external system (`localStorage`), with correct SSR snapshots and no
  extra dependency.
- Plain `useState` inside a `Provider` for the two **ephemeral, unpersisted** UI states (quick view,
  search) — reset to their default on every full page load, matching real UX (nobody expects a
  reload to reopen the modal they had open).

Redux/Zustand would add a dependency and boilerplate (selectors, slices, devtools wiring) to solve a
problem four `useContext` calls already solve. Revisit only if a future phase needs cross-store
transactions (e.g. "move a wishlist item into the cart atomically") — not needed today.

## State shape

```ts
// Cart — src/lib/commerce/CartContext.tsx
interface CartItem {
  slug: string;      // product slug — the join key back to src/data/products
  sku: string;
  name: string;
  image: string;
  price: string;     // formatted VND string, snapshotted at add-time (e.g. "890,000₫")
  volume?: string;    // the selected variant's label — doubles as "selected variant"
  qty: number;
}
interface CartContextValue {
  items: CartItem[];
  count: number;      // derived: sum of qty — drives the header/MobileBottomNav badge
  subtotal: number;   // derived: sum of price*qty as a raw VND number
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (slug: string, volume?: string) => void;
  setQty: (slug: string, volume: string | undefined, qty: number) => void;
  clear: () => void;
  isOpen: boolean;    // cart drawer visibility
  open: () => void;
  close: () => void;
}

// Wishlist — src/lib/commerce/WishlistContext.tsx
interface WishlistItem { slug: string; sku: string; name: string; image: string; price: string; volume?: string }
interface WishlistApi {
  items: WishlistItem[];
  count: number;                          // drives the header badge
  isWishlisted: (slug: string) => boolean;
  toggle: (item: WishlistItem) => void;
  remove: (slug: string) => void;
}

// Quick View — src/lib/commerce/QuickViewContext.tsx (NEW)
interface QuickViewContextValue {
  product: Product | null;  // the grid Product shape from collections-all-acd0b3f1/types
  isOpen: boolean;           // derived as `product !== null`, exposed for symmetry with Cart/Search
  open: (product: Product) => void;
  close: () => void;
}

// Search — src/lib/commerce/SearchContext.tsx (extended)
interface SearchContextValue {
  query: string;
  results: { products: Product[]; collections: { slug: string; title: string }[] };
  setQuery: (query: string) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;   // also clears query, so reopening always starts blank
}
```

## Actions summary

| Store | Actions | Mutates persisted storage? |
|---|---|---|
| Cart | `addItem`, `removeItem`, `setQty`, `clear`, `open`, `close` | `addItem`/`removeItem`/`setQty`/`clear` yes; `open`/`close` no |
| Wishlist | `toggle`, `remove` | yes |
| Quick View | `open(product)`, `close` | no (ephemeral) |
| Search | `setQuery`, `open`, `close` | no (ephemeral) |

## Provider location

One composed `CommerceProvider` (`src/lib/commerce/CommerceProvider.tsx`), mounted once in
`src/app/layout.tsx` wrapping `{children}` — above every route, so all pages share one instance:

```
RootLayout (server component)
  └─ CommerceProvider ("use client")
       └─ CartProvider          (persisted store + isOpen UI state)
            └─ QuickViewProvider  (ephemeral — NEW)
                 └─ SearchProvider   (ephemeral, now carries query/results)
                      └─ {children}  (Wishlist has no Provider — see below)
```

**Wishlist intentionally has no Provider.** `createPersistedStore` (see below) returns a module-level
singleton — every component calling `useWishlist()` reads/writes the same store directly, without
needing a context boundary. This is a deliberate asymmetry: Wishlist has no ephemeral UI state to
carry (unlike Cart's drawer `isOpen`), so a Provider would exist only to pass down a value that's
already globally reachable — dead weight. Documented here so it reads as a decision, not an
inconsistency.

## Persistence strategy

- **Cart, Wishlist**: `localStorage`, via `src/lib/commerce/createPersistedStore.ts` — a ~40-line
  factory around `useSyncExternalStore` (module-level `value`, `subscribe`/`getSnapshot`/
  `getServerSnapshot`, cross-tab sync via the native `storage` event). Chosen over a naive
  `useState` + `useEffect(() => setState(readStorage()))` pattern because the latter trips this
  repo's `react-hooks/set-state-in-effect` lint rule (calling a setState synchronously inside an
  effect body) and doesn't sync across tabs for free.
- **Quick View, Search**: in-memory only (`useState` inside their Provider). No live-site behavior
  suggests either should survive a reload — resetting is the expected, correct behavior.

## Component consumers

| Component | Reads | Calls |
|---|---|---|
| `SiteChrome` / `SiteHeader` | `cart.count`, `wishlist.count` | `cart.open`, `searchOverlay.open` |
| `MobileBottomNav` | `cart.count` | `cart.open` |
| `OffCanvasNav` | — | `searchOverlay.open` (search icon + "Tìm kiếm" link) |
| `CartDrawer` (rendered once, inside `SiteChrome`) | `cart.items/subtotal/isOpen` | `cart.setQty`, `cart.removeItem`, `cart.close` |
| `SearchOverlay` (rendered once, inside `SiteChrome`) | `search.query/results/isOpen` | `search.setQuery`, `search.close` |
| `QuickViewModal` (rendered once, inside `SiteChrome` — **new location**) | `quickView.product/isOpen` | `quickView.close`, `cart.addItem`, `wishlist.toggle` |
| `ProductCard` (used on homepage, `/collections/all`, `/collections/[slug]`, `/wishlist`, PDP recommendations, search results) | `wishlist.isWishlisted` | `wishlist.toggle`, `quickView.open` |
| `ProductDetailPage` | `wishlist.isWishlisted` | `wishlist.toggle`, `cart.addItem`, `cart.open` (Buy Now) |
| `/wishlist` page | `wishlist.items` | — |

Every page (`/`, `/collections/all`, `/collections/[slug]`, `/products/[slug]`, `/wishlist`) renders
`SiteChrome` once, which is what makes "one Quick View / one Cart Drawer / one Search Overlay"
possible — they mount alongside the header on every route rather than being duplicated per grid.

## SSR / client boundaries

- `RootLayout` (`src/app/layout.tsx`) stays a **server component**; only `CommerceProvider` and
  everything inside it is `"use client"`.
- `createPersistedStore`'s `getServerSnapshot()` always returns the same `fallback` reference (e.g.
  `[]`) — required by `useSyncExternalStore` so the server-rendered HTML and the client's first
  render match exactly before hydration reads `localStorage`.
- Every leaf component that reads cart/wishlist/quick-view/search state is itself `"use client"`
  (`SiteChrome`, `ProductCard`, `CartDrawer`, etc.) — none of this state is ever read from a server
  component, so there's no serialization boundary to cross.

## Potential hydration risks (and why they're acceptable)

- **Badge flash**: header cart/wishlist badges render `0` on the server and on the client's first
  paint, then update to the real `localStorage` value once `CartProvider`/`useWishlist` hydrate
  (a `useSyncExternalStore` subscription effect, not a manual `setState`-in-effect). This is a
  one-frame flash on cold load, not a mismatch — server and first client render both show `0`, so
  React never warns. Acceptable and matches how every localStorage-backed cart badge behaves on
  real e-commerce sites.
- **`/wishlist` page empty-first-paint**: same mechanism — the page is entirely client-rendered, so
  it briefly shows the empty state before hydration populates real items. No SEO impact since a
  personal wishlist has no meaningful pre-render content anyway.
- **Cross-tab drift**: two tabs open to different pages both hold `CommerceProvider` instances with
  independent in-memory `value` copies inside `createPersistedStore`; the `storage` event listener
  reconciles them on any change, but there's a small window where two tabs disagree until that event
  fires. Acceptable for a reference clone; a real backend cart wouldn't have this problem but also
  isn't in scope here.
- **Quick View / Search are never persisted**, so there's no hydration mismatch risk for them at
  all — they start at their default (`product: null` / `query: ""`) on both server and client, every
  time.
