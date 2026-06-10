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

    // Whitelist the fields exposed publicly — the upstream record contains
    // sensitive data (shipment contents, consignee details) that must not
    // reach the browser.
    const s = data.data;
    const shipment = {
      waybillNumber: s.waybillNumber,
      shipmentStatus: s.shipmentStatus,
      origin: s.origin,
      destination: s.destination,
      consigneeCity: s.consigneeCity,
      consignorCity: s.consignorCity,
      transportMode: s.transportMode,
      totalPackages: s.totalPackages,
      waybillDate: s.waybillDate,
      pickupDate: s.pickupDate,
      deliveryDate: s.deliveryDate,
      trackingEvents: (s.trackingEvents ?? []).map((e: any) => ({
        id: e.id,
        status: e.status,
        timestamp: e.timestamp,
        location: e.location,
        description: e.description,
      })),
    };

    return NextResponse.json({ success: true, shipment });
  } catch {
    return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 });
  }
}
