import { docsList } from "@/data/docs";
import DocCard from "@/components/docs/DocCard";

export const metadata = {
  title: "المقالات والأدلة | OrbitHub",
  description:
    "دليل ومقالات منصة Orbit Hub لطلاب كلية الحاسبات وتقنية المعلومات في جامعة حضرموت.",
};

export default function DecsOverviewPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto font-cairo">
      <h1 className="sr-only">المقالات والأدلة</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {docsList.map((doc) => (
          <DocCard key={doc.slug} doc={doc} />
        ))}
      </div>
    </div>
  );
}
