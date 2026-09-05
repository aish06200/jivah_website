export const metadata = { title: "Customer Login" };

export default function LoginPage() {
  return (
    <div className="site-pad mx-auto max-w-md py-24 text-center">
      <h1 className="font-serif text-[28px] leading-[1.15] md:text-5xl">Customer Login</h1>
      <p className="mt-6 text-sm text-muted">Portal access for booked customers — statements, updates and documents.</p>
      <form className="mt-10 grid gap-5 text-left">
        <input className="border-b border-ink/25 py-3 outline-none" placeholder="Email" type="email" />
        <input className="border-b border-ink/25 py-3 outline-none" placeholder="Password" type="password" />
        <button type="button" className="mt-2 bg-accent py-3 text-[13px] text-on-accent">
          Sign in
        </button>
      </form>
    </div>
  );
}
