import Link from "next/link";
import { withBase } from "@/lib/base";

export function Hero() {
  return (
    <section className="relative flex min-h-[88svh] flex-col overflow-hidden bg-ink">
      <img
        src={withBase("/images/hero.png")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[74%_14%] md:object-[76%_12%]"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(206.84deg, rgba(255, 255, 255, 0) 11.294%, rgba(0, 0, 0, 0.41) 80.619%)",
        }}
      />

      <div className="site-pad relative z-10 flex min-h-[88svh] flex-col items-start justify-end pb-16 pt-[61px] text-left md:pb-20 md:pt-[69px]">
        <div>
          <h1 className="text-[32px] font-medium leading-[1.12] tracking-[-0.03em] text-white/95 sm:text-[40px] sm:leading-[1.08] md:max-w-[16ch] md:text-[72px] md:leading-[1.04] md:tracking-[-1.6px]">
            <span className="block">Better Homes.</span>
            <span className="block">Familiar Roots.</span>
          </h1>
          <Link
            href="/contact/?type=home-buyer"
            className="btn-pill btn-forest mt-8 inline-flex lg:hidden"
          >
            Schedule a Visit
          </Link>
        </div>
      </div>
    </section>
  );
}
