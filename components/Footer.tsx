import Link from "next/link";
import { Logo } from "./Logo";
import { offices } from "@/lib/data";

const extraLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "About us" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
] as const;

const socials = [
  { label: "Instagram", icon: InstagramIcon },
  { label: "Facebook", icon: FacebookIcon },
  { label: "X", icon: XIcon },
  { label: "YouTube", icon: YouTubeIcon },
] as const;

const headOffice = offices[0];

export function Footer() {
  return (
    <footer className="bg-white px-3 pb-3 pt-3 md:px-5 md:pb-5 md:pt-4">
      <div className="overflow-hidden rounded-[32px] bg-forest text-white md:rounded-[48px]">
        <div className="relative z-10 site-pad grid gap-12 pb-12 pt-12 md:grid-cols-3 md:items-start md:gap-10 md:pb-16 md:pt-16 lg:gap-16">
          <div className="max-w-[36ch]">
            <Logo footer />
            <p className="mt-6 text-[15px] leading-[1.65] text-white/80 md:text-[16px]">
              Homes planned around the way families already live — mixed-use
              neighbourhoods with everyday life downstairs.
            </p>
            <ul className="mt-7 flex gap-2.5" aria-hidden="true">
              {socials.map((item) => (
                <li key={item.label}>
                  <span className="flex size-8 items-center justify-center rounded-full bg-white text-ink">
                    <item.icon />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="text-[12px] font-medium uppercase tracking-[0.28em]">Extra links</p>
            <ul className="mt-5 space-y-3 text-[15px] leading-5 text-white/70">
              {extraLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-opacity hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.28em]">Contact</p>
            <ul className="mt-5 space-y-3 text-[15px] leading-6 text-white/70">
              <li className="max-w-[24ch]">{headOffice.address}</li>
              <li>
                <a href={`tel:${headOffice.phone.replace(/\s/g, "")}`} className="transition-opacity hover:text-white">
                  {headOffice.phone}
                </a>
              </li>
              <li>
                <Link href="/contact" className="transition-opacity hover:text-white">
                  Write to us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14.5 8.5V6.8c0-.7.5-1.3 1.5-1.3h1V3h-2.2C12.3 3 11 4.5 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.6 3H20.4L13.9 10.4 21.7 21h-6.3l-4.4-6.5L6 21H3.2l7-8L2.6 3h6.5l4 5.9L17.6 3Zm-1.1 16.2h1.6L7.6 4.7H6L16.5 19.2Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 9 2 12.2 2 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6ZM10 15.5v-6.6l5.5 3.3-5.5 3.3Z" />
    </svg>
  );
}
