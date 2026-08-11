"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";
import type { ProductDescriptionSection } from "./types";

function SectionBody({ section }: { section: ProductDescriptionSection }) {
  return (
    <div className="mb-6">
      <p className="font-medium text-foreground">{section.heading}</p>
      <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
        {section.body}
      </p>
    </div>
  );
}

function SingleBlock({
  sections,
  collapsedHeight,
}: {
  sections: ProductDescriptionSection[];
  collapsedHeight: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        style={!expanded ? { maxHeight: collapsedHeight } : undefined}
        className={cn("overflow-hidden")}
      >
        {sections.map((section) => (
          <SectionBody key={section.heading} section={section} />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="rounded-full border border-border px-6 py-2 text-sm text-foreground"
        >
          {expanded ? "Rút gọn -" : "Xem thêm nội dung +"}
        </button>
      </div>
    </div>
  );
}

export function ProductAccordion({
  sections,
  mode = "single",
  collapsedHeight = 400,
  mobileWrapped = true,
}: {
  sections: ProductDescriptionSection[];
  mode?: "single" | "accordion";
  collapsedHeight?: number;
  mobileWrapped?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(true);
  const [openItem, setOpenItem] = useState<number | null>(0);

  if (mode === "accordion") {
    return (
      <div>
        {sections.map((section, index) => {
          const isOpen = openItem === index;
          return (
            <div key={section.heading} className="border-b border-border py-4">
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? null : index)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-foreground">
                  {section.heading}
                </span>
                <ArrowDownIcon
                  className={cn(
                    "h-3 w-3 shrink-0 text-foreground transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              {isOpen && (
                <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">
                  {section.body}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  const body = (
    <SingleBlock sections={sections} collapsedHeight={collapsedHeight} />
  );

  return (
    <div>
      {mobileWrapped && (
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex w-full items-center justify-between border-b border-border pb-3 text-left"
            aria-expanded={mobileOpen}
          >
            <span className="text-lg font-medium text-foreground">
              Chi tiết sản phẩm
            </span>
            <ArrowDownIcon
              className={cn(
                "h-3 w-3 shrink-0 text-foreground transition-transform",
                mobileOpen && "rotate-180"
              )}
            />
          </button>
          {mobileOpen && <div className="mt-4">{body}</div>}
        </div>
      )}

      <div className={cn(mobileWrapped && "hidden md:block")}>
        <h2 className="mb-4 border-b border-border pb-3 text-lg font-medium text-foreground">
          MÔ TẢ SẢN PHẨM
        </h2>
        {body}
      </div>
    </div>
  );
}
