export const runtime = "edge";

import AuthGuard from "@/components/award-system/auth-guard";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AwardSystemKeyvisual from "@/components/award-system/keyvisual";
import SectionTitle from "@/components/award-system/section-title";
import AwardNav from "@/components/award-system/award-nav";
import AwardInfoCard from "@/components/award-system/award-info-card";
import KudosSection from "@/components/home/kudos-section";
import WidgetButton from "@/components/home/widget-button";
import { AWARDS } from "@/components/award-system/award-data";

export const metadata = {
  title: "Hệ thống giải thưởng | SAA 2025",
  description:
    "Hệ thống giải thưởng Sun* Annual Awards 2025 — Top Talent, Top Project, Best Manager, MVP và các hạng mục xuất sắc.",
};

export default function HeThongGiaiPage() {
  return (
    <AuthGuard>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#00101A",
          fontFamily: "var(--font-montserrat), sans-serif",
          overflowX: "hidden",
        }}
      >
        <Header />

        <main>
          {/* Keyvisual banner */}
          <AwardSystemKeyvisual />

          {/* Awards section — title + sticky nav + info cards */}
          <section
            style={{
              width: "100%",
              padding: "80px 144px 120px",
              boxSizing: "border-box",
              backgroundColor: "#00101A",
            }}
          >
            <div
              style={{
                maxWidth: "1224px",
                width: "100%",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "80px",
              }}
            >
              <SectionTitle />

              {/* Two-column layout: sticky nav (left) + award cards (right) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "80px",
                  alignItems: "flex-start",
                }}
              >
                <AwardNav />

                <div style={{ flex: 1 }}>
                  {AWARDS.map((award) => (
                    <AwardInfoCard key={award.id} {...award} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Sun* Kudos promo section */}
          <div style={{ padding: "0 0 96px" }}>
            <KudosSection />
          </div>
        </main>

        <Footer />

        <WidgetButton />
      </div>
    </AuthGuard>
  );
}
