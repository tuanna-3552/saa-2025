"use client";

import type { KeyboardEvent, ChangeEvent } from "react";

const BD = "1px solid #998C5F";
const WH = "#FFF";
const TP = "#00101A";
const TS = "#999";
export const FM: React.CSSProperties = {
  fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
  fontWeight: 700,
};

// Figma-exported icon assets — exact match to design
const Icon = ({ src, alt = "" }: { src: string; alt?: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} width={24} height={24} aria-hidden />
);

// ─── ContentEditor ─────────────────────────────────────────────────
interface ContentEditorProps { content: string; onChange: (v: string) => void; }

const TOOLBAR = [
  { src: "/kudos/icons/bold.svg", style: { borderRadius: "8px 0 0 0" } },
  { src: "/kudos/icons/italic.svg", style: {} },
  { src: "/kudos/icons/strikethrough.svg", style: {} },
  { src: "/kudos/icons/number-list.svg", style: {} },
  { src: "/kudos/icons/link.svg", style: {} },
  { src: "/kudos/icons/quote.svg", style: {} },
];

export function ContentEditor({ content, onChange }: ContentEditorProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {/* Toolbar — all buttons transparent background per Figma spec */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        {TOOLBAR.map(({ src, style }, i) => (
          <button key={i} type="button"
            style={{ width: "56px", height: "40px", border: BD, borderRight: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, boxSizing: "border-box", ...style }}>
            <Icon src={src} />
          </button>
        ))}
        <div style={{ flex: 1, height: "40px", border: BD, borderRadius: "0 8px 0 0", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 16px", boxSizing: "border-box" }}>
          <span style={{ ...FM, fontSize: "16px", lineHeight: "24px", color: "#E46060", letterSpacing: "0.15px" }}>Tiêu chuẩn cộng đồng</span>
        </div>
      </div>
      <textarea value={content} onChange={(e) => onChange(e.target.value)}
        placeholder="Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé!"
        maxLength={1000} rows={8}
        style={{ border: BD, borderTop: "none", borderRadius: "0 0 8px 8px", background: WH, padding: "16px 24px", fontSize: "16px", ...FM, lineHeight: "24px", color: TP, resize: "none", outline: "none", width: "100%", boxSizing: "border-box" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ ...FM, fontSize: "16px", lineHeight: "24px", color: TP, letterSpacing: "0.5px" }}>Bạn có thể &ldquo;@ + tên&rdquo; để nhắc tới đồng nghiệp khác</span>
        <span style={{ ...FM, fontSize: "16px", lineHeight: "24px", color: TS, letterSpacing: "0.5px" }}>{content.length}/1.000</span>
      </div>
    </div>
  );
}

// ─── HashtagField ──────────────────────────────────────────────────
interface HashtagFieldProps { hashtags: string[]; input: string; onInputChange: (v: string) => void; onAdd: () => void; onRemove: (i: number) => void; }

export function HashtagField({ hashtags, input, onInputChange, onAdd, onRemove }: HashtagFieldProps) {
  const handleKey = (e: KeyboardEvent) => { if (e.key === "Enter") { e.preventDefault(); onAdd(); } };
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "flex-start" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "2px", flexShrink: 0, paddingTop: "10px" }}>
        <span style={{ ...FM, fontSize: "22px", lineHeight: "28px", color: TP }}>Hashtag</span>
        <span style={{ fontFamily: "Noto Sans JP, sans-serif", fontWeight: 700, fontSize: "16px", color: "#CF1322" }}>*</span>
      </div>
      <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
        {hashtags.map((tag, i) => (
          <div key={i} style={{ border: BD, background: WH, borderRadius: "8px", padding: "8px 8px 8px 16px", display: "flex", alignItems: "center", gap: "8px", height: "48px" }}>
            <span style={{ ...FM, fontSize: "16px", lineHeight: "24px", color: TP, letterSpacing: "0.15px" }}>{tag}</span>
            <button type="button" onClick={() => onRemove(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/kudos/icons/close-tiny.svg" alt="xóa" width={17} height={17} />
            </button>
          </div>
        ))}
        {hashtags.length < 5 && (
          <div style={{ border: BD, background: WH, borderRadius: "8px", padding: "4px 8px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px", minHeight: "48px", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/kudos/icons/plus.svg" alt="" aria-hidden width={24} height={24} />
              <input type="text" value={input} onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value)} onKeyDown={handleKey} placeholder="Hashtag"
                style={{ border: "none", outline: "none", background: "transparent", ...FM, fontSize: "11px", color: TS, width: "64px" }} />
            </div>
            <span style={{ ...FM, fontSize: "11px", lineHeight: "16px", color: TS, letterSpacing: "0.5px" }}>Tối đa 5</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ImageField ────────────────────────────────────────────────────
interface ImageFieldProps { images: string[]; onAdd: () => void; onRemove: (i: number) => void; }

export function ImageField({ images, onAdd, onRemove }: ImageFieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "center" }}>
      <span style={{ ...FM, fontSize: "22px", lineHeight: "28px", color: TP, flexShrink: 0 }}>Image</span>
      <div style={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
        {images.map((src, i) => (
          <div key={i} style={{ position: "relative", width: "80px", height: "80px", flexShrink: 0 }}>
            <div style={{ width: "80px", height: "80px", border: BD, borderRadius: "18px", overflow: "hidden", background: WH }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }} />
            </div>
            <button type="button" onClick={() => onRemove(i)}
              style={{ position: "absolute", top: "-8px", right: "-8px", width: "20px", height: "20px", borderRadius: "50%", background: "#D4271D", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/kudos/icons/close-tiny.svg" alt="xóa" width={17} height={17} />
            </button>
          </div>
        ))}
        {images.length < 5 && (
          <button type="button" onClick={onAdd}
            style={{ border: BD, background: WH, borderRadius: "8px", padding: "4px 8px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", height: "48px", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/kudos/icons/plus.svg" alt="" aria-hidden width={24} height={24} />
              <span style={{ ...FM, fontSize: "11px", color: TS }}>Image</span>
            </div>
            <span style={{ ...FM, fontSize: "11px", lineHeight: "16px", color: TS, letterSpacing: "0.5px" }}>Tối đa 5</span>
          </button>
        )}
      </div>
    </div>
  );
}
