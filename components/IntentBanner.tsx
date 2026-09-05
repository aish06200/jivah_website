import Link from "next/link";
import { withBase } from "@/lib/base";

const PATHS = [
  {
    id: "home",
    eyebrow: "Home buyers",
    title: "For families",
    description: "Buying a home",
    image: "/images/intent-families.png",
    cta: "Schedule a visit",
    href: "/contact/?type=home-buyer&intent=home",
  },
  {
    id: "invest",
    eyebrow: "Investors",
    title: "For investors",
    description: "Looking for an investment",
    image: "/images/intent-investors.png",
    cta: "Let’s talk",
    href: "/contact/?type=home-buyer&intent=investment",
  },
] as const;

export function IntentBanner() {
  return (
    <section
      className="relative overflow-hidden bg-paper py-16 md:py-20 lg:py-28"
      aria-labelledby="intent-heading"
    >
      <div className="site-pad">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-12">
          <div>
            <p className="text-[13px] font-medium tracking-[0.16em] text-forest uppercase">
              How we can help
            </p>
            <h2 id="intent-heading" className="section-heading mt-3 max-w-2xl text-ink">
              Looking to buy a home,
              <br />
              or looking to invest?
            </h2>
          </div>
          <p className="max-w-md text-[17px] leading-[26px] text-muted lg:pb-1">
            Two paths into Jivah — one for families putting down roots, one for investors backing
            mixed-use neighbourhoods that people actually use.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[32px] border border-line/70 bg-white shadow-[0_28px_90px_rgba(18,22,29,0.08)] md:mt-12">
          <div className="absolute inset-x-0 top-0 hidden h-px bg-gradient-to-r from-transparent via-forest/30 to-transparent lg:block" />

          <div className="grid lg:flex lg:min-h-0 lg:flex-row lg:aspect-[32/9]">
            {PATHS.map((path, index) => (
              <article
                key={path.id}
                className={`w-full shrink-0 lg:h-full lg:w-1/2 lg:overflow-hidden ${
                  index === 0 ? "border-b border-line lg:border-r lg:border-b-0" : ""
                }`}
              >
                <div className="relative min-h-[300px] overflow-hidden sm:min-h-0 sm:aspect-[16/10] lg:aspect-auto lg:h-full">
                  <img
                    src={withBase(path.image)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/35 to-ink/10" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center md:p-8 lg:p-10">
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-[#7dffb8] uppercase">
                      {path.eyebrow}
                    </p>
                    <h3 className="mt-2 text-[22px] font-medium leading-[1.15] tracking-[-0.03em] text-white md:text-[44px] md:leading-[1.08] lg:text-[48px]">
                      {path.title}
                    </h3>
                    <p className="mt-2 text-[17px] leading-[1.45] text-white/80 md:mt-2.5 md:text-[20px] md:leading-[1.5]">
                      {path.description}
                    </p>
                    <Link href={path.href} className="btn-pill btn-forest mt-6 shrink-0 md:mt-8">
                      {path.cta}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 hidden size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-[12px] font-semibold tracking-[0.14em] text-muted uppercase shadow-sm lg:flex">
            or
          </div>
        </div>
      </div>
    </section>
  );
}
