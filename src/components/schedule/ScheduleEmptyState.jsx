"use client";

import React from "react";
import Link from "next/link";
import { CalendarClock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScheduleEmptyState() {
  return (
    <div
      role="region"
      aria-label="الجدول الأكاديمي قيد التطوير"
      className="flex-1 w-full flex flex-col items-center justify-center text-center py-24 px-4 max-w-md mx-auto font-cairo"
    >
      {/* Quiet Icon */}
      <div className="size-14 rounded-2xl bg-muted/70 text-muted-foreground flex items-center justify-center mb-4">
        <CalendarClock className="size-6" strokeWidth={1.75} />
      </div>

      {/* Typography */}
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 leading-snug">
        الجدول الأكاديمي قيد التطوير
      </h2>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
        يجري العمل حالياً على إعداد وتنسيق الجداول والتحديثات الأكاديمية للفصل الدراسي الحالي، وستكون متاحة هنا فور اعتمادها وتحديثها.
      </p>

      {/* Navigation Action */}
      <Button
        variant="default"
        size="sm"
        render={<Link href="/" />}
        className="h-9 px-5 gap-2 font-bold cursor-pointer"
      >
        <ArrowRight className="size-3.5" />
        العودة للرئيسية
      </Button>
    </div>
  );
}
