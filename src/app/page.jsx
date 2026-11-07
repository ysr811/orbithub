import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import heroImage from "../../public/image.png";

import {
  CalendarDays,
  BookOpen,
  Palette,
  Sparkles,
  ArrowUpLeft,
} from "lucide-react";

const shortcuts = [
  {
    title: "الجدول الدراسي",
    href: "/schedule",
    icon: CalendarDays,
  },
  {
    title: "الملازم والمقررات",
    href: "/materials",
    icon: BookOpen,
  },
  {
    title: "الهوية البصرية",
    href: "/brand",
    icon: Palette,
  },
  {
    title: "قريباً",
    href: "",
    icon: Sparkles,
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <section
        dir="rtl"
        className="relative w-full h-fit lg:min-h-screen bg-background overflow-hidden flex items-start justify-center pt-4 lg:pt-20 pb-6"
      >
        <div className="relative z-10 w-full mx-auto flex flex-col items-center justify-center">
          <div className="max-w-xl h-[35dvh] max-h-96 min-h-fit flex items-center justify-center px-4">
            <p className="text-sm sm:text-base leading-relaxed text-foreground/80 font-cairo ">
              بوابتك الأكاديمية لطلاب علوم الحاسوب بجامعة حضرموت — صُممت لتسهيل
              رحلتك الجامعية عبر تجميع المقررات، الملخصات، الجداول، ونماذج
              الامتحانات في مكان واحد منظم يختصر عليك عناء البحث.
            </p>
          </div>
          <Image
            src="/logo/hero-title-dark.svg"
            alt="ORBIT HUB"
            width={1418}
            height={202}
            priority
            className="w-full h-auto object-contain select-none"
          />
          <Image
            src={heroImage}
            alt="Orbit Hub Preview"
            priority
            className="w-full h-auto object-contain rounded-sm lg:rounded-lg"
          />
        </div>
      </section>

      <section className="mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 lg:gap-5">
          {shortcuts.map((item) => {
            const Icon = item.icon;
            const isDisabled = !item.href;

            const CardContent = (
              <div
                className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-card border-2 transition-all duration-200 h-full min-h-32.5 ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed border-dashed border-border"
                    : "cursor-pointer border-border/60 hover:bg-c-light active:scale-[0.98]"
                }`}
              >
                <div className="flex items-start justify-between w-full mb-6">
                  <div
                    className={`flex items-center justify-center size-10 rounded-xl bg-accent/70 text-primary transition-colors duration-200  ${!isDisabled && "group-hover:bg-primary group-hover:text-primary-foreground"}`}
                  >
                    <Icon className="size-5" />
                  </div>

                  {!isDisabled && (
                    <ArrowUpLeft className="size-4 text-muted-foreground/50 transition-all duration-200 group-hover:text-foreground group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </div>

                <h3 className="text-base font-semibold font-cairo text-foreground tracking-tight">
                  {item.title}
                </h3>
              </div>
            );

            if (isDisabled) {
              return <div key={item.title}>{CardContent}</div>;
            }

            return (
              <Link key={item.title} href={item.href} className="block h-full">
                {CardContent}
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
