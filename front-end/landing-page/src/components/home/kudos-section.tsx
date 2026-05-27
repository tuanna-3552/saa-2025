const KUDOS_BODY = `ĐIỂM MỚI CỦA SAA 2025\nHoạt động ghi nhận và cảm ơn đồng nghiệp - lần đầu tiên được diễn ra dành cho tất cả Sunner. Hoạt động sẽ được triển khai vào tháng 11/2025, khuyến khích người Sun* chia sẻ những lời ghi nhận, cảm ơn đồng nghiệp trên hệ thống do BTC công bố. Đây sẽ là chất liệu để Hội đồng Heads tham khảo trong quá trình lựa chọn người đạt giải.`;

export default function KudosSection() {
  return (
    <section
      id="kudos"
      style={{
        width: "100%",
        padding: "0 144px",
        boxSizing: "border-box",
        backgroundColor: "#00101A",
      }}
    >
      <div style={{ maxWidth: "1224px", width: "100%", margin: "0 auto" }}>
        {/* mms_D1_Sunkudos card — 1120×500, bg dark, border-radius 16 */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1120px",
            margin: "0 auto",
            height: "500px",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {/* Background image */}
          <img
            src="/home/kudos-bg.png"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          {/* Dark overlay for readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(15,15,15,0.55)",
              borderRadius: "16px",
            }}
          />

          {/* Content layout — left content + right logo */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 64px",
              boxSizing: "border-box",
            }}
          >
            {/* Left: mms_D2_Content — 457×408 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                width: "457px",
                flexShrink: 0,
              }}
            >
              {/* Frame 494 — text block */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Label */}
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
                  Phong trào ghi nhận
                </p>

                {/* Title */}
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "57px",
                    fontWeight: 700,
                    lineHeight: "64px",
                    letterSpacing: "-0.25px",
                    color: "#FFEA9E",
                  }}
                >
                  Sun* Kudos
                </h2>

                {/* Body */}
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "24px",
                    letterSpacing: "0.5px",
                    textAlign: "justify",
                    color: "rgba(255,255,255,1)",
                    whiteSpace: "pre-line",
                  }}
                >
                  {KUDOS_BODY}
                </p>
              </div>

              {/* CTA button — mms_D2.1_Button-IC */}
              {/* TODO: /kudos page not yet built — href="#" placeholder */}
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "16px",
                  width: "126px",
                  height: "56px",
                  backgroundColor: "rgba(255,234,158,1)",
                  borderRadius: "4px",
                  textDecoration: "none",
                  transition: "background 0.2s ease",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,222,100,1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,234,158,1)";
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "24px",
                    letterSpacing: "0.15px",
                    color: "rgba(0,16,26,1)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Chi tiết
                </span>
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
            </div>

            {/* Right: MM_MEDIA_Logo/Kudos — 364×72 */}
            <div
              style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {/* KUDOS text styled logo — rendered as stylized text matching design */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {/* Sun* mark — abstract circular icon */}
                <div
                  style={{
                    width: "80px",
                    height: "65px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="80"
                    height="65"
                    viewBox="0 0 80 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="40" cy="32" r="28" stroke="#DBD1C1" strokeWidth="2.5" fill="none" />
                    <circle cx="40" cy="32" r="18" fill="#DBD1C1" fillOpacity="0.2" />
                    <path d="M40 10 L40 54 M18 32 L62 32" stroke="#DBD1C1" strokeWidth="2" />
                    <path d="M22 16 L58 48 M22 48 L58 16" stroke="#DBD1C1" strokeWidth="1.5" />
                  </svg>
                </div>
                {/* KUDOS wordmark */}
                <span
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "72px",
                    fontWeight: 700,
                    lineHeight: "1",
                    letterSpacing: "-0.13em",
                    color: "rgba(219,209,193,1)",
                  }}
                >
                  KUDOS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
