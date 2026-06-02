import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates, Share_Tech_Mono } from "next/font/google";
import { LanguageProvider } from "@saa/shared-ui";
import WidgetButton from "@/components/home/widget-button";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const montserratAlternates = Montserrat_Alternates({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat-alternates",
});
const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-digital",
});

export const metadata: Metadata = {
  title: {
    template: "%s | SAA Awards",
    default: "SAA Awards 2025",
  },
  description: "Sun Asterisk Award System — Celebrating excellence and innovation.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://saa.sun-asterisk.com"),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "SAA Awards 2025",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body
        className={`${montserrat.variable} ${montserratAlternates.variable} ${shareTechMono.variable}`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          {children}
          <WidgetButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
