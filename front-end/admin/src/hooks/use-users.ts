"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type UserRow = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  role: "admin" | "employee";
  department: string | null;
  kudos_sent: number;
  kudos_received: number;
  total_hearts: number;
  level: number | null;
  badge_count: number;
  time_to_6_badges: string | null;
  last_logged_in: string | null;
};

export type UserListFilters = {
  department?: string;
  role?: string;
  refreshToken?: number;
};

type ProfileRow = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  role: "admin" | "employee";
  department_id: string | null;
  level: number;
  last_logged_in: string | null;
  departments: { id: string; name: string } | null;
};

export function useUsers(filters?: UserListFilters) {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setLoading(true);
      setError(null);

      try {
        const [
          profilesRes,
          kudosSentRes,
          kudosReceivedRes,
          votesRes,
          resultsRes,
        ] = await Promise.all([
          supabase
            .from("profiles")
            .select("id, full_name, email, avatar_url, role, department_id, level, last_logged_in, departments(id, name)")
            .order("full_name"),
          supabase
            .from("nominations")
            .select("nominator_id")
            .eq("status", "approved"),
          supabase
            .from("nominations")
            .select("nominee_id, status"),
          supabase
            .from("votes")
            .select("nominee_id"),
          supabase
            .from("results")
            .select("winner_id, announced_at")
            .order("announced_at"),
        ]);

        if (profilesRes.error) throw new Error(profilesRes.error.message);
        if (kudosSentRes.error) throw new Error(kudosSentRes.error.message);
        if (kudosReceivedRes.error) throw new Error(kudosReceivedRes.error.message);
        if (votesRes.error) throw new Error(votesRes.error.message);
        if (resultsRes.error) throw new Error(resultsRes.error.message);

        // Build aggregate maps
        const kudosSentMap = new Map<string, number>();
        for (const row of kudosSentRes.data ?? []) {
          kudosSentMap.set(row.nominator_id, (kudosSentMap.get(row.nominator_id) ?? 0) + 1);
        }

        // Denominator = all nominations regardless of status (pending + approved + rejected).
        // Numerator = approved only. Gives "what fraction of nominations this user received were approved."
        const kudosReceivedTotal = new Map<string, number>();
        const kudosReceivedApproved = new Map<string, number>();
        for (const row of kudosReceivedRes.data ?? []) {
          kudosReceivedTotal.set(row.nominee_id, (kudosReceivedTotal.get(row.nominee_id) ?? 0) + 1);
          if (row.status === "approved") {
            kudosReceivedApproved.set(row.nominee_id, (kudosReceivedApproved.get(row.nominee_id) ?? 0) + 1);
          }
        }

        const heartsMap = new Map<string, number>();
        for (const row of votesRes.data ?? []) {
          heartsMap.set(row.nominee_id, (heartsMap.get(row.nominee_id) ?? 0) + 1);
        }

        // For badges: count wins and track the date of the 4th win per user
        const badgeCountMap = new Map<string, number>();
        const badgeDatesMap = new Map<string, string[]>();
        for (const row of resultsRes.data ?? []) {
          const count = (badgeCountMap.get(row.winner_id) ?? 0) + 1;
          badgeCountMap.set(row.winner_id, count);
          const dates = badgeDatesMap.get(row.winner_id) ?? [];
          dates.push(row.announced_at);
          badgeDatesMap.set(row.winner_id, dates);
        }

        const profiles = profilesRes.data as ProfileRow[];

        // Collect unique department names
        const deptSet = new Set<string>();
        for (const p of profiles) {
          if (p.departments?.name) deptSet.add(p.departments.name);
        }

        const rows: UserRow[] = profiles.map((p) => {
          const total = kudosReceivedTotal.get(p.id) ?? 0;
          const approved = kudosReceivedApproved.get(p.id) ?? 0;
          const pct = total > 0 ? Math.round((approved / total) * 100) : 0;
          const badgeDates = badgeDatesMap.get(p.id) ?? [];

          return {
            id: p.id,
            full_name: p.full_name,
            email: p.email,
            avatar_url: p.avatar_url,
            role: p.role,
            department: p.departments?.name ?? null,
            kudos_sent: kudosSentMap.get(p.id) ?? 0,
            kudos_received: approved,
            total_hearts: heartsMap.get(p.id) ?? 0,
            level: p.level,
            badge_count: badgeCountMap.get(p.id) ?? 0,
            time_to_6_badges: badgeDates[5] ?? null,
            last_logged_in: p.last_logged_in,
          };
        });

        if (!cancelled) {
          setUsers(rows);
          setDepartments(Array.from(deptSet).sort());
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load users");
          setLoading(false);
        }
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, [filters?.refreshToken]);

  return { users, departments, loading, error };
}
