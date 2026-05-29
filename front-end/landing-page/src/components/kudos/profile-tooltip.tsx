"use client";

import { useState, useRef } from "react";
import type { ReactNode } from "react";

// ProfileTooltip: hover tooltip showing avatar, full name, department, star count.
// Wraps children; tooltip appears above on hover.

interface ProfileTooltipProps {
  avatar: string;
  name: string;
  department: string;
  stars: number;
  children: ReactNode;
}

export default function ProfileTooltip({
  avatar,
  name,
  department,
  stars,
  children,
}: ProfileTooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(true);
  }

  function hide() {
    timerRef.current = setTimeout(() => setVisible(false), 120);
  }

  return (
    <span
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {visible && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 200,
            background: "#00070C",
            border: "1px solid #998C5F",
            borderRadius: "12px",
            padding: "16px",
            width: "220px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            pointerEvents: "none",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "2px solid #FFFFFF",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={avatar}
              alt={name}
              width={56}
              height={56}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>

          {/* Name */}
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: "20px",
            }}
          >
            {name}
          </p>

          {/* Department */}
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 400,
              color: "#999999",
              textAlign: "center",
              lineHeight: "16px",
            }}
          >
            {department}
          </p>

          {/* Stars */}
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
              color: "#FFEA9E",
              textAlign: "center",
            }}
          >
            ★ {stars}
          </p>
        </div>
      )}
    </span>
  );
}
