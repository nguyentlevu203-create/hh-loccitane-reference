"use client";

import { useState } from "react";
import Link from "next/link";
import { CloseNavIcon, SearchIcon, ArrowDownIcon } from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";
import { useSearchOverlay } from "@/lib/commerce/SearchContext";

interface OffCanvasNavProps {
  open: boolean;
  onClose: () => void;
}

interface NavSubItem {
  label: string;
  href: string;
}

interface ExpandableNavItem {
  key: string;
  label: string;
  href: string;
  subItems: NavSubItem[];
}

// Every href below is a real, confirmed link read directly from the live site's own off-canvas
// nav / category sidebar markup (captured while crawling in Phases 5 and 7 — see
// docs/research/phase-7-content/FULL_PAGE_INVENTORY.md) — none of these are invented. Some
// sub-items really do all point to the same collection URL on the live site (a real quirk, not a
// bug here); that's preserved as-is rather than fabricating distinct destinations.
const primaryLinks: { key: string; label: string; href: string }[] = [
  { key: "all-products", label: "Tất Cả Sản Phẩm", href: "/collections/tat-ca-san-pham-1" },
  { key: "offers", label: "LỢI ÍCH VÀ ƯU ĐÃI ĐẶC BIỆT ✨", href: "/pages/uudai" },
  { key: "sets-gifts", label: "BST SET VÀ QUÀ TẶNG", href: "/collections/bo-qua-tang" },
  { key: "favorites", label: "Được Yêu Thích", href: "/wishlist" },
];

const bodyCare: ExpandableNavItem = {
  key: "body-care",
  label: "Chăm Sóc Cơ Thể",
  href: "/collections/tam-va-duong-the",
  subItems: [
    { label: "TẤT CẢ SẢN PHẨM CHĂM SÓC CƠ THỂ", href: "/collections/tam-va-duong-the" },
    { label: "LOẠI SẢN PHẨM", href: "/collections/tam-va-duong-the" },
    { label: "BỘ SƯU TẬP", href: "/collections/tam-va-duong-the" },
  ],
};

const faceCare: ExpandableNavItem = {
  key: "face-care",
  label: "Chăm Sóc Da Mặt",
  href: "/collections/cham-soc-da-mat",
  subItems: [
    { label: "TẤT CẢ SẢN PHẨM CHĂM SÓC DA MẶT", href: "/collections/cham-soc-da-mat" },
    { label: "LOẠI SẢN PHẨM", href: "/collections/cham-soc-da-mat" },
    { label: "BỘ SƯU TẬP", href: "/collections/cham-soc-da-mat" },
  ],
};

const handCare: ExpandableNavItem = {
  key: "hand-care",
  label: "Chăm Sóc Da Tay",
  href: "/collections/cham-soc-da-tay",
  subItems: [{ label: "LOẠI SẢN PHẨM", href: "/collections/cham-soc-da-tay" }],
};

const hairCare: ExpandableNavItem = {
  key: "hair-care",
  label: "Chăm Sóc Tóc",
  href: "/collections/cham-soc-toc",
  subItems: [
    { label: "TẤT CẢ SẢN PHẨM CHĂM SÓC TÓC", href: "/collections/cham-soc-toc" },
    { label: "LOẠI SẢN PHẨM", href: "/collections/cham-soc-toc" },
    { label: "BỘ SƯU TẬP", href: "/collections/cham-soc-toc" },
  ],
};

const ecoRefills: ExpandableNavItem = {
  key: "eco-refills",
  label: "Eco-Refills",
  href: "/collections/eco-refill-tam-rua-tay-shower-liquid-soaps",
  subItems: [
    { label: "TẤT CẢ SẢN PHẨM ECO-REFILLS", href: "/collections/eco-refills-1" },
    { label: "LOẠI SẢN PHẨM", href: "/collections/eco-refills-1" },
    { label: "BỘ SƯU TẬP", href: "/collections/eco-refills-1" },
  ],
};

const aboutUs: ExpandableNavItem = {
  key: "about-us",
  label: "Về chúng tôi",
  href: "/pages/ve-l-occitane",
  subItems: [
    { label: "Kỉ niệm 50 năm thành lập", href: "/pages/ki-niem-50-nam-thanh-lap" },
    { label: "Giá trị của chúng tôi", href: "/pages/brand-commitments" },
    { label: "Doanh nghiệp B Corp™", href: "/pages/bcorp" },
    { label: "Big Little Things", href: "/pages/big-little-things" },
    { label: "Sức khỏe & Làm đẹp", href: "https://vn.loccitane.com/blogs/news" },
    { label: "Chuỗi cung bền vững", href: "/pages/sustainable-sourcing" },
    { label: "Dịch vụ dành cho khách sạn", href: "/pages/hotel-amenities" },
    { label: "Quà tặng doanh nghiệp", href: "/pages/corporate-gifting" },
    { label: "L'Occitane Spa", href: "/pages/spa-loccitane" },
  ],
};

function ExpandableRow({
  item,
  isOpen,
  onToggle,
  onNavigate,
}: {
  item: ExpandableNavItem;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <li className="border-b border-[#ece3d6]">
      <div className="flex h-12 items-center justify-between text-[15px]">
        <Link href={item.href} onClick={onNavigate} className="flex-1">
          {item.label}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={`Mở danh mục ${item.label}`}
          className="flex h-full items-center pl-4"
        >
          <ArrowDownIcon
            className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="pb-2">
            {item.subItems.map((sub) => (
              <li key={sub.label}>
                <Link
                  href={sub.href}
                  onClick={onNavigate}
                  className="block py-2 pl-4 text-[15px] text-muted-foreground"
                >
                  {sub.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export function OffCanvasNav({ open, onClose }: OffCanvasNavProps) {
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());
  const searchOverlay = useSearchOverlay();

  const openSearch = () => {
    onClose();
    searchOverlay.open();
  };

  const toggleKey = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const expandableItems = [bodyCare, faceCare, handCare, hairCare];

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed top-0 left-0 z-50 h-screen w-full max-w-[416px] transform overflow-y-auto bg-background transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <button type="button" onClick={onClose} aria-label="Đóng menu">
            <CloseNavIcon className="h-6 w-6" />
          </button>
          <button type="button" onClick={openSearch} aria-label="Tìm kiếm">
            <SearchIcon className="h-4 w-4" />
          </button>
        </div>

        <nav className="px-6">
          <ul>
            {primaryLinks.map((link) => (
              <li key={link.key} className="border-b border-[#ece3d6]">
                <Link href={link.href} onClick={onClose} className="flex h-12 items-center text-[15px]">
                  {link.label}
                </Link>
              </li>
            ))}
            {expandableItems.map((item) => (
              <ExpandableRow
                key={item.key}
                item={item}
                isOpen={openKeys.has(item.key)}
                onToggle={() => toggleKey(item.key)}
                onNavigate={onClose}
              />
            ))}
            <li className="border-b border-[#ece3d6]">
              <Link href="/collections/danh-cho-nam" onClick={onClose} className="flex h-12 items-center text-[15px]">
                Dành Cho Nam
              </Link>
            </li>
            <ExpandableRow
              item={ecoRefills}
              isOpen={openKeys.has(ecoRefills.key)}
              onToggle={() => toggleKey(ecoRefills.key)}
              onNavigate={onClose}
            />
          </ul>

          <ul className="border-t border-[#ece3d6] py-2">
            <li>
              <button
                type="button"
                onClick={openSearch}
                className="block py-2 text-left text-sm text-muted-foreground"
              >
                Tìm kiếm
              </button>
            </li>
            <li>
              <Link
                href="/pages/dieu-khoan-dich-vu"
                onClick={onClose}
                className="block py-2 text-sm text-muted-foreground"
              >
                Điều khoản & điều kiện
              </Link>
            </li>
          </ul>

          <ul className="border-t border-[#ece3d6] pb-6">
            <ExpandableRow
              item={aboutUs}
              isOpen={openKeys.has(aboutUs.key)}
              onToggle={() => toggleKey(aboutUs.key)}
              onNavigate={onClose}
            />
          </ul>
        </nav>
      </div>
    </>
  );
}
