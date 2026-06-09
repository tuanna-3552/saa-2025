"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/use-translation";

interface Recipient {
  id: string;
  name: string;
}

interface NotifItem {
  id: number;
  time: string;
  name: string;
}

interface SpotlightNotifFeedProps {
  recipients: Recipient[];
  intervalMs?: number;
  maxItems?: number;
}

// Module-level ever-incrementing ID — never resets across renders/StrictMode double-invocations
let _notifId = 0;
const nextNotifId = () => _notifId++;

// Deterministic recipient picker — avoids Math.random()
function pickRecipient(recipients: Recipient[], counter: number): Recipient {
  const x = Math.sin(counter * 127.1 + 31.415) * 43758.5453;
  const idx = Math.abs(Math.floor(x - Math.floor(x)) * recipients.length) % recipients.length;
  return recipients[idx];
}

export default function SpotlightNotifFeed({
  recipients,
  intervalMs = 3000,
  maxItems = 5,
}: SpotlightNotifFeedProps) {
  const { t } = useTranslation();
  const [notifs, setNotifs] = useState<NotifItem[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    if (recipients.length === 0) return;

    const makeTime = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    // Seed with initial items — use module-level ID so re-runs never collide
    const initial: NotifItem[] = recipients.slice(0, maxItems).map((r) => ({
      id: nextNotifId(),
      time: makeTime(),
      name: r.name,
    }));
    counter.current = initial.length;
    setNotifs(initial);

    const intervalId = setInterval(() => {
      const r = pickRecipient(recipients, counter.current);
      setNotifs((prev) => [
        ...prev.slice(-(maxItems - 1)),
        { id: nextNotifId(), time: makeTime(), name: r.name },
      ]);
      counter.current++;
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [recipients, intervalMs, maxItems]);

  return (
    <>
      <div className="spotlight-notif-feed">
        {notifs.map((n, i) => {
          const isNewest = i === notifs.length - 1;
          // opacity ramp: oldest=0.2 → newest=1.0
          const opacity = notifs.length === 1 ? 1 : 0.2 + (i / (notifs.length - 1)) * 0.8;
          return (
            <div
              key={n.id}
              style={{
                opacity,
                fontSize: "13px",
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                fontWeight: isNewest ? 700 : 400,
                lineHeight: "20px",
                whiteSpace: "nowrap",
                animation: isNewest ? "notif-slide-in 0.4s ease-out" : "none",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.55)" }}>{n.time} </span>
              <span style={{ color: "#FFFFFF" }}>
                {n.name}
                {t("kudos.spotlight.tickerReceived")}
              </span>
            </div>
          );
        })}
      </div>
      <style>{`
        .spotlight-notif-feed {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        @keyframes notif-slide-in {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}
