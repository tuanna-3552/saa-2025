export interface AwardCardProps {
  /** Award background image path */
  bgImage: string;
  /** Award name logo image path (stylized text image from Figma) */
  nameImage: string;
  /** Award name image dimensions */
  nameImageWidth: number;
  nameImageHeight: number;
  /** Plain-text award title (for accessibility / fallback) */
  title: string;
  /** Description text */
  description: string;
  /** Detail link href */
  detailHref: string;
}

export default function AwardCard({
  bgImage,
  nameImage,
  nameImageWidth,
  nameImageHeight,
  title,
  description,
  detailHref,
}: AwardCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "336px",
        flexShrink: 0,
      }}
    >
      {/* Award picture — 336×336, mix-blend-mode: screen */}
      <div
        style={{
          position: "relative",
          width: "336px",
          height: "336px",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287",
          border: "0.955px solid #FFEA9E",
          flexShrink: 0,
          mixBlendMode: "screen",
        }}
      >
        {/* Background image */}
        <img
          src={bgImage}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Award name logo — centered */}
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
            alt={title}
            style={{
              width: `${nameImageWidth}px`,
              height: `${nameImageHeight}px`,
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Text block + CTA — 336×144 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          width: "100%",
        }}
      >
        {/* Award title */}
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "32px",
            color: "#FFEA9E",
          }}
        >
          {title}
        </p>

        {/* Description — capped at 2 lines per spec C2.1.3 */}
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
            letterSpacing: "0.5px",
            color: "rgba(255,255,255,1)",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>

        {/* Chi tiết link */}
        {/* TODO: /awards/{id} pages not yet built — href="#" placeholder */}
        <a
          href={detailHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "16px 0",
            height: "56px",
            textDecoration: "none",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
            letterSpacing: "0.15px",
            color: "rgba(255,255,255,1)",
            transition: "color 0.15s ease",
            boxSizing: "border-box",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "#FFEA9E";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,1)";
          }}
        >
          Chi tiết
          {/* Arrow icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>
  );
}
