import { audiences } from "@/lib/data";

export function GuidanceSection({ id = "services" }: { id?: string }) {
  return (
    <section id={id} className="bg-white py-20 md:py-28">
      <div className="site-pad grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[12px] tracking-[0.18em] uppercase text-muted">Exclusive Guidance for</p>
          <h2 className="mt-5 font-serif text-[22px] leading-[1.25] md:text-6xl">
            Buyers, Sellers & Investors
          </h2>
        </div>
        <div>
          {audiences.map((item) => (
            <div key={item.title} className="border-t border-line py-8 md:py-10">
              <div className="flex gap-6 md:gap-10">
                <p className="shrink-0 font-serif text-lg text-muted">{item.n}</p>
                <div>
                  <h3 className="text-[13px] font-semibold tracking-[0.16em] uppercase">{item.title}</h3>
                  <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-muted">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
