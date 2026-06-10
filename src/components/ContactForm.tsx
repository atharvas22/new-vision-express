"use client";

import { useState } from "react";

const serviceOptions = [
  "Fine Art Packing",
  "White Glove Shipping",
  "Climate-Controlled Storage",
  "Installation Services",
  "International Transport",
  "Custom Crating",
  "Multiple Services",
  "Other / Not Sure",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    website: "", // honeypot — hidden from real users
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => null);
        setError(
          data?.error ||
            "Something went wrong. Please email us at sales@newvisionexpress.com."
        );
      }
    } catch {
      setError(
        "Could not send your message. Please email us at sales@newvisionexpress.com."
      );
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-12 h-px bg-brand-gold mx-auto mb-8" />
        <h3 className="font-heading text-3xl text-brand-ink font-light mb-4">
          Thank You
        </h3>
        <p className="font-body text-brand-muted leading-relaxed max-w-md mx-auto">
          We&apos;ve received your message and will be in touch within one
          business day.
        </p>
        <div className="w-12 h-px bg-brand-gold mx-auto mt-8" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
            Full Name <span className="text-brand-gold">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/50 transition-colors"
            placeholder="Jane Smith"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
            Email Address <span className="text-brand-gold">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/50 transition-colors"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone */}
        <div>
          <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/50 transition-colors"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        {/* Service */}
        <div>
          <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
            Service Interest
          </label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full bg-brand-bg border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink transition-colors appearance-none cursor-pointer"
          >
            <option value="">Select a service</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
          Message <span className="text-brand-gold">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/50 transition-colors resize-none"
          placeholder="Tell us about your artwork, destination, timeline, and any special requirements..."
        />
      </div>

      {/* Honeypot — hidden from real users, catches bots */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {error && (
        <p className="font-body text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="px-10 py-4 bg-brand-dark text-white font-body text-xs tracking-widest uppercase hover:bg-brand-ink transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
