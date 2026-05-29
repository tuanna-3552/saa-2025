"use client";

export interface AwardInfoCardProps {
  id: string;
  label: string;
  description: string;
  qty: string;
  unit: string;
  value: string;
  valueNote: string;
  /** Award name overlay image — combined with /home/award-bg.png, same as home AwardCard */
  nameImage: string;
  nameImageWidth: number;
  nameImageHeight: number;
}

// MM_MEDIA_Target — circular target with navigation cursor inside
function TargetIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <path d="M8.5 15.5L12 8.5L16 11L12 12.5L8.5 15.5Z" fill={color} />
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

// MM_MEDIA_License — medal/badge shape
function LicenseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="9" r="5.25" stroke="#FFEA9E" strokeWidth="1.5" />
      <path d="M8.5 13.5L7 21L12 18.5L17 21L15.5 13.5" stroke="#FFEA9E" strokeWidth="1.5" strokeLinejoin="round" />
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
}: AwardInfoCardProps) {
  return (
    <section
      id={id}
      style={{ width: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* Top separator */}
      <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.12)" }} />

      {/* Card content row */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "80px",
          alignItems: "flex-start",
          padding: "64px 0",
        }}
      >
        {/* Trophy image — composite pattern identical to home AwardCard */}
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

        {/* Content — right side */}
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
      </div>
    </section>
  );
}
