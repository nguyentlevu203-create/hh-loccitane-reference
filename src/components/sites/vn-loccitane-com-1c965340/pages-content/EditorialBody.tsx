import type { PageRecord } from "@/data/pages/types";

export function EditorialBody({ page }: { page: PageRecord }) {
  const lead = page.leadParagraphs ?? [];

  return (
    <article>
      {page.heroImage && (
        <div className="relative mb-6 aspect-[1400/440] w-full overflow-hidden rounded-[5px] bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={page.heroImage}
            alt={page.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <h1 className="mb-6 text-center text-3xl font-medium text-foreground">{page.title}</h1>

      {lead.length > 0 && (
        <div className="mx-auto max-w-[720px] space-y-4 text-sm leading-relaxed text-foreground">
          {lead.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Đây là bản tóm tắt nội dung thật từ trang gốc — thiết kế đầy đủ của trang này chưa được tái
        tạo trong bản demo.{" "}
        <a
          href={page.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline"
        >
          Xem trang đầy đủ trên website chính thức »
        </a>
      </p>
    </article>
  );
}
