export const runtime = "edge";

import AuthGuard from "@/components/award-system/auth-guard";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AwardSystemKeyvisual from "@/components/award-system/keyvisual";
import AwardNav from "@/components/award-system/award-nav";
import AwardInfoCard from "@/components/award-system/award-info-card";
import KudosSection from "@/components/home/kudos-section";
import { AWARDS } from "@/components/award-system/award-data";

export const metadata = {
  title: "Award System | SAA 2025",
  description:
    "Hệ thống giải thưởng Sun* Annual Awards 2025 — Top Talent, Top Project, Best Manager, MVP và các hạng mục xuất sắc.",
};

export default function HeThongGiaiPage() {
  return (
    <AuthGuard>
      {/* No overflowX:hidden here — it would break position:sticky on AwardNav */}
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#00101A",
          fontFamily: "var(--font-montserrat), sans-serif",
        }}
      >
        <Header />

        <main>
          {/* Keyvisual banner (547px) — includes title section overlaid at bottom */}
          <AwardSystemKeyvisual />

          {/* Awards section — 76px gap after keyvisual per design (y=703 - y=627) */}
          <section
            style={{
              width: "100%",
              padding: "76px 144px 120px",
              boxSizing: "border-box",
              backgroundColor: "#00101A",
            }}
          >
            <div
              style={{
                maxWidth: "1152px",
                width: "100%",
                margin: "0 auto",
              }}
            >
              {/* Two-column layout: sticky nav (left, 240px) + award cards (right, flex-1) */}
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
                  {AWARDS.map((award, index) => (
                    <AwardInfoCard
                      key={award.id}
                      {...award}
                      imageLeft={index % 2 === 0}
                    />
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
      </div>
    </AuthGuard>
  );
}
