import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Section({
  title = "Title",
  desc = "Description",
  imgUrl,
  className = "",
}) {
  return (
    <section
      className={cn(
        "flex justify-between lg:h-screen py-8 flex-col lg:flex-row",
        className
      )}
    >
      <div className="lg:flex-1 mb-6 p-0 lg:p-4 flex flex-col justify-between min-h-fit">
        <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-c-navy leading-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-c-slate leading-relaxed">
          {desc}
        </p>
      </div>
      <div className="flex-1 flex justify-end">
        <Image
          src={imgUrl}
          alt={title}
          width={1080}
          height={820}
          className="w-full lg:w-auto object-contain select-none h-auto rounded-3xl"
        />
      </div>
    </section>
  );
}
