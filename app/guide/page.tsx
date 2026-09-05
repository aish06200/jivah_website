import Link from "next/link";
import { EmiCalculator } from "@/components/EmiCalculator";
import { PageIntro } from "@/components/PageIntro";
import { faqs } from "@/lib/data";

export const metadata = { title: "Homebuyer Guide" };

const steps = [
  { t: "Decide how you live", d: "Family size, school run, elders, pets. The apartment should fit the week you already have." },
  { t: "Check RERA first", d: "Registration number, promoter, timelines. If it is not published, do not book." },
  { t: "Walk the site", d: "Sample apartment, grocer, garden. Tuesday evening is more honest than a Sunday crowd." },
  { t: "Loan, then booking", d: "Eligibility and EMI before the cheque. Our calculator is a starting point, not a sanction." },
  { t: "Read every annexure", d: "What is included, what is extra, when possession is. Keep copies." },
];

const docs = [
  "PAN and Aadhaar of all applicants",
  "Last 6 months bank statements",
  "Salary slips / ITR as applicable",
  "Passport photographs",
  "Address proof",
  "Booking application and KYC as per RERA",
];

export default function GuidePage() {
  return (
    <div className="bg-white">
      <PageIntro
        kicker={
          <>
            <Link href="/resources" className="hover:text-ink">
              Buyer Resources
            </Link>
            {" / Practical, not sales-led"}
          </>
        }
        title="Homebuyer Guide"
      >
        Built for first-time buyers. Slow questions, clear answers — loans, RERA, documents and the
        walk from enquiry to keys.
      </PageIntro>

      <section className="site-pad mx-auto max-w-3xl pb-16">
        <h2 className="font-serif text-[22px] leading-[1.25] md:text-4xl">Buying your first home</h2>
        <p className="mt-6 text-[17px] leading-relaxed text-muted">
          A first home is not a race. Start with how you live, then with what you can comfortably borrow, then with a neighbourhood you will still like in ten years. Jivah is built for people who want to stay in their city — not leave it for a thinner version of somewhere else.
        </p>
      </section>

      <section className="bg-paper py-20">
        <div className="site-pad mx-auto max-w-3xl">
          <h2 className="font-serif text-[22px] leading-[1.25] md:text-4xl">Understanding home loans</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">
            Banks look at income, existing EMIs and the project’s RERA status. We introduce a short list of lenders; we do not lock you to one. Compare processing fees, prepayment rules and the true rate — not only the headline.
          </p>
        </div>
      </section>

      <section className="site-pad mx-auto max-w-5xl py-20">
        <h2 className="font-serif text-[22px] leading-[1.25] md:text-4xl">EMI calculator</h2>
        <p className="mt-4 max-w-xl text-sm text-muted">Indicative only. Your sanction depends on the lender and your eligibility.</p>
        <div className="mt-10">
          <EmiCalculator />
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="site-pad mx-auto max-w-3xl">
          <h2 className="font-serif text-[22px] leading-[1.25] md:text-4xl">Buying process</h2>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {steps.map((s, i) => (
              <div key={s.t} className="grid gap-2 py-8 md:grid-cols-[88px_1fr]">
                <p className="font-serif text-2xl text-muted">{String(i + 1).padStart(2, "0")}.</p>
                <div>
                  <h3 className="font-medium">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-pad mx-auto max-w-3xl py-20">
        <h2 className="font-serif text-[22px] leading-[1.25] md:text-4xl">Documentation</h2>
        <ul className="mt-8 list-disc space-y-2 pl-5 text-[15px] text-muted">
          {docs.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>

      <section className="bg-accent py-16">
        <div className="site-pad mx-auto max-w-3xl">
          <h2 className="font-serif text-[22px] leading-[1.25] text-on-accent md:text-4xl">RERA guide</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-on-accent/85">
            Every ongoing Jivah project carries a MahaRERA number on the listing, in downloads, and on site. Upcoming projects stay “registration underway” until the number is issued — we do not take bookings before then. You can verify any number on the MahaRERA website.
          </p>
        </div>
      </section>

      <section className="site-pad mx-auto max-w-3xl py-20">
        <h2 className="font-serif text-[22px] leading-[1.25] md:text-4xl">FAQs</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <div key={f.q} className="py-8">
              <h3 className="font-medium">{f.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
