import { revalidateTag } from "next/cache";

function handleRevalidate(secret) {
  if (
    !process.env.REVALIDATE_SECRET ||
    secret !== process.env.REVALIDATE_SECRET
  ) {
    return Response.json(
      { error: "Invalid or missing secret" },
      { status: 401 }
    );
  }

  // Clear cache for summaries so new files from Drive appear immediately
  revalidateTag("summaries");

  return Response.json({
    revalidated: true,
    tag: "summaries",
    message: "تم تحديث وفهرسة الملازم بنجاح!",
    timestamp: new Date().toISOString(),
  });
}

// GET /api/revalidate?secret=...
// Easily triggered directly from browser address bar or link
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    return handleRevalidate(secret);
  } catch (error) {
    return Response.json(
      { error: "Failed to revalidate", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/revalidate { "secret": "..." }
// Triggered via curl, scripts, or automated webhooks
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const secret = body.secret;
    return handleRevalidate(secret);
  } catch (error) {
    return Response.json(
      { error: "Failed to revalidate", details: error.message },
      { status: 500 }
    );
  }
}
