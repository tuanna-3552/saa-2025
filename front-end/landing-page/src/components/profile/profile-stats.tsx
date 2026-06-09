"use client";

// ProfileStats — Section B: stats card + Secret Box CTA
// Design ref: Figma "mms_B_Thống kê" — 680px card, bg #00070C, border 1px solid #998C5F,
// border-radius 17px (from design: "17px"), padding 40px. 5 stat rows + divider + CTA button.
// Gold value text: #FFEA9E, 32px bold. Button bg #FFEA9E, text #00101A.

import { useState } from "react";
import type { UserStats } from "@/lib/kudos-types";
import SecretBoxDialog from "@/components/kudos/secret-box-dialog";

interface ProfileStatsProps {
  stats: UserStats;
  isOwn: boolean;
}

const STAT_ROWS: Array<{ label: string; key: keyof UserStats }> = [
  { label: "Kudos bạn nhận được:", key: "kudosReceived" },
  { label: "Kudos bạn đã gửi:", key: "kudosSent" },
  { label: "Số tim bạn nhận được:", key: "heartsReceived" },
  { label: "Secret Box bạn đã mở:", key: "secretBoxesOpened" },
  { label: "Secret Box chưa mở:", key: "secretBoxesUnopened" },
];

export default function ProfileStats({ stats, isOwn }: ProfileStatsProps) {
  const [secretBoxOpen, setSecretBoxOpen] = useState(false);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "40px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "680px",
            background: "#00070C",
            border: "1px solid #998C5F",
            borderRadius: "17px",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            boxSizing: "border-box",
          }}
        >
          {/* Stat rows */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
            }}
          >
            {STAT_ROWS.map(({ label, key }, idx) => (
              <div key={key}>
                {/* Divider before Secret Box rows */}
                {idx === 3 && (
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "rgba(46, 57, 64, 1)",
                      marginBottom: "16px",
                    }}
                    aria-hidden="true"
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "40px",
                  }}
                >
                  {/* Label */}
                  <span
                    style={{
                      fontSize: "18px",
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontWeight: 700,
                      lineHeight: "28px",
                      color: "#FFF",
                      letterSpacing: "0px",
                    }}
                  >
                    {label}
                  </span>
                  {/* Value */}
                  <span
                    style={{
                      fontSize: "32px",
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontWeight: 700,
                      lineHeight: "40px",
                      color: "#FFEA9E",
                      letterSpacing: "0px",
                      minWidth: "46px",
                      textAlign: "right",
                    }}
                  >
                    {stats[key]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Secret Box CTA — only on own profile */}
          {isOwn && (
            <button
              onClick={() => setSecretBoxOpen(true)}
              style={{
                marginTop: "8px",
                width: "100%",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "#FFEA9E",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                padding: "16px",
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 700,
                  lineHeight: "28px",
                  color: "#00101A",
                  letterSpacing: "0px",
                }}
              >
                Mở Secret Box
              </span>
              <img src="/kudos/open-gift.svg" alt="" aria-hidden width={24} height={24} />
            </button>
          )}
        </div>
      </div>

      <SecretBoxDialog open={secretBoxOpen} onClose={() => setSecretBoxOpen(false)} />
    </>
  );
}
