"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  contactDesks,
  ContactDeskForm,
  type ContactDeskId,
} from "@/components/ContactDesk";

const PANEL = {
  spring: { type: "spring" as const, stiffness: 380, damping: 36 },
};

function isDeskId(value: string | null): value is ContactDeskId {
  return contactDesks.some((item) => item.id === value);
}

function ArrowIcon() {
  return (
    <svg
      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeskCardButton({
  label,
  hint,
  selected,
  expanded,
  onClick,
  variant,
}: {
  label: string;
  hint: string;
  selected: boolean;
  expanded: boolean;
  onClick: () => void;
  variant: "accordion" | "select";
}) {
  return (
    <button
      type="button"
      aria-expanded={variant === "accordion" ? expanded : selected}
      aria-pressed={variant === "select" ? selected : undefined}
      onClick={onClick}
      className={`group flex w-full items-center justify-between gap-4 text-left transition-colors ${
        variant === "accordion" ? "p-5 md:p-6" : "rounded-[16px] border p-5 md:p-6"
      } ${
        variant === "select"
          ? selected
            ? "border-forest bg-paper"
            : "border-line bg-white hover:border-ink/40"
          : ""
      }`}
    >
      <span className="min-w-0">
        <span
          className={`block text-[17px] font-medium leading-snug md:text-[18px] ${
            selected ? "text-forest" : "text-ink"
          }`}
        >
          {label}
        </span>
        <span className="mt-1 block text-[14px] leading-relaxed text-muted">{hint}</span>
      </span>
      <span
        className={`flex size-9 shrink-0 items-center justify-center rounded-full border text-[18px] leading-none transition-colors ${
          selected
            ? "border-forest bg-forest text-white"
            : "border-line bg-paper text-ink group-hover:border-forest/30"
        }`}
        aria-hidden
      >
        {variant === "accordion" ? (expanded ? "−" : "+") : <ArrowIcon />}
      </span>
    </button>
  );
}

export function ContactPageBody({ initial = "home-buyer" }: { initial?: ContactDeskId }) {
  const [desk, setDesk] = useState<ContactDeskId | "">("");
  const [intent, setIntent] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    if (isDeskId(type)) {
      setDesk(type);
    } else {
      setDesk(initial);
    }

    const nextIntent = params.get("intent");
    if (nextIntent === "home" || nextIntent === "investment") {
      setIntent(nextIntent);
    }
  }, [initial]);

  function updateDesk(id: ContactDeskId | "") {
    setDesk(id);

    const url = new URL(window.location.href);
    if (id) {
      url.searchParams.set("type", id);
    } else {
      url.searchParams.delete("type");
    }
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function selectDesk(id: ContactDeskId) {
    updateDesk(id);
  }

  function toggleDesk(id: ContactDeskId) {
    updateDesk(desk === id ? "" : id);
  }

  return (
    <section className="site-pad pt-12 md:pt-16 lg:pt-20">
      <div className="lg:hidden">
        <h2 className="section-heading max-w-md text-ink">
          Need more information? Get in touch with us
        </h2>
        <p className="mt-4 max-w-md text-[16px] leading-[1.65] text-muted md:max-w-lg md:text-[17px]">
          A site visit, a project question, commercial space, or channel partner onboarding — tell us
          what you need and we&apos;ll route you to the right team.
        </p>

        {/* Mobile + tablet: accordion with form inside each card */}
        <div className="mt-8 md:mt-10">
          <h3 className="section-heading text-ink">Send message</h3>

          <ul className="mt-6 flex flex-col gap-3 md:gap-4">
            {contactDesks.map((item) => {
              const expanded = desk === item.id;

              return (
                <li
                  key={item.id}
                  className={`overflow-hidden rounded-[16px] border transition-colors ${
                    expanded ? "border-forest bg-paper" : "border-line bg-white"
                  }`}
                >
                  <DeskCardButton
                    label={item.label}
                    hint={item.hint}
                    selected={expanded}
                    expanded={expanded}
                    variant="accordion"
                    onClick={() => toggleDesk(item.id)}
                  />

                  <AnimatePresence initial={false}>
                    {expanded ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={PANEL.spring}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-line/80 px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5">
                          <ContactDeskForm desk={item.id} layout="card" intent={intent} />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Desktop: heading + cards left, form top-aligned right */}
      <div className="hidden gap-12 lg:grid lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:items-start lg:gap-16 xl:gap-20">
        <div>
          <h2 className="section-heading max-w-md text-ink">
            Need more information? Get in touch with us
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-[1.65] text-muted md:max-w-lg md:text-[17px]">
            A site visit, a project question, commercial space, or channel partner onboarding — tell
            us what you need and we&apos;ll route you to the right team.
          </p>

          <ul className="mt-8 flex flex-col gap-3 md:gap-4">
            {contactDesks.map((item) => {
              const selected = desk === item.id;

              return (
                <li key={item.id}>
                  <DeskCardButton
                    label={item.label}
                    hint={item.hint}
                    selected={selected}
                    expanded={selected}
                    variant="select"
                    onClick={() => selectDesk(item.id)}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="section-heading text-ink">Send message</h3>

          <div className="mt-6 md:mt-8">
            {desk ? (
              <ContactDeskForm desk={desk} layout="card" intent={intent} />
            ) : (
              <p className="rounded-[16px] border border-line bg-paper px-6 py-8 text-[15px] leading-relaxed text-muted">
                Choose an enquiry type on the left to open the form.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
