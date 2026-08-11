// Second batch of product images for /collections/all mock catalog (items 21-40, to match source's
// initial "Hiển thị 20 trên 304" count while still supporting a real load-more demonstration).
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGE = join(__dirname, "..", "public", "sites", "vn-loccitane-com-1c965340", "collections-all-acd0b3f1");

const images = [
  { url: "https://cdn.hstatic.net/products/200000692621/dfb79e69-6249-430e-a083-f34040107900_3988aeb0e2b045b78fc023d6ef6bef2f_grande.png", dest: `${PAGE}/images/product-21-bo-qua-tang-g.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/d238baa3-9d34-4a93-93a0-1c2798d822df_460c759956db46869f84726b90edc33c_grande.png", dest: `${PAGE}/images/product-22-combo-qua-tang-8.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/92aa5e30-42f7-4a92-90e8-8d2c6029c380_8bb5873dc5514922a8c3b220d27995a8_grande.png", dest: `${PAGE}/images/product-23-bo-qua-tang-h.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/03370be4-5dda-48d1-87b7-49a81fe0bf9e_ae72e51d859a41459e0cf32c59a7f799_grande.png", dest: `${PAGE}/images/product-24-bo-qua-tang-i.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/45_2_7350619efe034a12aff84cd39792edec_grande.png", dest: `${PAGE}/images/product-25-combo-qua-tang.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/4f335ca0-2076-4cc1-81b8-9b99c3b125ff_12c3db7f5f42403195e93026f072e360_grande.png", dest: `${PAGE}/images/product-26-bo-qua-tang-j.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/59_1_8ce685010eee43ad8b45476990d762ac_grande.png", dest: `${PAGE}/images/product-27-bo-tay-te-bao-chet.png` },
  { url: "https://cdn.hstatic.net/products/200000692621/t08_deal_retail_18__c91acabaf2264a23b6d560223024bd06_grande.jpg", dest: `${PAGE}/images/product-28-bo-du-lich-hanh-nhan.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/t08_deal_retail_15__e4252b8f618e4f098bf42de88ad85e2d_grande.jpg", dest: `${PAGE}/images/product-29-bo-doi-goi-xa.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/t08_deal_retail_16__85737d90b4a24f688292ccf1d6bf4a68_grande.jpg", dest: `${PAGE}/images/product-30-tinh-chat-ban-dem.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/t08_deal_retail_17__8212a01b398d4e09a0ead92c23eeec01_grande.jpg", dest: `${PAGE}/images/product-31-tinh-chat-cuc-truong-sinh.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/t08_deal_retail_14__33d96cb8e5c64d0bae29b3afbeb99878_grande.jpg", dest: `${PAGE}/images/product-32-tinh-chat-tre-hoa-da.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/t08_deal_retail_13__e7f27f9e569d4562a46d7ad3e659c003_grande.jpg", dest: `${PAGE}/images/product-33-kem-duong-chong-lao-hoa.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/t08_deal_retail_12__e7854b560b2844ee957989a60b104a73_grande.jpg", dest: `${PAGE}/images/product-34-bo-doi-chong-lao-hoa.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/t08_deal_retail_11__d3bc5fe5beb4424db3b96964caf5daa6_grande.jpg", dest: `${PAGE}/images/product-35-bo-doi-da-mat-cuc-truong-sinh.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/t08_deal_retail_10__cfcf164f681c4331b133d1c8d214e5b4_grande.jpg", dest: `${PAGE}/images/product-36-combo-da-mat-hanh-nhan.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/t08_deal_retail_9__313895c9d6d24c94a4f467ecfa383735_grande.jpg", dest: `${PAGE}/images/product-37-kem-duong-cuc-truong-sinh.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/t08_deal_retail_8__6e61f5076cd144fbabd688c00b85ebd1_grande.jpg", dest: `${PAGE}/images/product-38-dau-duong-tre-hoa-da.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/t08_deal_retail_7__a5eed18ae6094be8b104bf08a55f61c6_grande.jpg", dest: `${PAGE}/images/product-39-tinh-chat-75ml.jpg` },
  { url: "https://cdn.hstatic.net/products/200000692621/t08_deal_retail_6__491e3808f73343a6abbbfcd4e799b3ec_grande.jpg", dest: `${PAGE}/images/product-40-tinh-chat-50ml.jpg` },
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
