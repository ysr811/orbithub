export default function DocArticleSkeleton() {
  return (
    <div
      role="status"
      aria-label="جاري تحميل المقال..."
      className="w-full max-w-4xl mx-auto flex flex-col gap-6 font-cairo"
    >
      <div
        className="flex items-center justify-between gap-2 pb-3"
        aria-hidden="true"
      >
        <div className="h-10 md:h-9 w-40 rounded-xl bg-muted skeleton-shimmer" />
      </div>

      <article className="w-full" aria-hidden="true">
        <div className="pb-3 mb-6 border-b border-border/70">
          <div className="h-8 sm:h-10 w-3/4 rounded-2xl bg-muted skeleton-shimmer" />
        </div>

        <div className="flex flex-col gap-2.5 mb-8">
          <div className="h-4 w-full rounded-full bg-muted/50 skeleton-shimmer" />
          <div className="h-4 w-11/12 rounded-full bg-muted/50 skeleton-shimmer" />
          <div className="h-4 w-4/5 rounded-full bg-muted/50 skeleton-shimmer" />
        </div>

        <div className="h-7 w-1/2 rounded-xl bg-muted skeleton-shimmer mb-4" />

        <div className="flex flex-col gap-2.5 mb-6">
          <div className="h-4 w-full rounded-full bg-muted/50 skeleton-shimmer" />
          <div className="h-4 w-5/6 rounded-full bg-muted/50 skeleton-shimmer" />
          <div className="h-4 w-3/4 rounded-full bg-muted/50 skeleton-shimmer" />
        </div>

        <div className="h-28 w-full rounded-2xl bg-muted/50 skeleton-shimmer my-6" />

        <div className="h-7 w-2/5 rounded-xl bg-muted skeleton-shimmer mb-4" />

        <div className="flex flex-col gap-2.5">
          <div className="h-4 w-full rounded-full bg-muted/50 skeleton-shimmer" />
          <div className="h-4 w-2/3 rounded-full bg-muted/50 skeleton-shimmer" />
        </div>
      </article>
    </div>
  );
}
