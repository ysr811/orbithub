"use client";

import { FolderSync, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MaterialsError({ reset }) {
  return (
    <div
      role="alert"
      className="flex-1 w-full flex flex-col items-center justify-center text-center py-16 px-4 max-w-md mx-auto font-cairo"
    >
      <div className="size-14 rounded-2xl bg-muted/70 text-muted-foreground flex items-center justify-center mb-4">
        <FolderSync className="size-6" strokeWidth={1.75} />
      </div>

      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 leading-snug">
        تعذر الاتصال بمكتبة الملازم
      </h2>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
        حدث خطأ مؤقت أثناء جلب الملفات من Google Drive. يمكنك المحاولة مرة أخرى الآن.
      </p>

      <Button
        type="button"
        variant="default"
        size="sm"
        onClick={() => reset()}
        className="px-5 gap-2 font-bold"
      >
        <RotateCcw className="size-3.5" />
        إعادة المحاولة
      </Button>
    </div>
  );
}
