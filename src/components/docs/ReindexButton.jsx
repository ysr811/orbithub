"use client";

import React, { useState, useTransition } from "react";
import { RefreshCw, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { revalidateMaterialsAction } from "@/app/actions/reindex";

export default function ReindexButton() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(null); // 'idle' | 'success' | 'error'
  const [message, setMessage] = useState("");

  const handleReindex = () => {
    if (isPending) return;

    setStatus("loading");
    setMessage("");

    startTransition(async () => {
      const res = await revalidateMaterialsAction();
      if (res?.success) {
        setStatus("success");
        setMessage("تم تحديث وفهرسة الملازم بنجاح! تم تجديد الكاش الآن.");
        setTimeout(() => {
          setStatus(null);
        }, 5000);
      } else {
        setStatus("error");
        setMessage(res?.error || "حدث خطأ أثناء محاولة التحديث");
        setTimeout(() => {
          setStatus(null);
        }, 5000);
      }
    });
  };

  return (
    <div className="my-6 p-4 sm:p-5 rounded-xl bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-cairo">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-bold text-foreground">
          التحديث السريع للفهرس السحابي
        </h4>
      </div>

      <div className="flex flex-col sm:items-end gap-2 shrink-0">
        <button
          type="button"
          onClick={handleReindex}
          disabled={isPending || status === "success"}
          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer ${
            status === "success"
              ? "bg-emerald-600 text-white"
              : status === "error"
              ? "bg-destructive text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-98 disabled:opacity-60"
          }`}
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>جارٍ الفهرسة...</span>
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle2 className="size-4" />
              <span>تم الفهرسة بنجاح!</span>
            </>
          ) : (
            <>
              <RefreshCw className="size-4" />
              <span>فهرس الملفات الآن</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
