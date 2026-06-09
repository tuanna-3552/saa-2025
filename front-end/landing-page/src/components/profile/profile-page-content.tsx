"use client";

// ProfilePageContent — client-side orchestrator for /profile and /profile/[userId]
// Auth: resolves session via Supabase. Redirects to /login if no session.
// isOwn: true when viewing own profile (userId prop omitted OR matches session user).
// Data: fetches profile row, stats, and initial feed on mount.

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProfileHero from "@/components/profile/profile-hero";
import ProfileStats from "@/components/profile/profile-stats";
import ProfileFeedSection from "@/components/profile/profile-feed-section";
import { getSupabase } from "@/lib/supabase";
import { getUserStats, getProfileKudosFeed } from "@/lib/kudos-api";
import type { UserStats, KudoPost } from "@/lib/kudos-types";

interface ProfilePageContentProps {
  userId?: string;
}

interface ProfileRow {
  full_name: string;
  avatar_url: string | null;
}

export default function ProfilePageContent({ userId }: ProfilePageContentProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [feed, setFeed] = useState<KudoPost[]>([]);
  const [filter, setFilter] = useState<"received" | "sent">("received");
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isOwn, setIsOwn] = useState(false);
  const [resolvedUserId, setResolvedUserId] = useState<string | null>(null);

  // Track in-flight filter changes to avoid stale updates
  const filterRef = useRef(filter);
  filterRef.current = filter;

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setLoading(true);
      try {
        const supabase = getSupabase();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          router.push("/login");
          return;
        }

        const uid = userId ?? session.user.id;
        const own = !userId || userId === session.user.id;

        if (cancelled) return;
        setIsOwn(own);
        setResolvedUserId(uid);

        const PAGE_SIZE = 10;
        // Parallel: profile + stats + initial feed (fetch PAGE_SIZE+1 to detect hasMore)
        const [profileRes, statsData, feedData] = await Promise.all([
          supabase
            .from("profiles")
            .select("full_name, avatar_url")
            .eq("id", uid)
            .single(),
          getUserStats(uid),
          getProfileKudosFeed(uid, "received", undefined, PAGE_SIZE + 1),
        ]);

        if (cancelled) return;
        if (profileRes.error) throw profileRes.error;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setProfile((profileRes.data as any) ?? { full_name: "", avatar_url: null });
        setStats(statsData);
        const sliced = feedData.slice(0, PAGE_SIZE);
        setFeed(sliced);
        setHasMore(feedData.length > PAGE_SIZE);
        if (sliced.length > 0) {
          setCursor(sliced[sliced.length - 1].createdAt);
        }
      } catch (err) {
        console.error("[ProfilePageContent] init error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => { cancelled = true; };
  }, [userId, router]);

  const PAGE_SIZE = 10;

  async function handleFilterChange(newFilter: "received" | "sent") {
    if (!resolvedUserId) return;
    setFilter(newFilter);
    setCursor(undefined);
    setHasMore(false);
    try {
      const data = await getProfileKudosFeed(resolvedUserId, newFilter, undefined, PAGE_SIZE + 1);
      if (filterRef.current === newFilter) {
        const sliced = data.slice(0, PAGE_SIZE);
        setFeed(sliced);
        setHasMore(data.length > PAGE_SIZE);
        if (sliced.length > 0) setCursor(sliced[sliced.length - 1].createdAt);
      }
    } catch (err) {
      console.error("[ProfilePageContent] filter change error:", err);
    }
  }

  async function handleLoadMore() {
    if (!resolvedUserId || !hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const data = await getProfileKudosFeed(resolvedUserId, filter, cursor, PAGE_SIZE + 1);
      const sliced = data.slice(0, PAGE_SIZE);
      setFeed((prev) => [...prev, ...sliced]);
      setHasMore(data.length > PAGE_SIZE);
      if (sliced.length > 0) setCursor(sliced[sliced.length - 1].createdAt);
    } catch (err) {
      console.error("[ProfilePageContent] load more error:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#00101A" }}>
        <p style={{ fontSize: "20px", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, color: "#FFEA9E", lineHeight: "32px" }}>
          Loading...
        </p>
      </div>
    );
  }

  const profileData = profile ?? { full_name: "", avatar_url: null };
  const EMPTY_STATS = { kudosReceived: 0, kudosSent: 0, heartsReceived: 0, secretBoxesOpened: 0, secretBoxesUnopened: 0 };
  const statsData = stats ?? EMPTY_STATS;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#00101A",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      {/* Keyvisual zone: hero + stats overlaid on dark BG */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ProfileHero
          avatarUrl={profileData.avatar_url}
          fullName={profileData.full_name || "—"}
        />

        <div
          style={{
            background: "#00101A",
            width: "100%",
          }}
        >
          <ProfileStats stats={statsData} isOwn={isOwn} />

          {/* Separator */}
          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              margin: "0 auto",
              height: "1px",
              background: "rgba(46, 57, 64, 1)",
            }}
            aria-hidden="true"
          />

          <div style={{ height: "40px" }} />

          <ProfileFeedSection
            receivedCount={statsData.kudosReceived}
            sentCount={statsData.kudosSent}
            kudos={feed}
            hasMore={hasMore}
            onFilterChange={handleFilterChange}
            onLoadMore={handleLoadMore}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
