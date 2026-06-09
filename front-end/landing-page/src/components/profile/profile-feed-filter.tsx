"use client";

// ProfileFeedFilter — dropdown filter for Received / Sent kudos tabs
// Design ref: Figma "mms_C.3_Button" — secondary style, border #998C5F, bg rgba(255,234,158,0.10)

import { useEffect, useRef, useState } from "react";

type FeedFilter = "received" | "sent";

interface ProfileFeedFilterProps {
  activeFilter: FeedFilter;
  receivedCount: number;
  sentCount: number;
  onChange: (f: FeedFilter) => void;
}

const OPTIONS: Array<{ value: FeedFilter; labelFn: (n: number) => string; countKey: "receivedCount" | "sentCount" }> = [
  { value: "received", labelFn: (n) => `Đã nhận (${n})`, countKey: "receivedCount" },
  { value: "sent", labelFn: (n) => `Đã gửi (${n})`, countKey: "sentCount" },
];

export default function ProfileFeedFilter({ activeFilter, receivedCount, sentCount, onChange }: ProfileFeedFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const counts = { receivedCount, sentCount };

  useEffect(() => {
    if (!open) return;
    function onOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [open]);

  const activeOpt = OPTIONS.find((o) => o.value === activeFilter)!;
  const activeLabel = activeOpt.labelFn(counts[activeOpt.countKey]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "16px 24px",
          background: "rgba(255, 234, 158, 0.10)",
          border: "1px solid #998C5F", borderRadius: "4px",
          cursor: "pointer", whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: "16px", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, lineHeight: "24px", color: "#FFF", letterSpacing: "0.15px" }}>
          {activeLabel}
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, color: "#FFF" }}>
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul role="listbox" style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, background: "#00101A", border: "1px solid #998C5F", borderRadius: "4px", listStyle: "none", padding: "4px 0", margin: 0, zIndex: 50, minWidth: "180px", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>
          {OPTIONS.map((opt) => {
            const selected = activeFilter === opt.value;
            const label = opt.labelFn(counts[opt.countKey]);
            return (
              <li key={opt.value} role="option" aria-selected={selected}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                style={{ padding: "12px 24px", cursor: "pointer", fontSize: "16px", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, lineHeight: "24px", color: selected ? "#FFEA9E" : "#FFF", background: selected ? "rgba(255,234,158,0.10)" : "transparent" }}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
