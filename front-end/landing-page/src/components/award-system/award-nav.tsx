"use client";

import { useEffect, useState } from "react";
import { AWARDS } from "@/components/award-system/award-data";

export default function AwardNav() {
  const [activeId, setActiveId] = useState<string>(AWARDS[0].id);

  useEffect(() => {
    // rootMargin shrinks the detection zone: top = just below sticky header (80px),
    // bottom = -50% so only the top half of the viewport triggers a change.
    // This gives a clean "item becomes active when it enters the top half" feel.
    const observerOptions: IntersectionObserverInit = {
      rootMargin: "-80px 0px -50% 0px",
      threshold: 0,
    };

    const observers = AWARDS.map((award) => {
      const el = document.getElementById(award.id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveId(award.id);
      }, observerOptions);
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      aria-label="Danh mục giải thưởng"
      style={{
        position: "sticky",
        top: "80px",
        alignSelf: "flex-start",
        width: "240px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      {AWARDS.map((award) => {
        const isActive = activeId === award.id;
        return (
          <button
            key={award.id}
            type="button"
            onClick={() => handleClick(award.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 16px",
              background: "transparent",
              border: "none",
              borderBottom: isActive ? "1px solid #FFEA9E" : "1px solid transparent",
              borderRadius: "4px 4px 0 0",
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "20px",
              color: isActive ? "#FFEA9E" : "rgba(255,255,255,0.8)",
              textShadow: isActive ? "0 0 6px rgba(255,234,158,0.4)" : "none",
              transition: "background 0.15s ease, color 0.15s ease",
              boxSizing: "border-box",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.08)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }
            }}
          >
            {/* MM_MEDIA_Target — circle ring + filled navigation cursor (near_me style) */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke={isActive ? "#FFEA9E" : "rgba(255,255,255,0.5)"}
                strokeWidth="1.5"
              />
              <path
                d="M9 15.5L12.5 8.5L16 12L12.5 13L9 15.5Z"
                fill={isActive ? "#FFEA9E" : "rgba(255,255,255,0.5)"}
              />
            </svg>
            <span>{award.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
