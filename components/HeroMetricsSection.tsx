import { heroMetrics } from "@/lib/data";

export function HeroMetricsSection() {
  return (
    <section aria-label="Company metrics" className="border-y border-line/60 bg-white">
      <div className="site-pad py-5 md:py-6">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4 md:gap-x-0 md:gap-y-0">
          {heroMetrics.map((stat, index) => (
            <div
              key={stat.label}
              className={`min-w-0 ${
                index > 0 ? "md:border-l md:border-forest/15 md:pl-8 lg:pl-10" : ""
              } ${index < heroMetrics.length - 1 ? "md:pr-8 lg:pr-10" : ""}`}
            >
              <dd className="text-[clamp(1.625rem,2.6vw,2rem)] font-semibold leading-none tracking-[-0.02em] text-forest tabular-nums">
                {stat.value}
                {"suffix" in stat && stat.suffix ? (
                  <span className="ml-0.5 text-[0.72em] font-semibold">{stat.suffix}</span>
                ) : null}
              </dd>
              <dt className="mt-1.5 whitespace-nowrap text-[10px] font-medium uppercase leading-none tracking-[0.12em] text-forest md:text-[11px]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
