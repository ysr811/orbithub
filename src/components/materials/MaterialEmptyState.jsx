import React from "react";
import Link from "next/link";
import { SearchX, BookOpen, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MaterialEmptyState({
  type = "filter", // "filter" | "server"
  title,
  description,
  activeFiltersList = [],
  onReset,
}) {
  const isServer = type === "server";

  const defaultTitle = isServer
    ? "لا توجد ملخصات حالياً"
    : "لا توجد نتائج مطابقة لبحثك";

  const defaultDescription = isServer
    ? "لم يتم العثور على أي ملازم بعد في مجلد Google Drive. ستظهر هنا تلقائياً فور إضافتها."
    : "لم نتمكن من العثور على أي ملخصات تطابق معايير الفلترة أو كلمة البحث الحالية. يمكنك تعديل خيارات الفلترة أو مسحها بالكامل.";

  return (
    <div
      role="region"
      aria-label="حالة عدم وجود نتائج"
      className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-3xl border border-dashed border-border/80 bg-card max-w-2xl mx-auto w-full my-6 font-cairo transition-all"
    >
      {/* Visual Accent Icon Container */}
      <div className="relative mb-5 flex items-center justify-center">
        <div className="size-20 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-[#7A89EA] shadow-inner">
          {isServer ? (
            <BookOpen className="size-10" strokeWidth={1.8} />
          ) : (
            <SearchX className="size-10" strokeWidth={1.8} />
          )}
        </div>
        <div className="absolute -inset-2 rounded-3xl bg-primary/5 -z-10 animate-pulse" />
      </div>

      {/* Headings */}
      <h3 className="text-xl sm:text-2xl font-black text-foreground mb-2 leading-tight">
        {title || defaultTitle}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground dark:text-[#9DA3C7] max-w-md mx-auto leading-relaxed mb-6">
        {description || defaultDescription}
      </p>

      {/* Active Criteria Chips preview in empty state */}
      {!isServer && activeFiltersList.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 max-w-lg">
          <span className="text-xs font-semibold text-muted-foreground ml-1">
            الفلاتر النشطة:
          </span>
          {activeFiltersList.map((filter, index) => (
            <span
              key={index}
              className="inline-flex items-center text-xs px-2.5 py-1 rounded-lg bg-muted text-foreground border border-border/80"
            >
              {filter}
            </span>
          ))}
        </div>
      )}

      {/* Action CTA */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {isServer ? (
          <Button render={<Link href="/" />} variant="outline" className="gap-2 font-semibold">
            <Home className="size-4" />
            العودة للرئيسية
          </Button>
        ) : (
          onReset && (
            <Button
              type="button"
              variant="default"
              onClick={onReset}
              className="gap-2 font-bold px-6 shadow-sm shadow-primary/25 cursor-pointer"
            >
              <RotateCcw className="size-4" />
              مسح جميع الفلاتر
            </Button>
          )
        )}
      </div>
    </div>
  );
}
