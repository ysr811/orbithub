"use client";

import { useRouter } from "next/navigation";
import { SearchX, FolderSearch, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MaterialEmptyState({
  type = "filter",
  title,
  onReset,
}) {
  const router = useRouter();
  const isEmpty = type === "empty";

  const handleBack = () => {
    const hasSameOriginReferrer =
      document.referrer &&
      new URL(document.referrer).origin === window.location.origin;

    if (hasSameOriginReferrer && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const defaultTitle = isEmpty
    ? "لا توجد ملازم مضافة بعد"
    : "لا توجد نتائج مطابقة";

  const defaultDescription = isEmpty
    ? "لم يتم رفع أي ملازم لهذا المستوى في Google Drive حتى الآن، وستظهر هنا تلقائياً فور إضافتها."
    : "لم نجد ملازم تطابق معايير البحث الحالية. يمكنك تعديل كلمات البحث أو مسح الفلاتر.";

  return (
    <div
      role="region"
      aria-label="حالة عدم وجود نتائج"
      className="flex-1 w-full flex flex-col items-center justify-center text-center py-8 px-4 max-w-md mx-auto font-cairo"
    >
      <div className="size-14 rounded-2xl bg-muted/70 text-muted-foreground flex items-center justify-center mb-4">
        {isEmpty ? (
          <FolderSearch className="size-6" strokeWidth={1.75} />
        ) : (
          <SearchX className="size-6" strokeWidth={1.75} />
        )}
      </div>

      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 leading-snug">
        {title || defaultTitle}
      </h2>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
        {defaultDescription}
      </p>

      {isEmpty ? (
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={handleBack}
          className="h-9 px-5 gap-2 font-bold"
        >
          <ArrowRight className="size-3.5" />
          الرجوع
        </Button>
      ) : (
        onReset && (
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onReset}
            className="h-9 px-5 gap-2 font-bold"
          >
            <RotateCcw className="size-3.5" />
            مسح الفلاتر
          </Button>
        )
      )}
    </div>
  );
}
