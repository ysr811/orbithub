import React from "react";
import Header from "@/components/Header";
import ScheduleEmptyState from "@/components/schedule/ScheduleEmptyState";

export const metadata = {
  title: "الجدول الأكاديمي | OrbitHub",
  description:
    "جدول المحاضرات والمعامل الأكاديمية والتحديثات لطلاب كلية الحاسبات وتقنية المعلومات بجامعة حضرموت",
};

export default function SchedulePage() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-cairo">
      <Header />

      <main className="flex-1 w-full flex flex-col items-center justify-center pb-8 pt-2">
        <ScheduleEmptyState />
      </main>
    </div>
  );
}
