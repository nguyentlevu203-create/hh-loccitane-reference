// Asset downloader for vn.loccitane.com PDP clone.
// site-key: vn-loccitane-com-1c965340
// page-key: products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139
// source: https://vn.loccitane.com/products/dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "public", "sites", "vn-loccitane-com-1c965340");
const PAGE = join(
  ROOT,
  "products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139"
);

// Gallery images in slider order (1-6), _grande size — see ASSETS.md for full provenance.
const images = [
  { url: "https://cdn.hstatic.net/products/200000692621/84_1__8a2d4e13627643fb91cf9e3b52974339_grande.png", dest: `${PAGE}/images/gallery-01-main-bottle.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/29hd250a26c_shadow_rvb_72318a4ae854413085ef965533c42ec8_grande.png", dest: `${PAGE}/images/gallery-02-alt-bottle-shadow.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/1_b81df6d7a3054d7ca3f439e42327416d_grande.png", dest: `${PAGE}/images/gallery-03-claim-25-moisture.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/2_00c03279a887486b9878b66d862f222c_grande.png", dest: `${PAGE}/images/gallery-04-claim-40-natural-oil.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/3_628bb9955adb4b6b82352ae7b00d729c_grande.png", dest: `${PAGE}/images/gallery-05-lifestyle-hand-massage.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/4_a0922d8b60ee4261a8f0568e58a12a6b_grande.png", dest: `${PAGE}/images/gallery-06-campaign-group-shot.png` },
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

await runBatched(images, 4);
console.log("Done.");
