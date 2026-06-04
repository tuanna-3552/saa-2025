"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "@/hooks/use-translation";
import type { KudoPost } from "@/lib/kudos-types";
import KudosCard from "@/components/kudos/kudos-card";

// KudosFeed: scrollable list of kudo posts with Intersection Observer pagination.
// Design ref: Figma "C.2_Danh sách lời cảm ơn" — 680px wide column, gap 24px.
// Section header (Sun* Annual Awards 2025 / ALL KUDOS) is rendered full-width in the parent page.

interface KudosFeedProps {
  kudos: KudoPost[];
  hasMore: boolean;
  onLoadMore: () => void;
  onLike: (kudosId: string) => void;
  onCopyLink: (kudosId: string) => void;
  onHashtagClick?: (tag: string) => void;
}

export default function KudosFeed({
  kudos,
  hasMore,
  onLoadMore,
  onLike,
  onCopyLink,
  onHashtagClick,
}: KudosFeedProps) {
  const { t } = useTranslation();
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore();
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, onLoadMore]);

  return (
    <div style={{ flex: "0 0 680px", display: "flex", flexDirection: "column", gap: "0" }}>
      {/* Feed list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {kudos.length === 0 ? (
          <p
            style={{
              color: "#999",
              fontSize: "16px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
            }}
          >
            {t("kudos.feed.empty")}
          </p>
        ) : (
          kudos.map((kudo) => (
            <KudosCard
              key={kudo.id}
              kudo={kudo}
              onLike={() => onLike(kudo.id)}
              onCopyLink={() => onCopyLink(kudo.id)}
              onHashtagClick={onHashtagClick}
            />
          ))
        )}

        {/* Intersection sentinel for infinite scroll */}
        {hasMore && (
          <div ref={sentinelRef} data-testid="infinite-scroll-sentinel" style={{ height: "1px", width: "100%" }} />
        )}

        {!hasMore && kudos.length > 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#999",
              fontSize: "14px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
              padding: "24px 0",
            }}
          >
            {t("kudos.feed.allShown")}
          </p>
        )}
      </div>
    </div>
  );
}
