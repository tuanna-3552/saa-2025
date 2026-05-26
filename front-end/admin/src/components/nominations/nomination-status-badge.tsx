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
    label: "Mới tạo",
    bg: "rgba(150,150,150,0.10)",
    color: "#9CA3AF",
    border: "rgba(150,150,150,0.30)",
    dotColor: "#9CA3AF",
  },
  approved: {
    label: "Public",
    bg: "rgba(59,130,246,0.12)",
    color: "#60A5FA",
    border: "rgba(59,130,246,0.35)",
    dotColor: "#60A5FA",
  },
  rejected: {
    label: "Spam",
    bg: "rgba(234,179,8,0.12)",
    color: "#FCD34D",
    border: "rgba(234,179,8,0.35)",
    dotColor: "#FCD34D",
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
      <span
        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: cfg.dotColor }}
      />
      {cfg.label}
    </span>
  );
}
