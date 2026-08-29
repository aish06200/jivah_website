import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Jivah Realty home">
      <svg
        viewBox="0 0 36 36"
        className={`h-8 w-8 ${light ? "text-on-accent" : "text-accent"}`}
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M4 32V16.5L10.2 11.2V25.5h8.4V4.8L26 0v32H4Z"
        />
      </svg>
      <span
        className={`font-serif text-[22px] font-medium leading-none tracking-tight md:text-[26px] ${light ? "text-on-accent" : "text-ink"}`}
      >
        Jivah Realty
      </span>
    </Link>
  );
}
