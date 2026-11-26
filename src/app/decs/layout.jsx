import { Suspense } from "react";
import Header from "@/components/Header";

export default function DecsLayout({ children }) {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-cairo">
      <Suspense fallback={<div className="h-16 sm:h-20" aria-hidden="true" />}>
        <Header />
      </Suspense>
      <main className="flex-1 w-full py-6 sm:py-10">{children}</main>
    </div>
  );
}
