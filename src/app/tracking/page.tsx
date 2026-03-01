import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Track a Shipment | New Vision Express",
  description:
    "Real-time shipment tracking for New Vision Express art logistics — coming soon.",
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
          Track Your Art
        </h1>
        <div className="mt-6 w-12 h-px bg-brand-gold mx-auto" />
      </section>

      {/* Tracking UI */}
      <section className="py-28 px-6 bg-brand-bg">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 border border-brand-gold/30 flex items-center justify-center mx-auto mb-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-7 h-7 text-brand-gold"
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

          <h2 className="font-heading text-3xl md:text-4xl text-brand-ink font-light mb-4">
            Live Tracking Coming Soon
          </h2>
          <p className="font-body text-brand-muted leading-relaxed mb-12 text-base">
            We&apos;re building a real-time tracking portal so you can follow
            your shipment from pickup to delivery. In the meantime, our team
            provides direct status updates for every active shipment.
          </p>

          {/* Placeholder Search Bar */}
          <div className="flex gap-0 border border-brand-gold/20 mb-12">
            <input
              type="text"
              disabled
              placeholder="Enter your tracking number"
              className="flex-1 px-5 py-4 font-body text-sm text-brand-muted bg-transparent outline-none placeholder:text-brand-muted/40 cursor-not-allowed"
            />
            <button
              disabled
              className="px-6 py-4 bg-brand-dark/10 text-brand-muted font-body text-xs tracking-widest uppercase cursor-not-allowed"
            >
              Track
            </button>
          </div>

          {/* Status Cards (Placeholder) */}
          <div className="grid grid-cols-3 gap-4 mb-16">
            {["Pickup", "In Transit", "Delivered"].map((step, i) => (
              <div
                key={step}
                className={`p-5 text-center border ${
                  i === 0
                    ? "border-brand-gold/30 bg-brand-card"
                    : "border-brand-card"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mx-auto mb-3 ${
                    i === 0 ? "bg-brand-gold" : "bg-brand-muted/20"
                  }`}
                />
                <p
                  className={`font-body text-xs tracking-widest uppercase ${
                    i === 0 ? "text-brand-ink" : "text-brand-muted/40"
                  }`}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="w-12 h-px bg-brand-gold mx-auto mb-10" />

          <p className="font-body text-sm text-brand-muted mb-6">
            Need an update on an active shipment?
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-brand-dark text-white font-body text-xs tracking-widest uppercase hover:bg-brand-ink transition-colors duration-200"
          >
            Contact Our Team
          </Link>
        </div>
      </section>
    </>
  );
}
