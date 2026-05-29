"use client";

import { useState } from "react";
import TheLePannel from "./the-le-panel";

function PenIcon({ fill = "rgba(0,16,26,1)" }: { fill?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M20.8067 6.72951C21.1967 6.33951 21.1967 5.68951 20.8067 5.31951L18.4667 2.97951C18.0967 2.58951 17.4467 2.58951 17.0567 2.97951L15.2167 4.80951L18.9667 8.55951M3.09668 16.9395V20.6895H6.84668L17.9067 9.61951L14.1567 5.86951L3.09668 16.9395Z" fill={fill} />
    </svg>
  );
}


const BTN_BASE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "16px",
  height: "64px",
  backgroundColor: "rgba(255,234,158,1)",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  color: "rgba(0,16,26,1)",
  fontFamily: "var(--font-montserrat), sans-serif",
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: "32px",
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  transition: "box-shadow 0.15s ease",
};

export default function WidgetButton() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [theLePanelOpen, setTheLePanelOpen] = useState(false);

  return (
    <>
      {theLePanelOpen && <TheLePannel onClose={() => setTheLePanelOpen(false)} />}
      {/* Expanded state: vertical stack — Thể lệ (A) / Viết KUDOS (B) / red × circle (C) */}
      {panelOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "32px",
            right: "19px",
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "20px",
          }}
        >
          {/* A: Thể lệ — 149×64px */}
          <button
            type="button"
            aria-label="Thể lệ"
            style={{ ...BTN_BASE, width: "149px" }}
            onClick={() => { setTheLePanelOpen(true); setPanelOpen(false); }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/MM_MEDIA_LOGO.svg" width={24} height={24} alt="" style={{ flexShrink: 0 }} />
            Thể lệ
          </button>

          {/* B: Viết KUDOS — 214×64px */}
          <button
            type="button"
            aria-label="Viết KUDOS"
            style={{ ...BTN_BASE, width: "214px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
          >
            <PenIcon />
            Viết KUDOS
          </button>

          {/* C: Red circle cancel — 56×56px, rgba(212,39,29,1) */}
          <button
            type="button"
            aria-label="Đóng"
            onClick={() => setPanelOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              backgroundColor: "rgba(212,39,29,1)",
              border: "none",
              borderRadius: "100px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              flexShrink: 0,
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(170,28,20,1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,39,29,1)"; }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="4" y1="4" x2="16" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="16" y1="4" x2="4" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Collapsed pill (A section) — shown when panel is closed and theLe panel is closed */}
      {!panelOpen && !theLePanelOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "32px",
            right: "19px",
            zIndex: 200,
            borderRadius: "100px",
            boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287",
          }}
        >
          <button
            type="button"
            aria-label="Mở tuỳ chọn: Viết KUDOS / Thể lệ SAA"
            aria-expanded={panelOpen}
            onClick={() => setPanelOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "16px",
              width: "106px",
              height: "64px",
              backgroundColor: "rgba(255,234,158,1)",
              border: "none",
              borderRadius: "100px",
              cursor: "pointer",
              boxSizing: "border-box",
              transition: "background 0.2s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,222,100,1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,234,158,1)";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.96)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            {/* A.1: pen icon + "/" separator — 42×32px frame */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "42px", height: "32px", flexShrink: 0 }}>
              <PenIcon fill="rgba(0,16,26,1)" />
              <span
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "32px",
                  color: "rgba(0,16,26,1)",
                  flexShrink: 0,
                }}
              >
                /
              </span>
            </div>

            {/* A.2: Sun* Kudos mark — 24×24 container, 20×18 mark */}
            {/* Crop from kudos.png: scale 364×74 to 156×31, show left 20px = S mark */}
            <div style={{ width: "24px", height: "24px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  width: "20px",
                  height: "18px",
                  backgroundImage: "url(/home/kudos.png)",
                  backgroundSize: "156px 31px",
                  backgroundPosition: "0px -6px",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
          </button>
        </div>
      )}
    </>
  );
}
