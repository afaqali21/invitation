import { NextRequest, NextResponse } from "next/server";
import { saveRsvp } from "@/lib/rsvp-storage";

export const dynamic = "force-dynamic";

/**
 * POST /api/rsvp
 * Receives guest RSVP submission and persists it in the private data store.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { guestName, attending, guestCount, message } = body;

    const result = await saveRsvp({
      guestName,
      attending,
      guestCount,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: result.isUpdate
          ? "Your RSVP has been gracefully updated!"
          : "Your RSVP has been successfully received!",
        isUpdate: result.isUpdate,
        guestName: result.record.guestName,
        attending: result.record.attending,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    const message = err.message || "An unexpected error occurred while saving your RSVP.";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 400 }
    );
  }
}

/**
 * GET /api/rsvp
 * Guest list privacy protection: Private guest information is NEVER exposed publicly.
 */
export async function GET() {
  return NextResponse.json(
    {
      error: "Access denied. Guest RSVP information is strictly private.",
    },
    { status: 403 }
  );
}
