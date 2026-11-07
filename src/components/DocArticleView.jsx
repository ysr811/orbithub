import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
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

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
            <Tag className="size-3" />
            <span>{doc.tag}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            <span>{doc.readTime}</span>
          </span>
        </div>
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
