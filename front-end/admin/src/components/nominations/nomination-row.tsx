"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { NominationRow } from "@/hooks/use-nominations";
import { useTranslation } from "@/hooks/use-translation";

// Only approved and rejected have visible badges; pending shows nothing
const STATUS_BADGE_STYLE: Partial<Record<NominationRow["status"], React.CSSProperties>> = {
  approved: {
    backgroundColor: "rgba(59,130,246,0.15)",
    color: "#60A5FA",
    border: "1px solid rgba(59,130,246,0.35)",
  },
  rejected: {
    backgroundColor: "rgba(234,179,8,0.12)",
    color: "#FCD34D",
    border: "1px solid rgba(234,179,8,0.35)",
  },
};

const ACTION_BTN_STYLE: React.CSSProperties = {
  backgroundColor: "rgba(0, 7, 12, 1)",
  border: "1px solid rgba(153, 140, 95, 1)",
  borderRadius: "8px",
  color: "#fff",
  whiteSpace: "nowrap",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 12px",
  fontSize: "12px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "opacity 0.15s",
};

const CELL = "flex shrink-0 items-center border-b px-3 py-3";
const TEXT = "text-sm font-normal tracking-[0.25px] text-white";
const FONT = { fontFamily: "var(--font-montserrat)" };
const DIVIDER = { borderColor: "var(--details-divider)" };

// Warning triangle icon (Mark Spam)
function IconWarning() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

// Undo/restore icon (Un Spam)
function IconUndo() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} style={{ color: "#EF4444", textDecoration: "underline" }}>{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}

interface NominationTableRowProps {
  row: NominationRow;
  index: number;
  onClick: (id: string) => void;
  onAction: (id: string, action: "approved" | "rejected") => Promise<void>;
  searchQuery?: string;
}

export function NominationTableRow({ row, index, onClick, onAction, searchQuery = "" }: NominationTableRowProps) {
  const [busy, setBusy] = useState(false);
  const { t } = useTranslation();
  const isEven = index % 2 === 0;

  const actionTarget = row.status === "approved" ? "rejected" : row.status === "rejected" ? "approved" : null;
  const actionLabel = row.status === "approved" ? t("nominations.action.markSpam") : row.status === "rejected" ? t("nominations.action.unSpam") : null;
  const statusLabel = row.status === "approved" ? t("nominations.status.public") : row.status === "rejected" ? t("nominations.status.spam") : null;

  async function handleAction(e: React.MouseEvent) {
    e.stopPropagation();
    if (!actionTarget || busy) return;
    setBusy(true);
    try {
      await onAction(row.id, actionTarget);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="flex items-stretch cursor-pointer transition-colors hover:bg-white/5"
      style={{ backgroundColor: isEven ? "var(--details-container-2)" : "var(--details-container)" }}
      onClick={() => onClick(row.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(row.id)}
    >
      {/* ID */}
      <div className={cn(CELL, TEXT, "w-[60px]")} style={{ ...DIVIDER, ...FONT }}>
        {index + 1}
      </div>

      {/* Sender (nominator — text only) */}
      <div className={cn(CELL, TEXT, "w-[150px]")} style={{ ...DIVIDER, ...FONT }}>
        <span className="truncate">{row.nominator?.full_name ?? "—"}</span>
      </div>

      {/* Receiver (nominee — text only, no avatar) */}
      <div className={cn(CELL, TEXT, "w-[160px]")} style={{ ...DIVIDER, ...FONT }}>
        <span className="truncate">{row.nominee?.full_name ?? "—"}</span>
      </div>

      {/* Content (reason — allow wrapping, highlight search match) */}
      <div className={cn(CELL, "flex-1 min-w-[200px] items-start")} style={DIVIDER}>
        <span
          className="text-sm font-normal tracking-[0.25px] text-white/70 leading-relaxed"
          style={{ ...FONT, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {row.reason ? <HighlightedText text={row.reason} query={searchQuery} /> : "—"}
        </span>
      </div>

      {/* Hashtag (category chip) */}
      <div className={cn(CELL, "w-[180px]")} style={DIVIDER}>
        {row.category?.name ? (
          <span
            className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium truncate max-w-full"
            style={{ backgroundColor: "rgba(255,234,158,0.12)", color: "var(--details-text-primary-1)", ...FONT }}
          >
            #{row.category.name}
          </span>
        ) : (
          <span className="text-sm text-white/40" style={FONT}>—</span>
        )}
      </div>

      {/* Heart (vote count) */}
      <div className={cn(CELL, TEXT, "w-[100px] gap-1.5")} style={{ ...DIVIDER, ...FONT }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" style={{ color: "#F87171" }} aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span>{row.vote_count.toLocaleString()}</span>
      </div>

      {/* Status */}
      <div className={cn(CELL, "w-[100px]")} style={DIVIDER}>
        {STATUS_BADGE_STYLE[row.status] && statusLabel && (
          <span className="rounded px-2 py-0.5 text-xs font-medium" style={{ ...STATUS_BADGE_STYLE[row.status], ...FONT }}>
            {statusLabel}
          </span>
        )}
      </div>

      {/* Actions */}
      <div
        className={cn(CELL, "w-[120px]")}
        style={DIVIDER}
        onClick={(e) => e.stopPropagation()}
      >
        {actionLabel && (
          <button
            type="button"
            disabled={busy}
            onClick={handleAction}
            style={{ ...ACTION_BTN_STYLE, ...FONT, opacity: busy ? 0.4 : 1 }}
          >
            {busy ? (
              <span className="h-3 w-3 animate-spin rounded-full border border-t-transparent" style={{ borderColor: "var(--details-text-primary-1)", borderTopColor: "transparent" }} />
            ) : row.status === "approved" ? (
              <IconWarning />
            ) : (
              <IconUndo />
            )}
            {!busy && actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
