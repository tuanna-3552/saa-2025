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

// Exact paths extracted from /public/icons/MM_MEDIA_*.svg (fill="white" → fill={color})

function TargetIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.84 21.79 9.69 21.39 8.61L19.79 10.21C19.93 10.8 20 11.4 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C12.6 4 13.2 4.07 13.79 4.21L15.4 2.6C14.31 2.21 13.16 2 12 2ZM19 2L15 6V7.5L12.45 10.05C12.3 10 12.15 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.85 14 11.7 13.95 11.55L16.5 9H18L22 5H19V2ZM12 6C10.4087 6 8.88258 6.63214 7.75736 7.75736C6.63214 8.88258 6 10.4087 6 12C6 13.5913 6.63214 15.1174 7.75736 16.2426C8.88258 17.3679 10.4087 18 12 18C13.5913 18 15.1174 17.3679 16.2426 16.2426C17.3679 15.1174 18 13.5913 18 12H16C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8V6Z" fill={color} />
    </svg>
  );
}

function DiamondIcon({ color = "#FFEA9E" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M16 9H19L14 16M10 9H14L12 17M5 9H8L10 16M15 4H17L19 7H16M11 4H13L14 7H10M7 4H9L8 7H5M6 2L2 8L12 22L22 8L18 2H6Z" fill={color} />
    </svg>
  );
}

function LicenseIcon({ color = "#FFEA9E" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M9.00108 10.0008C9.01144 9.20834 9.33084 8.45128 9.89122 7.8909C10.4516 7.33053 11.2087 7.01113 12.0011 7.00077C12.7935 7.01113 13.5506 7.33053 14.1109 7.8909C14.6713 8.45128 14.9907 9.20834 15.0011 10.0008C14.9907 10.7932 14.6713 11.5503 14.1109 12.1106C13.5506 12.671 12.7935 12.9904 12.0011 13.0008C11.2087 12.9904 10.4516 12.671 9.89122 12.1106C9.33084 11.5503 9.01144 10.7932 9.00108 10.0008ZM12.0011 19.0008L16.0011 20.0008V16.9208C14.7948 17.6472 13.4091 18.0214 12.0011 18.0008C10.5931 18.0214 9.20741 17.6472 8.00108 16.9208V20.0008M12.0011 4.00077C11.2131 3.98639 10.4304 4.13333 9.70125 4.43256C8.9721 4.73179 8.31185 5.17698 7.76108 5.74077C7.1912 6.29214 6.74085 6.95487 6.43807 7.68774C6.13529 8.42061 5.98654 9.20795 6.00108 10.0008C5.99066 10.7886 6.14141 11.5702 6.44407 12.2976C6.74673 13.025 7.19491 13.6829 7.76108 14.2308C8.30928 14.8 8.96838 15.2507 9.69765 15.5552C10.4269 15.8596 11.2109 16.0113 12.0011 16.0008C12.7913 16.0113 13.5752 15.8596 14.3045 15.5552C15.0338 15.2507 15.6929 14.8 16.2411 14.2308C16.8073 13.6829 17.2554 13.025 17.5581 12.2976C17.8608 11.5702 18.0115 10.7886 18.0011 10.0008C18.0156 9.20795 17.8669 8.42061 17.5641 7.68774C17.2613 6.95487 16.811 6.29214 16.2411 5.74077C15.6903 5.17698 15.0301 4.73179 14.3009 4.43256C13.5718 4.13333 12.7891 3.98639 12.0011 4.00077ZM20.0011 10.0008C19.9798 10.9607 19.7867 11.909 19.4311 12.8008C19.1107 13.7082 18.6259 14.5489 18.0011 15.2808V23.0008L12.0011 21.0008L6.00108 23.0008V15.2808C4.70677 13.8272 3.99458 11.947 4.00108 10.0008C3.98346 8.95135 4.18112 7.90946 4.58187 6.93942C4.98261 5.96937 5.57793 5.09176 6.33108 4.36077C7.06479 3.60087 7.94645 2.9994 8.92165 2.5935C9.89684 2.1876 10.9449 1.98587 12.0011 2.00077C13.0573 1.98587 14.1053 2.1876 15.0805 2.5935C16.0557 2.9994 16.9374 3.60087 17.6711 4.36077C18.4242 5.09176 19.0196 5.96937 19.4203 6.93942C19.821 7.90946 20.0187 8.95135 20.0011 10.0008Z" fill={color} />
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
