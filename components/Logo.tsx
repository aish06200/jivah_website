import Link from "next/link";
import { withBase } from "@/lib/base";

export function Logo({
  light = false,
  footer = false,
}: {
  light?: boolean;
  footer?: boolean;
}) {
  if (footer) {
    return (
      <Link
        href="/"
        className="inline-block w-fit leading-none no-underline notranslate"
        aria-label="Jivah Realty home"
      >
        <span className="block h-10 w-[112px] overflow-hidden md:h-12 md:w-[134px]">
          <img
            src={withBase("/images/figma/logo-hero.png")}
            alt=""
            className="block h-10 w-auto max-w-none origin-top-left scale-[1.34] object-left md:h-12 md:scale-[1.34]"
          />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className="relative block h-[32px] w-[118px] no-underline notranslate md:h-[36px] md:w-[132px]"
      aria-label="Jivah Realty home"
    >
      <img
        src={withBase("/images/figma/logo-header.png")}
        alt=""
        className="absolute inset-0 h-full w-full object-contain object-left"
      />
    </Link>
  );
}
