import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Main } from "@/components/Main";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

/** Brand secondary — body copy, UI labels, card titles (General Sans) */
const generalSans = localFont({
  src: "./fonts/GeneralSans-Variable.ttf",
  variable: "--font-jivah-sans",
  weight: "200 700",
  display: "swap",
  adjustFontFallback: false,
});

/** Brand primary — headlines, page titles, section H1/H2, hero (Ranade) */
const ranade = localFont({
  src: [
    { path: "./fonts/Ranade-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/Ranade-Regular.otf", weight: "400", style: "normal" },
  ],
  variable: "--font-jivah-display",
  display: "swap",
  adjustFontFallback: false,
});

/** Buttons & compact CTAs (Familjen Grotesk role in brand guide) */
const interTight = localFont({
  src: "./fonts/InterTight-VariableFont_wght.ttf",
  variable: "--font-jivah-ui",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: false,
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: {
    default: "Jivah Realty — Better Homes. Familiar Roots.",
    template: "%s · Jivah Realty",
  },
  description:
    "Homes planned around the way families really live. Mixed-use neighbourhoods in the cities people already call home.",
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "any" },
      { url: `${basePath}/icon.png`, type: "image/png", sizes: "32px" },
    ],
    apple: [{ url: `${basePath}/apple-icon.png`, sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${generalSans.variable} ${ranade.variable} ${interTight.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-ink">
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
