import Link from "next/link";

const primaryLinks = [
  {
    href: "/blog/",
    label: "Blogs",
    description: "Guides, updates and practical notes for buyers.",
  },
  {
    href: "/buying-for-investment/",
    label: "Buying for Investment",
    description: "Yield, occupancy and mixed-use neighbourhoods that people use.",
  },
] as const;

const moreLinks = [
  { href: "/guide/", label: "Homebuyer Guide" },
  { href: "/downloads/", label: "Downloads" },
  { href: "/rera/", label: "RERA" },
] as const;

export { primaryLinks, moreLinks };

type Props = {
  onNavigate?: () => void;
};

export function ResourcesMegaMenu({ onNavigate }: Props) {
  return (
    <div className="px-[clamp(1.5rem,5.5vw,5rem)] py-10 md:py-12">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.7fr)] md:gap-16 lg:gap-20">
        <div>
          <p className="border-b border-ink/15 pb-3 text-[11px] font-medium tracking-[0.16em] text-ink/55 uppercase">
            Resources
          </p>
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {primaryLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="group block transition-opacity hover:opacity-60"
                >
                  <span className="text-[18px] font-medium leading-[1.25] tracking-[-0.02em] text-ink md:text-[20px]">
                    {item.label}
                  </span>
                  <span className="mt-2 block text-[11px] font-medium tracking-[0.14em] text-ink/60 uppercase">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="border-b border-ink/15 pb-3 text-[11px] font-medium tracking-[0.16em] text-ink/55 uppercase">
            More
          </p>
          <ul className="mt-8 space-y-5">
            {moreLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="text-[18px] font-medium leading-[1.25] tracking-[-0.02em] text-ink transition-opacity hover:opacity-60 md:text-[20px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export const resourceNavLinks = [
  {
    href: "/blog/",
    label: "Blogs",
    match: ["/blog", "/resources", "/guide", "/downloads", "/rera", "/buying-for-investment"],
  },
] as const;

export function isResourcesActive(pathname: string) {
  return resourceNavLinks.some((item) =>
    item.match.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)),
  );
}
