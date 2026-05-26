"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

interface CountdownTimerProps {
  targetDate: string;
  redirectTo?: string;
}

function isValidDate(dateStr: string): boolean {
  if (!dateStr) return false;
  return !isNaN(new Date(dateStr).getTime());
}

function calcTimeLeft(targetDate: string): TimeLeft {
  if (!isValidDate(targetDate)) return { days: 0, hours: 0, minutes: 0 };
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
  };
}

function DigitCard({ digit }: { digit: string }) {
  return (
    <div style={{ position: "relative", width: "77px", height: "123px", flexShrink: 0 }}>
      {/* Glassmorphism card background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "8px",
          opacity: 0.5,
          backdropFilter: "blur(25px)",
          background: "linear-gradient(to bottom, white, rgba(255,255,255,0.1))",
          border: "0.75px solid #ffea9e",
        }}
      />
      {/* Digit */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-digital), monospace",
          fontSize: "74px",
          color: "white",
          lineHeight: 1,
        }}
      >
        {digit}
      </div>
    </div>
  );
}

function UnitGroup({ value, label }: { value: number; label: string }) {
  // Cap at 99 — layout supports exactly 2 digit cards
  const digits = String(Math.min(value, 99)).padStart(2, "0");
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "21px" }}>
      <div style={{ display: "flex", gap: "21px", alignItems: "center" }}>
        <DigitCard digit={digits[0]} />
        <DigitCard digit={digits[1]} />
      </div>
      <p
        style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "36px",
          fontWeight: 700,
          lineHeight: "48px",
          color: "white",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function CountdownTimer({ targetDate, redirectTo = "/" }: CountdownTimerProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(targetDate));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Track last minute to skip re-renders when the displayed value hasn't changed
  const lastMinuteRef = useRef<number>(-1);

  useEffect(() => {
    // Reset tracker on prop change to avoid stale-ref skip on first tick
    lastMinuteRef.current = -1;

    // If date is invalid or already expired on mount, show zeros — no redirect
    const targetMs = isValidDate(targetDate) ? new Date(targetDate).getTime() : 0;
    if (!targetMs || targetMs <= Date.now()) return;

    function tick() {
      const diff = targetMs - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        if (intervalRef.current) clearInterval(intervalRef.current);
        router.push(redirectTo);
        return;
      }
      const next = {
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
      };
      // Only re-render when the displayed minute value changes
      if (next.minutes !== lastMinuteRef.current) {
        lastMinuteRef.current = next.minutes;
        setTimeLeft(next);
      }
    }

    intervalRef.current = setInterval(tick, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [targetDate, redirectTo, router]);

  return (
    <div style={{ display: "flex", gap: "60px", alignItems: "center" }}>
      <UnitGroup value={timeLeft.days} label="DAYS" />
      <UnitGroup value={timeLeft.hours} label="HOURS" />
      <UnitGroup value={timeLeft.minutes} label="MINUTES" />
    </div>
  );
}
