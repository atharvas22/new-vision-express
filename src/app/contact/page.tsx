import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | New Vision Express",
  description:
    "Get in touch with New Vision Express for art logistics inquiries, quotes, and consultations.",
};

const contactInfo = [
  {
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    label: "Email",
    value: "info@newvisionexpress.com",
    href: "mailto:info@newvisionexpress.com",
  },
  {
    label: "Address",
    value: "123 Art District, Bandra West\nMumbai, Maharashtra 400050",
    href: null,
  },
  {
    label: "Hours",
    value: "Mon – Fri: 9:00 AM – 6:00 PM\nSat: By Appointment",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 bg-brand-dark text-center">
        <p className="text-brand-gold text-xs font-body tracking-[0.4em] uppercase mb-4">
          Reach Out
        </p>
        <h1 className="font-heading text-5xl md:text-7xl text-white font-light">
          Contact Us
        </h1>
        <div className="mt-6 w-12 h-px bg-brand-gold mx-auto" />
      </section>

      {/* Contact Content */}
      <section className="py-24 px-6 bg-brand-bg">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-heading text-2xl text-brand-ink font-light mb-8">
              Get in Touch
            </h2>
            <div className="space-y-8">
              {contactInfo.map((item) => (
                <div key={item.label}>
                  <p className="font-body text-xs tracking-widest uppercase text-brand-gold mb-2">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-body text-sm text-brand-muted hover:text-brand-ink transition-colors leading-relaxed whitespace-pre-line"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-body text-sm text-brand-muted leading-relaxed whitespace-pre-line">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-brand-card">
              <p className="font-body text-xs text-brand-muted leading-relaxed">
                For urgent or time-sensitive shipments, please call us directly
                — we&apos;re available for consultation outside of standard hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl text-brand-ink font-light mb-8">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
