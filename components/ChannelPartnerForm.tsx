"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";

const experience = [
  "Under 5 years",
  "5–10 years",
  "10–15 years",
  "15–20 years",
  "20–25 years",
  "25 years or more",
] as const;

const expertise = [
  "Residential",
  "Commercial",
  "Both residential and commercial",
  "Leasing",
] as const;

const fileAccept = ".pdf,.jpg,.jpeg,.png,.webp";

export function ChannelPartnerForm({ layout = "default" }: { layout?: "default" | "card" }) {
  const [sent, setSent] = useState(false);
  const isCard = layout === "card";

  if (sent) {
    return (
      <div className={isCard ? "rounded-[20px] bg-paper/70 px-6 py-10 md:px-8" : "rounded-lg bg-paper px-8 py-12"}>
        <p className="text-[36px] font-medium leading-[1.18] tracking-[-0.02em] text-ink">Application received.</p>
        <p className="mt-4 max-w-md text-[18px] leading-[26px] text-muted">
          We’ll review your details and documents, then write back within a few working days.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5 md:gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
        <Field label="Full name" name="fullName" placeholder="Full name *" required layout={layout} />
        <Field label="Email address" name="email" type="email" placeholder="Email address *" required layout={layout} />
        <Field label="Phone number" name="phone" type="tel" placeholder="Phone number *" required layout={layout} />
        <Field label="Your firm name" name="firm" placeholder="Firm name *" required layout={layout} />
        <Field label="RERA number" name="rera" placeholder="RERA number *" required layout={layout} />
        <Field label="Pincode" name="pincode" inputMode="numeric" maxLength={6} placeholder="Pincode *" required layout={layout} />
      </div>

      <Select label="Years of experience" name="experience" placeholder="Select experience" required layout={layout}>
        {experience.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </Select>

      <Select
        label="Expertise in residential / commercial / leasing"
        name="expertise"
        placeholder="Select expertise"
        required
        layout={layout}
      >
        {expertise.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </Select>

      <label className={layout === "card" ? "contact-field-label" : "grid gap-1.5 text-sm text-muted md:gap-2"}>
        {layout === "card" ? <span className="sr-only">Address</span> : "Address"}
        <textarea
          name="address"
          required
          rows={layout === "card" ? 4 : 3}
          placeholder={layout === "card" ? "Office address *" : undefined}
          className={
            layout === "card"
              ? "contact-field min-h-[120px] resize-y"
              : "border-b border-ink/25 bg-transparent py-2 text-base text-ink outline-none focus:border-ink md:py-3"
          }
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-3 md:gap-6">
        <FileField label="PAN card" name="pan" required layout={layout} />
        <FileField label="RERA certificate" name="reraCertificate" required layout={layout} />
        <FileField label="GST certificate" name="gst" required layout={layout} />
      </div>

      <button
        type="submit"
        className={`btn-pill mt-2 w-fit px-7 py-3 text-[17px] ${layout === "card" ? "btn-forest" : ""}`}
      >
        Submit
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
  inputMode,
  maxLength,
  layout = "default",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
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
          inputMode={inputMode}
          maxLength={maxLength}
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
        inputMode={inputMode}
        maxLength={maxLength}
        className="border-b border-ink/25 bg-transparent py-2 text-base text-ink outline-none focus:border-ink md:py-3"
      />
    </label>
  );
}

function Select({
  label,
  name,
  placeholder,
  required,
  layout = "default",
  children,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  layout?: "default" | "card";
  children: ReactNode;
}) {
  if (layout === "card") {
    return (
      <label className="contact-field-label">
        <span className="sr-only">{label}</span>
        <select name={name} required={required} defaultValue="" className="contact-field">
          <option value="" disabled>
            {placeholder}
          </option>
          {children}
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
        <option value="" disabled>
          {placeholder}
        </option>
        {children}
      </select>
    </label>
  );
}

function FileField({
  label,
  name,
  required,
  layout = "default",
}: {
  label: string;
  name: string;
  required?: boolean;
  layout?: "default" | "card";
}) {
  const [fileName, setFileName] = useState("");

  if (layout === "card") {
    return (
      <label className="contact-field-label">
        <span className="sr-only">{label}</span>
        <span className="contact-field relative flex items-center justify-between gap-3">
          <span className={`min-w-0 truncate ${fileName ? "text-ink" : "text-muted/70"}`}>
            {fileName || label}
          </span>
          <span className="shrink-0 text-[11px] tracking-wide text-muted">Upload</span>
          <input
            name={name}
            type="file"
            required={required}
            accept={fileAccept}
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </span>
      </label>
    );
  }

  return (
    <label className="grid gap-1.5 text-sm text-muted md:gap-2">
      {label}
      <span className="relative flex items-center justify-between gap-3 border-b border-ink/25 py-2 md:py-3">
        <span className={`min-w-0 truncate text-base ${fileName ? "text-ink" : "text-muted/70"}`}>
          {fileName || "Choose file"}
        </span>
        <span className="shrink-0 text-[11px] tracking-wide text-muted">PDF or image</span>
        <input
          name={name}
          type="file"
          required={required}
          accept={fileAccept}
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
      </span>
    </label>
  );
}
