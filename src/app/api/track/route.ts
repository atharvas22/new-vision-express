import { NextRequest, NextResponse } from "next/server";

// Public endpoint — no auth required
const PUBLIC_TRACK = "https://airwaybill-worker.suyesh.workers.dev/api/public/track";

export async function GET(request: NextRequest) {
  const waybill = request.nextUrl.searchParams.get("waybill")?.trim();

  if (!waybill) {
    return NextResponse.json({ error: "Waybill number is required" }, { status: 400 });
  }

  const encoded = encodeURIComponent(waybill.replace(/[^\w\-]/g, ""));

  try {
    const res = await fetch(`${PUBLIC_TRACK}/${encoded}?org=nve`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 30 },
    });

    const data = await res.json() as any;

    if (!res.ok || !data.success) {
      return NextResponse.json(
        { error: data.message || "Shipment not found" },
        { status: res.ok ? 404 : res.status }
      );
    }

    return NextResponse.json({ success: true, shipment: data.data });
  } catch {
    return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 });
  }
}
