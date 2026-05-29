"use client";

import { useState } from "react";

// WriteKudosInput: pill-shaped input bar that opens a placeholder dialog.
// Design ref: Figma "Button chuc nang" — two pill buttons side by side.
// Per clarification: placeholder dialog only — "Tính năng ghi nhận sẽ sớm ra mắt."

export default function WriteKudosInput() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        style={{
          width: "100%",
          padding: "0 144px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          gap: "32px",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        {/* Write kudos pill button */}
        <button
          onClick={() => setOpen(true)}
          style={{
            flex: "0 0 738px",
            height: "72px",
            border: "1px solid #998C5F",
            borderRadius: "68px",
            background: "rgba(255, 234, 158, 0.10)",
            display: "flex",
            alignItems: "center",
            padding: "24px 16px",
            gap: "16px",
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          {/* Pen icon placeholder */}
          <span
            style={{ width: 24, height: 24, color: "#FFEA9E", flexShrink: 0 }}
            aria-hidden
          >
            ✏
          </span>
          <span
            style={{
              fontSize: "16px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
              lineHeight: "24px",
              color: "#FFFFFF",
              letterSpacing: "0.15px",
            }}
          >
            Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?
          </span>
        </button>

        {/* Search sunner pill button */}
        <button
          onClick={() => setOpen(true)}
          style={{
            flex: "0 0 381px",
            height: "72px",
            border: "1px solid #998C5F",
            borderRadius: "68px",
            background: "rgba(255, 234, 158, 0.10)",
            display: "flex",
            alignItems: "center",
            padding: "24px 16px",
            gap: "16px",
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{ width: 24, height: 24, color: "#FFEA9E", flexShrink: 0 }}
            aria-hidden
          >
            🔍
          </span>
          <span
            style={{
              fontSize: "16px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
              lineHeight: "24px",
              color: "#FFFFFF",
              letterSpacing: "0.15px",
            }}
          >
            Tìm kiếm profile Sunner
          </span>
        </button>
      </section>

      {/* Placeholder dialog */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Thông báo"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.6)",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              background: "#00070C",
              border: "1px solid #998C5F",
              borderRadius: "17px",
              padding: "40px 48px",
              maxWidth: "480px",
              width: "90%",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p
              style={{
                margin: 0,
                fontSize: "20px",
                fontFamily:
                  "var(--font-montserrat), Montserrat, sans-serif",
                fontWeight: 700,
                color: "#FFEA9E",
                lineHeight: "32px",
              }}
            >
              Tính năng ghi nhận sẽ sớm ra mắt.
            </p>
            <button
              onClick={() => setOpen(false)}
              style={{
                marginTop: "24px",
                padding: "12px 32px",
                background: "#FFEA9E",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontFamily:
                  "var(--font-montserrat), Montserrat, sans-serif",
                fontWeight: 700,
                color: "#00101A",
                cursor: "pointer",
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
