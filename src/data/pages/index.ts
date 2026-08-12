import type { PageRecord } from "./types";

import pg_bcorp from "./records/bcorp";
import pg_big_little_things from "./records/big-little-things";
import pg_brand_commitments from "./records/brand-commitments";
import pg_chinh_sach_bao_mat_1 from "./records/chinh-sach-bao-mat-1";
import pg_chinh_sach_bao_ve_thong_tin_ca_nhan_cua_nguoi_tieu_dung from "./records/chinh-sach-bao-ve-thong-tin-ca-nhan-cua-nguoi-tieu-dung";
import pg_chinh_sach_doi_tra_va_hoan_tien from "./records/chinh-sach-doi-tra-va-hoan-tien";
import pg_chinh_sach_giao_hang_va_thanh_toan from "./records/chinh-sach-giao-hang-va-thanh-toan";
import pg_chinh_sach_kiem_hang from "./records/chinh-sach-kiem-hang";
import pg_chinh_sach_thanh_toan from "./records/chinh-sach-thanh-toan";
import pg_corporate_gifting from "./records/corporate-gifting";
import pg_dang_ky_thanh_cong from "./records/dang-ky-thanh-cong";
import pg_dieu_khoan_dich_vu from "./records/dieu-khoan-dich-vu";
import pg_faq from "./records/faq";
import pg_he_thong_cua_hang from "./records/he-thong-cua-hang";
import pg_hotel_amenities from "./records/hotel-amenities";
import pg_huong_dan_mua_hang from "./records/huong-dan-mua-hang";
import pg_khachhangthanthietloccitane from "./records/khachhangthanthietloccitane";
import pg_ki_niem_50_nam_thanh_lap from "./records/ki-niem-50-nam-thanh-lap";
import pg_lien_he from "./records/lien-he";
import pg_spa_loccitane from "./records/spa-loccitane";
import pg_sustainable_sourcing from "./records/sustainable-sourcing";
import pg_uudai from "./records/uudai";
import pg_ve_l_occitane from "./records/ve-l-occitane";

// One entry per file in ./records — added here as each content page is modeled. Only a curated
// subset of the 42 real /pages/... URLs is modeled here; see
// docs/research/phase-7-content/FULL_PAGE_INVENTORY.md for the full inventory and why the rest
// are not.
const records: PageRecord[] = [
  pg_bcorp,
  pg_big_little_things,
  pg_brand_commitments,
  pg_chinh_sach_bao_mat_1,
  pg_chinh_sach_bao_ve_thong_tin_ca_nhan_cua_nguoi_tieu_dung,
  pg_chinh_sach_doi_tra_va_hoan_tien,
  pg_chinh_sach_giao_hang_va_thanh_toan,
  pg_chinh_sach_kiem_hang,
  pg_chinh_sach_thanh_toan,
  pg_corporate_gifting,
  pg_dang_ky_thanh_cong,
  pg_dieu_khoan_dich_vu,
  pg_faq,
  pg_he_thong_cua_hang,
  pg_hotel_amenities,
  pg_huong_dan_mua_hang,
  pg_khachhangthanthietloccitane,
  pg_ki_niem_50_nam_thanh_lap,
  pg_lien_he,
  pg_spa_loccitane,
  pg_sustainable_sourcing,
  pg_uudai,
  pg_ve_l_occitane,
];

export const pageCatalog: Record<string, PageRecord> = Object.fromEntries(
  records.map((page) => [page.slug, page]),
);

export function getPageRecord(slug: string): PageRecord | undefined {
  return pageCatalog[slug];
}

export function getAllPageSlugs(): string[] {
  return Object.keys(pageCatalog);
}
