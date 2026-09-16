import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Main } from "@/components/Main";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jivah-sans",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-jivah-serif",
  display: "swap",
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
      { url: `${basePath}/icon.png`, type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: `${basePath}/apple-icon.png`, sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
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
