"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@saa/shared-ui";

export type NominationStatus = Database["public"]["Enums"]["nomination_status"];
export type StatusFilter = NominationStatus | "all";

export interface NominationRow {
  id: string;
  nominee_id: string;
  nominator_id: string;
  season_id: string;
  category_id: string;
  status: NominationStatus;
  reason: string | null;
  created_at: string;
  vote_count: number;
  nominee: { full_name: string; avatar_url: string | null; department: { name: string } | null } | null;
  nominator: { full_name: string; avatar_url: string | null; department: { name: string } | null } | null;
  category: { name: string } | null;
  season: { name: string } | null;
}

export interface NominationListFilters {
  status: StatusFilter;
  dateFrom: string | null;
  dateTo: string | null;
  refreshToken?: number;
}

const DEFAULT_FILTERS: NominationListFilters = { status: "all", dateFrom: null, dateTo: null };

export function useNominations(filters: NominationListFilters = DEFAULT_FILTERS) {
  const [nominations, setNominations] = useState<NominationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchNominations() {
      setLoading(true);
      setError(null);
      try {
        let query = supabase
          .from("nominations")
          .select(`
            id, nominee_id, nominator_id, season_id, category_id,
            status, reason, created_at,
            nominee:profiles!nominations_nominee_id_fkey(full_name, avatar_url, department:departments(name)),
            nominator:profiles!nominations_nominator_id_fkey(full_name, avatar_url, department:departments(name)),
            category:award_categories(name),
            season:seasons(name)
          `)
          .order("created_at", { ascending: false });

        if (filters.status !== "all") query = query.eq("status", filters.status);
        if (filters.dateFrom) query = query.gte("created_at", filters.dateFrom);
        if (filters.dateTo) query = query.lte("created_at", `${filters.dateTo}T23:59:59.999Z`);

        const { data, error: queryError } = await query;
        if (queryError) throw queryError;

        const rows = (data ?? []) as unknown as Omit<NominationRow, "vote_count">[];

        // Parallel vote count query — only fetch votes for the nominees we just loaded
        let voteCountMap: Record<string, number> = {};
        const nomineeIds = [...new Set(rows.map((r) => r.nominee_id))];
        if (nomineeIds.length > 0) {
          const { data: votes } = await supabase
            .from("votes")
            .select("nominee_id, season_id, category_id")
            .in("nominee_id", nomineeIds);
          for (const v of votes ?? []) {
            const key = `${v.nominee_id}-${v.season_id}-${v.category_id}`;
            voteCountMap[key] = (voteCountMap[key] ?? 0) + 1;
          }
        }

        const merged: NominationRow[] = rows.map((r) => ({
          ...r,
          vote_count: voteCountMap[`${r.nominee_id}-${r.season_id}-${r.category_id}`] ?? 0,
        }));

        if (!cancelled) setNominations(merged);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load nominations");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchNominations();
    return () => { cancelled = true; };
  }, [filters.status, filters.dateFrom, filters.dateTo, filters.refreshToken]);

  return { nominations, loading, error };
}
