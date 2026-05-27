import AwardCard from "./award-card";

const AWARDS = [
  {
    id: "top-talent",
    title: "Top Talent",
    description: "Vinh danh top cá nhân xuất sắc trên mọi phương diện",
    bgImage: "/home/award-bg.png",
    nameImage: "/home/award-top-talent-name.png",
    nameImageWidth: 221,
    nameImageHeight: 35,
    detailHref: "#", // TODO: /awards/top-talent not yet built
  },
  {
    id: "top-project",
    title: "Top Project",
    description: "Vinh danh dự án xuất sắc nhất trong năm",
    bgImage: "/home/award-bg.png",
    nameImage: "/home/award-top-project-name.png",
    nameImageWidth: 232,
    nameImageHeight: 35,
    detailHref: "#", // TODO: /awards/top-project not yet built
  },
  {
    id: "top-project-leader",
    title: "Top Project Leader",
    description: "Vinh danh người dẫn dắt dự án xuất sắc",
    bgImage: "/home/award-bg.png",
    nameImage: "/home/award-top-project-leader-name.png",
    nameImageWidth: 232,
    nameImageHeight: 64,
    detailHref: "#", // TODO: /awards/top-project-leader not yet built
  },
  {
    id: "best-manager",
    title: "Best Manager",
    description: "Vinh danh nhà quản lý xuất sắc nhất",
    bgImage: "/home/award-bg.png",
    nameImage: "/home/award-best-manager-name.png",
    nameImageWidth: 232,
    nameImageHeight: 30,
    detailHref: "#", // TODO: /awards/best-manager not yet built
  },
  {
    id: "signature-creator",
    title: "Signature 2025 Creator",
    description: "Vinh danh những cá nhân tạo nên dấu ấn đặc biệt năm 2025",
    bgImage: "/home/award-bg.png",
    nameImage: "/home/award-signature-creator-name.png",
    nameImageWidth: 232,
    nameImageHeight: 54,
    detailHref: "#", // TODO: /awards/signature-creator not yet built
  },
  {
    id: "mvp",
    title: "MVP",
    description: "Most Valuable Person — cá nhân có đóng góp giá trị nhất",
    bgImage: "/home/award-bg.png",
    nameImage: "/home/award-mvp-name.png",
    nameImageWidth: 116,
    nameImageHeight: 52,
    detailHref: "#", // TODO: /awards/mvp not yet built
  },
];

export default function AwardsSection() {
  const row1 = AWARDS.slice(0, 3);
  const row2 = AWARDS.slice(3, 6);

  return (
    <section
      id="awards"
      style={{
        width: "100%",
        padding: "0 144px",
        boxSizing: "border-box",
        backgroundColor: "#00101A",
      }}
    >
      <div
        style={{
          maxWidth: "1224px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "80px",
        }}
      >
        {/* mms_C1_Header Giải thưởng */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          {/* Section label */}
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

          {/* Divider */}
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(46,57,64,1)",
            }}
          />

          {/* Large heading */}
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
            Hệ thống giải thưởng
          </h2>
        </div>

        {/* Award grid — mms_C2_Award list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {/* Row 1 */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "80px",
              width: "100%",
            }}
          >
            {row1.map((award) => (
              <AwardCard key={award.id} {...award} />
            ))}
          </div>

          {/* Row 2 */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "80px",
              width: "100%",
            }}
          >
            {row2.map((award) => (
              <AwardCard key={award.id} {...award} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
