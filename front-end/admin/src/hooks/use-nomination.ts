"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@saa/shared-ui";

type NominationStatus = Database["public"]["Enums"]["nomination_status"];

export interface NominationDetail {
  id: string;
  status: NominationStatus;
  reason: string | null;
  created_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  reviewer: { full_name: string } | null;
  nominee: {
    full_name: string;
    avatar_url: string | null;
    department: { name: string } | null;
  } | null;
  nominator: {
    full_name: string;
    department: { name: string } | null;
  } | null;
  category: { name: string; description: string | null } | null;
  season: { name: string } | null;
}

export function useNomination(id: string) {
  const [nomination, setNomination] = useState<NominationDetail | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;

    async function fetchNomination() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: queryError } = await supabase
          .from("nominations")
          .select(`
            id, status, reason, created_at, reviewed_at, reviewed_by,
            reviewer:profiles!nominations_reviewed_by_fkey(full_name),
            nominee:profiles!nominations_nominee_id_fkey(
              full_name, avatar_url,
              department:departments(name)
            ),
            nominator:profiles!nominations_nominator_id_fkey(
              full_name,
              department:departments(name)
            ),
            category:award_categories(name, description),
            season:seasons(name)
          `)
          .eq("id", id)
          .single();

        if (queryError) throw queryError;
        if (!cancelled) setNomination(data as unknown as NominationDetail);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load nomination");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchNomination();
    return () => { cancelled = true; };
  }, [id]);

  return { nomination, loading, error };
}
