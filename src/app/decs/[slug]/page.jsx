import { Suspense } from "react";
import { notFound } from "next/navigation";
import { docsList, getDocBySlug, getDocContent, getAdjacentDocs } from "@/data/docs";
import DocArticleView from "@/components/docs/DocArticleView";
import DocArticleSkeleton from "@/components/docs/DocArticleSkeleton";

export function generateStaticParams() {
  return docsList.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return {};

  return {
    title: `${doc.title} | OrbitHub`,
    description: doc.description,
  };
}

async function DocContent({ params }) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  const content = getDocContent(doc.fileName);
  if (!content) notFound();

  const { prevDoc, nextDoc } = getAdjacentDocs(slug);

  return (
    <DocArticleView
      doc={doc}
      content={content}
      prevDoc={prevDoc}
      nextDoc={nextDoc}
    />
  );
}

export default function DocArticlePage({ params }) {
  return (
    <Suspense fallback={<DocArticleSkeleton />}>
      <DocContent params={params} />
    </Suspense>
  );
}
