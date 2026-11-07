import { getDocBySlug, getDocContent } from "@/data/docs";
import DocArticleView from "@/components/DocArticleView";

const doc = getDocBySlug("delegates-guide");

export const metadata = {
  title: "دليل مندوبي الدفعات الأكاديمية | OrbitHub",
  description: doc.description,
};

export default function DelegatesGuidePage() {
  const content = getDocContent(doc.fileName);
  return <DocArticleView doc={doc} content={content} />;
}
