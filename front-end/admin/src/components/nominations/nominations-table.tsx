"use client";

import { cn } from "@/lib/utils";
import { SortIcon } from "@/components/ui/sort-icon";
import { NominationTableRow } from "./nomination-row";
import type { NominationRow } from "@/hooks/use-nominations";

export type { NominationRow };
export type HeartSort = "asc" | "desc" | null;

const FONT = { fontFamily: "var(--font-montserrat)" };

interface NominationsTableProps {
  nominations: NominationRow[];
  loading: boolean;
  error: string | null;
  onRowClick: (id: string) => void;
  onAction: (id: string, action: "approved" | "rejected") => Promise<void>;
  searchQuery?: string;
  heartSort?: HeartSort;
  onHeartSortChange?: (sort: HeartSort) => void;
}


export function NominationsTable({
  nominations,
  loading,
  error,
  onRowClick,
  onAction,
  searchQuery = "",
  heartSort = null,
  onHeartSortChange,
}: NominationsTableProps) {
  if (loading) {
    return (
      <div
        className="flex h-48 items-center justify-center text-sm"
        style={{ color: "rgba(255,255,255,0.6)", ...FONT }}
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
          ...FONT,
        }}
      >
        {error}
      </div>
    );
  }

  function cycleHeartSort() {
    if (!onHeartSortChange) return;
    onHeartSortChange(heartSort === null ? "desc" : heartSort === "desc" ? "asc" : null);
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center" style={{ backgroundColor: "var(--details-container)" }}>
        <HeaderCell width="w-[60px]">ID</HeaderCell>
        <HeaderCell width="w-[150px]">Sender</HeaderCell>
        <HeaderCell width="w-[160px]">Receiver</HeaderCell>
        <HeaderCell width="flex-1 min-w-[200px]">Content</HeaderCell>
        <HeaderCell width="w-[180px]">Hashtag</HeaderCell>
        <HeaderCell width="w-[100px]">
          <button
            type="button"
            onClick={cycleHeartSort}
            className={cn(
              "flex items-center gap-1 transition-colors",
              heartSort ? "text-white" : "text-white hover:text-white/80"
            )}
            style={heartSort ? { color: "var(--details-text-primary-1)" } : {}}
          >
            Heart
            <SortIcon dir={heartSort} />
          </button>
        </HeaderCell>
        <HeaderCell width="w-[100px]">Status</HeaderCell>
        <HeaderCell width="w-[120px]">Actions</HeaderCell>
      </div>

      {/* Rows */}
      {nominations.map((row, index) => (
        <NominationTableRow
          key={row.id}
          row={row}
          index={index}
          onClick={onRowClick}
          onAction={onAction}
          searchQuery={searchQuery}
        />
      ))}

      {nominations.length === 0 && (
        <div
          className="flex h-16 items-center justify-center text-sm"
          style={{ backgroundColor: "var(--details-container-2)", color: "rgba(255,255,255,0.6)", ...FONT }}
        >
          No nominations found
        </div>
      )}
    </div>
  );
}

function HeaderCell({ width, children }: { width: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex h-12 shrink-0 items-center border-b px-3",
        "text-sm font-medium tracking-[0.1px] text-white",
        width
      )}
      style={{ borderColor: "var(--details-divider)", fontFamily: "var(--font-montserrat)" }}
    >
      {children}
    </div>
  );
}
