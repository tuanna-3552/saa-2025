"use client";

import { useEffect } from "react";
import { HERO_BADGES, KUDOS_ICONS } from "./the-le-panel-data";
import { useTranslation } from "@/hooks/use-translation";

const FONT = "var(--font-montserrat), sans-serif";
const GOLD = "rgba(255,234,158,1)";
const WHITE = "rgba(255,255,255,1)";

interface TheLePanelProps {
  onClose: () => void;
}


// eslint-disable-next-line @next/next/no-img-element
const PenIconSmall = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}><path d="M20.8067 6.72951C21.1967 6.33951 21.1967 5.68951 20.8067 5.31951L18.4667 2.97951C18.0967 2.58951 17.4467 2.58951 17.0567 2.97951L15.2167 4.80951L18.9667 8.55951M3.09668 16.9395V20.6895H6.84668L17.9067 9.61951L14.1567 5.86951L3.09668 16.9395Z" fill="rgba(0,16,26,1)" /></svg>;

export default function TheLePannel({ onClose }: TheLePanelProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="the-le-panel-title"
      tabIndex={-1}
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: "min(553px, 100vw)",
        height: "100vh",
        zIndex: 300,
        backgroundColor: "rgba(0,7,12,1)",
        padding: "24px 40px 40px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      {/* Scrollable content */}
      <div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Title */}
        <h2 id="the-le-panel-title" style={{ margin: 0, fontFamily: FONT, fontSize: "45px", fontWeight: 700, lineHeight: "52px", color: GOLD, letterSpacing: "0px" }}>
          {t("theLePanel.title")}
        </h2>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Section A: Người nhận */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ margin: 0, fontFamily: FONT, fontSize: "22px", fontWeight: 700, lineHeight: "28px", color: GOLD }}>
              {t("theLePanel.sectionAHeading")}
            </h3>
            <p style={{ margin: 0, fontFamily: FONT, fontSize: "16px", fontWeight: 700, lineHeight: "24px", color: WHITE, letterSpacing: "0.5px", textAlign: "justify" }}>
              {t("theLePanel.sectionADesc")}
            </p>
            {HERO_BADGES.map((badge) => (
              <div key={badge.name} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={badge.badgeImg} alt={badge.name} height={22} style={{ flexShrink: 0 }} />
                  <span style={{ fontFamily: FONT, fontSize: "16px", fontWeight: 700, lineHeight: "24px", color: WHITE, letterSpacing: "0.5px" }}>
                    {t(`theLePanel.badges.${badge.key}.condition`)}
                  </span>
                </div>
                <p style={{ margin: 0, fontFamily: FONT, fontSize: "14px", fontWeight: 700, lineHeight: "20px", color: WHITE, letterSpacing: "0.1px" }}>
                  {t(`theLePanel.badges.${badge.key}.description`)}
                </p>
              </div>
            ))}
          </div>

          {/* Section B: Người gửi */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ margin: 0, fontFamily: FONT, fontSize: "22px", fontWeight: 700, lineHeight: "28px", color: GOLD }}>
              {t("theLePanel.sectionBHeading")}
            </h3>
            <p style={{ margin: 0, fontFamily: FONT, fontSize: "16px", fontWeight: 700, lineHeight: "24px", color: WHITE, letterSpacing: "0.5px", textAlign: "justify" }}>
              {t("theLePanel.sectionBDesc1")}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {KUDOS_ICONS.map((icon) => (
                <div key={icon.alt} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon.src} alt={icon.alt} width={80} height={80} style={{ objectFit: "contain" }} />
                  <span style={{ fontFamily: FONT, fontSize: "12px", fontWeight: 700, lineHeight: "16px", color: WHITE, textAlign: "center", whiteSpace: "pre-line" }}>
                    {icon.name}
                  </span>
                </div>
              ))}
            </div>
            <p style={{ margin: 0, fontFamily: FONT, fontSize: "16px", fontWeight: 700, lineHeight: "24px", color: WHITE, letterSpacing: "0.5px", textAlign: "justify" }}>
              {t("theLePanel.sectionBDesc2")}
            </p>
          </div>

          {/* Section C: Kudos Quốc Dân */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ margin: 0, fontFamily: FONT, fontSize: "24px", fontWeight: 700, lineHeight: "32px", color: GOLD }}>
              {t("theLePanel.sectionCHeading")}
            </h3>
            <p style={{ margin: 0, fontFamily: FONT, fontSize: "16px", fontWeight: 700, lineHeight: "24px", color: WHITE, letterSpacing: "0.5px", textAlign: "justify" }}>
              {t("theLePanel.sectionCDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div style={{ display: "flex", flexDirection: "row", gap: "16px", flexShrink: 0, paddingTop: "40px" }}>
        <button
          type="button"
          aria-label={t("theLePanel.close")}
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            height: "56px",
            padding: "16px",
            backgroundColor: "rgba(255,234,158,0.10)",
            border: "1px solid #998C5F",
            borderRadius: "4px",
            cursor: "pointer",
            color: GOLD,
            fontFamily: FONT,
            fontSize: "14px",
            fontWeight: 700,
            whiteSpace: "nowrap",
            boxSizing: "border-box",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <line x1="4" y1="4" x2="16" y2="16" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="16" y1="4" x2="4" y2="16" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          {t("theLePanel.close")}
        </button>
        <button
          type="button"
          aria-label={t("theLePanel.writeKudos")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "363px",
            height: "56px",
            padding: "16px",
            backgroundColor: GOLD,
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            color: "rgba(0,16,26,1)",
            fontFamily: FONT,
            fontSize: "14px",
            fontWeight: 700,
            boxSizing: "border-box",
            flexShrink: 0,
          }}
        >
          <PenIconSmall />
          {t("theLePanel.writeKudos")}
        </button>
      </div>
    </div>
  );
}
