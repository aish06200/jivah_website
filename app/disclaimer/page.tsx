import { Legal } from "../privacy/page";

export const metadata = { title: "Disclaimer" };

export default function DisclaimerPage() {
  return (
    <Legal
      title="Disclaimer"
      body="Nothing on this site is an offer, invitation or financial advice. Home loans are provided by independent banks and HFCs. Past occupancy or sales at a completed project do not guarantee future performance. Always verify MahaRERA particulars independently."
    />
  );
}
