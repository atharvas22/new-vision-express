"use client";

import { useState } from "react";

const services = [
  "Fine Art Packing",
  "White Glove Shipping",
  "Climate-Controlled Storage",
  "Installation Services",
  "International Transport",
  "Custom Crating",
];

const artworkTypes = [
  "Painting",
  "Sculpture",
  "Photography",
  "Mixed Media",
  "Installation",
  "Antique / Heritage",
  "Other",
];

const timelines = [
  "ASAP",
  "Within 2 weeks",
  "Within a month",
  "Flexible",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  artworkType: string;
  dimensions: string;
  weight: string;
  origin: string;
  destination: string;
  timeline: string;
  insuranceValue: string;
  requirements: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  services: [],
  artworkType: "",
  dimensions: "",
  weight: "",
  origin: "",
  destination: "",
  timeline: "",
  insuranceValue: "",
  requirements: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleServiceToggle(service: string) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.services.length === 0) {
      setError("Please select at least one service.");
      return;
    }

    // TODO: Replace with Zoho CRM web form URL when ready
    console.log("Quote request submitted:", form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-12 h-px bg-brand-gold mx-auto mb-8" />
        <h3 className="font-heading text-3xl text-brand-ink font-light mb-4">
          Quote Request Received
        </h3>
        <p className="font-body text-brand-muted leading-relaxed max-w-md mx-auto">
          Thank you for reaching out. Our team will review your requirements and
          get back to you within one business day.
        </p>
        <div className="w-12 h-px bg-brand-gold mx-auto mt-8" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Details */}
      <div>
        <h3 className="font-heading text-xl text-brand-ink font-light mb-5 pb-3 border-b border-brand-card">
          Contact Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/40 transition-colors"
              placeholder="Jane Smith"
            />
          </div>
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
              className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/40 transition-colors"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
              Phone <span className="text-brand-gold">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/40 transition-colors"
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
              Company / Organization
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/40 transition-colors"
              placeholder="Gallery or Collection Name"
            />
          </div>
        </div>
      </div>

      {/* Services Required */}
      <div>
        <h3 className="font-heading text-xl text-brand-ink font-light mb-5 pb-3 border-b border-brand-card">
          Services Required <span className="text-brand-gold text-base">*</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((service) => {
            const checked = form.services.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => handleServiceToggle(service)}
                className={`px-4 py-3 text-left border font-body text-sm transition-all duration-200 ${
                  checked
                    ? "border-brand-gold bg-brand-gold/5 text-brand-ink"
                    : "border-brand-card text-brand-muted hover:border-brand-gold/40"
                }`}
              >
                <span
                  className={`inline-block w-3 h-3 border mr-2 align-middle transition-colors ${
                    checked ? "bg-brand-gold border-brand-gold" : "border-brand-muted/40"
                  }`}
                />
                {service}
              </button>
            );
          })}
        </div>
        {error && (
          <p className="mt-3 font-body text-xs text-red-500">{error}</p>
        )}
      </div>

      {/* Artwork Details */}
      <div>
        <h3 className="font-heading text-xl text-brand-ink font-light mb-5 pb-3 border-b border-brand-card">
          Artwork Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
              Artwork Type <span className="text-brand-gold">*</span>
            </label>
            <select
              name="artworkType"
              required
              value={form.artworkType}
              onChange={handleChange}
              className="w-full bg-brand-bg border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink transition-colors appearance-none cursor-pointer"
            >
              <option value="">Select type</option>
              {artworkTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
              Dimensions (L × W × H cm)
            </label>
            <input
              type="text"
              name="dimensions"
              value={form.dimensions}
              onChange={handleChange}
              className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/40 transition-colors"
              placeholder="e.g. 120 × 90 × 5"
            />
          </div>
          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
              Approximate Weight (kg)
            </label>
            <input
              type="text"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/40 transition-colors"
              placeholder="e.g. 12 kg"
            />
          </div>
          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
              Declared / Insurance Value (₹ or USD)
            </label>
            <input
              type="text"
              name="insuranceValue"
              value={form.insuranceValue}
              onChange={handleChange}
              className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/40 transition-colors"
              placeholder="e.g. ₹5,00,000"
            />
          </div>
        </div>
      </div>

      {/* Logistics Details */}
      <div>
        <h3 className="font-heading text-xl text-brand-ink font-light mb-5 pb-3 border-b border-brand-card">
          Logistics Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
              Origin City / Country <span className="text-brand-gold">*</span>
            </label>
            <input
              type="text"
              name="origin"
              required
              value={form.origin}
              onChange={handleChange}
              className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/40 transition-colors"
              placeholder="e.g. Mumbai, India"
            />
          </div>
          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
              Destination City / Country <span className="text-brand-gold">*</span>
            </label>
            <input
              type="text"
              name="destination"
              required
              value={form.destination}
              onChange={handleChange}
              className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/40 transition-colors"
              placeholder="e.g. London, UK"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
              Preferred Timeline <span className="text-brand-gold">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {timelines.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, timeline: t })}
                  className={`px-5 py-2.5 border font-body text-sm transition-all duration-200 ${
                    form.timeline === t
                      ? "border-brand-gold bg-brand-gold/5 text-brand-ink"
                      : "border-brand-card text-brand-muted hover:border-brand-gold/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Requirements */}
      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-brand-muted mb-2">
          Additional Requirements
        </label>
        <textarea
          name="requirements"
          rows={5}
          value={form.requirements}
          onChange={handleChange}
          className="w-full bg-transparent border border-brand-card focus:border-brand-gold outline-none px-4 py-3 font-body text-sm text-brand-ink placeholder:text-brand-muted/40 transition-colors resize-none"
          placeholder="Special handling instructions, fragility notes, customs requirements, or anything else we should know..."
        />
      </div>

      <button
        type="submit"
        className="px-10 py-4 bg-brand-dark text-white font-body text-xs tracking-widest uppercase hover:bg-brand-ink transition-colors duration-200"
      >
        Submit Quote Request
      </button>
    </form>
  );
}
