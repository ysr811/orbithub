import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MarkdownViewer from "@/components/docs/MarkdownViewer";

export default function DocArticleView({ doc, content, prevDoc, nextDoc }) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 font-cairo">
      <div className="flex items-center justify-between gap-2 pb-3">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowRight />}
          render={<Link href="/decs" />}
        >
          العودة للمقالات
        </Button>

        {doc.lastUpdated && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>آخر تحديث: {doc.lastUpdated}</span>
          </div>
        )}
      </div>

      <MarkdownViewer content={content} />

      {(prevDoc || nextDoc) && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 my-4 h-12 lg:h-32 ">
          {prevDoc ? (
            <Button
              className="w-full"
              variant="outline"
              icon={<ArrowRight className="shrink-0" />}
              render={<Link href={`/decs/${prevDoc.slug}`} />}
            >
              <span className="truncate">{prevDoc.title}</span>
            </Button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextDoc && (
            <Button
              className="w-full"
              variant="outline"
              icon={<ArrowLeft className="shrink-0" />}
              iconPosition="end"
              render={<Link href={`/decs/${nextDoc.slug}`} />}
            >
              <span className="truncate">{nextDoc.title}</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
