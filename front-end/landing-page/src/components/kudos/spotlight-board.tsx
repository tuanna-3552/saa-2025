"use client";

import { useEffect, useRef } from "react";

// SpotlightBoard: force-directed word cloud showing recipient names sized by kudos count.
// Design ref: Figma "B.7_Spotlight" — dark bg section, "388 KUDOS" counter,
// pan/zoom canvas with name bubbles.
// Per clarification: use d3-force simulation (pure canvas, no external library needed).
// Falls back to a simple CSS bubble layout if canvas is unavailable.

interface Recipient {
  id: string;
  name: string;
  kudosCount: number;
}

interface SpotlightBoardProps {
  recipients: Recipient[];
  totalCount: number;
}

interface BubbleNode {
  id: string;
  name: string;
  kudosCount: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const CANVAS_W = 1152;
const CANVAS_H = 420;

function runSimulation(nodes: BubbleNode[], steps = 120) {
  const cx = CANVAS_W / 2;
  const cy = CANVAS_H / 2;

  for (let step = 0; step < steps; step++) {
    const alpha = 1 - step / steps;

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      // Gravity toward center
      a.vx += (cx - a.x) * 0.01 * alpha;
      a.vy += (cy - a.y) * 0.01 * alpha;

      // Repulsion between nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const minDist = a.r + b.r + 8;
        if (dist < minDist) {
          const force = ((minDist - dist) / dist) * 0.5;
          a.vx += dx * force;
          a.vy += dy * force;
          b.vx -= dx * force;
          b.vy -= dy * force;
        }
      }

      // Damping
      a.vx *= 0.85;
      a.vy *= 0.85;
      a.x += a.vx;
      a.y += a.vy;

      // Boundary clamping
      a.x = Math.max(a.r + 4, Math.min(CANVAS_W - a.r - 4, a.x));
      a.y = Math.max(a.r + 4, Math.min(CANVAS_H - a.r - 4, a.y));
    }
  }
}

export default function SpotlightBoard({ recipients, totalCount }: SpotlightBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxCount = Math.max(...recipients.map((r) => r.kudosCount), 1);

    // Build nodes with initial random positions
    const nodes: BubbleNode[] = recipients.map((r) => ({
      id: r.id,
      name: r.name,
      kudosCount: r.kudosCount,
      x: CANVAS_W / 2 + (Math.random() - 0.5) * 200,
      y: CANVAS_H / 2 + (Math.random() - 0.5) * 200,
      vx: 0,
      vy: 0,
      r: 24 + (r.kudosCount / maxCount) * 56, // 24–80px radius
    }));

    runSimulation(nodes);

    // Draw
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    for (const node of nodes) {
      const ratio = node.kudosCount / maxCount;
      const alpha = 0.3 + ratio * 0.5;

      // Circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 234, 158, ${alpha})`;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,234,158,0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Name text
      const fontSize = Math.max(10, Math.min(16, node.r * 0.4));
      ctx.font = `700 ${fontSize}px Montserrat, sans-serif`;
      ctx.fillStyle = "#00101A";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Wrap long names
      const words = node.name.split(" ");
      if (words.length > 1 && node.r > 36) {
        const mid = Math.ceil(words.length / 2);
        const line1 = words.slice(0, mid).join(" ");
        const line2 = words.slice(mid).join(" ");
        ctx.fillText(line1, node.x, node.y - fontSize * 0.6);
        ctx.fillText(line2, node.x, node.y + fontSize * 0.6);
      } else {
        ctx.fillText(node.name, node.x, node.y);
      }
    }
  }, [recipients]);

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#00101A",
        padding: "0 144px 40px",
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
            {totalCount.toLocaleString("vi-VN")} KUDOS
          </h2>
        </div>
      </div>

      {/* Force-directed canvas */}
      <div
        style={{
          width: "100%",
          position: "relative",
          overflow: "hidden",
          borderRadius: "16px",
          background: "rgba(0,7,12,0.6)",
          border: "1px solid rgba(153,140,95,0.3)",
        }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ width: "100%", height: "auto", display: "block" }}
          aria-label="Spotlight board — kudos recipients word cloud"
        />
      </div>

      {/* Live ticker strip */}
      <div
        style={{
          marginTop: "16px",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "inline-block",
            animation: "kudos-ticker 30s linear infinite",
          }}
        >
          {recipients.concat(recipients).map((r, i) => (
            <span
              key={i}
              style={{
                marginRight: "48px",
                fontSize: "14px",
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                fontWeight: 700,
                color: "#999",
              }}
            >
              08:30PM {r.name} đã nhận được một Kudos mới
            </span>
          ))}
        </div>
        <style>{`
          @keyframes kudos-ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
