"use client";

import { useState } from "react";

export default function WidgetButton() {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      {/* Slide-in panel */}
      {panelOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "112px",
            right: "19px",
            width: "280px",
            background: "rgba(16,20,23,0.97)",
            border: "1px solid #2E3940",
            borderRadius: "12px",
            padding: "24px",
            zIndex: 199,
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
              textAlign: "center",
            }}
          >
            {/* TODO: replace with real action panel when Kudos write flow is built */}
            Coming soon
          </p>
        </div>
      )}

      {/* Fixed pill bottom-right */}
      <div
        style={{
          position: "fixed",
          bottom: "32px",
          right: "19px",
          zIndex: 200,
          boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287",
          borderRadius: "100px",
        }}
      >
        <button
          type="button"
          aria-label="Write Kudos / SAA Rules"
          aria-expanded={panelOpen}
          onClick={() => setPanelOpen((o) => !o)}
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
            transition: "background 0.2s ease, transform 0.15s ease",
            boxSizing: "border-box",
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
          {/* Pen + "/" separator */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", width: "42px", height: "32px", flexShrink: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(0,16,26,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "24px", fontWeight: 700, lineHeight: "32px", color: "rgba(0,16,26,1)", flexShrink: 0 }}>
              /
            </span>
          </div>

          {/* Kudos star icon */}
          <div style={{ width: "24px", height: "24px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 1L12.5 6.5L18.5 7.3L14.2 11.4L15.4 17.3L10 14.5L4.6 17.3L5.8 11.4L1.5 7.3L7.5 6.5L10 1Z" fill="rgba(0,16,26,1)" stroke="rgba(0,16,26,1)" strokeWidth="1" strokeLinejoin="round" />
            </svg>
          </div>
        </button>
      </div>
    </>
  );
}
