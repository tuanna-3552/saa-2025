"use client";

export const runtime = "edge";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthGuard from "@/components/award-system/auth-guard";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import KudosBanner from "@/components/kudos/kudos-banner";
import WriteKudosInput from "@/components/kudos/write-kudos-input";
import HighlightSection from "@/components/kudos/highlight-section";
import SpotlightBoard from "@/components/kudos/spotlight-board";
import KudosFeed from "@/components/kudos/kudos-feed";
import KudosSidebar from "@/components/kudos/kudos-sidebar";
import type { HighlightKudo, KudoPost, SpotlightRecipient, UserStats, PrizeRecipient } from "@/lib/kudos-types";
import {
  getHighlightKudos,
  getAllKudos,
  getSpotlightRecipients,
  getTotalKudosCount,
  getHashtags,
  getDepartments,
  getUserStats,
  getRecentPrizeRecipients,
  getLikedKudosIds,
  toggleLike,
} from "@/lib/kudos-api";
import { getSupabase } from "@/lib/supabase";

const EMPTY_STATS: UserStats = {
  kudosReceived: 0, kudosSent: 0, heartsReceived: 0,
  secretBoxesOpened: 0, secretBoxesUnopened: 0,
};

function applyLiked(posts: KudoPost[], liked: Set<string>): KudoPost[] {
  return posts.map((k) => ({ ...k, likedByCurrentUser: liked.has(k.id) }));
}

function KudosPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const hashtag = searchParams.get("hashtag") ?? undefined;
  const dept = searchParams.get("dept") ?? undefined;

  const [userId, setUserId] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<HighlightKudo[]>([]);
  const [kudos, setKudos] = useState<KudoPost[]>([]);
  const [spotlight, setSpotlight] = useState<SpotlightRecipient[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [stats, setStats] = useState<UserStats>(EMPTY_STATS);
  const [prizes, setPrizes] = useState<PrizeRecipient[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  // Resolve current user once
  useEffect(() => {
    getSupabase()
      .auth.getSession()
      .then(({ data: { session } }) => { if (session?.user?.id) setUserId(session.user.id); });
  }, []);

  // Re-fetch on filter change
  useEffect(() => {
    const filters = { hashtag, department: dept };
    Promise.all([
      getHighlightKudos(filters),
      getAllKudos(filters),
      getSpotlightRecipients(),
      getTotalKudosCount(),
      getHashtags(),
      getDepartments(),
    ]).then(([h, k, s, count, tags, depts]) => {
      setHighlight(applyLiked(h, likedIds));
      setKudos(applyLiked(k, likedIds));
      setSpotlight(s);
      setTotalCount(count);
      setHashtags(tags);
      setDepartments(depts);
      setHasMore(k.length === 10);
      setLoaded(true);
    }).catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashtag, dept]);

  // Sync liked IDs once user resolves
  useEffect(() => {
    if (!userId) return;
    getLikedKudosIds(userId).then((ids) => {
      setLikedIds(ids);
      setHighlight((prev) => applyLiked(prev, ids));
      setKudos((prev) => applyLiked(prev, ids));
    });
    getUserStats(userId).then(setStats);
    getRecentPrizeRecipients().then(setPrizes);
  }, [userId]);

  const handleLoadMore = useCallback(async () => {
    if (!hasMore || kudos.length === 0) return;
    const cursor = kudos[kudos.length - 1].createdAt;
    const more = await getAllKudos({ hashtag, department: dept }, cursor);
    setKudos((prev) => [...prev, ...applyLiked(more, likedIds)]);
    setHasMore(more.length === 10);
  }, [kudos, hasMore, hashtag, dept, likedIds]);

  const setFilter = useCallback((key: "hashtag" | "dept", value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  const handleHashtagChange = useCallback((v: string | null) => setFilter("hashtag", v), [setFilter]);
  const handleDeptChange = useCallback((v: string | null) => setFilter("dept", v), [setFilter]);

  const handleLike = useCallback(async (kudosId: string) => {
    if (!userId) return;
    // Optimistic toggle
    const toggle = (k: KudoPost) => k.id !== kudosId ? k : {
      ...k,
      likeCount: k.likedByCurrentUser ? k.likeCount - 1 : k.likeCount + 1,
      likedByCurrentUser: !k.likedByCurrentUser,
    };
    setKudos((prev) => prev.map(toggle));
    setHighlight((prev) => prev.map(toggle));
    try {
      const { likeCount, liked } = await toggleLike(kudosId, userId);
      const sync = (k: KudoPost) => k.id !== kudosId ? k : { ...k, likeCount, likedByCurrentUser: liked };
      setKudos((prev) => prev.map(sync));
      setHighlight((prev) => prev.map(sync));
      setLikedIds((prev) => { const s = new Set(prev); liked ? s.add(kudosId) : s.delete(kudosId); return s; });
    } catch {
      // Revert
      setKudos((prev) => prev.map(toggle));
      setHighlight((prev) => prev.map(toggle));
    }
  }, [userId]);

  const handleCopyLink = useCallback((kudosId: string) => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(`${window.location.origin}/kudos/${kudosId}`);
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#00101A", fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
      <Header />
      <main>
        <KudosBanner />
        <section style={{ padding: "40px 0 0" }}>
          <WriteKudosInput />
        </section>
        {loaded && (
          <>
            <HighlightSection
              kudos={highlight}
              hashtags={hashtags}
              departments={departments}
              activeHashtag={hashtag ?? null}
              activeDepartment={dept ?? null}
              onHashtagChange={handleHashtagChange}
              onDepartmentChange={handleDeptChange}
              onLike={handleLike}
              onCopyLink={handleCopyLink}
            />
            <SpotlightBoard recipients={spotlight} totalCount={totalCount} />
            <section style={{ width: "100%", padding: "40px 144px 80px", boxSizing: "border-box" }}>
              <div style={{ maxWidth: "1152px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "row", gap: "80px", alignItems: "flex-start" }}>
                <KudosFeed
                  kudos={kudos}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                  hashtags={hashtags}
                  departments={departments}
                  activeHashtag={hashtag ?? null}
                  activeDepartment={dept ?? null}
                  onHashtagChange={handleHashtagChange}
                  onDepartmentChange={handleDeptChange}
                  onLike={handleLike}
                  onCopyLink={handleCopyLink}
                  onHashtagClick={handleHashtagChange}
                />
                <KudosSidebar stats={stats} recentPrizeRecipients={prizes} />
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function KudosPage() {
  return (
    <AuthGuard>
      <Suspense>
        <KudosPageContent />
      </Suspense>
    </AuthGuard>
  );
}
