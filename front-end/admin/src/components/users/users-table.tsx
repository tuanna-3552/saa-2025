"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SortIcon } from "@/components/ui/sort-icon";
import type { UserRow } from "@/hooks/use-users";
import { UserTableRow } from "./user-row";

export type SortCol =
  | "kudos_sent"
  | "kudos_received"
  | "total_hearts"
  | "level"
  | "badge_count"
  | "time_to_6_badges"
  | "last_logged_in"
  | null;
export type SortDir = "asc" | "desc";

const FONT = { fontFamily: "var(--font-montserrat)" };

export interface UsersTableProps {
  users: UserRow[];
  loading: boolean;
  sortCol: SortCol;
  sortDir: SortDir;
  onSort: (col: SortCol) => void;
  totalSentKudos: number;
  totalReceivedKudos: number;
}

export function UsersTable({
  users,
  loading,
  sortCol,
  sortDir,
  onSort,
  totalSentKudos,
  totalReceivedKudos,
}: UsersTableProps) {
  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center text-sm" style={{ color: "rgba(255,255,255,0.6)", ...FONT }}>
        Loading...
      </div>
    );
  }

  const columns = [
    { label: "ID",                    width: "w-[50px]" },
    { label: "User",                  width: "w-[140px]" },
    { label: "Email",                 width: "flex-1 min-w-[160px]" },
    { label: `Σ sent Kudos (${totalSentKudos})`,     width: "w-[170px]", sortCol: "kudos_sent" as SortCol },
    { label: `Σ Received Kudos (${totalReceivedKudos})`, width: "w-[210px]", sortCol: "kudos_received" as SortCol },
    { label: "Total Heart",           width: "w-[110px]", sortCol: "total_hearts" as SortCol },
    { label: "Level",                 width: "w-[80px]",  sortCol: "level" as SortCol },
    { label: "Number of Badges",      width: "w-[150px]", sortCol: "badge_count" as SortCol },
    { label: "Time to get 6 Badges",  width: "w-[180px]", sortCol: "time_to_6_badges" as SortCol },
    { label: "Last Logged In",        width: "w-[140px]", sortCol: "last_logged_in" as SortCol },
    { label: "Role",                  width: "w-[80px]" },
    { label: "Actions",               width: "w-[70px]" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1540px]">
        {/* Header */}
        <div className="flex items-center" style={{ backgroundColor: "var(--details-container)" }}>
          {columns.map(({ label, width, sortCol: col }) => (
            <div
              key={label}
              className={cn(
                "flex h-12 shrink-0 items-center border-b px-3",
                "text-sm font-medium tracking-[0.1px] text-white",
                width
              )}
              style={{ borderColor: "var(--details-divider)", ...FONT }}
            >
              {col ? (
                <button
                  type="button"
                  onClick={() => onSort(col)}
                  className="flex items-center gap-1 text-white transition-colors hover:opacity-80 whitespace-nowrap"
                  style={sortCol === col ? { color: "var(--details-text-primary-1)" } : {}}
                >
                  {label}
                  <SortIcon dir={sortCol === col ? sortDir : null} />
                </button>
              ) : (
                label
              )}
            </div>
          ))}
        </div>

        {/* Rows */}
        {users.length === 0 ? (
          <div
            className="flex h-16 items-center justify-center text-sm"
            style={{ backgroundColor: "var(--details-container-2)", color: "rgba(255,255,255,0.6)", ...FONT }}
          >
            No users found
          </div>
        ) : (
          users.map((user, index) => (
            <UserTableRow key={user.id} user={user} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
