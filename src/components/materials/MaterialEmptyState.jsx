"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SearchX, FolderSearch, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MaterialEmptyState({
  type = "filter",
  title,
  description,
  onReset,
  onBack,
}) {
  const router = useRouter();
  const isDriveEmpty = type === "server" || type === "drive-empty";

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const defaultTitle = isDriveEmpty
    ? "لا توجد ملازم مضافة بعد"
    : "لا توجد نتائج مطابقة";

  const defaultDescription = isDriveEmpty
    ? "لم يتم رفع أي ملازم لهذا المستوى في Google Drive حتى الآن، وستظهر هنا تلقائياً فور إضافتها."
    : "لم نجد ملازم تطابق معايير البحث الحالية. يمكنك تعديل كلمات البحث أو مسح الفلاتر.";

  return (
    <div
      role="region"
      aria-label="حالة عدم وجود نتائج"
      className="flex-1 w-full flex flex-col items-center justify-center text-center py-8 px-4 max-w-md mx-auto font-cairo"
    >
      {/* Icon */}
      <div className="size-14 rounded-2xl bg-muted/70 text-muted-foreground flex items-center justify-center mb-4">
        {isDriveEmpty ? (
          <FolderSearch  className="size-6" strokeWidth={1.75} />
        ) : (
          <SearchX className="size-6" strokeWidth={1.75} />
        )}
      </div>

      {/* Typography */}
      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 leading-snug">
        {title || defaultTitle}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
        {description || defaultDescription}
      </p>

      {/* Primary Action Button */}
      {isDriveEmpty ? (
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={handleBack}
          className="h-9 px-5 gap-2 font-bold cursor-pointer"
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
            className="h-9 px-5 gap-2 font-bold cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
            مسح الفلاتر
          </Button>
        )
      )}
    </div>
  );
}
