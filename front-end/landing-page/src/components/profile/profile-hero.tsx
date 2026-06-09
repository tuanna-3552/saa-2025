// ProfileHero — Section A: Keyvisual background + avatar + name + badge collection row
// Design ref: Figma "mms_A_Info" — 1440px wide, 468px tall, centered column layout
// Avatar: 200px circle (design), rendered responsively. Badge circles: 64px, bg #323231, white border.

interface ProfileHeroProps {
  avatarUrl: string | null;
  fullName: string;
}

// 6 badge placeholder slots (mms_B2_Huy hiệu instances in design)
const BADGE_COUNT = 6;

export default function ProfileHero({ avatarUrl, fullName }: ProfileHeroProps) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "468px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        gap: "32px",
      }}
    >
      {/* Keyvisual background — same as homepage */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/home/keyvisual-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Content column — sits above BG */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          width: "100%",
        }}
      >
        {/* Avatar + Name block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Avatar: 200px circle, white 4px border, grey fallback */}
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "200px",
              border: "4px solid #FFF",
              overflow: "hidden",
              flexShrink: 0,
              background: avatarUrl ? "transparent" : "#4A4A4A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span
                style={{
                  fontSize: "64px",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 700,
                  lineHeight: 1,
                  userSelect: "none",
                }}
                aria-hidden="true"
              >
                {fullName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Name — 36px bold gold, Montserrat */}
          <h1
            style={{
              margin: 0,
              fontSize: "36px",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 700,
              lineHeight: "44px",
              color: "#FFEA9E",
              textAlign: "center",
              letterSpacing: "0px",
            }}
          >
            {fullName}
          </h1>
        </div>

        {/* Badge collection row — mms_A.3_Huy Hiệu */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
              alignItems: "center",
            }}
          >
            {Array.from({ length: BADGE_COUNT }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "100px",
                  border: "2px solid #FFF",
                  background: "#323231",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* "Bộ sưu tập icon của tôi" label */}
          <p
            style={{
              margin: 0,
              fontSize: "22px",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 700,
              lineHeight: "28px",
              color: "#FFF",
              textAlign: "center",
              letterSpacing: "0px",
            }}
          >
            Bộ sưu tập icon của tôi
          </p>
        </div>
      </div>
    </section>
  );
}
