export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <Legal
      title="Privacy Policy"
      body="We collect only what we need to respond to an enquiry or site visit: name, phone, email and the project you asked about. We do not sell personal data. Site analytics, if used, are aggregated. You may request deletion of your enquiry record by writing to the head office."
    />
  );
}

export function Legal({ title, body }: { title: string; body: string }) {
  return (
    <div className="site-pad mx-auto max-w-2xl py-20 md:py-28">
      <h1 className="font-serif text-5xl">{title}</h1>
      <p className="mt-8 text-[16px] leading-relaxed text-muted">{body}</p>
    </div>
  );
}
