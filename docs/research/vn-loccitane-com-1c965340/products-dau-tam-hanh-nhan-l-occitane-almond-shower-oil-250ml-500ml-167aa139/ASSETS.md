# Assets — Almond Shower Oil PDP

Source: `window.wd.productjson.images` (Haravan product JSON embedded in page `<script>`), cross-checked
against rendered `<img>` tags and gallery thumbnail clicks.

## Gallery images (in slider order, 6 total)

| # | Purpose | Full-size CDN URL | Thumbnail (`_compact`) URL |
|---|---|---|---|
| 1 | Main/featured product bottle shot (shown by default alongside the gift-tile side panel — see BEHAVIORS.md) | `https://cdn.hstatic.net/products/200000692621/84_1__8a2d4e13627643fb91cf9e3b52974339.png` | `https://cdn.hstatic.net/products/200000692621/84_1__8a2d4e13627643fb91cf9e3b52974339_compact.png` |
| 2 | Alternate bottle shot (shadow render, shown alone — no gift panel) | `https://cdn.hstatic.net/products/200000692621/29hd250a26c_shadow_rvb_72318a4ae854413085ef965533c42ec8.png` | `https://cdn.hstatic.net/products/200000692621/29hd250a26c_shadow_rvb_72318a4ae854413085ef965533c42ec8_compact.png` |
| 3 | Marketing claim slide — "+25% Độ ẩm*" over skin photography | `https://cdn.hstatic.net/products/200000692621/1_b81df6d7a3054d7ca3f439e42327416d.png` | `https://cdn.hstatic.net/products/200000692621/1_b81df6d7a3054d7ca3f439e42327416d_compact.png` |
| 4 | Marketing claim slide — "Chiết xuất 40% Dầu tự nhiên" over wood/oil-drip photography | `https://cdn.hstatic.net/products/200000692621/2_00c03279a887486b9878b66d862f222c.png` | `https://cdn.hstatic.net/products/200000692621/2_00c03279a887486b9878b66d862f222c_compact.png` |
| 5 | Lifestyle/texture — hand massaging oil onto skin | `https://cdn.hstatic.net/products/200000692621/3_628bb9955adb4b6b82352ae7b00d729c.png` | `https://cdn.hstatic.net/products/200000692621/3_628bb9955adb4b6b82352ae7b00d729c_compact.png` |
| 6 | Campaign group shot — "Rạng rỡ" text with bottle + gift box | `https://cdn.hstatic.net/products/200000692621/4_a0922d8b60ee4261a8f0568e58a12a6b.png` | `https://cdn.hstatic.net/products/200000692621/4_a0922d8b60ee4261a8f0568e58a12a6b_compact.png` |

Also available at `_grande` size (larger than default, used as the zoomed/lightbox rendition), same base filename, e.g.
`https://cdn.hstatic.net/products/200000692621/84_1__8a2d4e13627643fb91cf9e3b52974339_grande.png`.

## Gift-with-purchase side panel (slide 0 only — see BEHAVIORS.md)

These are NOT part of the 6-image slider array — they're a separate always-adjacent promo panel rendered
next to slide 0. Extracted from rendered `<img>` tags on page load:

| Purpose | URL |
|---|---|
| Gift tile 1 — "ĐƠN HÀNG TỪ 990K" (order ≥990k gift) | Same-origin triangle/gift-wrap graphic — no distinct `<img src>` captured (appears to be an inline SVG/CSS-drawn triangle icon plus store logo, not a photographed product asset). Treat as decorative — recreate as a simple CSS shape or downloaded screenshot crop if pixel-fidelity is required; not a blocking asset for functional parity. |
| Gift tile 2 — "ĐƠN HÀNG TỪ 1TR5" (order ≥1.5tr gift, shows a small 30ml bottle + patterned pouch) | Same as above — composite of small bottle render + pouch graphic, not a single distinct CDN asset URL captured. |

## Companion/recommendation product images (reused from existing `root-8a5edab2` catalog — already downloaded)

| Product | Local path (already in repo) |
|---|---|
| Dầu Dưỡng Thể Hạnh Nhân (Almond Supple Skin Oil) | `/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-body-oil.png` |
| Kem Dưỡng Ẩm Săn Chắc Da Hạnh Nhân (Almond Milk Concentrate) | `/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-milk-concentrate.png` |

## Icons / UI chrome referenced (no new download needed — reuse existing)

- Quick-view search icon: `https://file.hstatic.net/200000525917/file/search-icon_61351aaf4f2a4ba0b163434492c75c0d.svg` — same icon already downloaded for `collections-all-acd0b3f1` (`quick-view-icon.svg`), only relevant if a recommendation card shows quick-view; reuse existing local copy, don't re-download.
- Select-dropdown caret used inside `.custom-dropdown`: `https://file.hstatic.net/200000525917/file/select-pro_e3e51c75e13340c1805618324bab59f0.png` — small 14×14 pencil/edit-style affordance icon next to the variant `<select>`. Not previously downloaded; needed if pixel-matching the exact dropdown affordance is desired (P2 nicety) — otherwise approximate with a Lucide chevron/select icon already in use elsewhere.

## Videos

None found on this PDP (no `<video>` elements, no video gallery slide).
