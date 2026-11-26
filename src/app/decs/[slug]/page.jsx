import { Suspense } from "react";
import { notFound } from "next/navigation";
import { docsList, getDocBySlug, getDocContent } from "@/data/docs";
import DocArticleView from "@/components/docs/DocArticleView";

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

  return <DocArticleView doc={doc} content={content} />;
}

export default function DocArticlePage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-4xl mx-auto py-12 text-center text-sm text-muted-foreground font-cairo">
          جاري تحميل المقال...
        </div>
      }
    >
      <DocContent params={params} />
    </Suspense>
  );
}
