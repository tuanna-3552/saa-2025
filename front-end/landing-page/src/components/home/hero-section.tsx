"use client";

import CountdownTimer from "@/components/countdown-timer";
import { useTranslation } from "@/hooks/use-translation";

const EVENT_DATE = process.env.NEXT_PUBLIC_EVENT_DATE ?? "2025-12-26T00:00:00";
const EVENT_DATE_DISPLAY = "26/12/2025";
const EVENT_LOCATION = "Âu Cơ Art Center";

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section
      id="about"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "700px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Content */}
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "96px 144px",
          maxWidth: "1512px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Frame 487 wrapper — max 1224px */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            maxWidth: "1224px",
            width: "100%",
          }}
        >
          {/* ROOT FURTHER logo image — 451×200 */}
          <div>
            <img
              src="/home/root-further-logo.png"
              alt="ROOT FURTHER"
              style={{
                display: "block",
                width: "451px",
                height: "200px",
                objectFit: "contain",
                objectPosition: "left center",
              }}
            />
          </div>

          {/* Countdown + event info block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* mms_B1_Countdown time */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Coming soon label */}
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  lineHeight: "32px",
                  color: "rgba(255,255,255,1)",
                }}
              >
                {t("hero.comingSoon")}
              </p>

              {/* Countdown timer — reusing existing component */}
              <CountdownTimer targetDate={EVENT_DATE} redirectTo="/home" />
            </div>

            {/* mms_B2_Thông tin sự kiện */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* Date + Location row */}
              <div style={{ display: "flex", alignItems: "center", gap: "60px" }}>
                {/* Date */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: "24px",
                      letterSpacing: "0.15px",
                      color: "rgba(255,255,255,1)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("hero.timeLabel")}{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      lineHeight: "32px",
                      color: "#FFEA9E",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {EVENT_DATE_DISPLAY}
                  </span>
                </div>
                {/* Location */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: "24px",
                      letterSpacing: "0.15px",
                      color: "rgba(255,255,255,1)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("hero.locationLabel")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      lineHeight: "32px",
                      color: "#FFEA9E",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {EVENT_LOCATION}
                  </span>
                </div>
              </div>

              {/* Livestream note */}
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  letterSpacing: "0.5px",
                  color: "rgba(255,255,255,1)",
                }}
              >
                {t("hero.livestreamNote")}
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            {/* Primary: ABOUT AWARDS */}
            <a
              href="#awards"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 24px",
                height: "60px",
                background: "rgba(255,234,158,1)",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                textDecoration: "none",
                transition: "background 0.2s ease, transform 0.15s ease",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,222,100,1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,234,158,1)";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: "28px",
                  color: "rgba(0,16,26,1)",
                  whiteSpace: "nowrap",
                }}
              >
                {t("hero.aboutAwards")}
              </span>
              {/* Arrow icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.49945 18.3104L5.68945 15.5004L12.0595 9.12043H7.10945V5.69043H18.3095V16.8904H14.8895V11.9404L8.49945 18.3104Z" fill="rgba(0,16,26,1)"/>
              </svg>
            </a>

            {/* Secondary: ABOUT KUDOS */}
            {/* TODO: /kudos page not yet built — href="#" placeholder */}
            <a
              href="#kudos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 24px",
                height: "60px",
                background: "rgba(255,234,158,0.10)",
                border: "1px solid #998C5F",
                borderRadius: "8px",
                cursor: "pointer",
                textDecoration: "none",
                transition: "background 0.2s ease",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,234,158,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,234,158,0.10)";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: "28px",
                  color: "rgba(255,255,255,1)",
                  whiteSpace: "nowrap",
                }}
              >
                {t("hero.aboutKudos")}
              </span>
              {/* Arrow icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.49945 18.3104L5.68945 15.5004L12.0595 9.12043H7.10945V5.69043H18.3095V16.8904H14.8895V11.9404L8.49945 18.3104Z" fill="rgba(255,255,255,1)"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
