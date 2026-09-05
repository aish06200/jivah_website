"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageSelector } from "@/components/LanguageSelector";
import { statusLinks } from "@/components/ProjectsMegaMenu";
import { moreLinks, primaryLinks } from "@/components/ResourcesMegaMenu";
import { offices, projects } from "@/lib/data";

const LINKS = {
  stagger: 0.045,
  offsetY: 12,
  spring: { type: "spring" as const, stiffness: 420, damping: 34 },
};

const TIMING = { links: 80 };

const mobileNavLinks = [
  { href: "/", label: "Home", match: ["/"] as const, exact: true },
  { href: "/about/", label: "About", match: ["/about", "/why-jivah"] as const },
  {
    href: "/contact/",
    label: "Contact",
    match: ["/contact", "/channel-partner", "/partners"] as const,
  },
  { href: "/privacy/", label: "Legal", match: ["/privacy", "/terms", "/disclaimer"] as const },
] as const;

const legalLinks = [
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
] as const;

function isActive(pathname: string, match: readonly string[], exact?: boolean) {
  if (exact) return pathname === "/";
  return match.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function DrawerBracketLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium tracking-[0.16em] text-forest uppercase">
      [ {children} ]
    </p>
  );
}

function MobileSubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">{children}</p>
  );
}

function MobileSubLink({
  href,
  label,
  description,
  onClose,
}: {
  href: string;
  label: string;
  description?: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="block py-1.5 transition-opacity hover:opacity-60"
    >
      <span className="block text-[16px] font-medium leading-snug text-ink">{label}</span>
      {description ? (
        <span className="mt-0.5 block text-[13px] leading-snug text-muted">{description}</span>
      ) : null}
    </Link>
  );
}

const PANEL = {
  spring: { type: "spring" as const, stiffness: 420, damping: 36 },
};

function MobileNavDropdown({
  label,
  active,
  defaultOpen = false,
  children,
}: {
  label: string;
  active: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left transition-opacity hover:opacity-50"
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className={`text-[clamp(1.625rem,6.5vw,2.125rem)] font-semibold leading-[1.12] tracking-[-0.02em] ${
            active ? "text-forest" : "text-ink"
          }`}
        >
          {label}
        </span>
        <span aria-hidden className="text-[22px] leading-none text-ink">
          {open ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={PANEL.spring}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-5 border-l border-line pl-4">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

type Props = {
  pathname: string;
  onClose: () => void;
};

const resourcePaths = [
  "/blog",
  "/resources",
  "/guide",
  "/downloads",
  "/rera",
  "/buying-for-investment",
] as const;

export function MobileNavDrawer({ pathname, onClose }: Props) {
  const headOffice = offices[0];
  const projectsActive = isActive(pathname, ["/projects"]);
  const resourcesActive = isActive(pathname, resourcePaths);
  let linkIndex = 0;

  return (
    <motion.aside
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-paper text-ink lg:hidden"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 380, damping: 38 }}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div className="site-pad flex items-center justify-between py-5 md:py-6">
        <Logo />
        <button
          type="button"
          aria-label="Close menu"
          className="flex size-10 items-center justify-center text-ink transition-opacity hover:opacity-60"
          onClick={onClose}
        >
          <span className="relative block size-5">
            <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 rotate-45 bg-ink" />
            <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 -rotate-45 bg-ink" />
          </span>
        </button>
      </div>

      <nav className="site-pad flex flex-1 flex-col gap-4 pb-8 pt-4" aria-label="Mobile">
        <motion.div
          initial={{ y: LINKS.offsetY, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...LINKS.spring, delay: TIMING.links / 1000 + linkIndex++ * LINKS.stagger }}
        >
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`block text-[clamp(1.625rem,6.5vw,2.125rem)] font-semibold leading-[1.12] tracking-[-0.02em] transition-opacity hover:opacity-50 ${
              pathname === "/" ? "text-forest" : "text-ink"
            }`}
            onClick={onClose}
          >
            Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: LINKS.offsetY, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...LINKS.spring, delay: TIMING.links / 1000 + linkIndex++ * LINKS.stagger }}
        >
          <MobileNavDropdown label="Projects" active={projectsActive} defaultOpen={projectsActive}>
            <div>
              <MobileSubLabel>Signature Homes</MobileSubLabel>
              <ul className="mt-2 space-y-1">
                {projects.slice(0, 4).map((project) => (
                  <li key={project.slug}>
                    <MobileSubLink
                      href={`/projects/${project.slug}/`}
                      label={project.name}
                      description={project.location}
                      onClose={onClose}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <MobileSubLabel>All Projects</MobileSubLabel>
              <ul className="mt-2 space-y-1">
                {statusLinks.map((item) => (
                  <li key={item.status}>
                    <MobileSubLink href={item.href} label={item.label} onClose={onClose} />
                  </li>
                ))}
              </ul>
            </div>
          </MobileNavDropdown>
        </motion.div>

        <motion.div
          initial={{ y: LINKS.offsetY, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...LINKS.spring, delay: TIMING.links / 1000 + linkIndex++ * LINKS.stagger }}
        >
          <MobileNavDropdown label="Resources" active={resourcesActive} defaultOpen={resourcesActive}>
            <div>
              <MobileSubLabel>Resources</MobileSubLabel>
              <ul className="mt-2 space-y-1">
                {primaryLinks.map((item) => (
                  <li key={item.href}>
                    <MobileSubLink
                      href={item.href}
                      label={item.label}
                      description={item.description}
                      onClose={onClose}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <MobileSubLabel>More</MobileSubLabel>
              <ul className="mt-2 space-y-1">
                {moreLinks.map((item) => (
                  <li key={item.href}>
                    <MobileSubLink href={item.href} label={item.label} onClose={onClose} />
                  </li>
                ))}
              </ul>
            </div>
          </MobileNavDropdown>
        </motion.div>

        {mobileNavLinks.slice(1).map((item, i) => {
          const active = isActive(pathname, item.match, "exact" in item ? item.exact : false);

          return (
            <motion.div
              key={item.href}
              initial={{ y: LINKS.offsetY, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                ...LINKS.spring,
                delay: TIMING.links / 1000 + (linkIndex + i) * LINKS.stagger,
              }}
            >
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block text-[clamp(1.625rem,6.5vw,2.125rem)] font-semibold leading-[1.12] tracking-[-0.02em] transition-opacity hover:opacity-50 ${
                  active ? "text-forest" : "text-ink"
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="site-pad mt-auto border-t border-line/70 py-8">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
          <div>
            <DrawerBracketLabel>Contact info</DrawerBracketLabel>
            <ul className="mt-3 space-y-2 text-[15px] leading-snug">
              <li>
                <a
                  href="mailto:hello@jivah.in"
                  className="text-ink transition-opacity hover:opacity-60"
                >
                  hello@jivah.in
                </a>
              </li>
              <li>
                <a
                  href={`tel:${headOffice.phone.replace(/\s/g, "")}`}
                  className="text-ink transition-opacity hover:opacity-60"
                >
                  {headOffice.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <DrawerBracketLabel>Visit us</DrawerBracketLabel>
            <p className="mt-3 text-[15px] leading-snug text-muted">{headOffice.address}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-line/60 pt-6">
          <Link
            href="/contact/?type=home-buyer"
            className="btn-pill btn-forest flex min-h-[52px] w-full items-center justify-center px-8 text-[16px] font-semibold"
            onClick={onClose}
          >
            Schedule a Visit
          </Link>

          <div className="mt-5">
            <DrawerBracketLabel>Language</DrawerBracketLabel>
            <div className="mt-2">
              <LanguageSelector menuAlign="left" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-5 text-[13px] text-muted">
          <p>© {new Date().getFullYear()} Jivah Realty</p>
          <div className="flex gap-5">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-opacity hover:text-ink"
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
