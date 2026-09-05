import type { ReactNode } from "react";

export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker?: ReactNode;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="site-pad pb-12 pt-16 md:pb-16 md:pt-20">
      {kicker ? <p className="text-[14px] leading-[14px] text-muted">{kicker}</p> : null}
      <h1 className={`page-title max-w-4xl text-ink ${kicker ? "mt-4" : ""}`}>{title}</h1>
      {children ? <div className="mt-6 max-w-2xl text-[18px] leading-[26px] text-muted">{children}</div> : null}
    </header>
  );
}
