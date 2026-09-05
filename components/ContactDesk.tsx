"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChannelPartnerForm } from "./ChannelPartnerForm";
import { CommercialEnquiryForm } from "./CommercialEnquiryForm";
import { ContactForm } from "./ContactForm";

export const contactDesks = [
  {
    id: "home-buyer",
    label: "Home Buyer",
    hint: "Site visit, project question, or buying advice",
  },
  {
    id: "commercial",
    label: "Commercial Enquiry",
    hint: "Shops, offices and ground-floor leasing",
  },
  {
    id: "channel-partner",
    label: "Channel Partner",
    hint: "RERA registration, inventories and collaterals",
  },
] as const;

export type ContactDeskId = (typeof contactDesks)[number]["id"];

export const contactDeskIntros: Record<ContactDeskId, string> = {
  "home-buyer":
    "Tell us which project interests you and when you'd like to visit. We'll confirm a slot and send directions — no deposit required to walk the site.",
  commercial:
    "Ground-floor shops and office space on the public edge of a neighbourhood. Share your requirement and we'll share availability and lease terms.",
  "channel-partner":
    "Inventories, collaterals and site-visit slots for registered partners. Share your RERA details and attach PAN, RERA certificate and GST.",
};

function isDeskId(value: string | null): value is ContactDeskId {
  return contactDesks.some((item) => item.id === value);
}

export function ContactDeskForm({
  desk,
  layout,
  intent,
}: {
  desk: ContactDeskId;
  layout: "default" | "card";
  intent: string;
}) {
  if (desk === "home-buyer") {
    return <ContactForm intent={intent} layout={layout} />;
  }

  if (desk === "commercial") {
    return <CommercialEnquiryForm layout={layout} />;
  }

  return (
    <>
      <ChannelPartnerForm layout={layout} />
      <p className="mt-8 text-sm text-muted">
        Already registered?{" "}
        <Link href="/partners" className="text-ink transition-opacity hover:opacity-70">
          Partner login
        </Link>
      </p>
    </>
  );
}

export function ContactDesk({
  initial = "home-buyer",
  layout = "default",
}: {
  initial?: ContactDeskId;
  layout?: "default" | "card";
}) {
  const isCard = layout === "card";
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
  }, [initial, isCard]);

  function select(id: ContactDeskId | "") {
    setDesk(id);
    if (!window.location.pathname.includes("/contact")) return;

    const url = new URL(window.location.href);
    if (id) {
      url.searchParams.set("type", id);
    } else {
      url.searchParams.delete("type");
    }
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function toggle(id: ContactDeskId) {
    select(desk === id ? "" : id);
  }

  return (
    <div className={isCard ? "flex min-h-0 flex-1 flex-col" : undefined}>
      <div className={`border-t border-ink/10 ${isCard ? "min-h-0 flex-1" : ""}`}>
        {contactDesks.map((item) => {
          const isOpen = desk === item.id;

          return (
            <div key={item.id} className="border-b border-ink/10">
              <button
                type="button"
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 py-5 text-left md:py-6"
                onClick={() => toggle(item.id)}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[17px] font-medium leading-snug text-ink md:text-[18px]">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-muted">{item.hint}</span>
                </span>
                <span
                  aria-hidden
                  className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-[18px] leading-none transition-colors ${
                    isOpen ? "bg-forest text-white" : "bg-paper text-ink"
                  }`}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && layout === "default" ? (
                <div className="pb-7 md:pb-8">
                  <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-muted">
                    {contactDeskIntros[item.id]}
                  </p>
                  <ContactDeskForm desk={item.id} layout={layout} intent={intent} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
