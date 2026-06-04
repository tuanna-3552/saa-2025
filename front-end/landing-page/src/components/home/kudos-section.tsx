"use client";

import { useTranslation } from "@/hooks/use-translation";

export default function KudosSection() {
  const { t } = useTranslation();
  return (
    <section
      id="kudos"
      style={{
        width: "100%",
        padding: "0 144px",
        boxSizing: "border-box",
        backgroundColor: "#00101A",
      }}
    >
      <div style={{ maxWidth: "1224px", width: "100%", margin: "0 auto" }}>
        {/* mms_D1_Sunkudos card — 1120×500, bg dark, border-radius 16 */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1120px",
            margin: "0 auto",
            height: "500px",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {/* Background image */}
          <img
            src="/home/kudos-bg.png"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          {/* Content layout — left content + right logo */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 64px",
              boxSizing: "border-box",
            }}
          >
            {/* Left: mms_D2_Content — 457×408 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                width: "457px",
                flexShrink: 0,
              }}
            >
              {/* Frame 494 — text block */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Label */}
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
                  {t("kudos.label")}
                </p>

                {/* Title */}
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "57px",
                    fontWeight: 700,
                    lineHeight: "64px",
                    letterSpacing: "-0.25px",
                    color: "#FFEA9E",
                  }}
                >
                  Sun* Kudos
                </h2>

                {/* Body */}
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "24px",
                    letterSpacing: "0.5px",
                    textAlign: "justify",
                    color: "rgba(255,255,255,1)",
                    whiteSpace: "pre-line",
                  }}
                >
                  {t("kudos.body")}
                </p>
              </div>

              {/* CTA button — mms_D2.1_Button-IC */}
              {/* TODO: /kudos page not yet built — href="#" placeholder */}
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "16px",
                  width: "126px",
                  height: "56px",
                  backgroundColor: "rgba(255,234,158,1)",
                  borderRadius: "4px",
                  textDecoration: "none",
                  transition: "background 0.2s ease",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,222,100,1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,234,158,1)";
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "24px",
                    letterSpacing: "0.15px",
                    color: "rgba(0,16,26,1)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("kudos.detail")}
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.49945 18.3104L5.68945 15.5004L12.0595 9.12043H7.10945V5.69043H18.3095V16.8904H14.8895V11.9404L8.49945 18.3104Z" fill="rgba(0,16,26,1)"/>
                </svg>
              </a>
            </div>

            {/* Right: MM_MEDIA_Logo/Kudos — 364×74 */}
            <img
              src="/home/kudos.png"
              alt="Sun* Kudos"
              style={{ width: "364px", height: "74px", flexShrink: 0, objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
