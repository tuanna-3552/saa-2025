"use client";

import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";
import {
  DepartmentStatsTable,
  type DepartmentStat,
} from "@/components/dashboard/department-stats-table";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";

function escapeCSV(val: string | number | undefined | null): string {
  if (val === undefined || val === null) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DepartmentStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2020, 10, 8),
    to: new Date(2020, 11, 23),
  });

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        let nominationQuery = supabase
          .from("nominations")
          .select("id, nominator_id, nominee_id")
          .eq("status", "approved");

        let voteQuery = supabase
          .from("votes")
          .select("id, nominee_id");

        if (dateRange?.from) {
          const fromDate = new Date(dateRange.from);
          fromDate.setHours(0, 0, 0, 0);
          nominationQuery = nominationQuery.gte("created_at", fromDate.toISOString());
          voteQuery = voteQuery.gte("created_at", fromDate.toISOString());
        }

        if (dateRange?.to) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          nominationQuery = nominationQuery.lte("created_at", toDate.toISOString());
          voteQuery = voteQuery.lte("created_at", toDate.toISOString());
        }

        const [
          deptResult,
          profileResult,
          nominationResult,
          voteResult,
        ] = await Promise.all([
          supabase.from("departments").select("id, name").order("name"),
          supabase
            .from("profiles")
            .select("id, department_id")
            .eq("is_active", true),
          nominationQuery,
          voteQuery,
        ]);

        if (deptResult.error) throw deptResult.error;
        if (profileResult.error) throw profileResult.error;
        if (nominationResult.error) throw nominationResult.error;
        if (voteResult.error) throw voteResult.error;

        const departments = deptResult.data ?? [];
        const profiles = profileResult.data ?? [];
        const nominations = nominationResult.data ?? [];
        const votes = voteResult.data ?? [];

        // Map department_id -> set of profile ids
        const profilesByDept = new Map<string, Set<string>>();
        for (const p of profiles) {
          if (!p.department_id) continue;
          if (!profilesByDept.has(p.department_id)) {
            profilesByDept.set(p.department_id, new Set());
          }
          profilesByDept.get(p.department_id)!.add(p.id);
        }

        const computed: DepartmentStat[] = departments.map((dept) => {
          const memberSet = profilesByDept.get(dept.id) ?? new Set<string>();

          const sentKudos = nominations.filter((n) =>
            memberSet.has(n.nominator_id)
          );
          const receivedKudos = nominations.filter((n) =>
            memberSet.has(n.nominee_id)
          );
          const usersWithKudos = new Set(
            receivedKudos.map((n) => n.nominee_id)
          ).size;
          const receivedSecretBox = votes.filter((v) =>
            memberSet.has(v.nominee_id)
          );

          return {
            id: dept.id,
            name: dept.name,
            totalMember: memberSet.size,
            totalSentKudos: sentKudos.length,
            totalReceivedKudos: receivedKudos.length,
            totalUserWithKudos: usersWithKudos,
            totalReceivedSecretBox: receivedSecretBox.length,
          };
        });

        setStats(computed);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load stats";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [dateRange]);

  const onExport = () => {
    if (stats.length === 0) return;

    const BOM = "\uFEFF";
    const headers = [
      "No",
      "Unit",
      "Total member",
      "Total sent kudos",
      "Total received kudos",
      "Total user have at least kudos",
      "Total received secret box"
    ];

    const rows = stats.map((row, index) => [
      index + 1,
      row.name,
      row.totalMember,
      row.totalSentKudos,
      row.totalReceivedKudos,
      row.totalUserWithKudos,
      row.totalReceivedSecretBox
    ]);

    const csvContent =
      BOM +
      [
        headers.join(","),
        ...rows.map((r) => r.map(escapeCSV).join(",")),
      ].join("\n");

    const getExportFilename = () => {
      if (dateRange?.from && dateRange?.to) {
        return `overview_stats_${format(dateRange.from, "yyyyMMdd")}_to_${format(dateRange.to, "yyyyMMdd")}.csv`;
      } else if (dateRange?.from) {
        return `overview_stats_from_${format(dateRange.from, "yyyyMMdd")}.csv`;
      } else if (dateRange?.to) {
        return `overview_stats_to_${format(dateRange.to, "yyyyMMdd")}.csv`;
      }
      return "overview_stats_all.csv";
    };

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", getExportFilename());
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6 px-20 py-8">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <h1
          className="font-[var(--font-montserrat)] font-normal leading-[52px]"
          style={{
            fontSize: "45px",
            color: "var(--details-text-secondary-1)",
          }}
        >
          Overview
        </h1>
        <div className="flex items-center gap-4">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <button
            type="button"
            onClick={onExport}
            disabled={loading || stats.length === 0}
            className="flex h-10 items-center rounded px-6 font-medium text-base transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Error state */}
      {error && (
        <div
          className="rounded px-4 py-3 text-sm font-[var(--font-montserrat)]"
          style={{
            backgroundColor: "rgba(212, 39, 29, 0.15)",
            color: "var(--details-error)",
            border: "1px solid var(--details-error)",
          }}
        >
          {error}
        </div>
      )}

      {/* Stats table */}
      <DepartmentStatsTable stats={stats} loading={loading} />
    </div>
  );
}
