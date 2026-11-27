import Link from "next/link";
import Image from "next/image";
import { docsList } from "@/data/docs";

export const metadata = {
  title: "المقالات والأدلة | OrbitHub",
  description:
    "دليل ومقالات منصة Orbit Hub لطلاب كلية الحاسبات وتقنية المعلومات في جامعة حضرموت.",
};

export default function DecsOverviewPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto font-cairo">
      <h1 className="sr-only">المقالات والأدلة</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {docsList.map((doc) => (
          <Link
            key={doc.slug}
            href={`/decs/${doc.slug}`}
            className="group relative flex flex-col justify-between rounded-2xl border border-transparent hover:border-border/80 bg-card overflow-hidden transition-all"
          >
            <div className="relative w-full aspect-video bg-muted overflow-hidden">
              <Image
                src={`/decs/${doc.slug}.png`}
                alt={doc.description || doc.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5 sm:p-6 overflow-hidden">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {doc.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
