"use client";

import { useState } from "react";
import type { UserStats, PrizeRecipient } from "@/lib/kudos-types";
import SecretBoxDialog from "@/components/kudos/secret-box-dialog";

// KudosSidebar: right-column panel with stats + 10 recent prize recipients.
// Design ref: Figma "D_Thống menu phải" — 422px wide, two cards stacked.
// D.1: stats card (bg #00070C, border #998C5F, border-radius 17px)
// D.3: prize recipients card

interface KudosSidebarProps {
  stats: UserStats;
  recentPrizeRecipients: PrizeRecipient[];
}

const STAT_ROWS = [
  { key: "kudosReceived" as keyof UserStats, label: "Số Kudos bạn nhận được:" },
  { key: "kudosSent" as keyof UserStats, label: "Số Kudos bạn đã gửi:" },
  { key: "heartsReceived" as keyof UserStats, label: "Số tim bạn nhận được:" },
];

const SECRET_ROWS = [
  { key: "secretBoxesOpened" as keyof UserStats, label: "Số Secret Box bạn đã mở:" },
  { key: "secretBoxesUnopened" as keyof UserStats, label: "Số Secret Box chưa mở:" },
];

export default function KudosSidebar({ stats, recentPrizeRecipients }: KudosSidebarProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div
        style={{
          flex: "0 0 422px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* D.1 — Stats card */}
        <div
          style={{
            border: "1px solid #998C5F",
            borderRadius: "17px",
            background: "#00070C",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Kudos / sent / hearts rows */}
            {STAT_ROWS.map(({ key, label }) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                    fontWeight: 700,
                    lineHeight: "28px",
                    color: "#FFFFFF",
                    flex: 1,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: "32px",
                    fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                    fontWeight: 700,
                    lineHeight: "40px",
                    color: "#FFEA9E",
                    flexShrink: 0,
                  }}
                >
                  {stats[key]}
                </span>
              </div>
            ))}

            {/* Divider */}
            <hr style={{ border: "none", borderTop: "1px solid #2E3940", margin: 0 }} />

            {/* Secret box rows */}
            {SECRET_ROWS.map(({ key, label }) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                    fontWeight: 700,
                    lineHeight: "28px",
                    color: "#FFFFFF",
                    flex: 1,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: "32px",
                    fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                    fontWeight: 700,
                    lineHeight: "40px",
                    color: "#FFEA9E",
                    flexShrink: 0,
                  }}
                >
                  {stats[key]}
                </span>
              </div>
            ))}

            {/* Open secret box button */}
            <button
              onClick={() => setDialogOpen(true)}
              style={{
                width: "100%",
                height: "60px",
                background: "#FFEA9E",
                border: "none",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
                marginTop: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                  fontWeight: 700,
                  lineHeight: "28px",
                  color: "#00101A",
                }}
              >
                Mở Secret Box
              </span>
              <span style={{ fontSize: "20px" }}>🎁</span>
            </button>
          </div>
        </div>

        {/* D.3 — 10 recent prize recipients card */}
        <div
          style={{
            border: "1px solid #998C5F",
            borderRadius: "17px",
            background: "#00070C",
            padding: "24px 16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "22px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
              lineHeight: "28px",
              color: "#FFEA9E",
              textAlign: "center",
            }}
          >
            10 SUNNER NHẬN QUÀ{"\n"}MỚI NHẤT
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "8px" }}>
            {recentPrizeRecipients.slice(0, 10).map((recipient) => (
              <a
                key={recipient.id}
                href={recipient.profileUrl}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "12px",
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#EEE",
                    border: "1.5px solid #998C5F",
                  }}
                >
                  <img
                    src={recipient.avatar}
                    alt={recipient.name}
                    width={48}
                    height={48}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>

                {/* Name + prize */}
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                      fontWeight: 700,
                      lineHeight: "20px",
                      color: "#FFFFFF",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {recipient.name}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                      fontWeight: 400,
                      lineHeight: "16px",
                      color: "#999",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {recipient.prizeDescription}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <SecretBoxDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
