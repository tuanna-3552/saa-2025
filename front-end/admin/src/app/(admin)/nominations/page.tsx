"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format, startOfMonth, endOfMonth } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useAuth } from "@/hooks/use-auth";
import { useNominations, type StatusFilter, type NominationListFilters, type NominationRow } from "@/hooks/use-nominations";
import { reviewNomination } from "@/lib/review-nomination";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import { NominationsTable, type HeartSort } from "@/components/nominations/nominations-table";
import { NominationsFilterBar } from "@/components/nominations/nominations-status-filter";
import { NominationsPagination } from "@/components/nominations/nominations-pagination";
import type { PersonOption } from "@/components/nominations/person-picker";

const PAGE_SIZE = 10;

function escapeCSV(val: string | number | undefined | null): string {
  if (val === undefined || val === null) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function statusLabel(status: NominationRow["status"]): string {
  if (status === "approved") return "Public";
  if (status === "rejected") return "Spam";
  return "Pending";
}

export default function NominationsPage() {
  const router = useRouter();
  const { user } = useAuth();

  const now = new Date();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(now),
    to: endOfMonth(now),
  });
  const [status, setStatus] = useState<StatusFilter>("all");
  const [refreshToken, setRefreshToken] = useState(0);
  const [page, setPage] = useState(1);
  const [heartSort, setHeartSort] = useState<HeartSort>(null);

  const [senderFilter, setSenderFilter] = useState("");
  const [receiverFilter, setReceiverFilter] = useState("");
  const [search, setSearch] = useState("");

  const serverFilters = useMemo<NominationListFilters>(() => ({
    status,
    dateFrom: dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : null,
    dateTo: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : null,
    refreshToken,
  }), [status, dateRange, refreshToken]);

  const { nominations: rawNominations, loading, error } = useNominations(serverFilters);

  const senderOptions = useMemo<PersonOption[]>(() => {
    const seen = new Set<string>();
    const result: PersonOption[] = [];
    for (const n of rawNominations) {
      const nom = n.nominator;
      if (nom?.full_name && !seen.has(nom.full_name)) {
        seen.add(nom.full_name);
        result.push({ name: nom.full_name, avatar_url: nom.avatar_url, department: nom.department?.name ?? null });
      }
    }
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [rawNominations]);

  const receiverOptions = useMemo<PersonOption[]>(() => {
    const seen = new Set<string>();
    const result: PersonOption[] = [];
    for (const n of rawNominations) {
      const nom = n.nominee;
      if (nom?.full_name && !seen.has(nom.full_name)) {
        seen.add(nom.full_name);
        result.push({ name: nom.full_name, avatar_url: nom.avatar_url, department: nom.department?.name ?? null });
      }
    }
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [rawNominations]);

  const nominations = useMemo(() => {
    let result = rawNominations;
    if (senderFilter) result = result.filter((n) => n.nominator?.full_name === senderFilter);
    if (receiverFilter) result = result.filter((n) => n.nominee?.full_name === receiverFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((n) => n.reason?.toLowerCase().includes(q));
    }
    if (heartSort) {
      result = [...result].sort((a, b) =>
        heartSort === "desc" ? b.vote_count - a.vote_count : a.vote_count - b.vote_count
      );
    }
    return result;
  }, [rawNominations, senderFilter, receiverFilter, search, heartSort]);

  const totalPages = Math.max(1, Math.ceil(nominations.length / PAGE_SIZE));
  const paginatedNominations = useMemo(
    () => nominations.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [nominations, page]
  );

  function handleFilterChange<T>(setter: (v: T) => void) {
    return (v: T) => { setter(v); setPage(1); };
  }

  function handleRowClick(id: string) {
    router.push(`/nominations/${id}`);
  }

  async function handleAction(id: string, action: "approved" | "rejected") {
    if (!user?.id) return;
    await reviewNomination(id, action, user.id);
    setRefreshToken((t) => t + 1);
  }

  function handleExport() {
    if (nominations.length === 0) return;
    const BOM = "﻿";
    const headers = ["No", "Sender", "Receiver", "Content", "Hashtag", "Heart", "Status"];
    const rows = nominations.map((n, i) => [
      i + 1,
      n.nominator?.full_name ?? "",
      n.nominee?.full_name ?? "",
      n.reason ?? "",
      n.category?.name ? `#${n.category.name}` : "",
      n.vote_count,
      statusLabel(n.status),
    ]);
    const csv = BOM + [headers.join(","), ...rows.map((r) => r.map(escapeCSV).join(","))].join("\n");

    const filename = (() => {
      if (dateRange?.from && dateRange?.to)
        return `nominations_${format(dateRange.from, "yyyyMMdd")}_to_${format(dateRange.to, "yyyyMMdd")}.csv`;
      if (dateRange?.from) return `nominations_from_${format(dateRange.from, "yyyyMMdd")}.csv`;
      if (dateRange?.to) return `nominations_to_${format(dateRange.to, "yyyyMMdd")}.csv`;
      return "nominations_all.csv";
    })();

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-6 px-20 py-8">
      {/* Title row: heading + date range + export */}
      <div className="flex items-center justify-between">
        <h1
          className="font-normal leading-[52px]"
          style={{
            fontSize: "45px",
            color: "var(--details-text-secondary-1)",
            fontFamily: "var(--font-montserrat)",
          }}
        >
          Review content
        </h1>
        <div className="flex items-center gap-4">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <button
            type="button"
            disabled={loading || nominations.length === 0}
            onClick={handleExport}
            className="flex h-10 items-center rounded px-6 text-base font-medium transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "var(--details-text-primary-1)",
              color: "var(--details-text-primary-2)",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            Export
          </button>
        </div>
      </div>

      {/* Filter bar: sender / receiver / status / search */}
      <NominationsFilterBar
        sender={senderFilter}
        receiver={receiverFilter}
        status={status}
        search={search}
        senderOptions={senderOptions}
        receiverOptions={receiverOptions}
        onSenderChange={handleFilterChange(setSenderFilter)}
        onReceiverChange={handleFilterChange(setReceiverFilter)}
        onStatusChange={handleFilterChange<StatusFilter>(setStatus)}
        onSearchChange={handleFilterChange(setSearch)}
      />

      {/* Row count */}
      {!loading && !error && (
        <span
          className="self-end text-sm"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-montserrat)" }}
        >
          {nominations.length} nomination{nominations.length !== 1 ? "s" : ""}
        </span>
      )}

      {/* Table */}
      <NominationsTable
        nominations={paginatedNominations}
        loading={loading}
        error={error}
        onRowClick={handleRowClick}
        onAction={handleAction}
        searchQuery={search}
        heartSort={heartSort}
        onHeartSortChange={(s) => { setHeartSort(s); setPage(1); }}
      />

      <NominationsPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
