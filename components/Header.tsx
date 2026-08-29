"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { menuItems, navItems } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-accent">
        <div className="site-pad flex h-[72px] items-center justify-between md:h-[84px]">
          <Logo light />
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const active =
                !item.href.startsWith("/#") &&
                (pathname === item.href || pathname.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-lg leading-none tracking-wide text-on-accent transition-opacity hover:opacity-70 ${
                    active ? "opacity-100" : "opacity-80"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-5">
            <Link
              href="/#contact"
              className="hidden border-l border-on-accent/35 pl-5 text-lg leading-none text-on-accent md:block"
            >
              Enquire
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex flex-col justify-center gap-[5px] lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              <span className={`h-[1.5px] w-6 bg-on-accent transition ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`h-[1.5px] w-6 bg-on-accent transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-[1.5px] w-6 bg-on-accent transition ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-accent pt-[84px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="site-pad flex flex-col gap-4 py-10">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    className="font-serif text-4xl text-on-accent md:text-6xl"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/#contact"
                className="mt-8 inline-flex w-fit bg-on-accent px-6 py-3 text-base text-accent"
                onClick={() => setOpen(false)}
              >
                Enquire
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
