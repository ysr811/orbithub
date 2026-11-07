import Header from "@/components/Header";
import { getSummaries } from "@/lib/drive";
import MaterialsClient from "@/components/materials/MaterialsClient";
import MaterialSkeleton from "@/components/materials/MaterialSkeleton";
import MaterialEmptyState from "@/components/materials/MaterialEmptyState";
import { Suspense } from "react";

export const metadata = {
  title: "الملازم والملخصات | OrbitHub",
  description: "جميع الملازم والملخصات الدراسية الأكاديمية لطلاب الحاسبات والمعلومات في مكان واحد",
};

async function MaterialsContent() {
  const summaries = await getSummaries();

  if (!summaries || summaries.length === 0) {
    return <MaterialEmptyState type="server" />;
  }

  return <MaterialsClient summaries={summaries} />;
}

export default function MaterialsPage() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-cairo">
      <Header />

      <main className="flex-1 w-full">
        <Suspense fallback={<MaterialSkeleton count={8} showHeaderSkeleton={true} />}>
          <MaterialsContent />
        </Suspense>
      </main>
    </div>
  );
}
