"use client";

import { cn } from "@/lib/utils";
import type { UserRow } from "@/hooks/use-users";
import { formatDateTime } from "@/lib/format";

const CELL = "flex shrink-0 items-center border-b px-3 py-3";
const TEXT = "text-sm font-normal tracking-[0.25px] text-white";
const FONT = { fontFamily: "var(--font-montserrat)" };
const DIVIDER = { borderColor: "var(--details-divider)" };

export interface UserTableRowProps {
  user: UserRow;
  index: number;
}

export function UserTableRow({ user, index }: UserTableRowProps) {
  const isEven = index % 2 === 0;
  const roleLabel = user.role === "admin" ? "Admin" : "User";

  return (
    <div
      className="flex items-stretch"
      style={{ backgroundColor: isEven ? "var(--details-container-2)" : "var(--details-container)" }}
    >
      {/* ID */}
      <div className={cn(CELL, TEXT, "w-[50px]")} style={{ ...DIVIDER, ...FONT }}>
        {index + 1}
      </div>

      {/* User — name only */}
      <div className={cn(CELL, TEXT, "w-[140px]")} style={{ ...DIVIDER, ...FONT }}>
        <span className="truncate">{user.full_name}</span>
      </div>

      {/* Email */}
      <div className={cn(CELL, "flex-1 min-w-[160px]")} style={{ ...DIVIDER, ...FONT }}>
        <span className="truncate text-sm font-normal tracking-[0.25px] text-white/60">{user.email}</span>
      </div>

      {/* Σ sent Kudos (100) */}
      <div className={cn(CELL, TEXT, "w-[170px]")} style={{ ...DIVIDER, ...FONT }}>
        {user.kudos_sent}
      </div>

      {/* Σ Received Kudos (100) */}
      <div className={cn(CELL, TEXT, "w-[210px]")} style={{ ...DIVIDER, ...FONT }}>
        {user.kudos_received}
      </div>

      {/* Total Heart */}
      <div
        className={cn(CELL, "w-[110px] text-sm font-normal tracking-[0.25px]")}
        style={{ ...DIVIDER, ...FONT, color: "#f87171" }}
      >
        {user.total_hearts}
      </div>

      {/* Level */}
      <div className={cn(CELL, TEXT, "w-[80px]")} style={{ ...DIVIDER, ...FONT }}>
        {user.level ?? "-"}
      </div>

      {/* Number of Badges */}
      <div className={cn(CELL, TEXT, "w-[150px]")} style={{ ...DIVIDER, ...FONT }}>
        {user.badge_count}
      </div>

      {/* Time to get 6 Badges */}
      <div
        className={cn(CELL, "w-[180px] text-sm font-normal tracking-[0.25px]")}
        style={{ ...DIVIDER, ...FONT, color: user.time_to_6_badges ? "white" : "rgba(255,255,255,0.35)" }}
      >
        {formatDateTime(user.time_to_6_badges)}
      </div>

      {/* Last Logged In */}
      <div
        className={cn(CELL, "w-[140px] text-sm font-normal tracking-[0.25px]")}
        style={{ ...DIVIDER, ...FONT, color: user.last_logged_in ? "white" : "rgba(255,255,255,0.35)" }}
      >
        {formatDateTime(user.last_logged_in)}
      </div>

      {/* Role */}
      <div className={cn(CELL, TEXT, "w-[80px]")} style={{ ...DIVIDER, ...FONT }}>
        {roleLabel}
      </div>

      {/* Actions — circle with 3 horizontal dots */}
      <div className={cn(CELL, "w-[70px]")} style={{ ...DIVIDER, ...FONT }}>
        <button
          type="button"
          title="Actions"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          style={{ color: "white", border: "2px solid white" }}
        >
          <svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor" aria-hidden="true">
            <circle cx="2" cy="2" r="1.5" />
            <circle cx="8" cy="2" r="1.5" />
            <circle cx="14" cy="2" r="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
