"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function DocCard({ doc }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link
      href={`/decs/${doc.slug}`}
      className="group relative flex flex-col justify-between rounded-2xl border border-transparent hover:border-border/80 bg-card overflow-hidden transition-all"
    >
      <div className="relative w-full aspect-video bg-muted overflow-hidden">
        {!isLoaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-muted skeleton-shimmer"
          />
        )}
        <Image
          src={`/decs/${doc.slug}.png`}
          alt={doc.description || doc.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={cn(
            "object-cover transition-all duration-300 group-hover:scale-105",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      <div className="p-5 sm:p-6 overflow-hidden">
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {doc.description}
        </p>
      </div>
    </Link>
  );
}
