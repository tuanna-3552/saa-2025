"use client";

export interface AwardInfoCardProps {
  id: string;
  label: string;
  description: string;
  qty: string;
  unit: string;
  value: string;
  valueNote: string;
  /** Path to 336×336px trophy image. Empty string → styled placeholder rendered instead. */
  image: string;
}

function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="8" stroke="#FFEA9E" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="4" stroke="#FFEA9E" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1.5" fill="#FFEA9E" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M10 2L18 8L10 18L2 8L10 2Z" stroke="#FFEA9E" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="2" y1="8" x2="18" y2="8" stroke="#FFEA9E" strokeWidth="1.5" />
    </svg>
  );
}

function LicenseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="8" r="5" stroke="#FFEA9E" strokeWidth="1.5" />
      <path d="M7 13L5 19L10 17L15 19L13 13" stroke="#FFEA9E" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function AwardImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      style={{
        width: 336,
        height: 336,
        borderRadius: "16px",
        backgroundColor: "#091620",
        border: "1px solid rgba(255,234,158,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          color: "#FFEA9E",
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "14px",
          fontWeight: 700,
          textAlign: "center",
          padding: "16px",
          lineHeight: "20px",
        }}
      >
        {label}
      </span>
    </div>
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
  image,
}: AwardInfoCardProps) {
  return (
    <section
      id={id}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}
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
        {/* Image — left side, always */}
        {image ? (
          <img
            src={image}
            alt={label}
            width={336}
            height={336}
            style={{
              width: 336,
              height: 336,
              objectFit: "contain",
              flexShrink: 0,
              borderRadius: "16px",
            }}
          />
        ) : (
          <AwardImagePlaceholder label={label} />
        )}

        {/* Content — right side */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0" }}>
          {/* Title row */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <TargetIcon />
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
