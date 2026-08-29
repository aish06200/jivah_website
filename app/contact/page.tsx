import { ContactForm } from "@/components/ContactForm";
import { offices } from "@/lib/data";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="bg-white">
      <header className="site-pad py-20 text-center md:py-28">
        <h1 className="font-serif text-5xl md:text-7xl">Ready to Stop Searching and Start Living?</h1>
        <p className="mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-muted">
          General enquiries, site visits, sales offices, channel partners and careers — start with the form.
        </p>
      </header>

      <div className="site-pad mx-auto grid max-w-6xl gap-16 pb-20 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">Get in touch</h2>
          <p className="mt-4 text-sm text-muted">
            Choose Buying, Investing, Selling, Leasing, or Site visit. We’ll route you to the right desk.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
        <div className="space-y-12">
          <section>
            <h2 className="font-serif text-3xl">Sales offices</h2>
            <div className="mt-8 space-y-8">
              {offices.map((o) => (
                <div key={o.city} className="border-t border-line pt-6">
                  <p className="text-sm font-semibold tracking-[0.14em] uppercase">{o.city}</p>
                  <p className="mt-2 text-sm">{o.name}</p>
                  <p className="mt-1 text-sm text-muted">{o.address}</p>
                  <p className="mt-1 text-sm text-muted">{o.hours}</p>
                  <p className="mt-1 text-sm">{o.phone}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="font-serif text-3xl">Channel partners</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Registered channel partners can log in for inventories, collaterals and site-visit slots. New partners: select Leasing or mention channel partner in your message.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-3xl">Careers</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              We hire slowly — design, site, and customer experience. Write to us with a note on the work you want to do in emerging cities.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
