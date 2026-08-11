function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m12 3 2.66 5.61 6.09.79-4.46 4.35 1.13 6.1L12 16.9l-5.42 2.95 1.13-6.1-4.46-4.35 6.09-.79z"
      />
    </svg>
  );
}

export function ProductRating({
  average,
  count,
}: {
  average: number;
  count: number;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-primary">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < Math.round(average)} />
        ))}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Dựa trên {count} đánh giá
      </p>
    </div>
  );
}
