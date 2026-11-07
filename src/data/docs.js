import fs from "fs";
import path from "path";

export const docsList = [
  {
    slug: "how-it-works",
    description: "نظرة عامة على الرؤية والأهداف الأكاديمية والتقنية لتسهيل دراسة علوم الحاسوب في جامعة حضرموت.",
    lastUpdated: "7 نوفمبر 2026",
    fileName: "how-it-works.md",
  },
  {
    slug: "delegates-guide",
    description: "إرشادات وشروط جودة الملفات والتسمية الصحيحة لمندوبي الدفعات ومسؤولي المحتوى الدراسي.",
    lastUpdated: "7 نوفمبر 2026",
    fileName: "delegates-guide.md",
  },
  {
    slug: "indexing-guide",
    description: "شرح الهيكل الهرمي المطلوب للمجلدات وأوامر التحديث الفوري للكاش وحل مشكلات عدم ظهور الملازم.",
    lastUpdated: "7 نوفمبر 2026",
    fileName: "indexing-guide.md",
  },
];

export function getDocBySlug(slug) {
  return docsList.find((item) => item.slug === slug);
}

export function getDocContent(fileName) {
  const filePath = path.join(process.cwd(), "src/content/docs", fileName);
  return fs.readFileSync(filePath, "utf-8");
}
