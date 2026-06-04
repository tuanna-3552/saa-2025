"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SortIcon } from "@/components/ui/sort-icon";
import type { UserRow } from "@/hooks/use-users";
import { UserTableRow } from "./user-row";
import { useTranslation } from "@/hooks/use-translation";

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
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center text-sm" style={{ color: "rgba(255,255,255,0.6)", ...FONT }}>
        {t("common.loading")}
      </div>
    );
  }

  const columns = [
    { label: t("common.id"),                                                    width: "w-[50px]" },
    { label: t("users.table.user"),                                             width: "w-[140px]" },
    { label: t("users.table.email"),                                            width: "flex-1 min-w-[160px]" },
    { label: `${t("users.table.sentKudos")} (${totalSentKudos})`,              width: "w-[170px]", sortCol: "kudos_sent" as SortCol },
    { label: `${t("users.table.receivedKudos")} (${totalReceivedKudos})`,      width: "w-[210px]", sortCol: "kudos_received" as SortCol },
    { label: t("users.table.totalHeart"),                                       width: "w-[110px]", sortCol: "total_hearts" as SortCol },
    { label: t("users.table.level"),                                            width: "w-[80px]",  sortCol: "level" as SortCol },
    { label: t("users.table.badges"),                                           width: "w-[150px]", sortCol: "badge_count" as SortCol },
    { label: t("users.table.timeToBadges"),                                     width: "w-[180px]", sortCol: "time_to_6_badges" as SortCol },
    { label: t("users.table.lastLoggedIn"),                                     width: "w-[140px]", sortCol: "last_logged_in" as SortCol },
    { label: t("users.table.role"),                                             width: "w-[80px]" },
    { label: t("common.actions"),                                               width: "w-[70px]" },
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
            {t("users.table.noFound")}
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
