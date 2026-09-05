import { StoriesPageContent } from "@/components/StoriesPageContent";
import { stories } from "@/lib/data";

export const metadata = {
  title: "Success stories",
  description:
    "Real accounts from families, first-time buyers and investors across Jivah neighbourhoods.",
};

export default function StoriesPage() {
  return <StoriesPageContent stories={stories} />;
}
