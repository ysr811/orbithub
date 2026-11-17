"use client";

import React from "react";
import { Clock, MapPin, AlertCircle, FileText, X, Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Map types to the 4 core semantic colors specified by the user:
// 1. Green (good_news) -> خبر جيد
// 2. Blue (info) -> معلومة
// 3. Orange (warning) -> تحذير وموعد تسليم
// 4. Rose/Red (quiz / exam) -> كويز أو اختبار
function getUpdateStyle(type) {
  const clean = String(type || "").toLowerCase();

  // 1. الأخضر: للخبر الجيد أو الإيجابي
  if (
    clean.includes("good") ||
    clean.includes("جيد") ||
    clean.includes("success") ||
    clean.includes("إلغاء") ||
    clean.includes("تمديد")
  ) {
    return {
      card: "bg-emerald-500/[0.08] dark:bg-emerald-500/12 border border-emerald-500/25 text-emerald-950 dark:text-emerald-100",
      pill: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200",
      dot: "bg-emerald-500",
      defaultLabel: "خبر جيد",
    };
  }

  // 2. الأزرق: للمعلومة (مثل حضور الدكتور في وقت معين أو نقل قاعة)
  if (
    clean.includes("info") ||
    clean.includes("معلومة") ||
    clean.includes("إشعار") ||
    clean.includes("حضور")
  ) {
    return {
      card: "bg-sky-500/[0.08] dark:bg-sky-500/12 border border-sky-500/25 text-sky-950 dark:text-sky-100",
      pill: "bg-sky-500/15 text-sky-800 dark:text-sky-200",
      dot: "bg-sky-500",
      defaultLabel: "معلومة",
    };
  }

  // 3. البرتقالي: للتحذير ومواعيد تسليم الواجبات
  if (
    clean.includes("warning") ||
    clean.includes("تحذير") ||
    clean.includes("تسليم") ||
    clean.includes("واجب") ||
    clean.includes("deadline")
  ) {
    return {
      card: "bg-amber-500/[0.08] dark:bg-amber-500/12 border border-amber-500/25 text-amber-950 dark:text-amber-100",
      pill: "bg-amber-500/15 text-amber-900 dark:text-amber-200",
      dot: "bg-amber-500",
      defaultLabel: "تحذير تسليم",
    };
  }

  // 4. الأحمر / الوردي: للكويزات والاختبارات
  return {
    card: "bg-rose-500/[0.08] dark:bg-rose-500/12 border border-rose-500/25 text-rose-950 dark:text-rose-100",
    pill: "bg-rose-500/15 text-rose-900 dark:text-rose-200",
    dot: "bg-rose-500",
    defaultLabel: "كويز قادم",
  };
}

const DAY_LABELS = {
  sunday: "الأحد",
  monday: "الإثنين",
  tuesday: "الثلاثاء",
  wednesday: "الأربعاء",
  thursday: "الخميس",
};

export default function ScheduleUpdatesSidebar({
  updates = [],
  isOpen = false,
  onToggle,
  onClose,
}) {
  return (
    <>
      {/* ─── Floating Pull-Tab Handle on Edge of Screen ───────────────── */}
      <button
        type="button"
        onClick={onToggle}
        title={isOpen ? "إخفاء التحديثات" : "عرض التحديثات والمواعيد"}
        aria-label={isOpen ? "إخفاء التحديثات" : "عرض التحديثات والمواعيد"}
        className={cn(
          "fixed top-36 z-40 flex items-center gap-2 px-3 py-2.5 rounded-l-2xl shadow-lg border border-border/70 cursor-pointer transition-all duration-300 font-cairo select-none",
          isOpen
            ? "right-84 sm:right-92 bg-background text-foreground"
            : "right-0 bg-primary text-primary-foreground hover:px-4 hover:shadow-xl"
        )}
      >
        <Bell className="size-4 shrink-0" />
        <span className="text-xs font-bold hidden sm:inline">
          {isOpen ? "إغلاق" : "التحديثات"}
        </span>
        {updates.length > 0 && (
          <span
            className={cn(
              "size-5 rounded-full text-[10px] font-black flex items-center justify-center shrink-0",
              isOpen
                ? "bg-primary text-primary-foreground"
                : "bg-white text-primary"
            )}
          >
            {updates.length}
          </span>
        )}
        {isOpen ? (
          <ChevronRight className="size-4 shrink-0" />
        ) : (
          <ChevronLeft className="size-4 shrink-0" />
        )}
      </button>

      {/* Mobile Backdrop when drawer is open */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* ─── Sliding Side Drawer Panel ───────────────────────────────── */}
      <aside
        aria-label="تحديثات وتعديلات الجدول"
        className={cn(
          "fixed top-0 bottom-0 right-0 z-50 w-84 sm:w-92 bg-background/95 backdrop-blur-md border-l border-border shadow-2xl p-4 sm:p-5 flex flex-col gap-3.5 font-cairo overflow-y-auto transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Bell className="size-4" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">
                التحديثات والمواعيد
              </h3>
              <p className="text-[11px] text-muted-foreground">
                {updates.length} {updates.length === 1 ? "إشعار نشط" : "إشعارات نشطة"}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="size-8 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
            title="إغلاق"
            aria-label="إغلاق"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Updates Cards List */}
        {updates.length === 0 ? (
          <div className="py-12 text-center text-xs text-muted-foreground/60 flex flex-col items-center justify-center gap-2 select-none rounded-2xl border border-dashed border-border/60">
            <FileText className="size-7 text-muted-foreground/40 stroke-[1.5]" />
            <span>لا توجد كويزات أو تنبيهات مسجلة حالياً.</span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {updates.map((item) => {
              const style = getUpdateStyle(item.type);
              const dayName =
                item.dayArabic ||
                DAY_LABELS[String(item.day || "").toLowerCase()] ||
                item.day;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-2xl p-4 flex flex-col gap-2 transition-all shadow-2xs hover:shadow-xs",
                    style.card
                  )}
                >
                  {/* Card Top: Type Pill & Date */}
                  <div className="flex items-center justify-between gap-1 text-[11px]">
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1.5",
                        style.pill
                      )}
                    >
                      <span className={cn("size-1.5 rounded-full", style.dot)} />
                      {item.typeArabic || style.defaultLabel}
                    </span>

                    <div
                      className="flex items-center gap-1 text-[11px] text-muted-foreground font-semibold"
                      dir="ltr"
                    >
                      <span>{item.date}</span>
                      {dayName && (
                        <>
                          <span>•</span>
                          <span>{dayName}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Title & Subject */}
                  <div>
                    <h4 className="font-bold text-sm text-foreground leading-snug">
                      {item.title}
                    </h4>
                    {item.subject && (
                      <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                        {item.subject}
                      </p>
                    )}
                  </div>

                  {/* Note / Details Description */}
                  {item.description && (
                    <p className="text-xs text-foreground/85 bg-background/60 rounded-xl p-2.5 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {/* Stacked Details: Hall & Period */}
                  <div className="flex flex-col gap-0.5 text-[11px] text-muted-foreground pt-1 border-t border-current/10">
                    {item.hall && (
                      <span className="font-semibold text-foreground/90">
                        القاعة: {item.hall}
                      </span>
                    )}
                    {item.period && (
                      <span>
                        الفترة: {item.period} {item.group && item.group !== "ALL" && `(فئة ${item.group})`}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </aside>
    </>
  );
}
