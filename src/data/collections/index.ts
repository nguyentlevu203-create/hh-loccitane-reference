import type { CollectionRecord } from "./types";

import c_best_seller from "./records/best-seller";
import c_cham_soc_co_the_bo_dau_mo from "./records/cham-soc-co-the-bo-dau-mo";
import c_cham_soc_co_the_duoc_yeu_thich from "./records/cham-soc-co-the-duoc-yeu-thich";
import c_cham_soc_da_mat_1 from "./records/cham-soc-da-mat-1";
import c_cham_soc_da_mat from "./records/cham-soc-da-mat";
import c_cham_soc_da_tay_va_da_chan from "./records/cham-soc-da-tay-va-da-chan";
import c_cham_soc_da_tay from "./records/cham-soc-da-tay";
import c_chamsoccothe_2 from "./records/chamsoccothe-2";
import c_chong_nang from "./records/chong-nang";
import c_danh_cho_nam from "./records/danh-cho-nam";
import c_duong_da_tay from "./records/duong-da-tay";
import c_eco_refill_tam_rua_tay_shower_liquid_soaps from "./records/eco-refill-tam-rua-tay-shower-liquid-soaps";
import c_eco_refills_1 from "./records/eco-refills-1";
import c_hanh_nhan_almond from "./records/hanh-nhan-almond";
import c_kem_duong_da_tay_bo_dau_mo from "./records/kem-duong-da-tay-bo-dau-mo";
import c_mat_xa_dau_duong from "./records/mat-xa-dau-duong";
import c_nhom_ap_dung_voucher from "./records/nhom-ap-dung-voucher";
import c_refills from "./records/refills";
import c_retail_t08_2026_big_little_things from "./records/retail-t08-2026-big-little-things";
import c_retail_t08_2026_body_care from "./records/retail-t08-2026-body-care";
import c_retail_t08_2026_face_care from "./records/retail-t08-2026-face-care";
import c_retail_t08_2026_hair_care from "./records/retail-t08-2026-hair-care";
import c_san_pham_bo_dau_mo from "./records/san-pham-bo-dau-mo";
import c_sanphamapdungvoucher from "./records/sanphamapdungvoucher";
import c_sua_tam_va_dau_tam from "./records/sua-tam-va-dau-tam";
import c_tam_va_duong_the from "./records/tam-va-duong-the";
import c_web_travel_size from "./records/web-travel-size";
import c_xa_phong_va_tam_bo_dau_mo from "./records/xa-phong-va-tam-bo-dau-mo";

// One entry per file in ./records — added here as each collection is modeled. Only a curated
// subset of the 204 real collection URLs is modeled here; see
// docs/research/FULL_COLLECTION_INVENTORY.md for the full inventory and why the rest are not.
const records: CollectionRecord[] = [
  c_best_seller,
  c_cham_soc_co_the_bo_dau_mo,
  c_cham_soc_co_the_duoc_yeu_thich,
  c_cham_soc_da_mat_1,
  c_cham_soc_da_mat,
  c_cham_soc_da_tay_va_da_chan,
  c_cham_soc_da_tay,
  c_chamsoccothe_2,
  c_chong_nang,
  c_danh_cho_nam,
  c_duong_da_tay,
  c_eco_refill_tam_rua_tay_shower_liquid_soaps,
  c_eco_refills_1,
  c_hanh_nhan_almond,
  c_kem_duong_da_tay_bo_dau_mo,
  c_mat_xa_dau_duong,
  c_nhom_ap_dung_voucher,
  c_refills,
  c_retail_t08_2026_big_little_things,
  c_retail_t08_2026_body_care,
  c_retail_t08_2026_face_care,
  c_retail_t08_2026_hair_care,
  c_san_pham_bo_dau_mo,
  c_sanphamapdungvoucher,
  c_sua_tam_va_dau_tam,
  c_tam_va_duong_the,
  c_web_travel_size,
  c_xa_phong_va_tam_bo_dau_mo,
];

export const collectionCatalog: Record<string, CollectionRecord> = Object.fromEntries(
  records.map((collection) => [collection.slug, collection]),
);

export function getCollectionRecord(slug: string): CollectionRecord | undefined {
  return collectionCatalog[slug];
}

export function getAllCollectionSlugs(): string[] {
  return Object.keys(collectionCatalog);
}
