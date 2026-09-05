"use client";

import { useState } from "react";
import { projects } from "@/lib/data";

const kinds = ["Retail / shop", "Office", "Leasing", "Other"] as const;

export function CommercialEnquiryForm({ layout = "default" }: { layout?: "default" | "card" }) {
  const [sent, setSent] = useState(false);
  const isCard = layout === "card";

  if (sent) {
    return (
      <div className={isCard ? "rounded-[20px] bg-paper/70 px-6 py-10 md:px-8" : "rounded-lg bg-paper px-8 py-12"}>
        <p className="text-[28px] font-medium leading-[1.18] tracking-[-0.02em] text-ink md:text-[32px]">
          We&apos;ll call you shortly.
        </p>
        <p className="mt-4 max-w-md text-[16px] leading-[26px] text-muted">
          A Jivah advisor will reach out within one working day about commercial space.
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
        label="Enquiry"
        name="kind"
        required
        layout={layout}
        options={[{ value: "", label: "Enquiry type *" }, ...kinds.map((kind) => ({ value: kind, label: kind }))]}
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
      <button type="submit" className="btn-pill btn-forest mt-1 w-fit">
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
  layout = "default",
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  layout?: "default" | "card";
}) {
  if (layout === "card") {
    return (
      <label className="contact-field-label">
        <span className="sr-only">{label}</span>
        <select name={name} required={required} defaultValue="" className="contact-field">
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
        name={name}
        required={required}
        defaultValue=""
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
