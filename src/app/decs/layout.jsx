import Header from "@/components/Header";

export default function DecsLayout({ children }) {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-cairo">
      <Header />
      <main className="flex-1 w-full py-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}
