import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAA Admin",
  description: "SAA Award System — Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
