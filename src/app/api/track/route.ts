import { NextRequest, NextResponse } from "next/server";

const WORKER_BASE = "https://airwaybill-worker.suyesh.workers.dev";
const ORG = "nve";

// JWT cached at module level — survives warm Lambda invocations
let cachedToken: { value: string; expiry: number } | null = null;

async function getJwt(): Promise<string> {
  const now = Date.now();

  if (cachedToken && cachedToken.expiry > now + 5 * 60 * 1000) {
    return cachedToken.value;
  }

  const res = await fetch(`${WORKER_BASE}/api/auth/login?org=${ORG}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.NVE_EMAIL,
      password: process.env.NVE_PASSWORD,
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Worker authentication failed");

  const data = await res.json() as any;
  const token: string = data.data?.token;
  if (!token) throw new Error("No token in auth response");

  // Parse JWT expiry; fall back to 23 h
  let expiry = now + 23 * 60 * 60 * 1000;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp) expiry = payload.exp * 1000;
  } catch { /* keep default */ }

  cachedToken = { value: token, expiry };
  return token;
}

export async function GET(request: NextRequest) {
  const waybill = request.nextUrl.searchParams.get("waybill")?.trim();

  if (!waybill) {
    return NextResponse.json({ error: "Waybill number is required" }, { status: 400 });
  }

  const clean = waybill.replace(/[^\w\-]/g, "");
  const encoded = encodeURIComponent(clean);

  try {
    const token = await getJwt();
    const headers: HeadersInit = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const [shipmentRes, eventsRes] = await Promise.all([
      fetch(`${WORKER_BASE}/api/shipments/${encoded}?org=${ORG}`, {
        headers,
        next: { revalidate: 30 },
      }),
      fetch(`${WORKER_BASE}/api/tracking_events?waybill_number=${encoded}&org=${ORG}`, {
        headers,
        next: { revalidate: 30 },
      }),
    ]);

    if (!shipmentRes.ok) {
      return NextResponse.json(
        { error: shipmentRes.status === 404 ? "Shipment not found" : "Unable to retrieve shipment" },
        { status: shipmentRes.status }
      );
    }

    const shipmentData = await shipmentRes.json() as any;
    const eventsData = eventsRes.ok ? await eventsRes.json() as any : null;

    const s = shipmentData.data || shipmentData;
    const trackingEvents =
      eventsData?.success && eventsData.data?.tracking_events
        ? eventsData.data.tracking_events
        : s.trackingEvents || [];

    return NextResponse.json({
      success: true,
      shipment: {
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
        description: s.description,
        trackingEvents,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Service temporarily unavailable";
    return NextResponse.json({ error: msg }, { status: 503 });
  }
}
