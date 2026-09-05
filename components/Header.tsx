"use client";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   scrim fades in
 *    0ms   white drawer slides in from the left
 *   80ms   nav links rise in, staggered
 * ───────────────────────────────────────────────────────── */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { ProjectsMegaMenu } from "./ProjectsMegaMenu";
import { isResourcesActive, ResourcesMegaMenu } from "./ResourcesMegaMenu";
import { withBase } from "@/lib/base";

const otherNavLinks = [
  { href: "/about", label: "About", match: ["/why-jivah", "/about"] },
  {
    href: "/contact",
    label: "Contact",
    match: ["/contact", "/channel-partner", "/partners"],
  },
] as const;

function isActive(pathname: string, match: readonly string[]) {
  return match.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

const navLinkClass = (active: boolean) =>
  `text-[17px] font-medium tracking-[-0.01em] transition-colors ${
    active ? "text-forest" : "text-ink/70 hover:text-ink"
  }`;

function NavLink({
  href,
  label,
  match,
  onClick,
}: {
  href: string;
  label: string;
  match: readonly string[];
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = isActive(pathname, match);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={navLinkClass(active)}
    >
      {label}
    </Link>
  );
}

function ProjectsNavItem({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: (value: boolean) => void;
}) {
  const pathname = usePathname();
  const active = isActive(pathname, ["/projects"]);

  return (
    <div onMouseEnter={() => onOpen(true)}>
      <Link
        href="/#projects"
        aria-current={active ? "page" : undefined}
        aria-expanded={open}
        className={navLinkClass(active)}
      >
        Projects
      </Link>
    </div>
  );
}

function ResourcesNavItem({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: (value: boolean) => void;
}) {
  const pathname = usePathname();
  const active = isResourcesActive(pathname);

  return (
    <div onMouseEnter={() => onOpen(true)}>
      <Link
        href="/blog/"
        aria-current={active ? "page" : undefined}
        aria-expanded={open}
        className={navLinkClass(active)}
      >
        Resources
      </Link>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setProjectsMenuOpen(false);
    setResourcesMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-white"
        onMouseLeave={() => {
          setProjectsMenuOpen(false);
          setResourcesMenuOpen(false);
        }}
      >
        <div className="site-pad grid grid-cols-[auto_1fr_auto] items-center py-3 md:py-4">
          <Logo />

          <nav className="hidden items-center justify-center gap-8 lg:flex" aria-label="Primary">
            <ProjectsNavItem
              open={projectsMenuOpen}
              onOpen={(value) => {
                setProjectsMenuOpen(value);
                if (value) setResourcesMenuOpen(false);
              }}
            />
            <ResourcesNavItem
              open={resourcesMenuOpen}
              onOpen={(value) => {
                setResourcesMenuOpen(value);
                if (value) setProjectsMenuOpen(false);
              }}
            />
            {otherNavLinks.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-2 sm:gap-3">
            <LanguageSelector className="hidden lg:block" />
            <Link
              href="/contact/?type=home-buyer"
              className="btn-pill btn-forest hidden lg:inline-flex"
            >
              Schedule a Visit
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex size-10 items-center justify-center text-ink lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              <img src={withBase("/images/figma/menu.svg")} alt="" className="size-5 brightness-0" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {projectsMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden pt-3 lg:block"
              onMouseEnter={() => setProjectsMenuOpen(true)}
            >
              <div className="site-pad pb-4">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-[20px] border border-line/50 bg-white shadow-[0_20px_48px_rgba(18,22,29,0.08)]">
                  <ProjectsMegaMenu onNavigate={() => setProjectsMenuOpen(false)} />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {resourcesMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden pt-3 lg:block"
              onMouseEnter={() => setResourcesMenuOpen(true)}
            >
              <div className="site-pad pb-4">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-[20px] border border-line/50 bg-white shadow-[0_20px_48px_rgba(18,22,29,0.08)]">
                  <ResourcesMegaMenu onNavigate={() => setResourcesMenuOpen(false)} />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[55] bg-ink/25 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            <MobileNavDrawer pathname={pathname} onClose={() => setOpen(false)} />
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
