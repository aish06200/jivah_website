import Link from "next/link";
import { processSteps } from "@/lib/data";

function IconBlocks() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="4" y="16" width="9" height="8" fill="currentColor" />
      <rect x="15" y="16" width="9" height="8" fill="currentColor" />
      <rect x="9.5" y="6" width="9" height="8" fill="currentColor" />
    </svg>
  );
}

function IconFlag() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M7 4.5v19" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 5.5h13.5L16 11l4.5 5.5H7V5.5Z" fill="currentColor" />
    </svg>
  );
}

function IconHouse() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M4 13.5 14 5l10 8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 12.5V23h14V12.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 23v-6h4v6" fill="currentColor" />
    </svg>
  );
}

const icons = [IconBlocks, IconFlag, IconHouse];

export function ProcessSection() {
  return (
    <section id="process" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-serif text-[17px] italic text-ink">Scroll Down For</p>
        <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-ink md:text-[3.5rem] lg:text-6xl">
          A Curated Portfolio
          <br />
          of Homes
        </h2>
      </div>

      <div className="site-pad mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
        {processSteps.map((step, i) => {
          const Icon = icons[i] ?? IconHouse;
          return (
            <article key={step.title} className="bg-accent px-8 py-10 text-on-accent md:px-9 md:py-12">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[13px] font-semibold tracking-[0.12em] uppercase">
                  {step.title}
                </h3>
                <span className="shrink-0 text-on-accent">
                  <Icon />
                </span>
              </div>
              <div className="mt-7 border-t border-on-accent/40" />
              <p className="mt-7 text-[15px] leading-[1.7] text-on-accent/95">{step.body}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/contact"
          className="inline-flex bg-ink px-8 py-3.5 text-[13px] tracking-wide text-on-accent hover:bg-ink/90"
        >
          Get a Free Consultation
        </Link>
      </div>
    </section>
  );
}
