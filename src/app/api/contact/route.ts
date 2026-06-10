import { NextRequest, NextResponse } from "next/server";

// Google Apps Script web app attached to the intake sheet.
// The /exec URL contains a long random token, so it stays server-side.
const WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  if (!WEBHOOK_URL) {
    console.error("CONTACT_WEBHOOK_URL is not set");
    return NextResponse.json(
      { error: "Form is temporarily unavailable. Please email us directly." },
      { status: 503 }
    );
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot field — real users never fill it, bots do. Pretend success.
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "contact",
        name,
        email,
        phone: body.phone?.trim() || "",
        service: body.service || "",
        message,
      }),
    });

    if (!res.ok) {
      console.error("Sheet webhook failed:", res.status);
      return NextResponse.json(
        { error: "Something went wrong. Please email us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sheet webhook error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please email us directly." },
      { status: 502 }
    );
  }
}
