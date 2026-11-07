import EmptyStatePage from "@/components/EmptyStatePage";
import { FileQuestionMark } from "lucide-react";

export default function SchedulePage() {
  return (
    <EmptyStatePage
      icon={FileQuestionMark}
      title="الجدول الأكاديمي"
      description="قريباً - الجدول والمواعيد الدراسية لطلاب علوم الحاسوب في جامعة حضرموت."
    />
  );
}
