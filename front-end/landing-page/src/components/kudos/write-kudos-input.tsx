"use client";

import { useState } from "react";
import WriteKudosDialog from "./write-kudos-dialog";

// WriteKudosInput: pill-shaped action bar — opens Write Kudos modal on click.
// Design ref: Figma "Button chuc nang" — two pill buttons side by side.

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
          <img src="/kudos/pen.svg" alt="" aria-hidden width={24} height={24} style={{ flexShrink: 0 }} />
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
          <img src="/kudos/search.svg" alt="" aria-hidden width={24} height={24} style={{ flexShrink: 0 }} />
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

      {open && <WriteKudosDialog onClose={() => setOpen(false)} />}
    </>
  );
}
