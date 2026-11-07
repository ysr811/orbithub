import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import MarkdownViewer from "@/components/MarkdownViewer";

export default function DocArticleView({ doc, content }) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 font-cairo">
      {/* ─── Top Breadcrumb Navigation & Metadata ────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/60">
        <Link
          href="/decs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowRight className="size-4" />
          <span>العودة للمقالات والأدلة</span>
        </Link>

        {doc.lastUpdated && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="size-3.5 text-primary" />
            <span>آخر تحديث: {doc.lastUpdated}</span>
          </div>
        )}
      </div>

      {/* ─── Rendered Markdown Content ───────────────────────────────── */}
      <MarkdownViewer content={content} />

      {/* ─── Bottom Navigation ───────────────────────────────────────── */}
      <div className="pt-8 border-t border-border/60 mt-8">
        <Link
          href="/decs"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline cursor-pointer"
        >
          <ArrowRight className="size-4" />
          <span>العودة لجميع المقالات والأدلة</span>
        </Link>
      </div>
    </div>
  );
}
