import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/tracking", label: "Track a Shipment" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Logo + Tagline */}
          <div className="space-y-5">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="New Vision Express"
                width={160}
                height={54}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="font-body text-white/50 text-sm leading-relaxed max-w-xs">
              Trusted art logistics specialists delivering your most valuable
              works with precision and care.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-brand-gold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/60 hover:text-brand-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-brand-gold mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-3 font-body text-sm text-white/60">
              <li>
                <a
                  href="tel:+918108599952"
                  className="hover:text-brand-gold transition-colors"
                >
                  +91 81085 99952
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@newvisionexpress.com"
                  className="hover:text-brand-gold transition-colors"
                >
                  sales@newvisionexpress.com
                </a>
              </li>
              <li className="text-white/40 leading-relaxed">
                11D-2, Devadiga CS, Om Nagar
                <br />
                Andheri East, Mumbai – 400099
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30">
            &copy; {new Date().getFullYear()} New Vision Express. All rights
            reserved.
          </p>
          <p className="font-body text-xs text-white/20 italic font-heading">
            Reliability..to the last mile
          </p>
        </div>
      </div>
    </footer>
  );
}
