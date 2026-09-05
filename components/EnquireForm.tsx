"use client";

import { useState } from "react";
import { projects } from "@/lib/data";

const intents = ["General enquiry", "Schedule a site visit", "Home loan help"] as const;

export function EnquireForm({
  defaultProject = "",
  wide = false,
}: {
  defaultProject?: string;
  wide?: boolean;
}) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border border-forest/20 bg-paper/50 px-8 py-12">
        <p className="text-[11px] tracking-[0.22em] uppercase text-forest">Received</p>
        <h3 className="mt-4 font-serif text-4xl italic text-ink">We’ll call you shortly.</h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          A Jivah advisor will reach out within one working day — no urgency scripts, just a time to visit if you’d like one.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase text-muted">
        Full name
        <input
          required
          name="name"
          className="border-b border-ink/20 bg-transparent py-3 text-base tracking-normal text-ink outline-none focus:border-forest"
        />
      </label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase text-muted">
          Phone
          <input
            required
            type="tel"
            name="phone"
            className="border-b border-ink/20 bg-transparent py-3 text-base tracking-normal text-ink outline-none focus:border-forest"
          />
        </label>
        <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase text-muted">
          Email
          <input
            type="email"
            name="email"
            className="border-b border-ink/20 bg-transparent py-3 text-base tracking-normal text-ink outline-none focus:border-forest"
          />
        </label>
      </div>
      <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase text-muted">
        Project
        <select
          name="project"
          defaultValue={defaultProject}
          className="border-b border-ink/20 bg-transparent py-3 text-base tracking-normal text-ink outline-none focus:border-forest"
        >
          <option value="">I’m still exploring</option>
          {projects.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name} · {p.city}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase text-muted">
        How can we help
        <select
          name="intent"
          className="border-b border-ink/20 bg-transparent py-3 text-base tracking-normal text-ink outline-none focus:border-forest"
        >
          {intents.map((intent) => (
            <option key={intent}>{intent}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase text-muted">
        Message
        <textarea
          name="message"
          rows={4}
          className="border-b border-ink/20 bg-transparent py-3 text-base tracking-normal text-ink outline-none focus:border-forest"
        />
      </label>
      <button
        type="submit"
        className={`mt-4 bg-accent px-8 py-3.5 text-[11px] tracking-[0.22em] uppercase text-on-accent transition-colors hover:bg-accent-hover ${
          wide ? "w-full" : "w-fit"
        }`}
      >
        Send enquiry
      </button>
    </form>
  );
}
