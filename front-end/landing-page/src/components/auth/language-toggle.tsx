"use client";

import { useRef, useState } from "react";

const LANGUAGES = [
  { code: "VN", label: "Tiếng Việt" },
  { code: "EN", label: "English" },
];

export default function LanguageToggle() {
  const [selected, setSelected] = useState("VN");
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function select(code: string) {
    setSelected(code);
    setOpen(false);
  }

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Chọn ngôn ngữ"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "8px 12px",
          background: "transparent",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          color: "rgba(255,255,255,1)",
          transition: "background 0.15s ease",
          height: "40px",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
      >
        <img src="/vn-flag.svg" alt="VN" width={20} height={20} style={{ objectFit: "cover" }} />
        <span
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {selected}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "transform 0.15s ease", transform: open ? "rotate(180deg)" : "none" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            right: 0,
            minWidth: "120px",
            background: "rgba(11,15,18,0.95)",
            border: "1px solid #2E3940",
            borderRadius: "6px",
            overflow: "hidden",
            zIndex: 100,
            backdropFilter: "blur(8px)",
          }}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => select(lang.code)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "10px 14px",
                background: selected === lang.code ? "rgba(255,234,158,0.1)" : "transparent",
                border: "none",
                cursor: "pointer",
                color: selected === lang.code ? "rgba(255,234,158,1)" : "rgba(255,255,255,0.8)",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "13px",
                fontWeight: selected === lang.code ? 700 : 400,
                textAlign: "left",
                transition: "background 0.1s ease",
              }}
              onMouseEnter={(e) => {
                if (selected !== lang.code)
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                if (selected !== lang.code)
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {lang.code} — {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
