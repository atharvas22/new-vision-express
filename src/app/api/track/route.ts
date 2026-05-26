import { NextRequest, NextResponse } from "next/server";

const WORKER_BASE = "https://airwaybill-worker.suyesh.workers.dev";
const ORG = "nve";
// API key is kept server-side only — never sent to the browser
const API_KEY = process.env.NVE_API_KEY ?? "";

function workerHeaders(): HeadersInit {
  const h: HeadersInit = { Accept: "application/json" };
  if (API_KEY) h["Authorization"] = `Bearer ${API_KEY}`;
  return h;
}

export async function GET(request: NextRequest) {
  const waybill = request.nextUrl.searchParams.get("waybill")?.trim();

  if (!waybill) {
    return NextResponse.json({ error: "Waybill number is required" }, { status: 400 });
  }

  const clean = waybill.replace(/[^\w\-]/g, "");
  const encoded = encodeURIComponent(clean);

  try {
    const [shipmentRes, eventsRes] = await Promise.all([
      fetch(`${WORKER_BASE}/api/shipments/${encoded}?org=${ORG}`, {
        headers: workerHeaders(),
        next: { revalidate: 30 },
      }),
      fetch(
        `${WORKER_BASE}/api/tracking_events?waybill_number=${encoded}&org=${ORG}`,
        {
          headers: workerHeaders(),
          next: { revalidate: 30 },
        }
      ),
    ]);

    if (!shipmentRes.ok) {
      if (shipmentRes.status === 404) {
        return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
      }
      return NextResponse.json(
        { error: "Unable to retrieve shipment" },
        { status: shipmentRes.status }
      );
    }

    const shipmentData = await shipmentRes.json();
    const eventsData = eventsRes.ok ? await eventsRes.json() : { success: false };

    const shipment = shipmentData.data || shipmentData;
    const trackingEvents =
      eventsData.success && eventsData.data?.tracking_events
        ? eventsData.data.tracking_events
        : shipment.trackingEvents || [];

    return NextResponse.json({
      success: true,
      shipment: {
        waybillNumber: shipment.waybillNumber,
        shipmentStatus: shipment.shipmentStatus,
        origin: shipment.origin,
        destination: shipment.destination,
        consigneeCity: shipment.consigneeCity,
        consignorCity: shipment.consignorCity,
        transportMode: shipment.transportMode,
        totalPackages: shipment.totalPackages,
        waybillDate: shipment.waybillDate,
        pickupDate: shipment.pickupDate,
        deliveryDate: shipment.deliveryDate,
        description: shipment.description,
        trackingEvents,
      },
    });
  } catch {
    return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 });
  }
}
