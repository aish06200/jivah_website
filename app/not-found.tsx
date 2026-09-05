import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-pad py-32 text-center">
      <h1 className="page-title text-ink">Page not found</h1>
      <Link href="/" className="btn-pill mt-8">
        Back home
      </Link>
    </div>
  );
}
