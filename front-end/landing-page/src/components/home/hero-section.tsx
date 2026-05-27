import CountdownTimer from "@/components/countdown-timer";

// Award ceremony date — driven by NEXT_PUBLIC_EVENT_DATE env var; falls back to Figma design value
const EVENT_DATE = process.env.NEXT_PUBLIC_EVENT_DATE ?? "2025-12-26T00:00:00";
const EVENT_DATE_DISPLAY = "26/12/2025";
const EVENT_LOCATION = "Âu Cơ Art Center";
const LIVESTREAM_NOTE = "Tường thuật trực tiếp qua sóng Livestream";

export default function HeroSection() {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Keyvisual background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="/home/keyvisual-bg.png"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>

      {/* Cover overlay — bottom fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(0deg, #00101A 0%, rgba(0,16,26,0.6) 40%, rgba(0,0,0,0) 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "96px 144px",
          maxWidth: "1512px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Frame 487 wrapper — max 1224px */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            maxWidth: "1224px",
            width: "100%",
          }}
        >
          {/* ROOT FURTHER logo image — 451×200 */}
          <div>
            <img
              src="/home/root-further-logo.png"
              alt="ROOT FURTHER"
              style={{
                display: "block",
                width: "451px",
                height: "200px",
                objectFit: "contain",
                objectPosition: "left center",
              }}
            />
          </div>

          {/* Countdown + event info block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* mms_B1_Countdown time */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Coming soon label */}
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  lineHeight: "32px",
                  color: "rgba(255,255,255,1)",
                }}
              >
                Comming soon
              </p>

              {/* Countdown timer — reusing existing component */}
              <CountdownTimer targetDate={EVENT_DATE} redirectTo="/home" />
            </div>

            {/* mms_B2_Thông tin sự kiện */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* Date + Location row */}
              <div style={{ display: "flex", alignItems: "center", gap: "60px" }}>
                {/* Date */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: "24px",
                      letterSpacing: "0.15px",
                      color: "rgba(255,255,255,1)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Thời gian:{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      lineHeight: "32px",
                      color: "#FFEA9E",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {EVENT_DATE_DISPLAY}
                  </span>
                </div>
                {/* Location */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: "24px",
                      letterSpacing: "0.15px",
                      color: "rgba(255,255,255,1)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Địa điểm:
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      lineHeight: "32px",
                      color: "#FFEA9E",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {EVENT_LOCATION}
                  </span>
                </div>
              </div>

              {/* Livestream note */}
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  letterSpacing: "0.5px",
                  color: "rgba(255,255,255,1)",
                }}
              >
                {LIVESTREAM_NOTE}
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            {/* Primary: ABOUT AWARDS */}
            <a
              href="#awards"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 24px",
                height: "60px",
                background: "rgba(255,234,158,1)",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                textDecoration: "none",
                transition: "background 0.2s ease, transform 0.15s ease",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,222,100,1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,234,158,1)";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: "28px",
                  color: "rgba(0,16,26,1)",
                  whiteSpace: "nowrap",
                }}
              >
                ABOUT AWARDS
              </span>
              {/* Arrow icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(0,16,26,1)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            {/* Secondary: ABOUT KUDOS */}
            {/* TODO: /kudos page not yet built — href="#" placeholder */}
            <a
              href="#kudos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 24px",
                height: "60px",
                background: "rgba(255,234,158,0.10)",
                border: "1px solid #998C5F",
                borderRadius: "8px",
                cursor: "pointer",
                textDecoration: "none",
                transition: "background 0.2s ease",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,234,158,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,234,158,0.10)";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: "28px",
                  color: "rgba(255,255,255,1)",
                  whiteSpace: "nowrap",
                }}
              >
                ABOUT KUDOS
              </span>
              {/* Arrow icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,1)"
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
      </div>
    </section>
  );
}
