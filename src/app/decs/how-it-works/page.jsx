import { getDocBySlug, getDocContent } from "@/data/docs";
import DocArticleView from "@/components/docs/DocArticleView";

const doc = getDocBySlug("how-it-works");

export const metadata = {
  title: "كيف تعمل منصة Orbit Hub؟ | OrbitHub",
  description: doc.description,
};

export default function HowItWorksPage() {
  const content = getDocContent(doc.fileName);
  return <DocArticleView doc={doc} content={content} />;
}
