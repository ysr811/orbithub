"use server";

import { updateTag } from "next/cache";

const REVALIDATE_COOLDOWN_MS = 60_000;
let lastRevalidatedAt = 0;

/**
 * Server Action to purge the 'summaries' cache tag on-demand.
 * Enforces a server-side cooldown to prevent Drive API quota exhaustion.
 */
export async function revalidateMaterialsAction() {
  try {
    const now = Date.now();
    const elapsed = now - lastRevalidatedAt;

    if (lastRevalidatedAt > 0 && elapsed < REVALIDATE_COOLDOWN_MS) {
      const remainingSeconds = Math.ceil(
        (REVALIDATE_COOLDOWN_MS - elapsed) / 1000
      );
      return {
        success: false,
        cooldownSeconds: remainingSeconds,
        error: `تم تحديث الفهرس للتو. يرجى الانتظار ${remainingSeconds} ثانية قبل إعادة المحاولة.`,
      };
    }

    updateTag("summaries");
    lastRevalidatedAt = now;

    return {
      success: true,
      message: "تم تحديث وفهرسة الملازم بنجاح!",
      timestamp: new Date(now).toISOString(),
    };
  } catch {
    return {
      success: false,
      error: "حدث خطأ أثناء تحديث الفهرس.",
    };
  }
}
