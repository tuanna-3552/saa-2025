"use client";

// ProfileFeedSection — Sections C+D: "KUDOS" header, filter dropdown, feed cards
// Design ref: Figma "mms_C_Header Giải thưởng" (C) + "mms_D_Post all" (D)
// Header: "Sun* Annual Awards 2025" 24px white + "KUDOS" 57px gold + filter button
// Feed: KudosCard list. Empty state. "Xem thêm" load-more if hasMore.

import { useState } from "react";
import type { KudoPost } from "@/lib/kudos-types";
import KudosCard from "@/components/kudos/kudos-card";
import ProfileFeedFilter from "@/components/profile/profile-feed-filter";

type FeedFilter = "received" | "sent";

interface ProfileFeedSectionProps {
  receivedCount: number;
  sentCount: number;
  kudos: KudoPost[];
  hasMore: boolean;
  onFilterChange: (f: FeedFilter) => void;
  onLoadMore: () => void;
}

export default function ProfileFeedSection({ receivedCount, sentCount, kudos, hasMore, onFilterChange, onLoadMore }: ProfileFeedSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("received");

  function handleFilterChange(f: FeedFilter) {
    setActiveFilter(f);
    onFilterChange(f);
  }

  return (
    <section style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "0px 16px 80px" }}>
      <div style={{ width: "100%", maxWidth: "680px" }}>

        {/* Section C — Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
          {/* "Sun* Annual Awards 2025" */}
          <p style={{ margin: 0, fontSize: "24px", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, lineHeight: "32px", color: "#FFF", letterSpacing: "0px" }}>
            Sun* Annual Awards 2025
          </p>

          {/* Divider — rgba(46, 57, 64, 1) matches design "Rectangle 26" */}
          <div style={{ width: "100%", height: "1px", background: "rgba(46, 57, 64, 1)" }} aria-hidden="true" />

          {/* KUDOS title + filter row */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: "57px", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, lineHeight: "64px", color: "#FFEA9E", letterSpacing: "-0.25px" }}>
              KUDOS
            </h2>
            <ProfileFeedFilter
              activeFilter={activeFilter}
              receivedCount={receivedCount}
              sentCount={sentCount}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        {/* Section D — Feed */}
        {kudos.length === 0 ? (
          <p style={{ margin: "40px 0", textAlign: "center", fontSize: "18px", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.5)", lineHeight: "28px" }}>
            Chưa có kudos nào
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {kudos.map((kudo) => (
              <KudosCard
                key={kudo.id}
                kudo={kudo}
                onLike={() => {}}
                onCopyLink={() => {
                  navigator.clipboard?.writeText(`${window.location.origin}/kudos/${kudo.id}`).catch(() => {});
                }}
              />
            ))}
          </div>
        )}

        {/* Load more */}
        {hasMore && kudos.length > 0 && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <button
              onClick={onLoadMore}
              style={{ padding: "16px 48px", background: "transparent", border: "1px solid #998C5F", borderRadius: "4px", cursor: "pointer", fontSize: "16px", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, color: "#FFEA9E", letterSpacing: "0.15px", transition: "background 200ms ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,234,158,0.10)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
