"use client";

import { useState } from "react";

// KudosBanner: full hero section combining keyvisual + tagline + KUDOS logo + pill buttons.
// Design ref: Figma "Keyvisual" (y=0-512) + "Frame 487" (y=184) + "Button chuc nang" (y=408-480).
// Everything overlays a single 512px background — pills are INSIDE the hero, not below it.

export default function KudosBanner() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <section
        style={{
          width: "100%",
          height: "512px",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#00101A",
        }}
      >
        {/* MM_MEDIA_KV Background — 1440×512, Figma: 101.245% 393.038%, position 0 -909.862px */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/kudos/kv-background.png')",
            backgroundSize: "101.245% 393.038%",
            backgroundPosition: "0px -909.862px",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Cover overlay — Figma: starts at y=445, linear-gradient(25deg, #00101A 14.74%, transparent 47.8%) */}
        <div
          style={{
            position: "absolute",
            top: 445,
            left: 0,
            right: 0,
            height: "957px",
            background:
              "linear-gradient(25deg, #00101A 14.74%, rgba(0, 19, 32, 0.00) 47.8%)",
          }}
        />

        {/* A_KV Kudos — tagline + KUDOS logo at canvas y=184, x=144 */}
        <div
          style={{
            position: "absolute",
            top: 184,
            left: 144,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "36px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
              lineHeight: "44px",
              color: "#FFEA9E",
              letterSpacing: 0,
            }}
          >
            Hệ thống ghi nhận và cảm ơn
          </p>

          {/* MM_MEDIA_Kudos logo — 593×103px at y=238 */}
          <img
            src="/kudos/kudos-logo.svg"
            alt="KUDOS"
            width={593}
            height={103}
            style={{ display: "block" }}
          />
        </div>

        {/* Button chuc nang — pill buttons at canvas y=408, 32px from hero bottom */}
        <div
          style={{
            position: "absolute",
            top: 408,
            left: 0,
            right: 0,
            padding: "0 144px",
            display: "flex",
            flexDirection: "row",
            gap: "32px",
            boxSizing: "border-box",
          }}
        >
          {/* A.1_Button ghi nhận — width=738px */}
          <button
            onClick={() => setDialogOpen(true)}
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
            <img
              src="/kudos/pen.svg"
              alt=""
              aria-hidden
              width={24}
              height={24}
              style={{ flexShrink: 0 }}
            />
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

          {/* Tìm kiếm sunner — width=381px */}
          <button
            onClick={() => setDialogOpen(true)}
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
            <img
              src="/kudos/search.svg"
              alt=""
              aria-hidden
              width={24}
              height={24}
              style={{ flexShrink: 0 }}
            />
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
        </div>
      </section>

      {/* "Coming soon" dialog */}
      {dialogOpen && (
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
          onClick={() => setDialogOpen(false)}
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
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                fontWeight: 700,
                color: "#FFEA9E",
                lineHeight: "32px",
              }}
            >
              Tính năng ghi nhận sẽ sớm ra mắt.
            </p>
            <button
              onClick={() => setDialogOpen(false)}
              style={{
                marginTop: "24px",
                padding: "12px 32px",
                background: "#FFEA9E",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
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
