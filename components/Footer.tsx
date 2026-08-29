import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-accent text-on-accent">
      <div className="site-pad grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo light />
          <p className="mt-3 text-[11px] tracking-[0.22em] uppercase text-on-accent/70">Realty</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-on-accent/80">
            A better standard of residential living in the cities people already call home.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[11px] tracking-[0.2em] uppercase text-on-accent/70">Legal</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="transition-opacity hover:opacity-70">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-opacity hover:opacity-70">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="transition-opacity hover:opacity-70">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/rera" className="transition-opacity hover:opacity-70">
                RERA
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-5 grid gap-6 text-sm md:grid-cols-2">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-on-accent/70">RERA</p>
            <p className="mt-3">MahaRERA registration</p>
            <p className="text-on-accent/80">Listed on each project page</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-on-accent/70">Head office</p>
            <p className="mt-3">Jivah Greens, Gangapur Road</p>
            <p className="text-on-accent/80">Nashik 422013</p>
          </div>
        </div>
      </div>
      <div className="site-pad flex flex-col gap-2 border-t border-on-accent/20 py-5 text-xs text-on-accent/70 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Jivah Realty</p>
        <p>
          <Link href="/login" className="transition-opacity hover:opacity-100 hover:text-on-accent">
            Customer Login
          </Link>
          {" · "}
          <Link href="/partners" className="transition-opacity hover:opacity-100 hover:text-on-accent">
            Channel Partner Login
          </Link>
          {" · "}
          <Link href="/downloads" className="transition-opacity hover:opacity-100 hover:text-on-accent">
            Downloads
          </Link>
        </p>
      </div>
    </footer>
  );
}
