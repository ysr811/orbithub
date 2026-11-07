import React from "react";
import Link from "next/link";
import { docsList } from "@/data/docs";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";

export const metadata = {
  title: "المقالات والأدلة | OrbitHub",
  description: "دليل ومقالات منصة Orbit Hub لطلاب علوم الحاسوب في جامعة حضرموت.",
};

export default function DecsOverviewPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto font-cairo">
      {/* ─── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-primary">
          <BookOpen className="size-4" />
          <span>مركز المعرفة والتوثيق</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
          المقالات والأدلة الإرشادية
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
          أدلة شاملة توضح آلية عمل المنصة، شروط جودة الملفات، وكيفية تنظيم وفهرسة الملازم على Google Drive.
        </p>
      </div>

      {/* ─── Articles Grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {docsList.map((doc) => {
          const IconComponent = doc.icon;
          return (
            <Link
              key={doc.slug}
              href={`/decs/${doc.slug}`}
              className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-2xs hover:border-primary/50 hover:shadow-xs transition-all duration-200"
            >
              <div className="flex flex-col gap-4">
                {/* Card Top: Icon & Category Tag */}
                <div className="flex items-center justify-between">
                  <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-105">
                    <IconComponent className="size-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/60">
                    {doc.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {doc.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {doc.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Read Time & Read More CTA */}
              <div className="flex items-center justify-between pt-5 mt-4 border-t border-border/60 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="size-3.5" />
                  <span>{doc.readTime}</span>
                </div>

                <span className="inline-flex items-center gap-1 font-bold text-primary group-hover:-translate-x-1 transition-transform">
                  <span>قراءة المقال</span>
                  <ArrowLeft className="size-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
