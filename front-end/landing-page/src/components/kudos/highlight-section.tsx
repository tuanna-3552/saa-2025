"use client";

import { useState, useEffect } from "react";
import type { HighlightKudo } from "@/lib/kudos-types";
import HighlightCard from "@/components/kudos/highlight-card";
import FilterDropdown from "@/components/kudos/filter-dropdown";

// HighlightSection: horizontal carousel of highlight kudo cards with prev/next nav.
// Design ref: Figma "B_Highlight" — full-width section, bg #00101A,
// header "HIGHLIGHT KUDOS" in #FFEA9E, cards scrollable with gradient edge masks.

interface HighlightSectionProps {
  kudos: HighlightKudo[];
  hashtags: string[];
  departments: string[];
  activeHashtag: string | null;
  activeDepartment: string | null;
  onHashtagChange: (v: string | null) => void;
  onDepartmentChange: (v: string | null) => void;
  onLike: (kudosId: string) => void;
  onCopyLink: (kudosId: string) => void;
}

export default function HighlightSection({
  kudos,
  hashtags,
  departments,
  activeHashtag,
  activeDepartment,
  onHashtagChange,
  onDepartmentChange,
  onLike,
  onCopyLink,
}: HighlightSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset to first slide whenever the kudos list changes (e.g. filter applied)
  useEffect(() => { setActiveIndex(0); }, [kudos]);

  const total = kudos.length;

  function prev() {
    setActiveIndex((i) => (i - 1 + total) % total);
  }
  function next() {
    setActiveIndex((i) => (i + 1) % total);
  }

  // Show at most 3 cards centered on activeIndex
  const visibleCount = Math.min(3, total);
  const visibleKudos = Array.from({ length: visibleCount }, (_, offset) =>
    kudos[(activeIndex + offset) % total]
  );

  return (
    <section
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        paddingBottom: "40px",
      }}
    >
      {/* Header row */}
      <div
        style={{
          padding: "0 144px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Section label */}
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
            alignItems: "center",
            justifyContent: "space-between",
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
            HIGHLIGHT KUDOS
          </h2>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
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

      {/* Cards carousel area */}
      {total === 0 ? (
        <p
          style={{
            padding: "0 144px",
            color: "#999",
            fontSize: "16px",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontWeight: 700,
          }}
        >
          Không có highlight nào.
        </p>
      ) : (
        <div style={{ position: "relative" }}>
          {/* Left gradient + prev button */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "200px",
              background:
                "linear-gradient(90deg, #00101A 50%, rgba(0,16,26,0) 100%)",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              paddingLeft: "80px",
            }}
          >
            <button
              onClick={prev}
              aria-label="Previous highlight"
              style={{
                width: 80,
                height: 80,
                border: "none",
                borderRadius: "4px",
                background: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                color: "#FFEA9E",
              }}
            >
              ‹
            </button>
          </div>

          {/* Cards row */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "24px",
              overflowX: "hidden",
              paddingLeft: "24px",
            }}
          >
            {visibleKudos.map((kudo, idx) => (
              <HighlightCard
                key={`${kudo.id}-${idx}`}
                kudo={kudo}
                isActive={idx === 0}
                onLike={() => onLike(kudo.id)}
                onCopyLink={() => onCopyLink(kudo.id)}
              />
            ))}
          </div>

          {/* Right gradient + next button */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "200px",
              background:
                "linear-gradient(270deg, #00101A 50%, rgba(0,16,26,0) 100%)",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: "40px",
            }}
          >
            <button
              onClick={next}
              aria-label="Next highlight"
              style={{
                width: 80,
                height: 80,
                border: "none",
                borderRadius: "4px",
                background: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                color: "#FFEA9E",
              }}
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* Pagination row */}
      {total > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          <button
            onClick={prev}
            aria-label="Previous page"
            style={{
              width: 48,
              height: 48,
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "24px",
              color: "#999999",
            }}
          >
            ‹
          </button>
          <span
            style={{
              fontSize: "28px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
              lineHeight: "36px",
              color: "#999999",
            }}
          >
            {activeIndex + 1}/{total}
          </span>
          <button
            onClick={next}
            aria-label="Next page"
            style={{
              width: 48,
              height: 48,
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "24px",
              color: "#999999",
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
