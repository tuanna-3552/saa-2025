"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@saa/shared-ui";

type NominationStatus = Database["public"]["Enums"]["nomination_status"];

export interface NominationRow {
  id: string;
  status: NominationStatus;
  reason: string | null;
  created_at: string;
  nominee: { full_name: string; avatar_url: string | null } | null;
  nominator: { full_name: string } | null;
  category: { name: string } | null;
  season: { name: string } | null;
}

export type StatusFilter = NominationStatus | "all";

export function useNominations(statusFilter: StatusFilter = "all") {
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
            id, status, reason, created_at,
            nominee:profiles!nominations_nominee_id_fkey(full_name, avatar_url),
            nominator:profiles!nominations_nominator_id_fkey(full_name),
            category:award_categories(name),
            season:seasons(name)
          `)
          .order("created_at", { ascending: false });

        if (statusFilter !== "all") {
          query = query.eq("status", statusFilter);
        }

        const { data, error: queryError } = await query;
        if (queryError) throw queryError;
        if (!cancelled) setNominations((data ?? []) as unknown as NominationRow[]);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load nominations");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchNominations();
    return () => { cancelled = true; };
  }, [statusFilter]);

  return { nominations, loading, error };
}
