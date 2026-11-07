import { HelpCircle, Users, FolderTree } from "lucide-react";

export const docsList = [
  {
    slug: "how-it-works",
    title: "كيف تعمل منصة Orbit Hub؟",
    description: "نظرة عامة على الرؤية والأهداف الأكاديمية والتقنية لتسهيل دراسة علوم الحاسوب في جامعة حضرموت.",
    tag: "تعريف بالمنصة",
    readTime: "3 دقائق",
    icon: HelpCircle,
    fileName: "how-it-works.md",
  },
  {
    slug: "delegates-guide",
    title: "دليل مندوبي الدفعات الأكاديمية",
    description: "إرشادات وشروط جودة الملفات والتسمية الصحيحة لمندوبي الدفعات ومسؤولي المحتوى الدراسي.",
    tag: "تنظيم وإدارة",
    readTime: "4 دقائق",
    icon: Users,
    fileName: "delegates-guide.md",
  },
  {
    slug: "indexing-guide",
    title: "دليل فهرسة وتنظيم Google Drive",
    description: "شرح الهيكل الهرمي المطلوب للمجلدات وأوامر التحديث الفوري للكاش وحل مشكلات عدم ظهور الملازم.",
    tag: "دليل الفهرسة",
    readTime: "4 دقائق",
    icon: FolderTree,
    fileName: "indexing-guide.md",
  },
];

export function getDocBySlug(slug) {
  return docsList.find((item) => item.slug === slug);
}
