import Image from "next/image";
import Header from "@/components/Header";
import OnboardingModal from "@/components/OnboardingModal";
import heroImage from "../../public/image.png";
import Section from "@/components/brand/Section";

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
              بوابتك الأكاديمية لطلاب كلية الحاسبات وتقنية المعلومات بجامعة
              حضرموت صُممت لتسهيل رحلتك الجامعية عبر تجميع المقررات، الملازم،
              والجداول في مكان واحد منظم يختصر عليك عناء البحث.
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

      {/* <Section
        title="من نحن"
        desc="نحن طلاب الدفعة الحادية عشرة (علوم حاسوب) في كلية الحاسبات وتقنية المعلومات بجامعة حضرموت. عقولٌ شابة يجمعها شغف الابتكار وعزيمة تتطلع لصناعة الفارق. انطلقنا لنبني جسراً بين المعرفة الأكاديمية والتطبيق العملي، فكانت منصة Orbit Hub ثمرة تكاتفنا وإيماننا بأن أعظم إنجاز هو ما نتركه من أثر مستدام يلهم ويسهل رحلة زملائنا ومن يأتي بعدنا."
        imgUrl="/image_2.png"
        className="my-8 lg:my-16"
      /> */}

      <OnboardingModal />
    </>
  );
}
