// Asset downloader for vn.loccitane.com /collections/all clone.
// site-key: vn-loccitane-com-1c965340  page-key: collections-all-acd0b3f1
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "public", "sites", "vn-loccitane-com-1c965340");
const PAGE = join(ROOT, "collections-all-acd0b3f1");

const images = [
  { url: "https://cdn.hstatic.net/products/200000692621/27dh015i22_rvb_43a2d76d35cc42a3b7741e41abc3c336_grande.png", dest: `${PAGE}/images/product-01-dau-tre-hoa-da-hoa-cuc-truong-sinh.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/24gd500cbr25_square_rvb_19fd031e82e84cbc9ed31abf67418594_grande.png", dest: `${PAGE}/images/product-02-gel-tam-hoa-anh-dao.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/24gd250rr25_square_cmjn_aa44206047a4470da49a4751daa0a4d8_grande.png", dest: `${PAGE}/images/product-03-gel-tam-hoa-hong-rose.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/15ma075lbr25_square_cmjn_f74b32656c054d489ce55f2764ea5086_grande.png", dest: `${PAGE}/images/product-04-kem-duong-da-tay-hoa-oai-huong-trang.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/15lc250lbr25_square_cmjn_416b524e28ca40ec9a898023ebaf4d95_grande.png", dest: `${PAGE}/images/product-05-sua-duong-the-hoa-oai-huong-trang.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/15gd250lbr25_square_cmjn_248f20796309497ca8085475fd4e1adf_grande.png", dest: `${PAGE}/images/product-06-gel-tam-hoa-oai-huong-trang.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/11sh500g24_square_rvb_c52d63808d14458c848a007149fe1778_grande.png", dest: `${PAGE}/images/product-07-dau-goi-phuc-hoi-toc-hu-ton.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/11ma030bar25_square_cmjn_40950cb6d2cc4e2483a79f34cd236fef_grande.png", dest: `${PAGE}/images/product-08-kem-duong-da-tay-hoa-cuc-huong-ngai.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/11lc250or25_square_cmjn_6e35d5cfa2774fce898ddd78b2fe1acd_grande.png", dest: `${PAGE}/images/product-09-sua-duong-the-hoa-moc-te-mo.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/29ma150a26_1_square_rvb_ad888490f7bc4b86b3a883b406694944_grande.png", dest: `${PAGE}/images/product-10-kem-duong-da-tay-hanh-nhan.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/01cp150k26_shadow_rvb_500e23ad4ce845f8890a07da0d1b7d0f_grande.png", dest: `${PAGE}/images/product-11-kem-duong-da-chan.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/29lc240a26_shadow_rvb_2062b159df264a3eb8af8c446cac6292_grande.png", dest: `${PAGE}/images/product-12-sua-duong-the-hanh-nhan.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/4e98a896-f916-4e68-aab5-4ab098117d6f_a104f8dfe69e476fa0be96b16021c114_grande.png", dest: `${PAGE}/images/product-13-bo-qua-tang-a.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/7c3aacfe-ca38-46e9-a7b2-d9327b7bd508_2ebbfecee25748aab11681e1217f56ee_grande.png", dest: `${PAGE}/images/product-14-bo-qua-tang-b.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/175444_645f025078c04ca79dcfce9acfb2b418_grande.png", dest: `${PAGE}/images/product-15-bo-qua-tang-c.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/14058001370523181_8014058001370523181_49160107b7c8dd3d5e5e509d62c8ca01_c8b2ed9eb18b469b98493be0905481e3_grande.jpg", dest: `${PAGE}/images/product-16-bo-cham-soc-da-mat-blt.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/14058001370523181_8014058001370523181_a8e9011c1ae7f16b5874594d90eab4d0_9b660374f7264de58fcb7a07b6b53526_grande.jpg", dest: `${PAGE}/images/product-17-bo-cham-soc-co-the-hanh-nhan-blt.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/0f466b27-e6b0-4599-bcc2-d6cfaa6d1576_4387bc78f76d4a679ef0b592842fa524_grande.png", dest: `${PAGE}/images/product-18-bo-qua-tang-d.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/558d4ec0-92e4-4d84-8bdc-18cca8e142cb_bc68dfa77461436e843a07486ae4735d_grande.png", dest: `${PAGE}/images/product-19-bo-qua-tang-e.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/83ae409d-3180-4c3d-8de7-e3a3848c4780_39869f5df4e34c76b969c3d709cdc8b5_grande.png", dest: `${PAGE}/images/product-20-bo-qua-tang-f.png` },
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
