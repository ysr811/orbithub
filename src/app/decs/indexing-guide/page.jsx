import { getDocBySlug, getDocContent } from "@/data/docs";
import DocArticleView from "@/components/docs/DocArticleView";

const doc = getDocBySlug("indexing-guide");

export const metadata = {
  title: "دليل فهرسة وتنظيم Google Drive | OrbitHub",
  description: doc.description,
};

export default function IndexingGuidePage() {
  const content = getDocContent(doc.fileName);
  return <DocArticleView doc={doc} content={content} />;
}
