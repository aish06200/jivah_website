import Image from "next/image";
import type { ReactNode } from "react";
import { AboutIntroSection } from "@/components/AboutIntroSection";
import { AboutStoryCarousel } from "@/components/AboutStoryCarousel";
import { PartnerWithUsForm } from "@/components/PartnerWithUsForm";
import { IconFeatureSection, type IconFeatureItem } from "@/components/IconFeatureSection";
import { withBase } from "@/lib/base";
import { leaders, values } from "@/lib/data";

const brandPillarIcons = [
  "/images/figma/investment/icon-area.svg",
  "/images/figma/investment/icon-smart.svg",
  "/images/figma/investment/icon-bed.svg",
  "/images/figma/investment/icon-energy.svg",
  "/images/figma/investment/icon-pool.svg",
  "/images/figma/investment/icon-garage.svg",
] as const;

const brandPillarItems: IconFeatureItem[] = values.slice(0, 6).map((value, index) => ({
  title: value.title,
  body: value.body,
  iconSrc: brandPillarIcons[index],
}));

function SectionKicker({
  icon,
  children,
  light = false,
}: {
  icon: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${light ? "text-white" : "text-[#3e545d]"}`}>
      <Image
        src={withBase(icon)}
        alt=""
        width={20}
        height={20}
        className={`size-5 shrink-0 ${light ? "brightness-0 invert" : ""}`}
      />
      <p className="text-[16px] font-semibold tracking-[-0.01em]">{children}</p>
    </div>
  );
}

export function AboutPageContent() {
  return (
    <div className="bg-white">
      <section className="relative h-[min(480px,55vh)] min-h-[240px] w-full overflow-hidden">
        <Image
          src={withBase("/images/figma/about/hero.png")}
          alt="Jivah Realty neighbourhood entrance at dusk"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </section>

      <AboutIntroSection />

      <AboutStoryCarousel />

      <IconFeatureSection
        kicker="Our commitments"
        title="The Jivah Promise"
        description="The same calls on every site — from masterplan to handover."
        items={brandPillarItems}
        columns={3}
        cardLayout="stacked"
        contentClassName="pb-10 md:px-10"
        titleClassName="page-title text-[#172023]"
      />

      <section className="bg-forest py-20 text-white md:py-28 lg:py-[112px]">
        <div className="site-pad">
          <div className="mx-auto max-w-[1400px]">
            <SectionKicker icon="/images/figma/about/section-icon.svg" light>
              Meet our Team
            </SectionKicker>
            <h2 className="section-heading mt-3 md:text-[clamp(2rem,4vw,3.25rem)] md:leading-[1.2] md:tracking-[-0.06em]">
              Leadership
            </h2>
            <p className="mt-2 max-w-xl text-[18px] leading-[1.4] tracking-[-0.01em] text-white/70">
              The people who hold the line between what looks good in a render and what works in April heat.
            </p>

            <div className="mt-10 grid gap-10 md:grid-cols-3 lg:gap-10">
              {leaders.map((person) => (
                <article key={person.name}>
                  <div className="relative aspect-[440/287] overflow-hidden rounded-2xl bg-white/10">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover object-[center_20%]"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>
                  <h3 className="mt-8 text-[20px] font-medium leading-[1.2] tracking-[-0.02em]">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-[16px] leading-[1.4] tracking-[-0.01em] text-white/70">
                    {person.role}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20 lg:py-24">
        <div className="site-pad">
          <div className="mx-auto max-w-[720px]">
            <PartnerWithUsForm />
          </div>
        </div>
      </section>
    </div>
  );
}
