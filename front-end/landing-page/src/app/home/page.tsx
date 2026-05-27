export const runtime = "edge";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import RootFurtherContent from "@/components/home/root-further-content";
import AwardsSection from "@/components/home/awards-section";
import KudosSection from "@/components/home/kudos-section";
import WidgetButton from "@/components/home/widget-button";

export const metadata = {
  title: "Home",
  description:
    "Sun* Annual Awards 2025 — Root Further. Tôn vinh những cá nhân và dự án xuất sắc của Sun*.",
};

export default function HomePage() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#00101A",
        fontFamily: "var(--font-montserrat), sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Sticky header */}
      <Header />

      <main>
        {/* Hero / Keyvisual — full viewport height with BG, countdown, CTAs */}
        <HeroSection />

        {/* Root Further content — decorative type + body paragraphs + quote */}
        <div style={{ padding: "120px 0" }}>
          <RootFurtherContent />
        </div>

        {/* Awards section — header + 3-col × 2-row grid of 6 award cards */}
        <div style={{ padding: "0 0 120px" }}>
          <AwardsSection />
        </div>

        {/* Sun* Kudos — dark card with left content + right logo */}
        <div style={{ padding: "0 0 96px" }}>
          <KudosSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Fixed widget button — bottom-right pill */}
      <WidgetButton />
    </div>
  );
}
