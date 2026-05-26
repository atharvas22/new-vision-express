import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import TrackingClient from "@/components/TrackingClient";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />

      <ServicesSection />

      {/* About Teaser */}
      <section className="py-28 px-6 bg-brand-card">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-brand-gold text-xs font-body tracking-[0.4em] uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-brand-ink font-light leading-tight mb-8">
              A Legacy of Trust
              <br />
              in Art Logistics
            </h2>
            <p className="font-body text-brand-muted leading-relaxed mb-5">
              New Vision Express was built on one simple belief: every piece of
              art deserves to travel with the same care it receives on the
              gallery wall. From a single painting to an entire museum
              collection, we treat every shipment as irreplaceable.
            </p>
            <p className="font-body text-brand-muted leading-relaxed mb-10">
              With years of combined experience and a network spanning the
              globe, our specialists understand the unique demands of fine art
              logistics — because art isn&apos;t freight, it&apos;s legacy.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 font-body text-xs tracking-widest uppercase text-brand-ink border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors"
            >
              Learn About Us
              <span className="text-brand-gold">→</span>
            </Link>
          </div>

          {/* Decorative element */}
          <div className="hidden lg:block relative h-96">
            <div className="absolute inset-0 border border-brand-gold/15" />
            <div className="absolute inset-6 border border-brand-gold/8" />
            <div className="absolute inset-12 flex items-center justify-center">
              <p className="font-heading text-9xl text-brand-gold/10 font-light select-none">
                NVE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shipment Tracking */}
      <section className="py-24 px-6 bg-brand-bg border-t border-brand-card">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-brand-gold text-xs font-body tracking-[0.4em] uppercase mb-4">
            Shipment Status
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-brand-ink font-light leading-tight">
            Track Your Shipment
          </h2>
          <div className="mt-5 w-10 h-px bg-brand-gold mx-auto" />
        </div>
        <TrackingClient />
      </section>

      {/* Contact CTA Band */}
      <section className="py-24 px-6 bg-brand-dark text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-gold text-xs font-body tracking-[0.4em] uppercase mb-6">
            Let&apos;s Work Together
          </p>
          <h2 className="font-heading text-4xl md:text-6xl text-white font-light mb-6">
            Ready to Ship Your
            <br />
            Collection?
          </h2>
          <p className="font-body text-white/50 mb-12 text-base max-w-xl mx-auto leading-relaxed">
            Let&apos;s discuss how New Vision Express can protect and deliver
            your most valued works — anywhere in the world.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-dark font-body text-xs tracking-widest uppercase font-medium hover:bg-brand-gold-light transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
