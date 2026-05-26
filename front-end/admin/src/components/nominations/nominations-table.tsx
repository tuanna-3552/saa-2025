"use client";

import { cn } from "@/lib/utils";
import { NominationTableRow } from "./nomination-row";

export interface NominationRow {
  id: string;
  nominee: { full_name: string; avatar_url: string | null } | null;
  nominator: { full_name: string } | null;
  category: { name: string } | null;
  season: { name: string } | null;
  reason: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

const columns = [
  { key: "no", label: "No", width: "w-[60px]" },
  { key: "nominee", label: "Nominee", width: "w-[180px]" },
  { key: "nominator", label: "Nominator", width: "w-[160px]" },
  { key: "category", label: "Category", width: "w-[140px]" },
  { key: "season", label: "Season", width: "w-[140px]" },
  { key: "reason", label: "Reason", width: "flex-1 min-w-[200px]" },
  { key: "status", label: "Status", width: "w-[110px]" },
  { key: "created_at", label: "Created at", width: "w-[140px]" },
];

interface NominationsTableProps {
  nominations: NominationRow[];
  loading: boolean;
  error: string | null;
  onRowClick: (id: string) => void;
}

export function NominationsTable({
  nominations,
  loading,
  error,
  onRowClick,
}: NominationsTableProps) {
  if (loading) {
    return (
      <div
        className="flex h-48 items-center justify-center text-sm"
        style={{
          color: "rgba(255,255,255,0.6)",
          fontFamily: "var(--font-montserrat)",
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded px-4 py-3 text-sm"
        style={{
          backgroundColor: "rgba(212,39,29,0.15)",
          color: "var(--details-error)",
          border: "1px solid var(--details-error)",
          fontFamily: "var(--font-montserrat)",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max">
        {/* Header */}
        <div
          className="flex items-center"
          style={{ backgroundColor: "var(--details-container)" }}
        >
          {columns.map((col) => (
            <div
              key={col.key}
              className={cn(
                "flex h-12 shrink-0 items-center border-b px-3",
                "text-sm font-medium tracking-[0.1px] text-white",
                col.width
              )}
              style={{
                borderColor: "var(--details-divider)",
                fontFamily: "var(--font-montserrat)",
              }}
            >
              {col.label}
            </div>
          ))}
        </div>

        {/* Rows */}
        {nominations.map((row, index) => (
          <NominationTableRow
            key={row.id}
            row={row}
            index={index}
            onClick={onRowClick}
          />
        ))}

        {nominations.length === 0 && (
          <div
            className="flex h-16 items-center justify-center text-sm"
            style={{
              backgroundColor: "var(--details-container-2)",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            No nominations found
          </div>
        )}
      </div>
    </div>
  );
}
