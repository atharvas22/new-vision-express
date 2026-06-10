"use client";

import { useState, useRef } from "react";

type ShipmentStatus =
  | "Waybill Generated"
  | "Picked Up"
  | "In Transit"
  | "Out for Delivery"
  | "Delivered"
  | "Returned"
  | "Exception";

interface TrackingEvent {
  id?: number;
  status: ShipmentStatus | string;
  timestamp: string;
  location?: string | null;
  description?: string | null;
  updatedBy?: string;
}

interface ShipmentResult {
  waybillNumber: string;
  shipmentStatus: ShipmentStatus | string;
  origin: string;
  destination: string;
  consigneeCity?: string;
  consignorCity?: string;
  transportMode?: string;
  totalPackages?: number;
  waybillDate?: string;
  pickupDate?: string;
  deliveryDate?: string;
  trackingEvents: TrackingEvent[];
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; dotColor: string; step: number }
> = {
  "Waybill Generated": {
    label: "Waybill Generated",
    color: "text-brand-muted",
    dotColor: "bg-brand-muted/40",
    step: 0,
  },
  "Picked Up": {
    label: "Picked Up",
    color: "text-blue-600",
    dotColor: "bg-blue-500",
    step: 1,
  },
  "In Transit": {
    label: "In Transit",
    color: "text-brand-gold",
    dotColor: "bg-brand-gold",
    step: 2,
  },
  "Out for Delivery": {
    label: "Out for Delivery",
    color: "text-orange-500",
    dotColor: "bg-orange-400",
    step: 3,
  },
  Delivered: {
    label: "Delivered",
    color: "text-emerald-600",
    dotColor: "bg-emerald-500",
    step: 4,
  },
  Returned: {
    label: "Returned",
    color: "text-purple-600",
    dotColor: "bg-purple-500",
    step: -1,
  },
  Exception: {
    label: "Exception",
    color: "text-red-600",
    dotColor: "bg-red-500",
    step: -1,
  },
};

const PROGRESS_STEPS = [
  "Waybill Generated",
  "Picked Up",
  "In Transit",
  "Out for Delivery",
  "Delivered",
];

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatDateTime(dateStr?: string | null): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? {
    label: status,
    color: "text-brand-ink",
    dotColor: "bg-brand-muted",
    step: 0,
  };
  return (
    <span className={`inline-flex items-center gap-2 font-body text-sm ${cfg.color}`}>
      <span className={`w-2 h-2 rounded-full inline-block ${cfg.dotColor}`} />
      {cfg.label}
    </span>
  );
}

function ProgressBar({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status];
  const currentStep = cfg?.step ?? 0;

  if (currentStep < 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-start justify-between relative">
        {/* connector line */}
        <div className="absolute top-3 left-0 right-0 h-px bg-brand-card" />
        <div
          className="absolute top-3 left-0 h-px bg-brand-gold transition-all duration-500"
          style={{
            width: `${(currentStep / (PROGRESS_STEPS.length - 1)) * 100}%`,
          }}
        />
        {PROGRESS_STEPS.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={step} className="flex flex-col items-center gap-2 relative z-10">
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                  done
                    ? "bg-brand-gold border-brand-gold"
                    : active
                    ? "bg-brand-dark border-brand-gold"
                    : "bg-brand-bg border-brand-card"
                }`}
              >
                {done && (
                  <svg className="w-3 h-3 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {active && <span className="w-2 h-2 rounded-full bg-brand-gold" />}
              </div>
              <span
                className={`font-body text-[10px] tracking-wider uppercase text-center max-w-[70px] leading-tight ${
                  active ? "text-brand-ink font-medium" : done ? "text-brand-gold" : "text-brand-muted/40"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TrackingTimeline({ events }: { events: TrackingEvent[] }) {
  if (!events.length) {
    return (
      <p className="font-body text-sm text-brand-muted text-center py-8">
        No tracking events recorded yet.
      </p>
    );
  }

  const sorted = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-0">
      {sorted.map((event, i) => {
        const cfg = STATUS_CONFIG[event.status] ?? {
          label: event.status,
          dotColor: "bg-brand-muted/40",
        };
        const isLatest = i === 0;
        return (
          <div key={event.id ?? i} className="flex gap-4">
            {/* timeline spine */}
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                  isLatest ? cfg.dotColor : "bg-brand-muted/20"
                }`}
              />
              {i < sorted.length - 1 && (
                <div className="w-px flex-1 bg-brand-card my-1" />
              )}
            </div>
            {/* event content */}
            <div className={`pb-6 ${i === sorted.length - 1 ? "pb-0" : ""}`}>
              <p
                className={`font-body text-sm font-medium mb-0.5 ${
                  isLatest ? "text-brand-ink" : "text-brand-muted"
                }`}
              >
                {event.status}
              </p>
              {event.location && (
                <p className="font-body text-xs text-brand-muted mb-0.5">
                  {event.location}
                </p>
              )}
              {event.description && (
                <p className="font-body text-xs text-brand-muted/70 mb-0.5 italic">
                  {event.description}
                </p>
              )}
              <p className="font-body text-xs text-brand-muted/50">
                {formatDateTime(event.timestamp)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function TrackingClient() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ShipmentResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/track?waybill=${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error ?? "Shipment not found. Please check the tracking number and try again.");
      } else {
        setResult(data.shipment);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } catch {
      setError("Unable to connect. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-28 px-6 bg-brand-bg">
      <div className="max-w-2xl mx-auto">
        {/* Search */}
        <form onSubmit={handleTrack} className="flex gap-0 border border-brand-gold/30 mb-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your waybill / tracking number"
            className="flex-1 px-5 py-4 font-body text-sm text-brand-ink bg-transparent outline-none placeholder:text-brand-muted/40"
            disabled={loading}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-4 bg-brand-dark text-white font-body text-xs tracking-widest uppercase hover:bg-brand-ink transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Tracking…" : "Track"}
          </button>
        </form>
        <p className="font-body text-xs text-brand-muted/50 mb-12 text-center">
          Enter the waybill number from your shipment receipt
        </p>

        {/* Error state */}
        {error && (
          <div className="border border-red-200 bg-red-50 px-5 py-4 mb-8">
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-brand-card rounded w-1/3" />
            <div className="h-8 bg-brand-card rounded w-2/3" />
            <div className="h-px bg-brand-card w-full" />
            <div className="h-4 bg-brand-card rounded w-1/2" />
            <div className="h-4 bg-brand-card rounded w-1/4" />
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div ref={resultsRef} className="space-y-8">
            {/* Status header */}
            <div className="border border-brand-gold/20 p-6 bg-brand-card">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-body text-xs text-brand-muted tracking-[0.3em] uppercase mb-1">
                    Waybill Number
                  </p>
                  <p className="font-heading text-2xl text-brand-ink font-light">
                    {result.waybillNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-body text-xs text-brand-muted tracking-[0.3em] uppercase mb-1">
                    Status
                  </p>
                  <StatusBadge status={result.shipmentStatus} />
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center gap-3 pt-4 border-t border-brand-gold/10">
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs text-brand-muted/60 uppercase tracking-widest mb-0.5">
                    From
                  </p>
                  <p className="font-body text-sm text-brand-ink truncate">
                    {result.origin || result.consignorCity || "—"}
                  </p>
                </div>
                <div className="flex-shrink-0 text-brand-gold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <p className="font-body text-xs text-brand-muted/60 uppercase tracking-widest mb-0.5">
                    To
                  </p>
                  <p className="font-body text-sm text-brand-ink truncate">
                    {result.destination || result.consigneeCity || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <ProgressBar status={result.shipmentStatus} />

            {/* Meta details */}
            <div className="grid grid-cols-2 gap-px bg-brand-card/50 border border-brand-card">
              {[
                { label: "Waybill Date", value: formatDate(result.waybillDate) },
                {
                  label: "Transport Mode",
                  value: result.transportMode || "—",
                },
                { label: "Pickup Date", value: formatDate(result.pickupDate) },
                {
                  label: "Packages",
                  value: result.totalPackages ? `${result.totalPackages} pkg` : "—",
                },
              ].map(({ label, value }) => (
                <div key={label} className="bg-brand-bg px-5 py-4">
                  <p className="font-body text-xs text-brand-muted/60 uppercase tracking-widest mb-1">
                    {label}
                  </p>
                  <p className="font-body text-sm text-brand-ink">{value}</p>
                </div>
              ))}
            </div>

            {/* Tracking timeline */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <p className="font-body text-xs tracking-[0.35em] uppercase text-brand-muted">
                  Tracking History
                </p>
                <div className="flex-1 h-px bg-brand-card" />
              </div>
              <TrackingTimeline events={result.trackingEvents} />
            </div>

            {/* Track another */}
            <div className="pt-4 border-t border-brand-card text-center">
              <button
                onClick={() => {
                  setResult(null);
                  setQuery("");
                  setError(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="font-body text-xs tracking-widest uppercase text-brand-gold hover:text-brand-ink transition-colors duration-200"
              >
                Track Another Shipment
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
