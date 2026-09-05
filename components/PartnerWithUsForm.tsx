"use client";

import { useState } from "react";

function UnderlineField({
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
    <label className="grid gap-3">
      <span className="editorial-label">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border-0 border-b border-line bg-transparent py-3 text-[16px] text-ink outline-none transition focus:border-ink"
      />
    </label>
  );
}

export function PartnerWithUsForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="text-center">
        <p className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.03em] text-ink">
          Thank you for reaching out.
        </p>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-[1.55] text-muted">
          Our partnerships team will review your message and respond within a few working days.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center">
        <h2 className="text-[clamp(2rem,3.5vw,2.75rem)] font-medium leading-[1.2] tracking-[-0.06em] text-ink">
          Partner with Us
        </h2>
        <p className="mx-auto mt-4 max-w-[540px] text-[17px] leading-[1.55] text-muted md:text-[18px]">
          Channel partners, brokers and collaborators — tell us about your firm and the markets you
          serve. We&apos;ll share project briefs, site visit access and the paperwork you need to
          represent Jivah with clarity.
        </p>
      </div>

      <form
        className="mt-10 grid gap-8 md:mt-12 md:gap-10"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <div className="grid gap-8 sm:grid-cols-2 md:gap-10">
          <UnderlineField label="First name" name="firstName" required />
          <UnderlineField label="Last name" name="lastName" required />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:gap-10">
          <UnderlineField label="Email" name="email" type="email" required />
          <UnderlineField label="Mobile" name="mobile" type="tel" required />
        </div>

        <label className="grid gap-3">
          <span className="editorial-label">Message</span>
          <textarea
            name="message"
            required
            rows={1}
            className="min-h-[52px] w-full resize-none border-0 border-b border-line bg-transparent py-3 text-[16px] leading-[1.5] text-ink outline-none transition focus:border-ink"
          />
        </label>

        <div className="flex justify-center pt-2 md:pt-4">
          <button
            type="submit"
            className="btn-pill btn-forest min-w-[148px] px-10 py-3.5 text-[13px] font-semibold tracking-[0.14em] uppercase"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
