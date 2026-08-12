# Phase 7 — Content Page Template Matrix

Live sampling across all 42 real `/pages/...` routes (`scripts/crawl-pages-phase7.mjs`), classified
by real structural markup signals — same method as `PDP_TEMPLATE_MATRIX.md` (Phase 4) and
`COLLECTION_TEMPLATE_MATRIX.md` (Phase 5): fetch real HTML, isolate the real page body, diff
structure. Goal: how many genuinely different content-page *layouts* exist on the live site.

## Sampled pages

| Page | URL | Real signal | Classification |
|---|---|---|---|
| `chinh-sach-bao-mat-1` | `/pages/chinh-sach-bao-mat-1` | `page-content content-entry` inside a 3-col sidebar + 9-col body split (`#page-template`) | **STANDARD** |
| `dieu-khoan-dich-vu`, `chinh-sach-*` (9 more), `faq`, `dang-ky-thanh-cong` | various | same `page-content content-entry` + sidebar shell | **STANDARD** |
| `he-thong-cua-hang` | `/pages/he-thong-cua-hang` | province/district `<select>` filters + `#address-link` store list (client-populated from a real public static JSON, `cuahang.json` — see below) + embedded Google Maps iframe | **STORE LOCATOR** (unique, 1 page) |
| `lien-he` | `/pages/lien-he` | real `<form action="/contact" method="post">` (name/email/phone/message) + embedded map | **CONTACT FORM** (unique, 1 page) |
| `bcorp`, `ve-l-occitane`, `brand-commitments`, `big-little-things`, `sustainable-sourcing`, `hotel-amenities`, `corporate-gifting`, `spa-loccitane`, `khachhangthanthietloccitane`, `ki-niem-50-nam-thanh-lap`, `uudai` + 14 more | various | full-bleed hero image + real on-page display heading + one-off hand-built section markup (`ldp-<slug>` ids, no two pages share the same section class names) | **BESPOKE / EDITORIAL** (25 pages) |

## The store locator's real data source

`he-thong-cua-hang`'s store list is empty in the static HTML (populated client-side), but the
client JS fetches it from `https://file.hstatic.net/200000692621/file/cuahang.json` — a public,
unauthenticated static JSON file on the same CDN that serves every product image in this project.
Confirmed via the live page's own network activity, not a private/internal API. It contains the
real, current 5-store list (name, province, district, address, phone, hours, embeddable map) — used
as-is in `src/data/pages/records/he-thong-cua-hang.ts`, not re-derived or guessed.

## Classification

**Three real structural templates, not one per page:**

| Classification | Real structural evidence | New component needed? |
|---|---|---|
| **STANDARD** | `#page-template` → 3-col category sidebar (real nav tree, also used to correct `OffCanvasNav`'s placeholder links — see `COMMERCE_STATE_ARCHITECTURE.md`-style grounding) + 9-col `.page-content.content-entry` rich-text body. 15 of 42 real pages use this — every policy, the terms of service, the buying guide, FAQ (real, currently empty), and the registration-success page. | Yes, one simple new template: hero-less title + rich-text body. No sidebar category widget cloned (out of scope — it's the same nav data already modeled via collections, not new content). |
| **STORE LOCATOR** | Real filter dropdowns + a real, small (5-store) address list + Google Maps embed. Exactly 1 real page uses this. | Yes, one small dedicated component — not reused elsewhere, but real and cheap (5 static records). |
| **CONTACT FORM** | Real `<form>` posting to `/contact` + map. Exactly 1 real page uses this. | Yes, one small dedicated component. Per `AGENTS.md`'s "no private backend" scope, the form is built as a real, fully-interactive UI that visibly confirms submission locally (matching the Cart checkout precedent from Phase 6) rather than actually posting anywhere — never silently pretends to send data to a real endpoint. |
| **BESPOKE / EDITORIAL** | 25 of 42 real pages — each with genuinely unique hand-built section markup (confirmed: only 2–3 pages coincidentally share a `content-and-image-style-1` class; the rest are all different). Cloning each one's exact custom layout would mean building ~20 one-off page components — explicitly out of scope per this phase's brief ("do not clone every page independently"). | **One** reusable `EditorialPage` template instead: real hero image (`og:image`) + real display heading (the first substantial on-page heading — not always the semantic `<h1>`, see below) + real lead paragraphs (first 1–3 substantial real text blocks in document order) + a link back to the live page for the full bespoke visual experience we deliberately don't attempt to pixel-clone. |

**Conclusion: 4 real templates cover all 42 pages** (Standard, Store Locator, Contact Form,
Editorial) — matching this phase's instruction to identify reusable templates rather than
one-off cloning every route.

## A real content quirk worth preserving

Several bespoke pages give their semantic `<h1>` a low-quality value — e.g. `bcorp`'s `<h1
class="hidden">` literally contains the text `"bcorp"` (the slug itself), while the real
*visible* heading a visitor actually reads is `"TỰ HÀO LÀ DOANH NGHIỆP B CORP™"` a few elements
later. This is a real authoring quirk on the live site (their hidden-h1-for-SEO pattern), not a
scraping bug. Rather than surfacing the low-quality hidden value or fabricating a better one, the
extraction picks the first real on-page heading whose text isn't just the slug — still 100% real,
page-sourced text, just the version an actual visitor sees and would call "the title".

## Fragrance / content-existence check

Consistent with the honesty standard set in Phases 4–5: `faq` is a real, live, nav-reachable page
that currently renders zero body content (`page-content content-entry` present but empty) — modeled
as-is (real empty state) rather than inventing FAQ copy that doesn't exist on the source site.
