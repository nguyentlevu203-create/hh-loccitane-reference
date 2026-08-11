# Component Map — /collections/all

## Reused unchanged (GLOBAL SHARED, from `src/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/` and `shared/`)

- `SiteChrome` / `SiteHeader` / `AnnouncementBar` — extended with one new optional prop (`forceScrolled`), default preserves homepage behavior exactly.
- `OffCanvasNav` — reused as-is (same hamburger menu drawer).
- `SiteFooter` — reused as-is.
- `FloatingActions` — reused as-is.
- `FeedbackStrip` — reused as-is (appears on this page too, unchanged content).
- `shared/icons.tsx` — reused; a few new icons needed (close/×, filter/sliders, chevron for accordion — check for existing equivalents first: `ArrowDownIcon`/`CloseIcon` already cover chevron + close; add `FilterIcon` and `MinusIcon`/`PlusIcon` for the quantity stepper, `SortIcon` if distinct from filter).

## New components (this page's namespace: `src/components/sites/vn-loccitane-com-1c965340/collections-all-acd0b3f1/`)

| Component | Spec file | Complexity |
|---|---|---|
| `CollectionHeader` | `components/collection-header.spec.md` | Simple (breadcrumb + H1) |
| `CollectionToolbar` | `components/collection-toolbar.spec.md` | Simple (count text + filter button) |
| `FilterSortPanel` (covers both `FilterPanel` and `MobileFilterDrawer` — one responsive component, not two) | `components/filter-sort-panel.spec.md` | Complex — chip row primitive, 4 filter groups, accordion expand, sticky footer, backdrop |
| `ProductGrid` | `components/product-grid.spec.md` | Simple (grid wrapper + load-more button + mock data) |
| `ProductCard` | `components/product-card.spec.md` | Medium (image, badge, wishlist, hover quick-view trigger, price variants) |
| `QuickViewModal` | `components/quick-view-modal.spec.md` | Medium (centered modal, variant chips, stepper) |

## New shared component (belongs in `shared/`, not this page's namespace, since it's site-wide)

| Component | Spec file | Complexity |
|---|---|---|
| `MobileBottomNav` | `components/mobile-bottom-nav.spec.md` | Simple |

## Explicitly NOT reused from `BestsellersCarousel`

The homepage's `BestsellersCarousel.tsx` has product-card markup inlined, but its price styling (`text-destructive` red for all prices) does not match this page's real card styling (wine/foreground price color, red never used for price text). Per instructions, this is a real visual difference confirmed against the live source — extracting a shared `ProductCard` and retrofitting the homepage carousel would risk a homepage visual regression for no confirmed behavioral gain. **Decision: build a new, independent `ProductCard` for this page's grid; leave `BestsellersCarousel` untouched.**
