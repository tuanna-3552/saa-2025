"use client";

import ProfileTooltip from "@/components/kudos/profile-tooltip";

// UserInfoBlock: avatar + name + department + star badge in a vertical card layout.
// Design ref: Figma "C.3.1_Thông tin người gửi" / "C.3.3_Thông tin người nhận"
// Width 235px, flex col, centered. Avatar 64px circle with white border.

interface UserInfoBlockProps {
  avatar: string;
  name: string;
  department: string;
  stars: number;
  profileUrl: string;
}

export default function UserInfoBlock({
  avatar,
  name,
  department,
  stars,
}: UserInfoBlockProps) {
  return (
    <ProfileTooltip avatar={avatar} name={name} department={department} stars={stars}>
      <div
        style={{
          width: "100%",
          maxWidth: "235px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "13px",
          cursor: "pointer",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: "1.869px solid #FFFFFF",
            overflow: "hidden",
            flexShrink: 0,
            background: "#EEE",
          }}
        >
          <img
            src={avatar}
            alt={name}
            width={64}
            height={64}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>

        {/* Name + badge row */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
            width: "100%",
          }}
        >
          {/* Full name */}
          <p
            style={{
              margin: 0,
              width: "100%",
              fontSize: "16px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
              lineHeight: "24px",
              letterSpacing: "0.15px",
              color: "#00101A",
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </p>

          {/* Department + stars */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                fontWeight: 700,
                lineHeight: "20px",
                letterSpacing: "0.1px",
                color: "#999999",
              }}
            >
              {department}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                fontWeight: 700,
                color: "#FFEA9E",
                border: "0.5px solid #FFEA9E",
                borderRadius: "48px",
                padding: "1px 8px",
                lineHeight: "17px",
              }}
            >
              ★ {stars}
            </span>
          </div>
        </div>
      </div>
    </ProfileTooltip>
  );
}
