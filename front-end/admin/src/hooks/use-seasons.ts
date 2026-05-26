"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@saa/shared-ui";

export type Season = Database["public"]["Tables"]["seasons"]["Row"];
export type NewSeason = Database["public"]["Tables"]["seasons"]["Insert"];
export type UpdateSeason = Database["public"]["Tables"]["seasons"]["Update"];

export function useSeasons() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchSeasons() {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("seasons")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) throw err;
      setSeasons(data || []);
    } catch (e: any) {
      setError(e.message || "Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  }

  async function addSeason(season: NewSeason) {
    const { data, error: err } = await supabase
      .from("seasons")
      .insert([season])
      .select();

    if (err) throw err;
    await fetchSeasons();
    return data?.[0];
  }

  async function updateSeason(id: string, updates: UpdateSeason) {
    const { data, error: err } = await supabase
      .from("seasons")
      .update(updates)
      .eq("id", id)
      .select();

    if (err) throw err;
    await fetchSeasons();
    return data?.[0];
  }

  async function deleteSeason(id: string) {
    const { error: err } = await supabase
      .from("seasons")
      .delete()
      .eq("id", id);

    if (err) throw err;
    await fetchSeasons();
  }

  useEffect(() => {
    fetchSeasons();
  }, []);

  return {
    seasons,
    loading,
    error,
    refresh: fetchSeasons,
    addSeason,
    updateSeason,
    deleteSeason,
  };
}
