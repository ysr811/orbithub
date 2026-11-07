import fs from "fs/promises";
import path from "path";
import { getDocBySlug } from "@/data/docs";
import DocArticleView from "@/components/DocArticleView";

const doc = getDocBySlug("how-it-works");

export const metadata = {
  title: "كيف تعمل منصة Orbit Hub؟ | OrbitHub",
  description: doc.description,
};

export default async function HowItWorksPage() {
  const filePath = path.join(process.cwd(), "src/content/docs", doc.fileName);
  const content = await fs.readFile(filePath, "utf-8");

  return <DocArticleView doc={doc} content={content} />;
}
