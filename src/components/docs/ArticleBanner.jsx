import Image from "next/image";

export default function ArticleBanner({ slug, alt = "Article Banner" }) {
  const bannerSrc = `/decs/${slug}.png`;

  return (
    <div className="relative w-full aspect-[900/230] rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-card shadow-2xs">
      <Image
        src={bannerSrc}
        alt={alt}
        fill
        loading="eager"
        sizes="(max-width: 1024px) 100vw, 896px"
        className="object-cover"
      />
    </div>
  );
}
