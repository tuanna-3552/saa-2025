"use client";

import { useEffect, useRef } from "react";
import type { KudoPost } from "@/lib/kudos-types";
import KudosCard from "@/components/kudos/kudos-card";
import FilterDropdown from "@/components/kudos/filter-dropdown";

// KudosFeed: scrollable list of kudo posts with Intersection Observer pagination.
// Design ref: Figma "C.2_Danh sách lời cảm ơn" — 680px wide column, gap 24px.
// Header "ALL KUDOS" in #FFEA9E 57px bold, section label above.

interface KudosFeedProps {
  kudos: KudoPost[];
  hasMore: boolean;
  onLoadMore: () => void;
  hashtags: string[];
  departments: string[];
  activeHashtag: string | null;
  activeDepartment: string | null;
  onHashtagChange: (v: string | null) => void;
  onDepartmentChange: (v: string | null) => void;
  onLike: (kudosId: string) => void;
  onCopyLink: (kudosId: string) => void;
  onHashtagClick?: (tag: string) => void;
}

export default function KudosFeed({
  kudos,
  hasMore,
  onLoadMore,
  hashtags,
  departments,
  activeHashtag,
  activeDepartment,
  onHashtagChange,
  onDepartmentChange,
  onLike,
  onCopyLink,
  onHashtagClick,
}: KudosFeedProps) {
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
      {/* Section header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
        <p
          style={{
            margin: 0,
            fontSize: "24px",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontWeight: 700,
            lineHeight: "32px",
            color: "#FFFFFF",
          }}
        >
          Sun* Annual Awards 2025
        </p>
        <hr style={{ border: "none", borderTop: "1px solid #2E3940", margin: 0 }} />

        {/* Title + filters */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "57px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
              lineHeight: "64px",
              letterSpacing: "-0.25px",
              color: "#FFEA9E",
            }}
          >
            ALL KUDOS
          </h2>

          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            <FilterDropdown
              label="Hashtag"
              options={hashtags}
              value={activeHashtag}
              onChange={onHashtagChange}
            />
            <FilterDropdown
              label="Phòng ban"
              options={departments}
              value={activeDepartment}
              onChange={onDepartmentChange}
            />
          </div>
        </div>
      </div>

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
            Hiện tại chưa có Kudos nào.
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
          <div ref={sentinelRef} style={{ height: "1px", width: "100%" }} aria-hidden />
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
            Đã hiển thị tất cả kudo.
          </p>
        )}
      </div>
    </div>
  );
}
