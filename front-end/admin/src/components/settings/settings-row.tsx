"use client";

import { cn } from "@/lib/utils";
import type { Season } from "@/hooks/use-seasons";
import { formatDateTime } from "@/lib/format";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/use-translation";

interface SettingsRowProps {
  season: Season;
  index: number;
  onEdit: (season: Season) => void;
  onDelete: (season: Season) => void;
}

const CELL = "flex shrink-0 items-center border-b px-3 py-3";
const TEXT = "text-sm font-normal tracking-[0.25px] text-white";
const FONT = { fontFamily: "var(--font-montserrat)" };
const DIVIDER = { borderColor: "var(--details-divider)" };

export function SettingsRow({
  season,
  index,
  onEdit,
  onDelete,
}: SettingsRowProps) {
  const { t } = useTranslation();
  const isEven = index % 2 === 0;

  return (
    <div
      className="flex items-stretch animate-fade-in"
      style={{
        backgroundColor: isEven ? "var(--details-container-2)" : "var(--details-container)",
        transition: "background-color 0.2s",
      }}
    >
      {/* Column: ID */}
      <div
        className={cn(CELL, TEXT, "w-[80px] justify-center")}
        style={{ ...DIVIDER, ...FONT, color: "rgba(255, 255, 255, 0.6)" }}
      >
        {index + 1}
      </div>

      {/* Column: Name */}
      <div
        className={cn(CELL, TEXT, "flex-1 min-w-[200px]")}
        style={{ ...DIVIDER, ...FONT }}
      >
        <span className="truncate">{season.name}</span>
      </div>

      {/* Column: Time */}
      <div
        className={cn(CELL, "w-[400px] text-sm font-normal tracking-[0.25px] text-white/70")}
        style={{ ...DIVIDER, ...FONT }}
      >
        {season.voting_start && season.voting_end ? (
          <div className="flex items-center gap-2">
            <span>{formatDateTime(season.voting_start)}</span>
            <span className="text-white/30">—</span>
            <span>{formatDateTime(season.voting_end)}</span>
          </div>
        ) : (
          <span className="text-white/30">{t("settings.table.notConfigured")}</span>
        )}
      </div>

      {/* Column: Actions */}
      <div
        className={cn(CELL, "w-[100px] justify-end pr-6")}
        style={{ ...DIVIDER, ...FONT }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              style={{ color: "white", border: "2px solid white" }}
              title="Actions"
            >
              <svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor" aria-hidden="true">
                <circle cx="2" cy="2" r="1.5" />
                <circle cx="8" cy="2" r="1.5" />
                <circle cx="14" cy="2" r="1.5" />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-36 border bg-[#0A0E12] p-1.5 shadow-xl"
            style={{
              borderColor: "var(--details-border)",
              borderRadius: "8px",
            }}
          >
            {/* Custom hover styles */}
            <style dangerouslySetInnerHTML={{ __html: `
              .edit-item, .delete-item {
                background-color: transparent !important;
                color: rgba(255, 255, 255, 0.9) !important;
                transition: all 0.2s;
              }
              .edit-item[data-highlighted], .edit-item:hover,
              .delete-item[data-highlighted], .delete-item:hover {
                background-color: #161C20 !important;
                color: #FFEA9E !important;
                text-shadow: 0 0 8px rgba(250,226,135,0.8) !important;
              }
              .edit-item svg, .delete-item svg {
                color: rgba(255, 255, 255, 0.6) !important;
                transition: all 0.2s;
              }
              .edit-item[data-highlighted] svg, .edit-item:hover svg,
              .delete-item[data-highlighted] svg, .delete-item:hover svg {
                color: #FFEA9E !important;
                filter: drop-shadow(0 0 4px rgba(250,226,135,0.8)) !important;
              }
            `}} />

            {/* Edit Action */}
            <DropdownMenuItem
              onClick={() => onEdit(season)}
              className="edit-item flex items-center gap-3 px-3 py-2.5 text-sm font-semibold cursor-pointer rounded-md"
              style={{
                fontFamily: "var(--font-montserrat)",
              }}
            >
              {/* Pencil Icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
              {t("common.edit")}
            </DropdownMenuItem>

            {/* Delete Action */}
            <DropdownMenuItem
              onClick={() => onDelete(season)}
              className="delete-item flex items-center gap-3 px-3 py-2.5 text-sm font-semibold cursor-pointer rounded-md"
              style={{
                fontFamily: "var(--font-montserrat)",
              }}
            >
              {/* Cross X Icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              {t("common.delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
