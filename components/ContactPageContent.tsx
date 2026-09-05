import { ContactHero } from "@/components/ContactHero";
import { ContactPageBody } from "@/components/ContactPageBody";

export function ContactPageContent() {
  return (
    <article className="bg-white pb-20 md:pb-24">
      <ContactHero />
      <ContactPageBody initial="home-buyer" />
    </article>
  );
}
