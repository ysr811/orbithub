function SkeletonCard() {
  return (
    <div
      className="h-40 rounded-3xl bg-muted/50 skeleton-shimmer"
      aria-hidden="true"
    />
  );
}

export default function MaterialSkeleton({
  count = 10,
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
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4"
          aria-hidden="true"
        >
          <div className="h-11 w-full sm:max-w-md md:max-w-lg rounded-3xl bg-muted skeleton-shimmer" />
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
