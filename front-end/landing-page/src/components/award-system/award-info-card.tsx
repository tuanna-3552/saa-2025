"use client";

export interface AwardInfoCardProps {
  id: string;
  label: string;
  description: string;
  qty: string;
  unit: string;
  value: string;
  valueNote: string;
  /** Award name overlay — combined with /home/award-bg.png (same pattern as home AwardCard) */
  nameImage: string;
  nameImageWidth: number;
  nameImageHeight: number;
  /** true = image on left, false = image on right. Alternates per design (D.1/D.3/D.5 = left). */
  imageLeft?: boolean;
}

// MM_MEDIA_Target — circular arc with arrowhead (goal/navigation icon)
function TargetIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      {/* Arc: most of a circle, gap at upper-right */}
      <path
        d="M17.66 6.34A8 8 0 1 0 20 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Arrowhead at gap end (upper-right) */}
      <path
        d="M20 7V12L15.5 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// MM_MEDIA_Diamond — gem/diamond shape
function DiamondIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 3L20.5 10L12 21L3.5 10L12 3Z" stroke="#FFEA9E" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="3.5" y1="10" x2="20.5" y2="10" stroke="#FFEA9E" strokeWidth="1.5" />
    </svg>
  );
}

// MM_MEDIA_License — pin/badge icon (used for value row)
function LicenseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        stroke="#FFEA9E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.5" stroke="#FFEA9E" strokeWidth="1.5" />
    </svg>
  );
}

export default function AwardInfoCard({
  id,
  label,
  description,
  qty,
  unit,
  value,
  valueNote,
  nameImage,
  nameImageWidth,
  nameImageHeight,
  imageLeft = false,
}: AwardInfoCardProps) {
  const trophyBlock = (
    <div
      style={{
        position: "relative",
        width: 336,
        height: 336,
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287",
        border: "0.955px solid #FFEA9E",
        flexShrink: 0,
        mixBlendMode: "screen",
      }}
    >
      <img
        src="/home/award-bg.png"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={nameImage}
          alt={label}
          style={{ width: nameImageWidth, height: nameImageHeight, objectFit: "contain" }}
        />
      </div>
    </div>
  );

  const contentBlock = (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Title row */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <TargetIcon color="#FFEA9E" />
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "28px",
            fontWeight: 700,
            lineHeight: "36px",
            color: "rgba(255,255,255,1)",
          }}
        >
          {label}
        </h3>
      </div>

      {/* Description */}
      <p
        style={{
          margin: "0 0 32px",
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "24px",
          color: "rgba(255,255,255,0.9)",
          textAlign: "justify",
        }}
      >
        {description}
      </p>

      {/* Divider */}
      <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.12)", marginBottom: "24px" }} />

      {/* Quantity row */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <DiamondIcon />
        <span
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            color: "#FFEA9E",
          }}
        >
          Số lượng giải thưởng:
        </span>
        <span
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "40px",
            fontWeight: 700,
            lineHeight: "48px",
            color: "#FFEA9E",
          }}
        >
          {qty}
        </span>
        {unit && (
          <span
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
              alignSelf: "flex-end",
              paddingBottom: "4px",
            }}
          >
            {unit}
          </span>
        )}
      </div>

      {/* Divider */}
      <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.12)", marginBottom: "24px" }} />

      {/* Value row */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <LicenseIcon />
          <span
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#FFEA9E",
            }}
          >
            Giá trị giải thưởng:
          </span>
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: "56px",
            color: "#FFEA9E",
          }}
        >
          {value}
        </p>
        {valueNote && (
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {valueNote}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section
      id={id}
      style={{ width: "100%", display: "flex", flexDirection: "column" }}
    >
      <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.12)" }} />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "80px",
          alignItems: "flex-start",
          padding: "64px 0",
        }}
      >
        {imageLeft ? (
          <>
            {trophyBlock}
            {contentBlock}
          </>
        ) : (
          <>
            {contentBlock}
            {trophyBlock}
          </>
        )}
      </div>
    </section>
  );
}
