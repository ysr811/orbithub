import { Cairo, MuseoModerno } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "@/components/SmoothScroll";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  variable: "--font-museo",
  display: "swap",
});

export const metadata = {
  title: "OrbitHub | البوابة الأكاديمية لكلية الحاسبات وتقنية المعلومات",
  description:
    "البوابة الأكاديمية الموحدة لطلاب كلية الحاسبات وتقنية المعلومات بجامعة حضرموت — المقررات والملازم الدراسية في مكان واحد منظم.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${museoModerno.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-cairo bg-background text-foreground px-4 sm:px-6 lg:px-8">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
