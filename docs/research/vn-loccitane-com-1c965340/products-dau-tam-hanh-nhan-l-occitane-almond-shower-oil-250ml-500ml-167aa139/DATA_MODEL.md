# Data Model — Product Detail

Reusable TypeScript shape for `/products/[slug]`-style pages, filled in with this product's real
observed values (source: `window.wd.productjson` on the live page — a first-party Haravan config
object — plus the JSON-LD `Product` schema block, both read directly via `browser_evaluate`).

```ts
export interface ProductVariant {
  id: string;
  optionLabel: string; // e.g. "Dung tích" (the option name, e.g. "Size"/"Volume")
  value: string;        // e.g. "250 ml"
  price: string;        // formatted, e.g. "890,000₫"
  sku: string;
  available: boolean;
  image?: string;        // per-variant image override — not observed on this SKU (single variant), TODO when a real multi-variant product is added
}

export interface ProductPromoCode {
  label: string;         // "Giảm 5%"
  title: string;         // "Giảm 5% tối đa 150k"
  description: string;   // "Cho đơn hàng tối thiểu 1,500k"
  expiry: string;        // "HSD: 31/08/2026"
  code?: string;         // TODO: not observed — "Sao chép" (copy) button exists but the copied value wasn't captured (would require clicking Sao chép and reading clipboard, skipped as out of scope for a public/reference clone)
}

export interface ProductDescriptionSection {
  heading: string;  // e.g. "1. THÔNG TIN CHUNG"
  body: string;     // plain text / simple HTML paragraph content
}

export interface ProductReviewSummary {
  average: number;       // 0 — real value on this SKU (site-wide: reviewtype "none")
  count: number;          // 0
}

export interface ProductDetail {
  slug: string;                 // "dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml"
  sku: string;                  // "29HD250A26" — real, but NOT publicly displayed on the page (see BEHAVIORS.md); carry the data, default UI to hidden
  name: string;                 // "[Phiên Bản Mới] Dầu Tắm Hạnh Nhân" (H1 casing — canonical)
  subtitle?: string;            // TODO: not present on this product
  breadcrumb: { label: string; href: string }[]; // [{label:"Trang chủ",href:"/"},{label:"Ưu đãi web - Nhóm áp dụng voucher",href:"/collections/nhom-ap-dung-voucher"}] — last crumb (product name) rendered separately, not part of this array
  images: string[];             // 6 real CDN URLs, see ASSETS.md — gallery slide order
  giftPanel?: { threshold: string; caption: string }[]; // the 2 gift-with-purchase tiles shown alongside slide 0 only — [{threshold:"ĐƠN HÀNG TỪ 990K",caption:"Set quà bí mật"},{threshold:"ĐƠN HÀNG TỪ 1TR5",caption:"Set quà bí mật"}]
  videos?: string[];            // TODO: none observed on this PDP
  optionLabel: string;          // "Dung tích"
  variants: ProductVariant[];   // real: single entry, 250 ml / 890,000₫ / sku 29HD250A26 / available true
  price: string;                // "890,000₫" (mirrors variants[0].price for the currently selected variant)
  originalPrice?: string;       // TODO: not present — compare_at_price is 0 on this SKU, no discount registered
  promoCodes: ProductPromoCode[]; // real: 1 entry, "Giảm 5% tối đa 150k"
  stock: "in_stock" | "out_of_stock"; // "in_stock" (inventory_quantity 147, availability InStock) — note: a separate candidate product during PDP selection (Shea Shower Cream) showed "Hết hàng" (out_of_stock) badge in listing UI — keep that state name available in the type even though this product is in stock
  descriptionSections: ProductDescriptionSection[]; // 5 real sections — THÔNG TIN CHUNG / THÀNH PHẦN / ĐỐI TƯỢNG SỬ DỤNG / CÔNG DỤNG / HƯỚNG DẪN SỬ DỤNG (full text captured in BEHAVIORS.md / live page text)
  reviews: {
    summary: ProductReviewSummary; // { average: 0, count: 0 } — real, verified site-wide state
    items: never[];                 // TODO: none exist — reviewtype "none" sitewide, do not fabricate
  };
  recommendations: {
    slug: string;
    name: string;
    image: string;
    price: string;
    originalPrice?: string;
  }[]; // seeded with the 2 REAL companion products named in this product's own usage instructions (not fabricated) — see below
  shareUrl: string; // "https://vn.loccitane.com/products/dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml" (real canonical URL — use the local route's absolute URL once deployed instead)
}
```

## Filled example (this product's real data)

```ts
const almondShowerOil: ProductDetail = {
  slug: "dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml",
  sku: "29HD250A26",
  name: "[Phiên Bản Mới] Dầu Tắm Hạnh Nhân",
  breadcrumb: [
    { label: "Trang chủ", href: "/" },
    { label: "Ưu đãi web - Nhóm áp dụng voucher", href: "/collections/nhom-ap-dung-voucher" },
  ],
  images: [
    "https://cdn.hstatic.net/products/200000692621/84_1__8a2d4e13627643fb91cf9e3b52974339.png",
    "https://cdn.hstatic.net/products/200000692621/29hd250a26c_shadow_rvb_72318a4ae854413085ef965533c42ec8.png",
    "https://cdn.hstatic.net/products/200000692621/1_b81df6d7a3054d7ca3f439e42327416d.png",
    "https://cdn.hstatic.net/products/200000692621/2_00c03279a887486b9878b66d862f222c.png",
    "https://cdn.hstatic.net/products/200000692621/3_628bb9955adb4b6b82352ae7b00d729c.png",
    "https://cdn.hstatic.net/products/200000692621/4_a0922d8b60ee4261a8f0568e58a12a6b.png",
  ],
  giftPanel: [
    { threshold: "ĐƠN HÀNG TỪ 990K", caption: "Set quà bí mật" },
    { threshold: "ĐƠN HÀNG TỪ 1TR5", caption: "Set quà bí mật" },
  ],
  optionLabel: "Dung tích",
  variants: [
    { id: "1158119592", optionLabel: "Dung tích", value: "250 ml", price: "890,000₫", sku: "29HD250A26", available: true },
  ],
  price: "890,000₫",
  promoCodes: [
    {
      label: "Giảm 5%",
      title: "Giảm 5% tối đa 150k",
      description: "Cho đơn hàng tối thiểu 1,500k",
      expiry: "HSD: 31/08/2026",
    },
  ],
  stock: "in_stock",
  descriptionSections: [
    { heading: "1. THÔNG TIN CHUNG", body: "- Xuất xứ: Pháp\n- Thương hiêu: L'Occitane\n- Dung tích: 250ml\n- Hạn sử dụng: 3 năm kể từ ngày sản xuất\n\nĐơn vị chịu trách nhiệm về hàng hóa là CÔNG TY CỔ PHẦN MỸ PHẨM LOCCITANE EN PROVINCE VIỆT NAM" },
    { heading: "2. THÀNH PHẦN", body: "VITIS VINIFERA (GRAPE) SEED OIL - TIPA-LAURETH SULFATE - LAURETH-3 - CAPRYLIC/CAPRIC TRIGLYCERIDE - PARFUM/FRAGRANCE - COCAMIDE MEA - PROPYLENE GLYCOL - SORBITAN OLEATE - PRUNUS AMYGDALUS DULCIS (SWEET ALMOND) OIL - CITRUS AURANTIUM BERGAMIA (BERGAMOT) FRUIT OIL - HELIANTHUS ANNUUS (SUNFLOWER) SEED OIL - ROSMARINUS OFFICINALIS (ROSEMARY) LEAF EXTRACT - TOCOPHEROL - AQUA/WATER - LIMONENE - COUMARIN – LINALOOL" },
    { heading: "3. ĐỐI TƯỢNG SỬ DỤNG", body: "Mọi loại da" },
    { heading: "4. CÔNG DỤNG", body: "Sản phẩm có kết cấu dạng dầu, khi tiếp xúc với nước sẽ thành dạng sữa, giúp nhẹ nhàng làm sạch cơ thể, xoa dịu làn da." },
    { heading: "5. HƯỚNG DẪN SỬ DỤNG", body: "- Lấy một lượng vừa đủ dầu tắm ra tay hoặc bông tắm, nhẹ nhàng massage lên da dưới vòi nước. Cảm nhận kết cấu dầu mượt mà dần chuyển thành lớp bọt sữa mềm mịn. Sau đó, rửa sạch hoàn toàn với nước.\n- Có thể đổ trực tiếp dầu vào bồn tắm để tạo nên một làn nước ngâm thơm ngát, dưỡng da đầy thư giãn.\n- Kết hợp với Dầu Dưỡng Thể Hạnh Nhân (Almond Supple Skin Oil) và Kem Dưỡng Ẩm Da Hạnh Nhân (Almond Milk Concentrate) sau đó, hỗ trơ dưỡng da săn chắc và sáng mịn." },
  ],
  reviews: { summary: { average: 0, count: 0 }, items: [] },
  recommendations: [
    {
      slug: "dau-duong-the-hanh-nhan-almond-supple-skin-oil",
      name: "[Phiên Bản Mới] Dầu Dưỡng Thể Hạnh Nhân",
      image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-body-oil.png",
      price: "1,790,000₫",
      originalPrice: "2,170,000đ",
    },
    {
      slug: "kem-duong-am-san-chac-da-hanh-nhan-br-almond-milk-concentrate",
      name: "[Phiên Bản Mới] Kem Dưỡng Ẩm Săn Chắc Da Hạnh Nhân",
      image: "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/product-almond-milk-concentrate.png",
      price: "1,990,000₫",
      originalPrice: "2,480,000đ",
    },
  ],
  shareUrl: "https://vn.loccitane.com/products/dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml",
};
```

## Known real-data quirks worth preserving, not "fixing"

- The Haravan `vendor`/brand field for this product is literally `"Khác"` ("Other") in the backend
  catalog, even though the product copy explicitly states "Thương hiệu: L'Occitane" in section 1 of
  the description. This is a real backend data-entry quirk on the source site. For display purposes,
  use "L'Occitane" (matches the site's own header/logo branding context and the description text
  itself) — do not surface "Khác" as a visible brand label anywhere.
- `mpn` differs between the two JSON-LD blocks on the page (`"29HD250A26"` in one, `"1069648774"` in
  another, the latter being the internal Haravan product ID, not a real MPN) — use `sku` as the
  canonical identifier, ignore `mpn`.
- Breadcrumb category (`Ưu đãi web - Nhóm áp dụng voucher`) is intentionally the real, if slightly odd
  from a taxonomy standpoint, observed value — see BEHAVIORS.md.
