"use client";

import { useState, useRef, useEffect } from "react";

// FilterDropdown: pill-shaped dropdown for hashtag/department filtering.
// Design ref: Figma "B.1.1_ButtonHashtag" / "B.1.2_Button Phong ban"
// Border: 1px solid #998C5F, bg: rgba(255,234,158,0.10), border-radius: 68px

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
}

export default function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const displayLabel = value ?? label;

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          height: "56px",
          border: "1px solid #998C5F",
          borderRadius: "4px",
          background: "rgba(255, 234, 158, 0.10)",
          display: "flex",
          alignItems: "center",
          padding: "16px 20px",
          gap: "8px",
          cursor: "pointer",
          boxSizing: "border-box",
          minWidth: "160px",
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          style={{
            fontSize: "16px",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontWeight: 700,
            lineHeight: "24px",
            color: value ? "#FFEA9E" : "#FFFFFF",
            letterSpacing: "0.15px",
            flex: 1,
            textAlign: "left",
          }}
        >
          {displayLabel}
        </span>
        {/* Down chevron */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 200ms ease",
            flexShrink: 0,
          }}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            minWidth: "100%",
            background: "#00070C",
            border: "1px solid #998C5F",
            borderRadius: "12px",
            listStyle: "none",
            margin: 0,
            padding: "8px 0",
            zIndex: 100,
            maxHeight: "240px",
            overflowY: "auto",
          }}
        >
          {/* Clear option */}
          <li
            role="option"
            aria-selected={value === null}
            onClick={() => { onChange(null); setOpen(false); }}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: value === null ? 700 : 400,
              color: value === null ? "#FFEA9E" : "#999",
              cursor: "pointer",
            }}
          >
            {label}
          </li>
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={value === opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                padding: "10px 20px",
                fontSize: "14px",
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                fontWeight: value === opt ? 700 : 400,
                color: value === opt ? "#FFEA9E" : "#FFFFFF",
                cursor: "pointer",
                background: value === opt ? "rgba(255,234,158,0.08)" : "transparent",
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
