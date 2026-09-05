"use client";

import { useState } from "react";
import { projects } from "@/lib/data";

const INTEREST = [
  "Buying a home",
  "Buying for investment",
  "Site visit",
  "Project enquiry",
  "Other",
] as const;

const INTENT_TO_INTEREST = {
  home: "Buying a home",
  investment: "Buying for investment",
} as const;

export function ContactForm({
  intent = "",
  layout = "default",
}: {
  intent?: string;
  layout?: "default" | "card";
}) {
  const [sent, setSent] = useState(false);
  const isCard = layout === "card";
  const interestDefault =
    intent === "home" || intent === "investment" ? INTENT_TO_INTEREST[intent] : "";

  if (sent) {
    return (
      <div className={isCard ? "rounded-[20px] bg-paper/70 px-6 py-10 md:px-8" : "rounded-lg bg-paper px-8 py-12"}>
        <p className="text-[28px] font-medium leading-[1.18] tracking-[-0.02em] text-ink md:text-[32px]">
          We&apos;ll call you shortly.
        </p>
        <p className="mt-4 max-w-md text-[16px] leading-[26px] text-muted">
          A Jivah advisor will reach out within one working day — no urgency scripts, just a time to
          visit if you&apos;d like one.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4 md:gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
        <Field label="Name" name="name" placeholder="Your name *" required layout={layout} />
        <Field label="Phone" name="phone" type="tel" placeholder="Phone number *" required layout={layout} />
      </div>

      <Field label="Email" name="email" type="email" placeholder="Email address *" required layout={layout} />

      <SelectField
        label="Interest"
        name="service"
        required
        defaultValue={interestDefault}
        layout={layout}
        options={[
          { value: "", label: "What can we help with? *" },
          ...INTEREST.map((item) => ({ value: item, label: item })),
        ]}
      />

      <SelectField
        label="Project"
        name="project"
        layout={layout}
        options={[
          { value: "", label: "Project (optional)" },
          ...projects.map((p) => ({ value: p.slug, label: `${p.name} · ${p.city}` })),
        ]}
      />

      <TextAreaField
        label="Message"
        name="message"
        placeholder="Write here your message"
        required
        layout={layout}
      />

      <button type="submit" className="btn-pill btn-forest mt-1 w-fit px-7 py-3 text-[17px]">
        Send message
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  layout = "default",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  layout?: "default" | "card";
}) {
  if (layout === "card") {
    return (
      <label className="contact-field-label">
        <span className="sr-only">{label}</span>
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder ?? label}
          className="contact-field"
        />
      </label>
    );
  }

  return (
    <label className="grid gap-1.5 text-sm text-muted md:gap-2">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="border-b border-ink/25 bg-transparent py-2 text-base text-ink outline-none focus:border-ink md:py-3"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
  defaultValue,
  layout = "default",
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  defaultValue?: string;
  layout?: "default" | "card";
}) {
  if (layout === "card") {
    return (
      <label className="contact-field-label">
        <span className="sr-only">{label}</span>
        <select
          key={defaultValue || "empty"}
          name={name}
          required={required}
          defaultValue={defaultValue}
          className="contact-field"
        >
          {options.map((option) => (
            <option key={option.value || "empty"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="grid gap-1.5 text-sm text-muted md:gap-2">
      {label}
      <select
        key={defaultValue || "empty"}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="border-b border-ink/25 bg-transparent py-2 text-base text-ink outline-none focus:border-ink md:py-3"
      >
        {options.map((option) => (
          <option key={option.value || "empty"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
  required,
  layout = "default",
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  layout?: "default" | "card";
}) {
  if (layout === "card") {
    return (
      <label className="contact-field-label">
        <span className="sr-only">{label}</span>
        <textarea
          name={name}
          required={required}
          rows={5}
          placeholder={placeholder ?? label}
          className="contact-field min-h-[140px] resize-y"
        />
      </label>
    );
  }

  return (
    <label className="grid gap-1.5 text-sm text-muted md:gap-2">
      {label}
      <textarea
        name={name}
        required={required}
        rows={2}
        className="border-b border-ink/25 bg-transparent py-2 text-base text-ink outline-none focus:border-ink md:py-3"
      />
    </label>
  );
}
