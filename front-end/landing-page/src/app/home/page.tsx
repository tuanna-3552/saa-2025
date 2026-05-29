export const runtime = "edge";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import RootFurtherContent from "@/components/home/root-further-content";
import AwardsSection from "@/components/home/awards-section";
import KudosSection from "@/components/home/kudos-section";
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
        {/* Keyvisual BG spans hero + root further — 1512×1392 in Figma (ratio 92.06vw).
            Gradient layer sized to 92.06vw so it aligns exactly with the image height. */}
        <div
          style={{
            backgroundImage: [
              "linear-gradient(to bottom, transparent 65%, #00101A 95%)",
              "url('/home/keyvisual-bg.png')",
            ].join(", "),
            backgroundSize: "100% 92.06vw, 100% auto",
            backgroundPosition: "top left, top left",
            backgroundRepeat: "no-repeat, no-repeat",
          }}
        >
          <HeroSection />
          {/* Root Further — no extra gap; internal 120px padding handles spacing */}
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

    </div>
  );
}
