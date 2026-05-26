import type { Metadata } from "next";
import { Montserrat, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
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
      <body className={`${montserrat.variable} ${shareTechMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
