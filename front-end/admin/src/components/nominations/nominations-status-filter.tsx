"use client";

import type { StatusFilter } from "@/hooks/use-nominations";
import { PersonPicker, type PersonOption } from "./person-picker";

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Chọn Status" },
  { value: "approved", label: "Public" },
  { value: "rejected", label: "Spam" },
];

const FONT = { fontFamily: "var(--font-montserrat)" };

const SELECT_STYLE: React.CSSProperties = {
  backgroundColor: "var(--details-container)",
  color: "rgba(255,255,255,0.7)",
  border: "1px solid var(--details-divider)",
  ...FONT,
  outline: "none",
  appearance: "none" as const,
};

const LABEL_STYLE: React.CSSProperties = {
  color: "rgba(255,255,255,0.55)",
  fontSize: "12px",
  fontWeight: 500,
  ...FONT,
};

export interface NominationsFilterBarProps {
  sender: string;
  receiver: string;
  status: StatusFilter;
  search: string;
  senderOptions: PersonOption[];
  receiverOptions: PersonOption[];
  onSenderChange: (v: string) => void;
  onReceiverChange: (v: string) => void;
  onStatusChange: (v: StatusFilter) => void;
  onSearchChange: (v: string) => void;
}

export function NominationsFilterBar({
  sender,
  receiver,
  status,
  search,
  senderOptions,
  receiverOptions,
  onSenderChange,
  onReceiverChange,
  onStatusChange,
  onSearchChange,
}: NominationsFilterBarProps) {
  return (
    <div className="flex items-end gap-3">
      <PersonPicker
        label="Sender"
        value={sender}
        options={senderOptions}
        placeholder="Chọn Sender"
        onChange={onSenderChange}
      />

      <PersonPicker
        label="Receiver"
        value={receiver}
        options={receiverOptions}
        placeholder="Chọn Receiver"
        onChange={onReceiverChange}
      />

      {/* Status */}
      <div className="flex flex-col gap-1">
        <span style={LABEL_STYLE}>Status</span>
        <div className="relative">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
            className="h-9 w-full rounded-lg px-3 pr-8 text-sm"
            style={SELECT_STYLE}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ color: "rgba(255,255,255,0.4)" }}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Search */}
      <div className="relative ml-auto w-60">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm kiếm..."
          className="h-9 w-full rounded-lg px-3 pr-9 text-sm"
          style={SELECT_STYLE}
        />
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: "rgba(255,255,255,0.4)" }}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>
    </div>
  );
}
