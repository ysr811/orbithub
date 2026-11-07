import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import heroImage from "../../public/image.png";
import {
  CalendarDays,
  BookOpen,
  Palette,
  Sparkles,
  ArrowLeft,
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {shortcuts.map((item) => {
            const Icon = item.icon;
            const CardContent = (
              <div
                className={`flex flex-col items-center p-6 rounded-2xl 
                           bg-card transition-all duration-200 h-full
                           ${
                             !item.href
                               ? "opacity-60 cursor-not-allowed border-dashed"
                               : "cursor-pointer hover:bg-c-light active:scale-9"
                           }`}
              >
                <div>
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-accent text-primary group-hover:scale-110 transition-transform">
                      <Icon className="size-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold font-cairo text-foreground mb-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            );

            if (!item.href) {
              return <div key={item.title}>{CardContent}</div>;
            }

            return (
              <Link key={item.title} href={item.href} className="block">
                {CardContent}
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
