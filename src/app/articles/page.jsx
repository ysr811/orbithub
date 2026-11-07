import EmptyStatePage from "@/components/EmptyStatePage";
import { Newspaper } from "lucide-react";

export const metadata = {
  title: "المقالات | OrbitHub",
  description: "مقالات وتدوينات تقنية وأكاديمية لطلاب علوم الحاسوب في جامعة حضرموت.",
};

export default function ArticlesPage() {
  return (
    <EmptyStatePage
      icon={Newspaper}
      title="المقالات والتدوينات"
      description="قريباً - مقالات تقنية وتدوينات أكاديمية لطلاب علوم الحاسوب في جامعة حضرموت."
    />
  );
}
