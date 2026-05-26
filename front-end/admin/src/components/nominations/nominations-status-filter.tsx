"use client";

import { cn } from "@/lib/utils";
import type { StatusFilter } from "@/hooks/use-nominations";

const FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

interface NominationsStatusFilterProps {
  value: StatusFilter;
  onChange: (v: StatusFilter) => void;
}

export function NominationsStatusFilter({
  value,
  onChange,
}: NominationsStatusFilterProps) {
  return (
    <div
      className="flex items-center gap-1 rounded-lg p-1"
      style={{ backgroundColor: "var(--details-container)" }}
    >
      {FILTER_OPTIONS.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value as StatusFilter)}
            className={cn(
              "rounded px-4 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "text-(--details-text-primary-2)"
                : "text-white/60 hover:text-white"
            )}
            style={{
              fontFamily: "var(--font-montserrat)",
              ...(isActive && {
                backgroundColor: "var(--details-text-primary-1)",
              }),
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
