import Header from "@/components/Header";
import Section from "@/components/brand/Section";
import SnapScroll from "@/components/brand/SnapScroll";

export const metadata = {
  title: "الهوية البصرية | OrbitHub",
  description:
    "دليل الهوية البصرية لمنصة Orbit Hub: الشعار، الأيقونة، لوحة الألوان، والخطوط المعتمدة.",
};

const brandSections = [
  {
    id: "logo",
    image: "/brand/logo.png",
    title: "الشعار الأساسي",
    description:
      "الشعار الرسمي لمدار (Orbit) بشكله الكامل الذي يدمج الأيقونة الهندسية مع النص الطباعي، مع توضيح ظهوره على الخلفيات الداكنة والفضائية.",
  },
  {
    id: "icon-logo",
    image: "/brand/icon-logo.png",
    title: "أيقونة الشعار",
    description:
      "الرمز المختصر للشعار وتطبيقاته اللونية المعتمدة لضمان التباين والوضوح عبر مختلف الخلفيات والمنصات الرقمية.",
  },
  {
    id: "colors",
    image: "/brand/colors.png",
    title: "لوحة الألوان",
    description:
      "درجات لونية مستوحاة من عمق الفضاء والتقنية: الأزرق المداري (#2A3EF4)، الكحلي الفضائي (#0E0F28)، الكحلي المتوسط (#26273E)، والرمادي الفاتح (#E4E5F2).",
  },
  {
    id: "fonts",
    image: "/brand/fonts.png",
    title: "الخطوط",
    description:
      "نظام خطوط مزدوج يجمع بين الحداثة والوضوح؛ خط القاهرة (Cairo) للنصوص العربية، وخط MuseoModerno للنصوص الإنجليزية.",
  },
];

export default function BrandPage() {
  return (
    <>
      <Header />
      <main>
        <h1 className="sr-only">الهوية البصرية لمنصة Orbit Hub</h1>
        <SnapScroll selector="section">
          {brandSections.map((section) => (
            <Section
              key={section.id}
              title={section.title}
              desc={section.description}
              imgUrl={section.image}
            />
          ))}
        </SnapScroll>
      </main>
    </>
  );
}
