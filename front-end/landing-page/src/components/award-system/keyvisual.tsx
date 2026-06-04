"use client";

import { useTranslation } from "@/hooks/use-translation";

// AwardSystemKeyvisual — full 547px banner matching Figma mms_3_Keyvisual (node 313:8437).
// Title section (mms_A_Title, node 313:8453) is overlaid at the bottom of the banner
// (design positions it at y=454 within the 547px keyvisual starting at y=80).
export default function AwardSystemKeyvisual() {
  const { t } = useTranslation();
  return (
    <div
      aria-label="Keyvisual Sun* Annual Award 2025"
      style={{
        position: "relative",
        width: "100%",
        height: "547px",
        overflow: "hidden",
        backgroundImage: "url('/home/keyvisual-bg.png')",
        backgroundSize: "101.245% 367.889%",
        backgroundPosition: "-0.163px -858.967px",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient fade to page background (#00101A) at the bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background: "linear-gradient(to bottom, transparent, #00101A)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content positioned inside the banner — mirrors the Bìa frame layout */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          maxWidth: "1512px",
          margin: "0 auto",
          padding: "0 144px",
          boxSizing: "border-box",
        }}
      >
        {/* ROOT FURTHER logo — top-left, matches KV frame (313:8450) */}
        <div style={{ paddingTop: "72px" }}>
          <img
            src="/home/root-further-logo.png"
            alt="ROOT FURTHER"
            style={{
              display: "block",
              width: "340px",
              height: "auto",
              objectFit: "contain",
              objectPosition: "left center",
            }}
          />
        </div>

        {/* mms_A_Title — overlaid at bottom of keyvisual.
            Design: startY=454, keyvisual startY=80 → 374px from keyvisual top.
            keyvisual height=547px → bottom offset ≈ (547-374-129)=44px from bottom. */}
        <div
          style={{
            position: "absolute",
            bottom: "44px",
            left: "144px",
            right: "144px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "32px",
              color: "rgba(255,255,255,1)",
              textAlign: "center",
            }}
          >
            {t("awards.label")}
          </p>

          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(46,57,64,1)",
            }}
          />

          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "57px",
              fontWeight: 700,
              lineHeight: "64px",
              letterSpacing: "-0.25px",
              color: "#FFEA9E",
              textAlign: "center",
            }}
          >
            {t("awardSystem.keyvisualHeading")}
          </h2>
        </div>
      </div>
    </div>
  );
}
