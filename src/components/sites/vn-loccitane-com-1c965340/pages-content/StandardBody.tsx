import type { PageRecord } from "@/data/pages/types";

export function StandardBody({ page }: { page: PageRecord }) {
  const paragraphs = page.bodyParagraphs ?? [];

  return (
    <article>
      <h1 className="mb-6 text-3xl font-medium text-foreground">{page.title}</h1>
      {paragraphs.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Trang này hiện chưa có nội dung trên website gốc.
        </p>
      ) : (
        <div className="space-y-4 text-sm leading-relaxed text-foreground">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </article>
  );
}
