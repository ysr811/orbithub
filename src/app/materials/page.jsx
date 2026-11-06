import EmptyStatePage from "@/components/EmptyStatePage";
import { BookOpen } from "lucide-react";

export default function MaterialsPage() {
  return (
    <EmptyStatePage
      icon={BookOpen}
      title="الملازم والمقررات"
      description="قريباً - جميع الملازم والملخصات الدراسية في مكان واحد."
    />
  );
}
