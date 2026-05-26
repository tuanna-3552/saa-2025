"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { Season } from "@/hooks/use-seasons";
import { SettingsRow } from "./settings-row";

interface SettingsTableProps {
  seasons: Season[];
  loading: boolean;
  error: string | null;
  onEdit: (season: Season) => void;
  onDelete: (season: Season) => void;
}

const FONT = { fontFamily: "var(--font-montserrat)" };

export function SettingsTable({
  seasons,
  loading,
  error,
  onEdit,
  onDelete,
}: SettingsTableProps) {
  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center text-sm" style={{ color: "rgba(255,255,255,0.6)", ...FONT }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="my-6 border border-[#D4271D]/40 bg-[#D4271D]/5 p-4 text-center text-sm text-[#FF8F8F]"
        style={{ borderRadius: "2px", fontFamily: "var(--font-montserrat)" }}
      >
        {error}
      </div>
    );
  }

  const columns = [
    { label: "ID",      width: "w-[80px] justify-center" },
    { label: "Name",    width: "flex-1 min-w-[200px]" },
    { label: "Time",    width: "w-[400px]" },
    { label: "Actions", width: "w-[100px] justify-end pr-6" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[780px]">
        {/* Header */}
        <div className="flex items-center" style={{ backgroundColor: "var(--details-container)" }}>
          {columns.map(({ label, width }) => (
            <div
              key={label}
              className={cn(
                "flex h-12 shrink-0 items-center border-b px-3",
                "text-sm font-medium tracking-[0.1px] text-white",
                width
              )}
              style={{ borderColor: "var(--details-divider)", ...FONT }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Rows */}
        {seasons.length === 0 ? (
          <div
            className="flex h-16 items-center justify-center text-sm"
            style={{ backgroundColor: "var(--details-container-2)", color: "rgba(255,255,255,0.6)", ...FONT }}
          >
            No campaigns configured yet. Click "Add Campaign" to create one.
          </div>
        ) : (
          seasons.map((season, index) => (
            <SettingsRow
              key={season.id}
              season={season}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
