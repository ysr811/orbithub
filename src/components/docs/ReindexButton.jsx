"use client";

import { useState, useTransition, useRef, useLayoutEffect } from "react";
import { RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { revalidateMaterialsAction } from "@/app/actions/reindex";

export default function ReindexButton() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [message, setMessage] = useState("");
  const resetTimerRef = useRef(null);
  const isActiveRef = useRef(true);

  // Reset transient feedback state when <Activity> hides the route on navigation
  useLayoutEffect(() => {
    isActiveRef.current = true;
    return () => {
      isActiveRef.current = false;
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
      setStatus(null);
      setMessage("");
    };
  }, []);

  const scheduleReset = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = setTimeout(() => {
      setStatus(null);
      setMessage("");
    }, 5000);
  };

  const handleReindex = () => {
    if (isPending || status === "success") return;

    setStatus(null);
    setMessage("");

    startTransition(async () => {
      try {
        const res = await revalidateMaterialsAction();
        if (!isActiveRef.current) return;
        if (res?.success) {
          setStatus("success");
          setMessage(
            res.message || "تم تحديث وفهرسة الملازم بنجاح! تم تجديد الكاش الآن."
          );
        } else {
          setStatus("error");
          setMessage(res?.error || "حدث خطأ أثناء محاولة التحديث");
        }
        scheduleReset();
      } catch {
        if (!isActiveRef.current) return;
        setStatus("error");
        setMessage("تعذر الاتصال بالخادم أثناء تحديث الفهرس");
        scheduleReset();
      }
    });
  };

  return (
    <div className="my-6 p-4 sm:p-5 rounded-xl bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-cairo">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-bold text-foreground">
          التحديث السريع للفهرس السحابي
        </h4>
        {message && (
          <p
            role="status"
            aria-live="polite"
            className={`text-xs font-medium ${
              status === "error" ? "text-destructive" : "text-emerald-700"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:items-end gap-2 shrink-0">
        <Button
          type="button"
          onClick={handleReindex}
          loading={isPending}
          disabled={status === "success"}
          icon={
            isPending
              ? undefined
              : status === "success"
              ? CheckCircle2
              : RefreshCw
          }
          className={`h-auto md:h-auto px-5 py-2.5 font-bold text-xs sm:text-sm ${
            status === "success"
              ? "bg-emerald-600 text-white hover:bg-emerald-600 disabled:opacity-100"
              : status === "error"
              ? "bg-destructive text-white hover:bg-destructive/90"
              : ""
          }`}
        >
          {isPending
            ? "جارٍ الفهرسة..."
            : status === "success"
            ? "تم الفهرسة بنجاح!"
            : "فهرس الملفات الآن"}
        </Button>
      </div>
    </div>
  );
}
