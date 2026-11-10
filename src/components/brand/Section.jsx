import React from "react";
import Image from "next/image";

function section({ title = "Title", desc = "descrption", imgUrl, className }) {
  return (
    <section
      className={`flex justify-between lg:h-screen py-8 flex-col lg:flex-row snap-start ${className}`}
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
          alt="ORBIT HUB"
          width={1080}
          height={820}
          priority
          className="w-full lg:w-auto object-contain select-none h-auto rounded-3xl"
        />
      </div>
    </section>
  );
}

export default section;
