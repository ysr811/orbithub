import React from "react";
import EmptyStatePage from "@/components/EmptyStatePage";
import { CalendarDays } from "lucide-react";

export const metadata = {
  title: "الجدول الأكاديمي | OrbitHub",
  description:
    "جدول المحاضرات والمعامل الأكاديمية والتحديثات لطلاب كلية الحاسبات وتقنية المعلومات بجامعة حضرموت",
};

export default function SchedulePage() {
  return (
    <EmptyStatePage
      title="الجدول الأكاديمي"
      description="صفحة الجدول الأكاديمي والتحديثات قيد التطوير والتجهيز حالياً، وستكون متاحة فور اعتمادها وتحديثها."
      icon={CalendarDays}
      buttonText="العودة للرئيسية"
      buttonHref="/"
    />
  );
}
