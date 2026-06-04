"use client";

import { useEffect, useState } from "react";
import { AWARDS } from "@/components/award-system/award-data";
import { useTranslation } from "@/hooks/use-translation";

export default function AwardNav() {
  const { t } = useTranslation();
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
      aria-label={t("awardSystem.navAriaLabel")}
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
            {/* MM_MEDIA_Target — exact path from /public/icons/MM_MEDIA_Target.svg */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.84 21.79 9.69 21.39 8.61L19.79 10.21C19.93 10.8 20 11.4 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C12.6 4 13.2 4.07 13.79 4.21L15.4 2.6C14.31 2.21 13.16 2 12 2ZM19 2L15 6V7.5L12.45 10.05C12.3 10 12.15 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.85 14 11.7 13.95 11.55L16.5 9H18L22 5H19V2ZM12 6C10.4087 6 8.88258 6.63214 7.75736 7.75736C6.63214 8.88258 6 10.4087 6 12C6 13.5913 6.63214 15.1174 7.75736 16.2426C8.88258 17.3679 10.4087 18 12 18C13.5913 18 15.1174 17.3679 16.2426 16.2426C17.3679 15.1174 18 13.5913 18 12H16C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8V6Z"
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
