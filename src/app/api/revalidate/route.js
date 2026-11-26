import crypto from "node:crypto";
import { revalidateTag } from "next/cache";

function verifySecret(providedSecret, expectedSecret) {
  if (!providedSecret || !expectedSecret) return false;
  const providedDigest = crypto
    .createHash("sha256")
    .update(String(providedSecret))
    .digest();
  const expectedDigest = crypto
    .createHash("sha256")
    .update(String(expectedSecret))
    .digest();
  return crypto.timingSafeEqual(providedDigest, expectedDigest);
}

/**
 * POST /api/revalidate
 * Accepts secret via Authorization: Bearer <secret> header or JSON body { "secret": "..." }.
 */
export async function POST(request) {
  try {
    const expectedSecret = process.env.REVALIDATE_SECRET;
    const authHeader = request.headers.get("authorization");
    let providedSecret = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;

    if (!providedSecret) {
      const body = await request.json().catch(() => null);
      if (body && typeof body === "object" && !Array.isArray(body)) {
        providedSecret =
          typeof body.secret === "string" ? body.secret : null;
      }
    }

    if (!verifySecret(providedSecret, expectedSecret)) {
      return Response.json(
        { error: "Invalid or missing secret" },
        { status: 401 }
      );
    }

    revalidateTag("summaries", { expire: 0 });

    return Response.json({
      revalidated: true,
      tag: "summaries",
      message: "تم تحديث وفهرسة الملازم بنجاح!",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return Response.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
