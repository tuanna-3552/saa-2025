"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const label =
    value?.from && value?.to
      ? `${format(value.from, "yyyy-MM-dd")} → ${format(value.to, "yyyy-MM-dd")}`
      : value?.from
        ? format(value.from, "yyyy-MM-dd")
        : "Pick a range";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-opacity hover:opacity-80"
          style={{
            borderColor: "var(--details-divider)",
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "var(--details-text-secondary-1)",
            fontFamily: "var(--font-montserrat)",
          }}
        >
          {label}
          {/* calendar icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="end"
        style={{
          backgroundColor: "var(--details-container)",
          borderColor: "var(--details-divider)",
        }}
      >
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={1}
        />
        <div className="flex items-center justify-between border-t px-3 py-2" style={{ borderColor: "var(--details-divider)" }}>
          <button
            type="button"
            onClick={() => {
              const today = new Date();
              onChange({ from: today, to: today });
            }}
            className="text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--details-text-primary-1)", fontFamily: "var(--font-montserrat)" }}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded px-4 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--details-text-primary-1)",
              color: "var(--details-text-primary-2)",
            }}
          >
            Apply
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
