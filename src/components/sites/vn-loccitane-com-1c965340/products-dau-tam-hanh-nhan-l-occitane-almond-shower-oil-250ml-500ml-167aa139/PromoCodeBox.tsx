"use client";

import { useState } from "react";
import { CloseNavIcon } from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";
import type { ProductPromoCode } from "./types";

function TicketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 9a2 2 0 0 0 0 4v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-4V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
      <path d="M12 5v2m0 3v2m0 3v2" />
    </svg>
  );
}

function PromoCodeModal({
  codes,
  onClose,
}: {
  codes: ProductPromoCode[];
  onClose: () => void;
}) {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-[110] bg-black/50"
      />
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-[440px] rounded-lg bg-white p-5 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-foreground">
              Mã khuyến mãi
            </h3>
            <button type="button" onClick={onClose} aria-label="Đóng">
              <CloseNavIcon className="size-5" />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {codes.map((code) => (
              <div
                key={code.title}
                className="flex items-start gap-3 rounded-[5px] border border-border p-3"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                  🎁
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {code.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {code.description}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {code.expiry}
                  </p>
                  <a href="#" className="mt-1 inline-block text-xs underline">
                    Chi tiết
                  </a>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-[5px] bg-foreground px-3 py-1.5 text-xs text-white"
                >
                  Sao chép
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function PromoCodeBox({ codes }: { codes: ProductPromoCode[] }) {
  const [modalOpen, setModalOpen] = useState(false);

  if (codes.length === 0) return null;

  return (
    <div className="rounded-[5px] border border-border p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          Mã khuyến mãi
        </span>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="text-sm text-foreground underline"
        >
          Xem tất cả
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {codes.map((code) => (
          <button
            key={code.label}
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 rounded-[5px] border border-border px-3 py-1.5 text-xs text-foreground"
          >
            <TicketIcon className="size-3.5" />
            {code.label}
          </button>
        ))}
      </div>

      {modalOpen && (
        <PromoCodeModal codes={codes} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
