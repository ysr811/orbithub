import fs from "fs";
import path from "path";

export const docsList = [
  {
    slug: "about-us",
    title: "من نحن؟ ",
    description:
      "تعرف على منصة OrbitHub، رؤيتها في خدمة طلاب كلية الحاسبات وتقنية المعلومات، وآلية إدارتها وتنظيمها.",
    lastUpdated: "27 نوفمبر 2026",
    fileName: "about.md",
  },
  {
    slug: "how-it-works",
    title: "كيف تعمل منصة Orbit Hub؟",
    description:
      "نظرة سريعة على رؤية المنصة وآلية عملها لتسهيل وصول الطلاب للمقررات الدراسية.",
    lastUpdated: "7 نوفمبر 2026",
    fileName: "how-it-works.md",
  },
  {
    slug: "delegates-guide",
    title: "دليل مندوبي الدفعات",
    description:
      "إرشادات جودة الملفات وقواعد التسمية الموحدة لمندوبي الدفعات ومسؤولي المحتوى.",
    lastUpdated: "7 نوفمبر 2026",
    fileName: "delegates-guide.md",
  },
  {
    slug: "indexing-guide",
    title: "دليل فهرسة وتنظيم Google Drive",
    description:
      "شرح هيكلة مجلدات Google Drive وتحديث البيانات الفوري وحل مشاكل ظهور الملفات.",
    lastUpdated: "7 نوفمبر 2026",
    fileName: "indexing-guide.md",
  },
];

export function getDocBySlug(slug) {
  return docsList.find((item) => item.slug === slug);
}

export function getAdjacentDocs(slug) {
  const index = docsList.findIndex((item) => item.slug === slug);
  if (index === -1) return { prevDoc: null, nextDoc: null };

  return {
    prevDoc: index > 0 ? docsList[index - 1] : null,
    nextDoc: index < docsList.length - 1 ? docsList[index + 1] : null,
  };
}

export function getDocContent(fileName) {
  try {
    const filePath = path.join(process.cwd(), "src/content/docs", fileName);
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}
