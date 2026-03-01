import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | New Vision Express",
  description:
    "Fine art packing, white glove shipping, climate-controlled storage, installation, international transport, and custom crating.",
};

const services = [
  {
    title: "Fine Art Packing",
    description:
      "Our packing specialists use museum-grade materials — archival tissue, acid-free barriers, custom foam inserts, and humidity-resistant wraps — to ensure every work is protected from vibration, impact, and environmental change. Whether it's a canvas, sculpture, or mixed-media piece, we engineer protection around the specific fragility of each work.",
    details: ["Archival acid-free materials", "Custom-fit foam and padding", "Environmental protection wrapping", "Documentation at every stage"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    title: "White Glove Shipping",
    description:
      "Every shipment is handled by our trained art handlers — not generic freight workers. We provide door-to-door delivery with real-time coordination, condition reporting, and dedicated single-vehicle transport when required. Your artwork is never treated as ordinary cargo.",
    details: ["Dedicated art-trained handlers", "Door-to-door service", "Condition reports at pickup and delivery", "Single-vehicle transport available"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: "Climate-Controlled Storage",
    description:
      "Our storage facilities maintain strict temperature (65–70°F) and relative humidity (45–55% RH) at all times. With 24/7 monitoring, security systems, and comprehensive insurance coverage, your works are safe whether stored for a day or a decade.",
    details: ["Monitored temperature & humidity 24/7", "High-security access control", "Full insurance coverage", "Short and long-term options"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: "Installation Services",
    description:
      "From gallery openings to corporate art programs, our installation teams handle hanging, mounting, display, and deinstallation with precision. We work closely with curators and designers to execute your vision without compromise.",
    details: ["Gallery and museum installations", "Corporate and private collections", "Deinstallation and repacking", "Lighting consultation support"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "International Transport",
    description:
      "Moving art across borders requires more than logistics — it requires expertise. We manage customs documentation, ATA carnets, CITES permits, and import/export compliance so your works move freely and legally across the globe.",
    details: ["Customs documentation & clearance", "ATA carnet & CITES handling", "International network of partners", "Compliance with global regulations"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "Custom Crating",
    description:
      "No two artworks are the same, so neither are our crates. We engineer bespoke wooden travel frames, fitted to the millimeter, using materials chosen for the specific weight, fragility, and environmental requirements of each piece.",
    details: ["Engineered to artwork dimensions", "Climate-lined interiors", "Shock-absorbing suspension systems", "Reusable & export-grade construction"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 bg-brand-dark text-center">
        <p className="text-brand-gold text-xs font-body tracking-[0.4em] uppercase mb-4">
          What We Offer
        </p>
        <h1 className="font-heading text-5xl md:text-7xl text-white font-light">
          Our Services
        </h1>
        <div className="mt-6 w-12 h-px bg-brand-gold mx-auto" />
      </section>

      {/* Services List */}
      <section className="py-24 px-6 bg-brand-bg">
        <div className="max-w-6xl mx-auto space-y-0">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 py-20 ${
                index < services.length - 1
                  ? "border-b border-brand-card"
                  : ""
              } ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="text-brand-gold mb-6">{service.icon}</div>
                <h2 className="font-heading text-3xl md:text-4xl text-brand-ink font-light mb-5">
                  {service.title}
                </h2>
                <p className="font-body text-brand-muted leading-relaxed text-base">
                  {service.description}
                </p>
              </div>
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""} flex flex-col justify-center`}>
                <ul className="space-y-4">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 font-body text-sm text-brand-ink">
                      <span className="mt-1 w-4 h-px bg-brand-gold flex-shrink-0 inline-block" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-brand-dark text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white font-light mb-6">
            Need a Custom Solution?
          </h2>
          <p className="font-body text-white/50 mb-10 leading-relaxed">
            Every collection is unique. Contact us and we&apos;ll design a
            logistics plan tailored to your specific needs.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-dark font-body text-xs tracking-widest uppercase font-medium hover:bg-brand-gold-light transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
