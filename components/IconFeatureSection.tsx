import Image from "next/image";
import type { ComponentType, ReactNode } from "react";
import { withBase } from "@/lib/base";

export type IconFeatureItem = {
  title: string;
  body: string;
  icon?: ComponentType;
  iconSrc?: string;
  footer?: ReactNode;
};

function SectionKicker({
  icon,
  children,
  centered = false,
}: {
  icon: string;
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 text-[#3e545d] ${centered ? "justify-center" : ""}`}
    >
      <Image
        src={withBase(icon)}
        alt=""
        width={20}
        height={20}
        className="size-5 shrink-0"
      />
      <p className="text-[16px] font-semibold tracking-[-0.01em]">{children}</p>
    </div>
  );
}

export function FeatureIconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-forest text-white shadow-[0_10px_24px_-16px_rgba(12,123,84,0.85)]">
      {children}
    </span>
  );
}

function InlineFeatureCard({
  title,
  body,
  icon: Icon,
  footer,
}: IconFeatureItem) {
  if (!Icon) return null;

  return (
    <article className="flex h-full flex-col rounded-md bg-[#f7f7f7] px-7 py-[26px]">
      <div className="flex gap-5">
        <FeatureIconBadge>
          <Icon />
        </FeatureIconBadge>
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-[18px] font-medium leading-[1.4] tracking-[-0.01em] text-[#172023]">
            {title}
          </h3>
          <p className="mt-1 text-[16px] leading-[1.4] tracking-[-0.01em] text-[#172023]/50">
            {body}
          </p>
        </div>
      </div>
      {footer ? (
        <div className="mt-5 border-t border-line/70 pt-4 text-[15px] leading-[1.5] text-[#172023]">
          {footer}
        </div>
      ) : null}
    </article>
  );
}

function StackedFeatureCard({
  title,
  body,
  icon: Icon,
  iconSrc,
  footer,
}: IconFeatureItem) {
  if (!iconSrc && !Icon) return null;

  return (
    <article className="flex min-h-[240px] flex-col gap-10 rounded-md bg-[#f7f7f7] px-7 py-[26px] md:gap-12">
      {iconSrc ? (
        <Image
          src={withBase(iconSrc)}
          alt=""
          width={32}
          height={32}
          className="icon-tint-forest size-8 shrink-0"
        />
      ) : Icon ? (
        <span className="flex size-8 shrink-0 items-center justify-center text-[#172023]">
          <Icon />
        </span>
      ) : null}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[18px] font-medium leading-[1.4] tracking-[-0.01em] text-[#172023]">
          {title}
        </h3>
        <p className="text-[16px] leading-[1.4] tracking-[-0.01em] text-[#172023]/50">
          {body}
        </p>
        {footer ? (
          <p className="mt-2 text-[14px] leading-[1.4] tracking-[-0.01em] text-[#172023]">
            {footer}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function IconFeatureSection({
  kicker,
  title,
  description,
  items,
  columns = 3,
  cardLayout = "inline",
  id,
  contentClassName,
  mobileFlush = false,
}: {
  kicker: string;
  title: ReactNode;
  description?: string;
  items: IconFeatureItem[];
  columns?: 3 | 4;
  cardLayout?: "inline" | "stacked";
  id?: string;
  contentClassName?: string;
  mobileFlush?: boolean;
}) {
  const gridClass =
    columns === 4
      ? "grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-10"
      : "grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-10";

  const Card = cardLayout === "stacked" ? StackedFeatureCard : InlineFeatureCard;

  return (
    <section id={id} className="bg-white py-20 md:py-28 lg:py-[112px]">
      <div className={mobileFlush ? "px-0 md:site-pad" : "site-pad"}>
        <div className={`mx-auto flex max-w-[1400px] flex-col gap-10 ${contentClassName ?? ""}`}>
          <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <SectionKicker icon="/images/figma/about/section-icon.svg" centered>
                {kicker}
              </SectionKicker>
              <h2
                className={
                  cardLayout === "stacked"
                    ? "text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.04em] text-[#172023] md:text-[52px] md:tracking-[-1.04px]"
                    : "text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.04em] text-[#172023]"
                }
              >
                {title}
              </h2>
            </div>
            {description ? (
              <p className="max-w-[960px] text-[18px] leading-[1.4] tracking-[-0.01em] text-[#172023]/50">
                {description}
              </p>
            ) : null}
          </div>

          <div className={gridClass}>
            {items.map((item) => (
              <Card key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
