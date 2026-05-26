"use client";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import type { NominationRow } from "./nominations-table";

const STATUS_STYLES: Record<
  NominationRow["status"],
  { label: string; style: React.CSSProperties }
> = {
  pending: {
    label: "Pending",
    style: { backgroundColor: "rgba(255,234,158,0.15)", color: "#FFEA9E" },
  },
  approved: {
    label: "Approved",
    style: { backgroundColor: "rgba(34,197,94,0.15)", color: "#4ade80" },
  },
  rejected: {
    label: "Rejected",
    style: { backgroundColor: "rgba(212,39,29,0.15)", color: "#D4271D" },
  },
};

const CELL_BASE = "flex h-12 shrink-0 items-center border-b px-3";
const TEXT_BASE = "text-sm font-normal tracking-[0.25px] text-white";
const FONT = { fontFamily: "var(--font-montserrat)" };
const DIVIDER = { borderColor: "var(--details-divider)" };

interface NominationTableRowProps {
  row: NominationRow;
  index: number;
  onClick: (id: string) => void;
}

export function NominationTableRow({ row, index, onClick }: NominationTableRowProps) {
  const isEven = index % 2 === 0;
  const statusStyle = STATUS_STYLES[row.status];

  return (
    <div
      className="flex items-center cursor-pointer transition-colors hover:bg-white/5"
      style={{ backgroundColor: isEven ? "var(--details-container-2)" : "var(--details-container)" }}
      onClick={() => onClick(row.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(row.id)}
    >
      {/* No */}
      <div className={cn(CELL_BASE, TEXT_BASE, "w-[60px]")} style={{ ...DIVIDER, ...FONT }}>
        {index + 1}
      </div>

      {/* Nominee */}
      <div className={cn(CELL_BASE, "gap-2 w-[180px]")} style={DIVIDER}>
        {row.nominee?.avatar_url ? (
          <img
            src={row.nominee.avatar_url}
            alt={row.nominee.full_name}
            className="h-7 w-7 rounded-full object-cover shrink-0"
          />
        ) : (
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
            style={{ backgroundColor: "var(--details-text-primary-1)", color: "var(--details-text-primary-2)", ...FONT }}
          >
            {(row.nominee?.full_name ?? "?").charAt(0).toUpperCase()}
          </div>
        )}
        <span className={cn(TEXT_BASE, "truncate")} style={FONT}>
          {row.nominee?.full_name ?? "—"}
        </span>
      </div>

      {/* Nominator */}
      <div className={cn(CELL_BASE, TEXT_BASE, "w-[160px] truncate")} style={{ ...DIVIDER, ...FONT }}>
        {row.nominator?.full_name ?? "—"}
      </div>

      {/* Category */}
      <div className={cn(CELL_BASE, TEXT_BASE, "w-[140px] truncate")} style={{ ...DIVIDER, ...FONT }}>
        {row.category?.name ?? "—"}
      </div>

      {/* Season */}
      <div className={cn(CELL_BASE, TEXT_BASE, "w-[140px] truncate")} style={{ ...DIVIDER, ...FONT }}>
        {row.season?.name ?? "—"}
      </div>

      {/* Reason */}
      <div className={cn(CELL_BASE, "flex-1 min-w-[200px]")} style={DIVIDER}>
        <span className="text-sm font-normal tracking-[0.25px] text-white/70 truncate" style={FONT}>
          {row.reason ?? "—"}
        </span>
      </div>

      {/* Status */}
      <div className={cn(CELL_BASE, "w-[110px]")} style={DIVIDER}>
        <span className="rounded px-2 py-0.5 text-xs font-medium" style={statusStyle.style}>
          {statusStyle.label}
        </span>
      </div>

      {/* Created at */}
      <div
        className={cn(CELL_BASE, "text-sm font-normal tracking-[0.25px] text-white/70 w-[140px]")}
        style={{ ...DIVIDER, ...FONT }}
      >
        {formatDate(row.created_at, "short")}
      </div>
    </div>
  );
}
