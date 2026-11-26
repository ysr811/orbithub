function SkeletonCard() {
  return (
    <div
      className="flex flex-col justify-between gap-3.5 rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-2xs animate-pulse font-cairo"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="h-3.5 w-24 rounded-md bg-muted/80" />
          <div className="h-3 w-16 rounded-md bg-muted/60" />
        </div>

        <div className="flex items-start gap-2.5 pt-0.5">
          <div className="size-9 shrink-0 rounded-xl bg-muted/80" />

          <div className="flex-1 space-y-1.5 min-h-[2.5rem]">
            <div className="h-3.5 w-11/12 rounded bg-muted/80" />
            <div className="h-3.5 w-2/3 rounded bg-muted/60" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-0.5">
        <div className="h-3 w-20 rounded bg-muted/60" />
        <div className="size-1 rounded-full bg-muted/40" />
        <div className="h-3 w-12 rounded bg-muted/60" />
        <div className="size-1 rounded-full bg-muted/40" />
        <div className="h-4.5 w-10 rounded-md bg-muted/70" />
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-border/50">
        <div className="h-8.5 rounded-xl bg-muted/60 w-full" />
        <div className="h-8.5 rounded-xl bg-muted/80 w-full" />
      </div>
    </div>
  );
}

export default function MaterialSkeleton({
  count = 8,
  showHeaderSkeleton = true,
}) {
  return (
    <div
      role="status"
      aria-label="جارِ تحميل الملخصات..."
      className="flex flex-col gap-4 sm:gap-5 w-full font-cairo"
    >
      <span className="sr-only">جارِ تحميل الملخصات الدراسية...</span>

      {showHeaderSkeleton && (
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-pulse"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2.5 w-full sm:max-w-md md:max-w-lg">
            <div className="h-11 rounded-xl bg-muted/60 flex-1" />
            <div className="h-11 w-20 rounded-xl bg-muted/50 shrink-0" />
          </div>

          <div className="h-4 w-28 rounded bg-muted/50 shrink-0" />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
        {Array.from({ length: count }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    </div>
  );
}
