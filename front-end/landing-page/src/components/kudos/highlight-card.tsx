"use client";

import type { HighlightKudo } from "@/lib/kudos-types";
import UserInfoBlock from "@/components/kudos/user-info-block";
import HashtagLabel from "@/components/kudos/hashtag-label";
import { useTranslation } from "@/hooks/use-translation";

// HighlightCard: featured kudo post card with gold border.
// Design ref: Figma "KUDO - Highlight" — 528px wide, border 4px solid #FFEA9E,
// bg #FFF8E1, border-radius 16px, padding 24px 24px 16px.

interface HighlightCardProps {
  kudo: HighlightKudo;
  isActive: boolean;
  onLike: () => void;
  onCopyLink: () => void;
}

export default function HighlightCard({
  kudo,
  isActive,
  onLike,
  onCopyLink,
}: HighlightCardProps) {
  const { t } = useTranslation();
  const formattedDate = (() => {
    try {
      const d = new Date(kudo.createdAt);
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const mo = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${hh}:${mm} - ${mo}/${dd}/${yyyy}`;
    } catch {
      return kudo.createdAt;
    }
  })();

  return (
    <article
      style={{
        width: "528px",
        flexShrink: 0,
        border: `4px solid ${isActive ? "#FFEA9E" : "rgba(255,234,158,0.4)"}`,
        borderRadius: "16px",
        background: "#FFF8E1",
        padding: "24px 24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxSizing: "border-box",
        transition: "border-color 200ms ease",
      }}
    >
      {/* Sender → Receiver */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <UserInfoBlock
            avatar={kudo.senderAvatar}
            name={kudo.senderName}
            department={kudo.senderDepartment}
            stars={kudo.senderStars}
            profileUrl={`/profile/${kudo.senderId}`}
          />
        </div>

        {/* Send icon — MM_MEDIA_Send */}
        <img src="/kudos/send.svg" alt="" aria-hidden width={32} height={32} style={{ flexShrink: 0 }} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <UserInfoBlock
            avatar={kudo.receiverAvatar}
            name={kudo.receiverName}
            department={kudo.receiverDepartment}
            stars={kudo.receiverStars}
            profileUrl={`/profile/${kudo.receiverId}`}
          />
        </div>
      </div>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid #FFEA9E", margin: 0 }} />

      {/* Time */}
      <p
        style={{
          margin: 0,
          fontSize: "16px",
          fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          fontWeight: 700,
          lineHeight: "24px",
          letterSpacing: "0.5px",
          color: "#999999",
        }}
      >
        {formattedDate}
      </p>

      {/* Content box */}
      <div
        style={{
          border: "1px solid #FFEA9E",
          borderRadius: "12px",
          padding: "16px 24px",
          background: "rgba(255,234,158,0.40)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "18px",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontWeight: 700,
            lineHeight: "28px",
            color: "#00101A",
          }}
        >
          {kudo.content}
        </p>
      </div>

      {/* Hashtags */}
      {kudo.hashtags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {kudo.hashtags.map((tag) => (
            <HashtagLabel key={tag} tag={tag} onClick={() => {}} />
          ))}
        </div>
      )}

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid #FFEA9E", margin: 0 }} />

      {/* Action row */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Hearts */}
        <button
          onClick={onLike}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: 0,
          }}
          aria-label={`${kudo.likeCount} likes`}
        >
          <span
            style={{
              fontSize: "24px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
              lineHeight: "32px",
              color: "#00101A",
            }}
          >
            {kudo.likeCount.toLocaleString("vi-VN")}
          </span>
          {/* Heart icon — MM_MEDIA_Heart */}
          <img src="/kudos/heart.svg" alt="" aria-hidden width={32} height={32} />
        </button>

        {/* Copy link */}
        <button
          onClick={onCopyLink}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "16px",
            border: "none",
            borderRadius: "4px",
            background: "none",
            cursor: "pointer",
          }}
          aria-label={t("kudos.card.copyLinkAria")}
        >
          <span
            style={{
              fontSize: "16px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
              color: "#00101A",
            }}
          >
            {t("kudos.card.copyLink")}
          </span>
          {/* Link icon — MM_MEDIA_Link */}
          <img src="/kudos/link.svg" alt="" aria-hidden width={24} height={24} />
        </button>
      </div>
    </article>
  );
}
