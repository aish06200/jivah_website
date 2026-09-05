import Link from "next/link";

export const metadata = { title: "Channel Partner Login" };

export default function PartnersPage() {
  return (
    <div className="site-pad mx-auto max-w-md py-24 text-center">
      <p className="text-[13px] tracking-wide text-muted">
        <Link href="/contact/?type=channel-partner" className="hover:text-ink">
          Contact Us
        </Link>
        {" / "}
        Channel partners
      </p>
      <h1 className="mt-4 font-serif text-[28px] leading-[1.15] md:text-5xl">Channel Partner Login</h1>
      <p className="mt-6 text-sm text-muted">Inventories, collaterals and site-visit slots for registered partners.</p>
      <form className="mt-10 grid gap-5 text-left">
        <input className="border-b border-ink/25 py-3 outline-none" placeholder="Partner ID or email" />
        <input className="border-b border-ink/25 py-3 outline-none" placeholder="Password" type="password" />
        <button type="button" className="mt-2 bg-accent py-3 text-[13px] text-on-accent">
          Sign in
        </button>
      </form>
    </div>
  );
}
