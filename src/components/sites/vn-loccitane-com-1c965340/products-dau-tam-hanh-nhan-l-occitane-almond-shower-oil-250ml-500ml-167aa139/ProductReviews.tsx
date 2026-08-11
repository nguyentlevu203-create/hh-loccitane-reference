"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductRating } from "./ProductRating";
import type { ProductReviewSummary } from "./types";

function ReviewIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function EditIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function WriteReviewForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-4 space-y-4 rounded-[5px] border border-border p-4"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input
          type="text"
          placeholder="Tên"
          className="rounded-[5px] border border-border px-3 py-2 text-sm"
        />
        <input
          type="email"
          placeholder="Email"
          className="rounded-[5px] border border-border px-3 py-2 text-sm"
        />
        <input
          type="tel"
          placeholder="Số điện thoại"
          className="rounded-[5px] border border-border px-3 py-2 text-sm"
        />
      </div>
      <div className="flex items-center gap-1 text-primary">
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} viewBox="0 0 24 24" className="size-5" fill="currentColor">
            <path d="m12 3 2.66 5.61 6.09.79-4.46 4.35 1.13 6.1L12 16.9l-5.42 2.95 1.13-6.1-4.46-4.35 6.09-.79z" />
          </svg>
        ))}
      </div>
      <input
        type="text"
        placeholder="Tiêu đề đánh giá"
        className="w-full rounded-[5px] border border-border px-3 py-2 text-sm"
      />
      <textarea
        placeholder="Nội dung"
        rows={4}
        className="w-full rounded-[5px] border border-border px-3 py-2 text-sm"
      />
      <input
        type="text"
        placeholder="Video (không bắt buộc)"
        className="w-full rounded-[5px] border border-border px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="rounded-[5px] bg-foreground px-6 py-2 text-sm font-medium text-white"
      >
        Gửi đánh giá
      </button>
    </form>
  );
}

export function ProductReviews({
  summary,
}: {
  summary: ProductReviewSummary;
}) {
  const [tab, setTab] = useState<"reviews" | "qa">("reviews");
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium text-foreground">
            Đánh giá sản phẩm
          </h2>
          <div className="mt-2">
            <ProductRating average={summary.average} count={summary.count} />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-foreground"
          >
            <ReviewIcon className="size-4" />
            Viết đánh giá
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-foreground"
          >
            <EditIcon className="size-4" />
            Đặt câu hỏi
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-6 border-b border-border">
        <button
          type="button"
          onClick={() => setTab("reviews")}
          className={cn(
            "border-b-2 pb-2 text-sm",
            tab === "reviews"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground"
          )}
        >
          Đánh giá {summary.count}
        </button>
        <button
          type="button"
          onClick={() => setTab("qa")}
          className={cn(
            "border-b-2 pb-2 text-sm",
            tab === "qa"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground"
          )}
        >
          Câu hỏi & trả lời 0
        </button>
      </div>

      {tab === "reviews" && showForm && <WriteReviewForm />}
    </div>
  );
}
