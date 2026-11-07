"use server";

import { revalidateTag } from "next/cache";

/**
 * Server Action to trigger cache revalidation for indexed Drive materials.
 * Clears the 'summaries' cache tag on-demand so new uploads appear immediately.
 */
export async function revalidateMaterialsAction() {
  try {
    revalidateTag("summaries");
    return {
      success: true,
      message: "تم تحديث وفهرسة الملازم بنجاح!",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || "حدث خطأ أثناء تحديث الفهرس",
    };
  }
}
