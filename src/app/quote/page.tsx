import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Quote | New Vision Express",
  description:
    "Request a quote for fine art packing, shipping, storage, installation, and custom crating services.",
};

export default function QuotePage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 bg-brand-dark text-center">
        <p className="text-brand-gold text-xs font-body tracking-[0.4em] uppercase mb-4">
          Start Here
        </p>
        <h1 className="font-heading text-5xl md:text-7xl text-white font-light">
          Get a Quote
        </h1>
        <p className="mt-6 font-body text-white/50 max-w-xl mx-auto leading-relaxed text-base">
          Fill in the details below and we&apos;ll get back to you within one
          business day with a tailored quote.
        </p>
        <div className="mt-8 w-12 h-px bg-brand-gold mx-auto" />
      </section>

      {/* Form Section */}
      <section className="py-24 px-6 bg-brand-bg">
        <div className="max-w-4xl mx-auto">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
