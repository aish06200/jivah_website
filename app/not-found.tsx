import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-pad py-32 text-center">
      <h1 className="font-serif text-6xl">Page not found</h1>
      <Link href="/" className="mt-8 inline-block bg-accent px-6 py-3 text-[13px] text-on-accent">
        Back home
      </Link>
    </div>
  );
}
