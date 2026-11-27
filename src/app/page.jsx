import Image from "next/image";
import Header from "@/components/Header";
import PreferencesModal from "@/components/PreferencesModal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <h1 className="sr-only">
          Orbit Hub - البوابة الأكاديمية لطلاب كلية الحاسبات وتقنية المعلومات
          بجامعة حضرموت
        </h1>
        <section
          dir="rtl"
          className="relative w-full h-fit lg:min-h-screen bg-background overflow-hidden flex items-start justify-center pt-4 lg:pt-20 pb-6"
        >
          <div className="relative z-10 w-full mx-auto flex flex-col items-center justify-center">
            <div className="max-w-xl h-[35dvh] max-h-96 min-h-fit flex items-center justify-center px-4">
              <p className="text-sm sm:text-base leading-relaxed text-foreground/80 font-cairo">
                بوابتك الأكاديمية لطلاب كلية الحاسبات وتقنية المعلومات بجامعة
                حضرموت صُممت لتسهيل رحلتك الجامعية عبر تجميع المقررات والملازم
                الدراسية في مكان واحد منظم يختصر عليك عناء البحث.
              </p>
            </div>
            <Image
              src="/logo/hero-title-dark.svg"
              alt="ORBIT HUB"
              width={1418}
              height={202}
              loading="eager"
              className="w-full h-auto object-contain select-none"
            />
            <div className="bg-black w-full rounded-sm lg:rounded-lg overflow-hidden">
              <Image
                src="/hero.png"
                alt="Orbit Hub Preview"
                width={1418}
                height={1280}
                preload
                className="w-full max-w-6xl h-auto object-contain m-auto"
              />
            </div>
          </div>
        </section>
      </main>

      <PreferencesModal autoCheckOnboarding initialStep={1} />
    </>
  );
}
