import fs from "fs/promises";
import path from "path";
import { getDocBySlug } from "@/data/docs";
import DocArticleView from "@/components/DocArticleView";

const doc = getDocBySlug("delegates-guide");

export const metadata = {
  title: `${doc.title} | OrbitHub`,
  description: doc.description,
};

export default async function DelegatesGuidePage() {
  const filePath = path.join(process.cwd(), "src/content/docs", doc.fileName);
  const content = await fs.readFile(filePath, "utf-8");

  return <DocArticleView doc={doc} content={content} />;
}
