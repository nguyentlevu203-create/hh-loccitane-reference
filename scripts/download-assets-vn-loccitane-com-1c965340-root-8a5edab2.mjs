// Asset downloader for vn.loccitane.com homepage clone.
// site-key: vn-loccitane-com-1c965340  page-key: root-8a5edab2
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "public", "sites", "vn-loccitane-com-1c965340");
const PAGE = join(ROOT, "root-8a5edab2");
const SHARED = join(ROOT, "shared");

const images = [
  // Hero
  { url: "https://cdn.hstatic.net/files/200000692621/file/z7885591744486_b8249779e5f185f66bb73da322e3a56a.jpg", dest: `${PAGE}/images/hero-poster.jpg` },
  // Bestseller product photos (4 of 12 confirmed real; remaining 8 are carousel-virtualized and unavailable without per-product page visits)
  { url: "https://cdn.hstatic.net/products/200000692621/43_1_cb830daf5f044f62b3216211e9df6032_grande.png", dest: `${PAGE}/images/product-almond-body-oil.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/42_1_a8068cf1f05b48b8a3aa92761fe686f5_grande.png", dest: `${PAGE}/images/product-almond-milk-concentrate.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/84_1__8a2d4e13627643fb91cf9e3b52974339_grande.png", dest: `${PAGE}/images/product-almond-shower-oil-a.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/45_1_a3c320ccab1342a7912cb21eb5e4e0e0_grande.png", dest: `${PAGE}/images/product-almond-shower-oil-b.png` },
  // Category grid (7 tiles)
  { url: "https://cdn.hstatic.net/files/200000692621/file/1_2830277ec0d04a88be56e779fd20f6a2_grande.png", dest: `${PAGE}/images/category-uu-dai.png` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/1200_png-2026_almond_duo_so250_sso100_srgb_grande.png", dest: `${PAGE}/images/category-yeu-thich.png` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/1200_png-2026_rebranding_body_creams_trio_cmyk_grande.png", dest: `${PAGE}/images/category-co-the.png` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/1200_png-2025_imm_divine_model_a_cream_cmyk_grande.png", dest: `${PAGE}/images/category-da-mat.png` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/z7889594558678_b85099b703de93f7fe4781e531101a59_grande.jpg", dest: `${PAGE}/images/category-da-tay.jpg` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/z7885823693613_266f00358f6e138b7307894b8001f3ce_grande.jpg", dest: `${PAGE}/images/category-toc.jpg` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/1200_png-2026_rebranding_almond_refill_showeroil_500_grande.png", dest: `${PAGE}/images/category-refills.png` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/1200_png-2026_almond_hero_gift_so_milkco_sso_cmyk__1__grande.png", dest: `${PAGE}/images/category-qua-tang.png` },
  // Promo storytelling carousel (3 unique slides)
  { url: "https://cdn.hstatic.net/files/200000692621/file/z7885783818769_b8b574fdcf0206b5045f8ac8144cf9cb_1024x1024.jpg", dest: `${PAGE}/images/promo-body-oil.jpg` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/1200_png-2026_almond_hero_refill_rgb_1024x1024.png", dest: `${PAGE}/images/promo-refill.png` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/z7885783756334_6540aad1a256983636ac650e1060f17c_1024x1024.jpg", dest: `${PAGE}/images/promo-shower-oil.jpg` },
  // Membership perks (3)
  { url: "https://cdn.hstatic.net/files/200000692621/file/add_a_heading_44_grande.jpg", dest: `${PAGE}/images/membership-voucher.jpg` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/sm4_image_with_text_-_bcorp_6_grande.jpg", dest: `${PAGE}/images/membership-points.jpg` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/add_a_heading_32_grande.jpg", dest: `${PAGE}/images/membership-exclusive.jpg` },
  // Footer
  { url: "https://cdn.hstatic.net/themes/200000692621/1001439022/14/img_item_policy_1.jpg?v=2969", dest: `${PAGE}/images/footer-loyalty.jpg` },
  { url: "https://cdn.hstatic.net/themes/200000692621/1001439022/14/img_item_policy_2.jpg?v=2969", dest: `${PAGE}/images/footer-store.jpg` },
  { url: "https://cdn.hstatic.net/themes/200000692621/1001439022/14/footer_logobct_img.png?v=2969", dest: `${PAGE}/images/footer-trust-badge.png` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/bcorp.png", dest: `${PAGE}/images/footer-bcorp-badge.png` },
  // Shared (used across header + footer)
  { url: "https://cdn.hstatic.net/files/200000692621/file/logo__1_.png", dest: `${SHARED}/images/logo.png` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/logo.svg", dest: `${SHARED}/images/logo.svg` },
  { url: "https://file.hstatic.net/200000525917/file/search-icon_61351aaf4f2a4ba0b163434492c75c0d.svg", dest: `${SHARED}/images/quick-view-icon.svg` },
  { url: "https://cdn.hstatic.net/themes/200000692621/1001439022/14/favicon.png?v=2969", dest: `${SHARED}/images/favicon.png` },
];

const videos = [
  { url: "https://cdn.hstatic.net/files/200000692621/file/loccitane_body_main_015s_16x9_clean.mp4", dest: `${PAGE}/videos/hero.mp4` },
  { url: "https://cdn.hstatic.net/files/200000692621/file/0531.mp4", dest: `${PAGE}/videos/refills.mp4` },
];

async function downloadOne(url, dest) {
  await mkdir(dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`OK  ${dest} (${(buf.length / 1024).toFixed(1)} KB)`);
}

async function runBatched(items, concurrency = 4) {
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const item = items[i++];
      try {
        await downloadOne(item.url, item.dest);
      } catch (err) {
        console.error(`FAIL ${item.url}: ${err.message}`);
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
}

await runBatched([...images, ...videos], 4);
console.log("Done.");
