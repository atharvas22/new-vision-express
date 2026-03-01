import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-center px-6 relative overflow-hidden pt-20">
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-brand-gold text-xs font-body tracking-[0.4em] uppercase mb-8">
          Art Logistics Specialists
        </p>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white font-light leading-[1.05] mb-8">
          Where Art Meets
          <br />
          <em className="text-brand-gold not-italic">Precision</em>
        </h1>

        <p className="text-white/55 text-base md:text-lg font-body max-w-2xl mx-auto leading-relaxed mb-12">
          New Vision Express delivers your most valuable works with white-glove
          care — ensuring every piece arrives safely, on time, and handled with
          the respect it deserves.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services"
            className="px-8 py-4 bg-brand-gold text-brand-dark font-body text-xs tracking-widest uppercase font-medium hover:bg-brand-gold-light transition-colors duration-200"
          >
            Our Services
          </Link>
          <Link
            href="/quote"
            className="px-8 py-4 border border-white/25 text-white font-body text-xs tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-colors duration-200"
          >
            Get a Quote
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-white/25 text-xs font-body tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-brand-gold/40 to-transparent" />
      </div>
    </section>
  );
}
