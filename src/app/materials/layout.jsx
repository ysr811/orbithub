import { Suspense } from "react";
import Header from "@/components/Header";

export default function MaterialsLayout({ children }) {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-cairo">
      <Suspense fallback={<div className="h-16 sm:h-20" aria-hidden="true" />}>
        <Header />
      </Suspense>

      <main className="flex-1 w-full flex flex-col pb-6 sm:pb-8">
        <h1 className="sr-only">الملازم والملخصات الدراسية</h1>
        {children}
      </main>
    </div>
  );
}
