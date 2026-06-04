"use client";

import { useMemo, useState } from "react";
import { useUsers, type UserRow } from "@/hooks/use-users";
import { UsersFilterBar } from "@/components/users/users-filter-bar";
import { UsersTable, type SortCol, type SortDir } from "@/components/users/users-table";
import { formatDateShort, formatDateTime } from "@/lib/format";
import { UsersPagination } from "@/components/users/users-pagination";
import { useTranslation } from "@/hooks/use-translation";

const PAGE_SIZE = 10;

const BOM = "﻿";

function escapeCSV(val: string | number | null | undefined): string {
  if (val === undefined || val === null) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export default function UsersPage() {
  const { t } = useTranslation();
  const [deptFilter, setDeptFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sortCol, setSortCol] = useState<SortCol>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);

  const { users, departments, loading, error } = useUsers();

  const filtered = useMemo<UserRow[]>(() => {
    let rows = users;

    if (deptFilter) rows = rows.filter((u) => u.department === deptFilter);
    if (roleFilter) rows = rows.filter((u) => u.role === roleFilter);
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (u) =>
          u.full_name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }

    if (sortCol) {
      rows = [...rows].sort((a, b) => {
        // Use "" for nulls on string/date columns so they sort last; -1 for numeric columns
        const fallback = (sortCol === "time_to_6_badges" || sortCol === "last_logged_in") ? "" : -1;
        const av = (a[sortCol] ?? fallback) as string | number;
        const bv = (b[sortCol] ?? fallback) as string | number;
        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return rows;
  }, [users, deptFilter, roleFilter, search, sortCol, sortDir]);

  function handleSort(col: SortCol) {
    setPage(1);
    if (sortCol === col) {
      if (sortDir === "desc") setSortDir("asc");
      else { setSortCol(null); }
    } else {
      setSortCol(col);
      setSortDir("desc");
    }
  }

  const totalSentKudos = useMemo(() => filtered.reduce((sum, u) => sum + u.kudos_sent, 0), [filtered]);
  const totalReceivedKudos = useMemo(() => filtered.reduce((sum, u) => sum + u.kudos_received, 0), [filtered]);

  function handleExport() {
    const headers = [
      "ID", "Name", "Email", "Department",
      `Σ sent Kudos (${totalSentKudos})`, `Σ Received Kudos (${totalReceivedKudos})`, "Total Hearts",
      "Level", "Badges", "Time to 4 Badges", "Last Logged In", "Role",
    ];
    const rows = filtered.map((u, i) => [
      i + 1,
      escapeCSV(u.full_name),
      escapeCSV(u.email),
      escapeCSV(u.department),
      u.kudos_sent,
      u.kudos_received,
      u.total_hearts,
      u.level ?? "-",
      u.badge_count,
      escapeCSV(formatDateShort(u.time_to_6_badges)),
      escapeCSV(formatDateTime(u.last_logged_in)),
      escapeCSV(u.role === "admin" ? "Admin" : "User"),
    ].join(","));

    const csv = BOM + [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    // Delay revocation so browsers have time to initiate the download
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  // Re-declare totalPages and paginatedUsers below the dynamic sum variables
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginatedUsers = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  return (
    <main className="flex flex-col gap-6 px-20 py-8" style={{ fontFamily: "var(--font-montserrat)" }}>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h1
          className="font-normal leading-[52px]"
          style={{ fontSize: "45px", color: "var(--details-text-secondary-1)", fontFamily: "var(--font-montserrat)" }}
        >
          {t("users.title")}
        </h1>
        <button
          type="button"
          onClick={handleExport}
          className="rounded px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "var(--details-text-primary-1)",
            color: "var(--details-container)",
            fontFamily: "var(--font-montserrat)",
          }}
        >
          {t("common.export")}
        </button>
      </div>

      {/* Filters */}
      <UsersFilterBar
        departments={departments}
        deptFilter={deptFilter}
        levelFilter={levelFilter}
        roleFilter={roleFilter}
        search={search}
        onDeptChange={(v) => { setDeptFilter(v); setPage(1); }}
        onLevelChange={(v) => { setLevelFilter(v); setPage(1); }}
        onRoleChange={(v) => { setRoleFilter(v); setPage(1); }}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
      />

      {/* Error */}
      {error && (
        <p className="text-sm" style={{ color: "var(--details-error)" }}>
          {error}
        </p>
      )}

      {/* Row count */}
      {!loading && !error && (
        <span
          className="self-end text-sm"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-montserrat)" }}
        >
          {filtered.length} user{filtered.length !== 1 ? "s" : ""}
        </span>
      )}

      {/* Table */}
      <UsersTable
        users={paginatedUsers}
        loading={loading}
        sortCol={sortCol}
        sortDir={sortDir}
        onSort={handleSort}
        totalSentKudos={totalSentKudos}
        totalReceivedKudos={totalReceivedKudos}
      />

      <UsersPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </main>
  );
}
