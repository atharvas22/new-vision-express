import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | New Vision Express",
  description:
    "Learn about New Vision Express — our story, mission, and commitment to white-glove art logistics.",
};

const values = [
  {
    title: "Precision",
    description:
      "Every decision — from the materials we use to the routes we choose — is made with exactness and intention.",
  },
  {
    title: "Trust",
    description:
      "We earn the trust of collectors, galleries, and institutions by treating every work as if it were our own.",
  },
  {
    title: "Integrity",
    description:
      "Transparent communication and honest practices at every stage of the logistics process.",
  },
  {
    title: "Expertise",
    description:
      "Deep knowledge of fine art, conservation standards, and international logistics regulation.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 bg-brand-dark text-center">
        <p className="text-brand-gold text-xs font-body tracking-[0.4em] uppercase mb-4">
          Who We Are
        </p>
        <h1 className="font-heading text-5xl md:text-7xl text-white font-light">
          About Us
        </h1>
        <div className="mt-6 w-12 h-px bg-brand-gold mx-auto" />
      </section>

      {/* Mission Section */}
      <section className="py-28 px-6 bg-brand-bg">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-brand-gold text-xs font-body tracking-[0.4em] uppercase mb-4">
              Our Mission
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-brand-ink font-light leading-tight mb-8">
              Art Isn&apos;t Freight.
              <br />
              It&apos;s Legacy.
            </h2>
            <p className="font-body text-brand-muted leading-relaxed mb-5 text-base">
              New Vision Express was founded on the belief that every work of art
              carries meaning beyond its monetary value. Paintings, sculptures,
              and installations hold culture, memory, and identity — and they
              deserve a logistics partner that understands this.
            </p>
            <p className="font-body text-brand-muted leading-relaxed mb-5 text-base">
              We built our company around the needs of artists, collectors,
              galleries, and institutions who refuse to settle for &quot;good
              enough&quot; when it comes to moving their most valued assets. Our
              team brings together experience from fine art handling, museum
              logistics, and international freight to offer a service unlike any
              other.
            </p>
            <p className="font-body text-brand-muted leading-relaxed text-base">
              Reliability to the last mile isn&apos;t just our tagline — it&apos;s
              our standard.
            </p>
          </div>

          {/* Decorative quote */}
          <div className="relative p-12 border border-brand-gold/20">
            <div className="absolute top-6 left-8 font-heading text-6xl text-brand-gold/20 leading-none">
              &ldquo;
            </div>
            <p className="font-heading text-2xl md:text-3xl text-brand-ink font-light leading-snug italic pt-8">
              Every piece of art deserves to travel with the same care it
              receives on the gallery wall.
            </p>
            <div className="mt-8 w-10 h-px bg-brand-gold" />
            <p className="mt-4 font-body text-xs text-brand-muted tracking-widest uppercase">
              New Vision Express
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-brand-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-gold text-xs font-body tracking-[0.4em] uppercase mb-4">
              What We Stand For
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-brand-ink font-light">
              Our Values
            </h2>
            <div className="mt-6 w-12 h-px bg-brand-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-8">
                <div className="w-8 h-px bg-brand-gold mx-auto mb-6" />
                <h3 className="font-heading text-2xl text-brand-ink font-medium mb-4">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (Placeholder) */}
      <section className="py-24 px-6 bg-brand-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-gold text-xs font-body tracking-[0.4em] uppercase mb-4">
              The People Behind the Work
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-brand-ink font-light">
              Our Team
            </h2>
            <div className="mt-6 w-12 h-px bg-brand-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Art Logistics Director", "Operations Manager", "Client Relations Lead"].map(
              (role) => (
                <div key={role} className="text-center p-8 bg-brand-card">
                  <div className="w-24 h-24 rounded-full bg-brand-gold/10 border border-brand-gold/20 mx-auto mb-6 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="w-10 h-10 text-brand-gold/40"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl text-brand-ink font-medium mb-1">
                    Team Member
                  </h3>
                  <p className="font-body text-xs text-brand-gold tracking-widest uppercase">
                    {role}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-brand-dark text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white font-light mb-6">
            Work With Us
          </h2>
          <p className="font-body text-white/50 mb-10 leading-relaxed">
            Whether you&apos;re moving a single piece or an entire collection,
            we&apos;re ready to help.
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
