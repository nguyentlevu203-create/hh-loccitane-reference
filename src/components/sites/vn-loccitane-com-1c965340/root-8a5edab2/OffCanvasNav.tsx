"use client";

import { useState } from "react";
import { CloseNavIcon, SearchIcon, ArrowDownIcon } from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";

interface OffCanvasNavProps {
  open: boolean;
  onClose: () => void;
}

interface ExpandableNavItem {
  key: string;
  label: string;
  subItems: string[];
}

const primaryLinks: { key: string; label: string }[] = [
  { key: "all-products", label: "Tất Cả Sản Phẩm" },
  { key: "offers", label: "LỢI ÍCH VÀ ƯU ĐÃI ĐẶC BIỆT ✨" },
  { key: "sets-gifts", label: "BST SET VÀ QUÀ TẶNG" },
  { key: "favorites", label: "Được Yêu Thích" },
];

const bodyCare: ExpandableNavItem = {
  key: "body-care",
  label: "Chăm Sóc Cơ Thể",
  subItems: ["Xem tất cả", "Sữa tắm", "Dưỡng thể"],
};

const faceCare: ExpandableNavItem = {
  key: "face-care",
  label: "Chăm Sóc Da Mặt",
  subItems: ["Xem tất cả", "Làm sạch da", "Dưỡng da"],
};

const handCare: ExpandableNavItem = {
  key: "hand-care",
  label: "Chăm Sóc Da Tay",
  subItems: ["Xem tất cả", "Kem dưỡng da tay"],
};

const hairCare: ExpandableNavItem = {
  key: "hair-care",
  label: "Chăm Sóc Tóc",
  subItems: ["Xem tất cả", "Dầu gội", "Dầu xả"],
};

const ecoRefills: ExpandableNavItem = {
  key: "eco-refills",
  label: "Eco-Refills",
  subItems: ["Xem tất cả", "Refill dầu tắm"],
};

const aboutUs: ExpandableNavItem = {
  key: "about-us",
  label: "Về chúng tôi",
  subItems: [
    "Kỉ niệm 50 năm thành lập",
    "Giá trị của chúng tôi",
    "Doanh nghiệp B Corp™",
    "Big Little Things",
    "Sức khỏe & Làm đẹp",
    "Chuỗi cung bền vững",
    "Dịch vụ dành cho khách sạn",
    "Quà tặng doanh nghiệp",
    "L'Occitane Spa",
  ],
};

const secondaryLinks = ["Tìm kiếm", "Điều khoản & điều kiện"];

function ExpandableRow({
  item,
  isOpen,
  onToggle,
}: {
  item: ExpandableNavItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="border-b border-[#ece3d6]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex h-12 w-full items-center justify-between text-[15px]"
      >
        <span>{item.label}</span>
        <ArrowDownIcon
          className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="pb-2">
            {item.subItems.map((sub) => (
              <li key={sub}>
                <a
                  href="#"
                  className="block py-2 pl-4 text-[15px] text-muted-foreground"
                >
                  {sub}
                </a>
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
          <button type="button" aria-label="Tìm kiếm">
            <SearchIcon className="h-4 w-4" />
          </button>
        </div>

        <nav className="px-6">
          <ul>
            {primaryLinks.map((link) => (
              <li key={link.key} className="border-b border-[#ece3d6]">
                <a href="#" className="flex h-12 items-center text-[15px]">
                  {link.label}
                </a>
              </li>
            ))}
            {expandableItems.map((item) => (
              <ExpandableRow
                key={item.key}
                item={item}
                isOpen={openKeys.has(item.key)}
                onToggle={() => toggleKey(item.key)}
              />
            ))}
            <li className="border-b border-[#ece3d6]">
              <a href="#" className="flex h-12 items-center text-[15px]">
                Dành Cho Nam
              </a>
            </li>
            <ExpandableRow
              item={ecoRefills}
              isOpen={openKeys.has(ecoRefills.key)}
              onToggle={() => toggleKey(ecoRefills.key)}
            />
          </ul>

          <ul className="border-t border-[#ece3d6] py-2">
            {secondaryLinks.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className="block py-2 text-sm text-muted-foreground"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="border-t border-[#ece3d6] pb-6">
            <ExpandableRow
              item={aboutUs}
              isOpen={openKeys.has(aboutUs.key)}
              onToggle={() => toggleKey(aboutUs.key)}
            />
          </ul>
        </nav>
      </div>
    </>
  );
}
