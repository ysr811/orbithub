import Image from "next/image";
import Header from "@/components/Header";
import Section from "@/components/Section";
import heroImage from "../../public/image.png";

export default function Home() {
  return (
    <>
      <Header />
      <section
        dir="rtl"
        className="relative w-full min-h-screen bg-background overflow-hidden flex items-start justify-center pt-4 lg:pt-20 pb-6"
      >
        <div className="relative z-10 w-full mx-auto flex flex-col items-center justify-center">
          <div className="max-w-xl h-[35dvh] max-h-96 min-h-fit flex items-center justify-center">
            <p>
              Orbit Hub هي منصة صُممت خصيصاً لطلاب دفعة Orbit (علوم الحاسوب)
              لتسهيل دراستنا وتنظيمها. يجمع الموقع كل ما نحتاجه في مكان واحد، من
              محاضرات وملخصات وجداول دراسية، إلى جانب متابعة آخر أخبار وتنبيهات
              الدفعة أولاً بأول بواجهة بسيطة وسريعة.
            </p>
          </div>
          <Image
            src="/logo/hero-title-dark.svg"
            alt="ORBIT HUB"
            width={1418}
            height={202}
            priority
            className="w-full h-auto object-contain select-none hidden lg:block"
          />
          <Image
            src={heroImage}
            alt="Orbit Hub Preview"
            priority
            className="w-full h-auto object-contain rounded-sm lg:rounded-lg"
          />
        </div>
      </section>
    </>
  );
}
