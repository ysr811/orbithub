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

const siteTitle = "OrbitHub | كلية الحاسبات وتقنية المعلومات";
const siteDescription =
  "بوابة طلاب كلية الحاسبات وتقنية المعلومات - المقررات والملازم الدراسية في مكان واحد.";

export const metadata = {
  metadataBase: new URL("https://orbithub11.vercel.app"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://orbithub11.vercel.app",
    siteName: "OrbitHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OrbitHub Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
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
