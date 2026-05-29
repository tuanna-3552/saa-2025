export default function SectionTitle() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
      }}
    >
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
        Sun* annual awards 2025
      </p>

      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(46,57,64,1)",
        }}
      />

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
        Hệ thống giải thưởng SAA 2025
      </h2>
    </div>
  );
}
