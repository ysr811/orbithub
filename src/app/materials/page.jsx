import { Suspense } from "react";
import { getSummaries } from "@/lib/drive";
import MaterialsClient from "@/components/materials/MaterialsClient";
import MaterialSkeleton from "@/components/materials/MaterialSkeleton";
import MaterialEmptyState from "@/components/materials/MaterialEmptyState";

export const metadata = {
  title: "الملازم والملخصات | OrbitHub",
  description:
    "جميع الملازم والملخصات الدراسية الأكاديمية لطلاب كلية الحاسبات وتقنية المعلومات في مكان واحد",
};

async function MaterialsContent() {
  const summaries = await getSummaries();

  if (!summaries || summaries.length === 0) {
    return <MaterialEmptyState type="empty" />;
  }

  return <MaterialsClient summaries={summaries} />;
}

export default function MaterialsPage() {
  return (
    // <Suspense fallback={<MaterialSkeleton count={8} showHeaderSkeleton />}>
    //   <MaterialsContent />
    // </Suspense>
    <MaterialSkeleton count={10} showHeaderSkeleton />
  );
}
