import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Main } from "@/components/Main";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jivah Realty — Better Homes. Familiar Roots.",
    template: "%s · Jivah Realty",
  },
  description:
    "Homes planned around the way families really live. Mixed-use neighbourhoods in the cities people already call home.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white text-ink">
        <LanguageProvider>
          <Preloader />
          <Header />
          <Main>{children}</Main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
