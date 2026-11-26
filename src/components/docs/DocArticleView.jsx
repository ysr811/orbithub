import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MarkdownViewer from "@/components/docs/MarkdownViewer";
import ArticleBanner from "@/components/docs/ArticleBanner";

export default function DocArticleView({ doc, content }) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 font-cairo">
      <div className="flex items-center justify-between gap-2 pb-3">
        <Link
          href="/decs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowRight className="size-4" />
          <span>العودة للمقالات والأدلة</span>
        </Link>

        {doc.lastUpdated && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>آخر تحديث: {doc.lastUpdated}</span>
          </div>
        )}
      </div>

      <ArticleBanner slug={doc.slug} alt={doc.description} />

      <MarkdownViewer content={content} />
    </div>
  );
}
