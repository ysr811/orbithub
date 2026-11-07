import { revalidateTag } from "next/cache";

// POST /api/revalidate
// On-demand cache revalidation endpoint triggered by webhooks or admin actions
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { secret } = body;

    // Validate request authorization secret
    if (
      !process.env.REVALIDATE_SECRET ||
      secret !== process.env.REVALIDATE_SECRET
    ) {
      return Response.json(
        { error: "Invalid or missing secret" },
        { status: 401 }
      );
    }

    // Invalidate and revalidate all cached data tagged with 'summaries'
    revalidateTag("summaries");

    return Response.json({
      revalidated: true,
      tag: "summaries",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to revalidate", details: error.message },
      { status: 500 }
    );
  }
}
