import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Coming Soon | New Vision Express",
  description:
    "New Vision Express — Trusted art logistics specialists. Launching soon.",
};

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-center px-6 relative">
      {/* Logo */}
      <div className="mb-12">
        <Image
          src="/logo.png"
          alt="New Vision Express"
          width={200}
          height={68}
          className="h-16 w-auto object-contain mx-auto"
          priority
        />
      </div>

      {/* Content */}
      <p className="text-brand-gold text-xs font-body tracking-[0.4em] uppercase mb-6">
        Art Logistics Specialists
      </p>

      <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white font-light leading-[1.05] mb-8">
        Something{" "}
        <em className="text-brand-gold not-italic">Exceptional</em>
        <br />
        Is on Its Way
      </h1>

      <div className="w-12 h-px bg-brand-gold mb-8" />

      <p className="font-body text-white/50 text-base max-w-xl mx-auto leading-relaxed mb-12">
        New Vision Express is preparing to launch. We deliver your most
        valuable works with white-glove care — ensuring every piece arrives
        safely, on time, and with the precision it deserves.
      </p>

      <a
        href="mailto:info@newvisionexpress.com"
        className="font-body text-xs tracking-widest uppercase text-brand-gold border-b border-brand-gold/30 pb-1 hover:border-brand-gold transition-colors duration-200"
      >
        info@newvisionexpress.com
      </a>

      {/* Footer */}
      <p className="absolute bottom-8 font-body text-xs text-white/20">
        &copy; {new Date().getFullYear()} New Vision Express &nbsp;&middot;&nbsp;
        Reliability..to the last mile
      </p>
    </main>
  );
}
