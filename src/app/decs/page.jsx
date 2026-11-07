import React from "react";
import Link from "next/link";
import { docsList } from "@/data/docs";
import { ArrowLeft, Calendar } from "lucide-react";

export const metadata = {
  title: "المقالات والأدلة | OrbitHub",
  description: "دليل ومقالات منصة Orbit Hub لطلاب علوم الحاسوب في جامعة حضرموت.",
};

export default function DecsOverviewPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto font-cairo">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {docsList.map((doc) => {
          return (
            <Link
              key={doc.slug}
              href={`/decs/${doc.slug}`}
              className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-2xs hover:border-primary/50 hover:shadow-xs transition-all duration-200"
            >
              <div className="flex flex-col gap-4">
                {/* Title & Description */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {doc.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Last Updated Date & Read More CTA */}
              <div className="flex items-center justify-between pt-5 mt-4 border-t border-border/60 text-xs">
                {doc.lastUpdated ? (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="size-3.5" />
                    <span>آخر تحديث: {doc.lastUpdated}</span>
                  </div>
                ) : (
                  <div />
                )}

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
