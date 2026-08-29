"use client";

import { useState } from "react";
import { projects } from "@/lib/data";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="bg-accent px-8 py-12">
        <p className="font-serif text-4xl text-on-accent">We’ll call you shortly.</p>
        <p className="mt-4 max-w-md text-sm text-on-accent/80">
          A Jivah advisor will reach out within one working day — no urgency scripts, just a time to visit if you’d like one.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Last name" name="lastName" required />
        <Field label="Phone number" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <label className="grid gap-2 text-sm text-muted">
        Interest
        <select
          name="service"
          required
          className="border-b border-ink/25 bg-transparent py-3 text-base text-ink outline-none focus:border-ink"
        >
          <option value="">Select</option>
          <option>Site visit</option>
          <option>Project enquiry</option>
          <option>Partnership</option>
          <option>Other</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm text-muted">
        Project
        <select
          name="project"
          className="border-b border-ink/25 bg-transparent py-3 text-base text-ink outline-none focus:border-ink"
        >
          <option value="">I’m still exploring</option>
          {projects.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name} · {p.city}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm text-muted">
        Message
        <textarea
          name="message"
          required
          rows={4}
          className="border-b border-ink/25 bg-transparent py-3 text-base text-ink outline-none focus:border-ink"
        />
      </label>
      <button
        type="submit"
        className="mt-2 w-fit bg-accent px-8 py-3.5 text-[13px] tracking-wide text-on-accent transition-colors hover:bg-accent-hover"
      >
        Enquire
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm text-muted">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="border-b border-ink/25 bg-transparent py-3 text-base text-ink outline-none focus:border-ink"
      />
    </label>
  );
}
