"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import SpotlightNotifFeed from "./spotlight-notif-feed";

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
const TARGET_ENTRIES = 140;

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
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [search, setSearch] = useState("");

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || recipients.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxCount = Math.max(...recipients.map((r) => r.kudosCount), 1);
    const totalRaw = recipients.reduce((s, r) => s + r.kudosCount, 0);
    const scale = Math.max(1, Math.ceil(TARGET_ENTRIES / Math.max(totalRaw, 1)));
    const q = search.trim().toLowerCase();

    // Safe zones (in canvas px, canvas = 1152×420):
    // Top 70px: clear search bar + requested top padding
    // Left 120px / Right 40px: requested horizontal margins
    // Bottom-right: clear expand icon (bottom 68px)
    // Bottom-left notif zone: 4 items × 20px + 3 gaps × 4px = 92px from bottom=20 → top at y=308; 30px gap → ceiling at y=278
    const Y_MIN = 70;
    const Y_MAX = CANVAS_H - 68;
    const X_MIN = 120;
    const X_MAX = CANVAS_W - 40;
    const NOTIF_X_SAFE = 420; // notification feed right edge
    const NOTIF_Y_SAFE = CANVAS_H - 142; // 278px — 30px gap above notif top (308px)

    type Entry = { name: string; alpha: number; size: number; highlight: boolean };
    const entries: Entry[] = [];
    for (const r of recipients) {
      const n = Math.max(3, Math.round(r.kudosCount * scale));
      const ratio = r.kudosCount / maxCount;
      const size = ratio >= 0.8 ? 14 : ratio >= 0.5 ? 12 : 11;
      const alpha = 0.4 + ratio * 0.45;
      const highlight = q.length > 0 && r.name.toLowerCase().includes(q);
      for (let i = 0; i < n; i++) entries.push({ name: r.name, alpha, size, highlight });
    }

    const shuffled = deterministicShuffle(entries);
    const total = shuffled.length;
    const cols = Math.ceil(Math.sqrt(total * (CANVAS_W / CANVAS_H)));
    const rows = Math.ceil(total / cols);
    const cellW = CANVAS_W / cols;
    const cellH = CANVAS_H / rows;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Collision detection: track placed bounding boxes to prevent overlap
    type Box = { x1: number; y1: number; x2: number; y2: number };
    const placed: Box[] = [];
    const ITEM_PAD = 5; // px gap between items

    shuffled.forEach(({ name, alpha, size, highlight }, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const jx = (seededRnd(i * 13 + 1) - 0.5) * cellW * 0.75;
      const jy = (seededRnd(i * 17 + 2) - 0.5) * cellH * 0.75;
      const x = Math.max(X_MIN, Math.min(X_MAX, cellW * (col + 0.5) + jx));
      // Left zone gets a lower Y ceiling to keep 30px gap above the notification feed
      const yMax = x < NOTIF_X_SAFE ? NOTIF_Y_SAFE : Y_MAX;
      const y = Math.max(Y_MIN, Math.min(yMax, cellH * (row + 0.5) + jy));

      ctx.font = `700 ${size}px Montserrat, sans-serif`;
      const tw = ctx.measureText(name).width;
      // Re-clamp x so text edges respect margins (center ± half-width stays within bounds)
      const xFinal = Math.max(X_MIN + tw / 2, Math.min(x, CANVAS_W - 20 - tw / 2));
      const box: Box = {
        x1: xFinal - tw / 2 - ITEM_PAD,
        y1: y - size / 2 - ITEM_PAD,
        x2: xFinal + tw / 2 + ITEM_PAD,
        y2: y + size / 2 + ITEM_PAD,
      };
      // Skip entry if its bounding box overlaps any already-placed entry
      if (placed.some((b) => box.x2 > b.x1 && box.x1 < b.x2 && box.y2 > b.y1 && box.y1 < b.y2)) return;
      placed.push(box);

      if (highlight) {
        ctx.fillStyle = "rgba(255,255,100,1)";
      } else if (q.length > 0) {
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.25})`;
      } else {
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      }
      ctx.fillText(name, xFinal, y);
    });
  }, [recipients, search]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  return (
    <section style={{ width: "100%", backgroundColor: "#00101A", padding: "80px 144px 40px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
        <p style={{ margin: 0, fontSize: "24px", fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontWeight: 700, lineHeight: "32px", color: "#FFFFFF" }}>
          {t("kudos.page.sectionLabel")}
        </p>
        <hr style={{ border: "none", borderTop: "1px solid #2E3940", margin: 0 }} />
        <h2 style={{ margin: 0, fontSize: "57px", fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontWeight: 700, lineHeight: "64px", letterSpacing: "-0.25px", color: "#FFEA9E" }}>
          {t("kudos.spotlight.heading")}
        </h2>
      </div>

      {/* Board */}
      <div style={{ maxWidth: "1157px", width: "100%", margin: "0 auto", position: "relative", overflow: "hidden", borderRadius: "47px", border: "1px solid #998C5F", backgroundImage: "url('/kudos/spotlight_board_bg.png')", backgroundSize: "cover", backgroundPosition: "center bottom" }}>

        {/* Search bar — top left */}
        <label style={{ position: "absolute", top: "16px", left: "24px", zIndex: 2, display: "flex", alignItems: "center", gap: "8px", background: "rgba(0,0,0,0.45)", borderRadius: "24px", padding: "7px 14px", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", cursor: "text" }}>
          {/* Search icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("kudos.spotlight.searchPlaceholder")}
            style={{ background: "transparent", border: "none", color: "#FFFFFF", outline: "none", fontSize: "14px", fontFamily: "var(--font-montserrat), Montserrat, sans-serif", width: "160px" }}
          />
        </label>

        {/* Total count — top center */}
        <p style={{ position: "absolute", top: "16px", left: "50%", transform: "translateX(-50%)", margin: 0, fontSize: "24px", fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontWeight: 700, lineHeight: "32px", color: "#FFF", zIndex: 1, whiteSpace: "nowrap" }}>
          {totalCount.toLocaleString("vi-VN")} KUDOS
        </p>

        <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} style={{ width: "100%", height: "auto", display: "block" }} aria-label={t("kudos.spotlight.canvasAria")} />

        {/* Notification feed — bottom left */}
        <div style={{ position: "absolute", bottom: "20px", left: "24px", zIndex: 2 }}>
          <SpotlightNotifFeed recipients={recipients} maxItems={4} />
        </div>

        {/* Expand icon — bottom right */}
        <button
          style={{ position: "absolute", bottom: "20px", right: "24px", zIndex: 2, background: "none", border: "none", cursor: "pointer", padding: "4px", color: "rgba(255,255,255,0.7)", lineHeight: 0 }}
          aria-label="Expand"
        >
          {/* Expand / maximize icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
      </div>
    </section>
  );
}
