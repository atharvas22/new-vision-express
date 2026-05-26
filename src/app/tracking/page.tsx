import type { Metadata } from "next";
import TrackingClient from "@/components/TrackingClient";

export const metadata: Metadata = {
  title: "Track Your Shipment | New Vision Express",
  description:
    "Real-time shipment tracking for New Vision Express — enter your waybill number to get live status updates.",
};

export default function TrackingPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 bg-brand-dark text-center">
        <p className="text-brand-gold text-xs font-body tracking-[0.4em] uppercase mb-4">
          Shipment Status
        </p>
        <h1 className="font-heading text-5xl md:text-7xl text-white font-light">
          Track Your Shipment
        </h1>
        <div className="mt-6 w-12 h-px bg-brand-gold mx-auto" />
        <p className="mt-6 font-body text-sm text-white/50 max-w-md mx-auto leading-relaxed">
          Enter your waybill number below for real-time status and delivery updates.
        </p>
      </section>

      {/* Tracking icon + client form */}
      <div className="bg-brand-bg pt-16 pb-4 px-6 flex justify-center">
        <div className="w-14 h-14 border border-brand-gold/30 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-6 h-6 text-brand-gold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </div>
      </div>

      <TrackingClient />
    </>
  );
}
