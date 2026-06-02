"use client";

import { useEffect, useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import NotificationBadge from "./notification-badge";
import LanguageToggle from "./language-toggle";
import AccountMenu from "./account-menu";

export interface UserMenuProps {
  session?: Session | null;
}

export default function UserMenu(_props: UserMenuProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    let cancelled = false;

    async function load() {
      try {
        const supabase = getSupabase();
        const {
          data: { session: s },
        } = await supabase.auth.getSession();
        if (cancelled || !s) return;
        setSession(s);

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", s.user.id)
          .single();

        if (!cancelled) setIsAdmin(profile?.role === "admin");
      } catch {
        // browser-only client — swallow errors during SSR or missing env
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Close account menu when clicking outside
  useEffect(() => {
    if (!accountOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [accountOpen]);

  // Avoid flash — render nothing until client-side hydration
  if (!mounted || !session) return null;

  return (
    <div
      ref={containerRef}
      style={{ display: "flex", alignItems: "center", gap: "24px" }}
    >
      {/* TODO: replace stub count=0 with real Supabase query when notifications table exists */}
      <NotificationBadge count={0} />
      <LanguageToggle />

      {/* Account icon + dropdown */}
      <div style={{ position: "relative" }}>
        <button
          type="button"
          aria-label="Tài khoản"
          aria-expanded={accountOpen}
          onClick={() => setAccountOpen((o) => !o)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            background: accountOpen ? "rgba(255,255,255,0.08)" : "transparent",
            border: "1px solid #998C5F",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background 0.15s ease",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(e) => {
            if (!accountOpen)
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>

        {accountOpen && (
          <AccountMenu isAdmin={isAdmin} onClose={() => setAccountOpen(false)} />
        )}
      </div>
    </div>
  );
}
