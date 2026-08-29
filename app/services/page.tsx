import { GuidanceSection } from "@/components/GuidanceSection";
import { ContactForm } from "@/components/ContactForm";
import Link from "next/link";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <GuidanceSection />
      <section className="bg-paper py-20">
        <div className="site-pad mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl">Talk to us</h2>
          <p className="mt-4 text-sm text-muted">
            First-time buyers can start with the{" "}
            <Link href="/guide" className="underline">
              Homebuyer Guide
            </Link>
            . Investors and channel partners, use the form — tell us which service you need.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
