"use client";

import { cn } from "@/lib/utils";

export type NominationStatus = "pending" | "approved" | "rejected";

interface NominationStatusBadgeProps {
  status: NominationStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  NominationStatus,
  { label: string; bg: string; color: string; border: string; dotColor: string }
> = {
  pending: {
    label: "Pending",
    bg: "rgba(255,234,158,0.10)",
    color: "#FFEA9E",
    border: "rgba(255,234,158,0.30)",
    dotColor: "#FFEA9E",
  },
  approved: {
    label: "Approved",
    bg: "rgba(34,197,94,0.10)",
    color: "#4ADE80",
    border: "rgba(34,197,94,0.30)",
    dotColor: "#4ADE80",
  },
  rejected: {
    label: "Rejected",
    bg: "rgba(212,39,29,0.12)",
    color: "#F87171",
    border: "rgba(212,39,29,0.30)",
    dotColor: "#F87171",
  },
};

export function NominationStatusBadge({
  status,
  className,
}: NominationStatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        className
      )}
      style={{
        backgroundColor: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        fontFamily: "var(--font-montserrat)",
      }}
    >
      {/* status dot */}
      <span
        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: cfg.dotColor }}
      />
      {cfg.label}
    </span>
  );
}
