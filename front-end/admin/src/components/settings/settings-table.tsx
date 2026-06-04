"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { Season } from "@/hooks/use-seasons";
import { SettingsRow } from "./settings-row";
import { useTranslation } from "@/hooks/use-translation";

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
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center text-sm" style={{ color: "rgba(255,255,255,0.6)", ...FONT }}>
        {t("common.loading")}
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
    { label: t("common.id"),        width: "w-[80px] justify-center" },
    { label: t("settings.table.name"),   width: "flex-1 min-w-[200px]" },
    { label: t("settings.table.time"),   width: "w-[400px]" },
    { label: t("common.actions"),   width: "w-[100px] justify-end pr-6" },
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
            {t("settings.table.noCampaigns")}
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
