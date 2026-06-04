"use client";

import { useTranslation } from "@/hooks/use-translation";

export default function RootFurtherContent() {
  const { t } = useTranslation();
  return (
    <section
      id="root-further"
      style={{
        width: "100%",
        padding: "0 144px",
        boxSizing: "border-box",
      }}
    >
      {/* Outer card — 1152×1219, bg dark, border-radius 8, padding 120 104 */}
      <div
        style={{
          margin: "0 auto",
          maxWidth: "1152px",
          width: "100%",
          borderRadius: "8px",
          padding: "120px 0",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* Decorative ROOT FURTHER text — two-layer image stack */}
        {/* Group 434: 290×134, centered */}
        <div
          style={{
            position: "relative",
            width: "290px",
            height: "134px",
            flexShrink: 0,
          }}
        >
          {/* MM_MEDIA_Root Text — top half (189×67) */}
          <img
            src="/home/root-text.png"
            alt="ROOT"
            style={{
              position: "absolute",
              top: 0,
              left: "51px", // (290-189)/2 ≈ 50.5 => offset from group container
              width: "189px",
              height: "67px",
              objectFit: "contain",
            }}
          />
          {/* MM_MEDIA_Further Text — bottom half (290×67) */}
          <img
            src="/home/further-text.png"
            alt="FURTHER"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "290px",
              height: "67px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Content block — mms_B4_content */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {/* Body paragraph 1 */}
          <p
            style={{
              margin: 0,
              marginBottom: "32px",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "32px",
              textAlign: "justify",
              color: "rgba(255,255,255,1)",
              whiteSpace: "pre-line",
            }}
          >
            {t("rootFurther.body1")}
          </p>

          {/* Quote */}
          <p
            style={{
              margin: 0,
              marginBottom: "32px",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "32px",
              textAlign: "center",
              color: "rgba(255,255,255,1)",
              whiteSpace: "pre-line",
            }}
          >
            {t("rootFurther.quote")}
          </p>

          {/* Body paragraph 2 */}
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "32px",
              textAlign: "justify",
              color: "rgba(255,255,255,1)",
              whiteSpace: "pre-line",
            }}
          >
            {t("rootFurther.body2")}
          </p>
        </div>
      </div>
    </section>
  );
}
