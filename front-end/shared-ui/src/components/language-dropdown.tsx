"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/language-context";

const LANGUAGES = [
  { code: "VN", flagSrc: "/vn-flag.svg", label: "Tiếng Việt" },
  { code: "EN", flagSrc: "/uk-flag.svg", label: "English" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

export function LanguageDropdown() {
  const { language: selected, setLanguage: setSelected } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  const selectedLang = LANGUAGES.find((l) => l.code === selected)!;

  function select(code: LangCode) {
    setSelected(code);
    setOpen(false);
  }

  return (
    <div ref={containerRef} style={{ position: "relative", flexShrink: 0 }}>
      <style>{`
        .lang-dropdown-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 0px !important;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.85) !important;
          height: 40px;
          transition: opacity 0.15s ease;
        }
        .lang-dropdown-trigger:hover {
          opacity: 0.85;
        }
        .lang-dropdown-trigger:focus,
        .lang-dropdown-trigger:active,
        .lang-dropdown-trigger:focus-visible {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>

      {/* Trigger — inherits color from parent so it works in any context */}
      <button
        type="button"
        aria-label="Chọn ngôn ngữ"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        className="lang-dropdown-trigger"
      >
        <img
          src={selectedLang.flagSrc}
          alt={selectedLang.code}
          style={{
            objectFit: "contain",
            borderRadius: "2px",
            flexShrink: 0,
            display: "block",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "24px",
            letterSpacing: "0.15px",
          }}
        >
          {selected}
        </span>
        <svg
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="currentColor"
          aria-hidden="true"
          style={{
            transition: "transform 0.15s ease",
            transform: open ? "rotate(180deg)" : "none",
            flexShrink: 0,
          }}
        >
          <path d="M4 6L0 0H8L4 6Z" />
        </svg>
      </button>

      {/* Dropdown list — matches Figma mms_A_Dropdown-List */}
      {open && (
        <div
          role="listbox"
          aria-label="Chọn ngôn ngữ"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "6px",
            background: "#00070C",
            border: "1px solid #998C5F",
            borderRadius: "8px",
            zIndex: 100,
            width: "108px",
          }}
        >
          {LANGUAGES.map((lang) => (
            <LanguageOption
              key={lang.code}
              lang={lang}
              isSelected={selected === lang.code}
              onClick={() => select(lang.code)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface LanguageOptionProps {
  lang: { code: string; flagSrc: string; label: string };
  isSelected: boolean;
  onClick: () => void;
}

function LanguageOption({ lang, isSelected, onClick }: LanguageOptionProps) {
  const [hovered, setHovered] = useState(false);

  const bg = isSelected
    ? "rgba(255, 234, 158, 0.20)"
    : hovered
    ? "rgba(255, 255, 255, 0.06)"
    : "transparent";

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: "100%",
        height: "40px",
        padding: "8px 12px",
        background: bg,
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
        fontSize: "16px",
        fontWeight: 700,
        lineHeight: "24px",
        letterSpacing: "0.15px",
        transition: "background 0.1s ease",
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      <img
        src={lang.flagSrc}
        alt={lang.code}
        style={{
          objectFit: "cover",
          borderRadius: "2px",
          flexShrink: 0,
          display: "block",
        }}
      />
      <span style={{ color: "rgba(255, 255, 255, 1)", position: "relative" }}>
        <span>{lang.code}</span>
        <span
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: "0",
          }}
        >
          {lang.code} — {lang.label}
        </span>
      </span>
    </button>
  );
}
