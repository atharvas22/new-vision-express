import { NextRequest, NextResponse } from "next/server";

const WORKER_BASE = "https://airwaybill-worker.suyesh.workers.dev";
const ORG = "nve";

// --- Auth ---
// Prefer a static long-lived token (NVE_TOKEN).
// If absent or expired, fall back to email/password login (NVE_EMAIL + NVE_PASSWORD).
let cachedToken: { value: string; expiry: number } | null = null;

function parseJwtExpiry(token: string): number {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp) return payload.exp * 1000;
  } catch { /* ignore */ }
  return Date.now() + 23 * 60 * 60 * 1000; // default 23 h
}

async function getJwt(): Promise<string> {
  const now = Date.now();
  const buffer = 5 * 60 * 1000; // refresh 5 min before expiry

  // 1. Static token from env (e.g. copied from admin localStorage)
  const staticToken = process.env.NVE_TOKEN;
  if (staticToken) {
    const expiry = parseJwtExpiry(staticToken);
    if (expiry > now + buffer) return staticToken;
    // Token exists but expired — fall through to credential login
  }

  // 2. Cached token from a previous credential login
  if (cachedToken && cachedToken.expiry > now + buffer) {
    return cachedToken.value;
  }

  // 3. Login with credentials
  const res = await fetch(`${WORKER_BASE}/api/auth/login?org=${ORG}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.NVE_EMAIL,
      password: process.env.NVE_PASSWORD,
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Worker authentication failed — check NVE_EMAIL / NVE_PASSWORD env vars");

  const data = await res.json() as any;
  const token: string = data.data?.token;
  if (!token) throw new Error("No token returned from auth endpoint");

  cachedToken = { value: token, expiry: parseJwtExpiry(token) };
  return token;
}

// --- Handler ---
export async function GET(request: NextRequest) {
  const waybill = request.nextUrl.searchParams.get("waybill")?.trim();
  if (!waybill) {
    return NextResponse.json({ error: "Waybill number is required" }, { status: 400 });
  }

  const encoded = encodeURIComponent(waybill.replace(/[^\w\-]/g, ""));

  try {
    const token = await getJwt();
    const headers: HeadersInit = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const [shipmentRes, eventsRes] = await Promise.all([
      fetch(`${WORKER_BASE}/api/shipments/${encoded}?org=${ORG}`, { headers, next: { revalidate: 30 } }),
      fetch(`${WORKER_BASE}/api/tracking_events?waybill_number=${encoded}&org=${ORG}`, { headers, next: { revalidate: 30 } }),
    ]);

    if (!shipmentRes.ok) {
      return NextResponse.json(
        { error: shipmentRes.status === 404 ? "Shipment not found" : "Unable to retrieve shipment" },
        { status: shipmentRes.status }
      );
    }

    const sd = await shipmentRes.json() as any;
    const ed = eventsRes.ok ? await eventsRes.json() as any : null;
    const s = sd.data || sd;

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
        trackingEvents: ed?.success && ed.data?.tracking_events ? ed.data.tracking_events : s.trackingEvents || [],
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Service temporarily unavailable" },
      { status: 503 }
    );
  }
}
