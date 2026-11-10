import React from "react";
import Link from "next/link";
import Image from "next/image";
import { docsList } from "@/data/docs";
import { ArrowLeft, Calendar } from "lucide-react";

export const metadata = {
  title: "المقالات والأدلة | OrbitHub",
  description: "دليل ومقالات منصة Orbit Hub لطلاب كلية الحاسبات وتقنية المعلومات في جامعة حضرموت.",
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
              className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card overflow-hidden shadow-2xs hover:border-primary/50 hover:shadow-xs transition-all duration-200"
            >
              {/* Card Banner Image */}
              <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
                <Image
                  src={`/decs/${doc.slug}.png`}
                  alt={doc.description || "Article Banner"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Card Body */}
              <div className="flex flex-col justify-between flex-1 p-5 sm:p-6 gap-4">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {doc.description}
                </p>

                {/* Card Footer: Last Updated Date & Read More CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border/60 text-xs">
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
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
