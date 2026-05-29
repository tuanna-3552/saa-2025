export default function AwardSystemKeyvisual() {
  return (
    <div
      aria-label="Keyvisual Sun* Annual Award 2025"
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden",
        backgroundImage: "url('/home/keyvisual-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      {/* Gradient fade to page background at the bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "140px",
          background: "linear-gradient(to bottom, transparent, #00101A)",
          pointerEvents: "none",
        }}
      />

      {/* Content positioned inside the banner */}
      <div
        style={{
          position: "relative",
          height: "100%",
          maxWidth: "1512px",
          margin: "0 auto",
          padding: "72px 144px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          boxSizing: "border-box",
        }}
      >
        {/* ROOT FURTHER logo — reuse home asset */}
        <img
          src="/home/root-further-logo.png"
          alt="ROOT FURTHER"
          style={{
            display: "block",
            width: "340px",
            height: "auto",
            objectFit: "contain",
            objectPosition: "left center",
          }}
        />

        <p
          style={{
            margin: "20px 0 0",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: "24px",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Sun* Annual Award 2025
        </p>
      </div>
    </div>
  );
}
