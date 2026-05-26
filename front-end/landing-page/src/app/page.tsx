export const runtime = "edge";

import CountdownTimer from "@/components/countdown-timer";

export default function HomePage() {
  const targetDate = process.env.NEXT_PUBLIC_EVENT_DATE ?? "";
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#00101a",
        overflow: "hidden",
      }}
    >
      {/* Background art — flipped (scaleY + rotate = horizontal mirror) per Figma */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          transform: "scaleY(-1) rotate(180deg)",
        }}
      >
        <img
          src="/images/prelaunch-bg.png"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(13.3deg, rgb(0,16,26) 15.5%, rgba(0,18,29,0.46) 52.1%, rgba(0,19,32,0) 63.4%)",
        }}
      />

      {/* Countdown content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: "48px",
            color: "white",
            margin: 0,
          }}
        >
          Sự kiện sẽ bắt đầu sau
        </p>
        <CountdownTimer targetDate={targetDate} />
      </div>
    </main>
  );
}
