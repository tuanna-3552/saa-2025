"use client";

// KudosBanner: full-width keyvisual hero for the Kudos Live Board page.
// Design ref: Figma "Keyvisual" + "Bìa > Frame 487"
// Background: MM_MEDIA_KV Background (1440x512 PNG), overlaid with dark gradient.
// Uses inline styles to match Figma tokens exactly.

export default function KudosBanner() {
  return (
    <section
      style={{
        width: "100%",
        height: "512px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#00101A",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('/kudos/kv-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay matching Figma "Cover" rect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,16,26,0.35) 0%, rgba(0,16,26,0.70) 100%)",
        }}
      />

      {/* Content: headline + KUDOS logo text */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 144px 48px",
          boxSizing: "border-box",
        }}
      >
        {/* Tagline */}
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

        {/* KUDOS large text logo */}
        <p
          style={{
            margin: "8px 0 0",
            fontSize: "100px",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontWeight: 700,
            lineHeight: "104px",
            color: "#DBD1C1",
            letterSpacing: "-8px",
            textTransform: "uppercase" as const,
          }}
        >
          KUDOS
        </p>
      </div>
    </section>
  );
}
