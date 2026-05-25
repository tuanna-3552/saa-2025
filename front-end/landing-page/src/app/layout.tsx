import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
