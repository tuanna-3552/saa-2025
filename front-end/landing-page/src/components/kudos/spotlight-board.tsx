"use client";

import { useEffect, useRef } from "react";

// SpotlightBoard: scattered text word-cloud matching Figma B.7_Spotlight.
// Each recipient's name is repeated proportionally to their kudos count, then
// scattered across the full canvas via a deterministic grid-with-jitter layout.
// Text-only — no circles.

interface Recipient {
  id: string;
  name: string;
  kudosCount: number;
}

interface SpotlightBoardProps {
  recipients: Recipient[];
  totalCount: number;
}

const CANVAS_W = 1152;
const CANVAS_H = 420;
// Target total text entries on canvas — enough to look dense
const TARGET_ENTRIES = 140;

// Deterministic pseudo-random: avoids Math.random() so canvas is stable across renders
function seededRnd(seed: number): number {
  const x = Math.sin(seed * 127.1 + 31.415) * 43758.5453;
  return x - Math.floor(x);
}

function deterministicShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(seededRnd(i) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SpotlightBoard({ recipients, totalCount }: SpotlightBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || recipients.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxCount = Math.max(...recipients.map((r) => r.kudosCount), 1);
    const totalRaw = recipients.reduce((s, r) => s + r.kudosCount, 0);
    const scale = Math.max(1, Math.ceil(TARGET_ENTRIES / Math.max(totalRaw, 1)));

    // Build entry list: repeat each name proportional to kudos count
    const entries: Array<{ name: string; alpha: number; size: number }> = [];
    for (const r of recipients) {
      const n = Math.max(3, Math.round(r.kudosCount * scale));
      const ratio = r.kudosCount / maxCount;
      // Slightly larger font + brighter for top recipients
      const size = ratio >= 0.8 ? 14 : ratio >= 0.5 ? 12 : 11;
      const alpha = 0.4 + ratio * 0.45;
      for (let i = 0; i < n; i++) entries.push({ name: r.name, alpha, size });
    }

    const shuffled = deterministicShuffle(entries);
    const total = shuffled.length;

    // Grid dimensions scaled to canvas aspect ratio
    const cols = Math.ceil(Math.sqrt(total * (CANVAS_W / CANVAS_H)));
    const rows = Math.ceil(total / cols);
    const cellW = CANVAS_W / cols;
    const cellH = CANVAS_H / rows;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    shuffled.forEach(({ name, alpha, size }, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Jitter within cell so it looks organic, not grid-like
      const jx = (seededRnd(i * 13 + 1) - 0.5) * cellW * 0.75;
      const jy = (seededRnd(i * 17 + 2) - 0.5) * cellH * 0.75;

      const x = Math.max(48, Math.min(CANVAS_W - 48, cellW * (col + 0.5) + jx));
      const y = Math.max(14, Math.min(CANVAS_H - 14, cellH * (row + 0.5) + jy));

      ctx.font = `700 ${size}px Montserrat, sans-serif`;
      ctx.fillStyle = `rgba(255, 234, 158, ${alpha})`;
      ctx.fillText(name, x, y);
    });
  }, [recipients]);

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#00101A",
        padding: "80px 144px 40px",
        boxSizing: "border-box",
      }}
    >
      {/* Section header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
        <p
          style={{
            margin: 0,
            fontSize: "24px",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontWeight: 700,
            lineHeight: "32px",
            color: "#FFFFFF",
          }}
        >
          Sun* Annual Awards 2025
        </p>
        <hr style={{ border: "none", borderTop: "1px solid #2E3940", margin: 0 }} />
        <h2
          style={{
            margin: 0,
            fontSize: "57px",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontWeight: 700,
            lineHeight: "64px",
            letterSpacing: "-0.25px",
            color: "#FFEA9E",
          }}
        >
          SPOTLIGHT BOARD
        </h2>
      </div>

      {/* Word-cloud canvas — border per Figma B.7_Spotlight */}
      <div
        style={{
          maxWidth: "1157px",
          width: "100%",
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
          borderRadius: "47.14px",
          background: "rgba(0,7,12,0.6)",
          border: "1px solid #998C5F",
        }}
      >
        <p
          style={{
            position: "absolute",
            top: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            margin: 0,
            fontSize: "24px",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontWeight: 700,
            lineHeight: "32px",
            color: "#FFEA9E",
            zIndex: 1,
            whiteSpace: "nowrap",
          }}
        >
          {totalCount.toLocaleString("vi-VN")} KUDOS
        </p>
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ width: "100%", height: "auto", display: "block" }}
          aria-label="Spotlight board — kudos recipients word cloud"
        />
      </div>

      {/* Live ticker strip */}
      <div style={{ marginTop: "16px", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div
          style={{ display: "inline-block", animation: "kudos-ticker 30s linear infinite" }}
        >
          {recipients.concat(recipients).map((r, i) => (
            <span
              key={i}
              style={{
                marginRight: "48px",
                fontSize: "14px",
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                fontWeight: 700,
              }}
            >
              <span style={{ color: "#666" }}>08:30PM </span>
              <span style={{ color: "#FFEA9E" }}>{r.name}</span>
              <span style={{ color: "#666" }}> đã nhận được một Kudos mới</span>
            </span>
          ))}
        </div>
        <style>{`
          @keyframes kudos-ticker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
