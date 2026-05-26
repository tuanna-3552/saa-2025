"use client";

import { useState, useRef, useEffect } from "react";

export interface PersonOption {
  name: string;
  avatar_url: string | null;
  department: string | null;
}

interface PersonPickerProps {
  label: string;
  value: string;
  options: PersonOption[];
  placeholder: string;
  onChange: (name: string) => void;
}

const FONT = { fontFamily: "var(--font-montserrat)" };

const LABEL_STYLE: React.CSSProperties = {
  color: "rgba(255,255,255,0.55)",
  fontSize: "12px",
  fontWeight: 500,
  ...FONT,
};

function Avatar({ url, name, size }: { url: string | null; name: string; size: number }) {
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 text-xs font-semibold"
      style={{
        width: size,
        height: size,
        backgroundColor: "rgba(153,140,95,0.3)",
        color: "var(--details-text-primary-1)",
        fontSize: size < 30 ? "9px" : "11px",
        ...FONT,
      }}
    >
      {initials}
    </div>
  );
}

export function PersonPicker({ label, value, options, placeholder, onChange }: PersonPickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.name === value) ?? null;

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  return (
    <div ref={ref} className="flex flex-col gap-1 relative">
      <span style={LABEL_STYLE}>{label}</span>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-[180px] items-center gap-2 rounded-lg px-3 text-sm"
        style={{
          backgroundColor: "var(--details-container)",
          color: value ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
          border: "1px solid var(--details-divider)",
          ...FONT,
        }}
      >
        {selected ? (
          <>
            <Avatar url={selected.avatar_url} name={selected.name} size={22} />
            <span className="flex-1 text-left truncate">{selected.name}</span>
          </>
        ) : (
          <span className="flex-1 text-left">{placeholder}</span>
        )}
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          style={{ color: "rgba(255,255,255,0.4)" }}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-full min-w-[220px] overflow-hidden rounded-lg py-1"
          style={{
            backgroundColor: "var(--details-container-2)",
            border: "1px solid var(--details-divider)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          {/* Clear / all option */}
          <button
            type="button"
            className="flex w-full items-center px-3 py-2 text-sm transition-colors hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.4)", ...FONT }}
            onClick={() => { onChange(""); setOpen(false); }}
          >
            {placeholder}
          </button>

          {options.map((opt) => (
            <button
              key={opt.name}
              type="button"
              className="flex w-full items-center gap-3 px-3 py-2.5 transition-colors hover:bg-white/10"
              style={{
                backgroundColor: opt.name === value ? "rgba(153,140,95,0.15)" : undefined,
              }}
              onClick={() => { onChange(opt.name); setOpen(false); }}
            >
              <Avatar url={opt.avatar_url} name={opt.name} size={36} />
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-sm font-medium truncate w-full" style={{ color: "rgba(255,255,255,0.9)", ...FONT }}>
                  {opt.name}
                </span>
                {opt.department && (
                  <span className="text-xs truncate w-full" style={{ color: "rgba(255,255,255,0.45)", ...FONT }}>
                    {opt.department}
                  </span>
                )}
              </div>
            </button>
          ))}

          {options.length === 0 && (
            <div className="px-3 py-2 text-sm" style={{ color: "rgba(255,255,255,0.35)", ...FONT }}>
              No options
            </div>
          )}
        </div>
      )}
    </div>
  );
}
