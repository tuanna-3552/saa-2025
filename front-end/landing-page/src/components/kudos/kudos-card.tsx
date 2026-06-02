"use client";

import type { KudoPost } from "@/lib/kudos-types";
import UserInfoBlock from "@/components/kudos/user-info-block";
import HashtagLabel from "@/components/kudos/hashtag-label";

// KudosCard: full kudo post card in the feed.
// Design ref: Figma "C.3_KUDO Post" — 680px wide, bg #FFF8E1, border-radius 24px,
// padding 40px 40px 16px. Separator gold line. Content box with gold border + bg.

interface KudosCardProps {
  kudo: KudoPost;
  onLike: () => void;
  onCopyLink: () => void;
  onHashtagClick?: (tag: string) => void;
}

export default function KudosCard({ kudo, onLike, onCopyLink, onHashtagClick }: KudosCardProps) {
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
        width: "100%",
        background: "#FFF8E1",
        borderRadius: "24px",
        padding: "40px 40px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxSizing: "border-box",
      }}
    >
      {/* Sender → Receiver */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <UserInfoBlock
          avatar={kudo.senderAvatar}
          name={kudo.senderName}
          department={kudo.senderDepartment}
          stars={kudo.senderStars}
          profileUrl={`/profile/${kudo.senderId}`}
        />

        {/* Send icon — MM_MEDIA_Send */}
        <img src="/kudos/send.svg" alt="" aria-hidden width={32} height={32} style={{ flexShrink: 0 }} />

        <UserInfoBlock
          avatar={kudo.receiverAvatar}
          name={kudo.receiverName}
          department={kudo.receiverDepartment}
          stars={kudo.receiverStars}
          profileUrl={`/profile/${kudo.receiverId}`}
        />
      </div>

      {/* Gold separator */}
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

      {/* Hashtag line (above content) */}
      {kudo.hashtags.length > 0 && (
        <p
          style={{
            margin: 0,
            fontSize: "16px",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontWeight: 700,
            lineHeight: "24px",
            letterSpacing: "0.5px",
            color: "#00101A",
          }}
        >
          {kudo.hashtags.join(" ")}
        </p>
      )}

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
            fontSize: "20px",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontWeight: 700,
            lineHeight: "32px",
            color: "#00101A",
          }}
        >
          {kudo.content}
        </p>
      </div>

      {/* Attachment images */}
      {kudo.attachmentImages.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {kudo.attachmentImages.map((src, idx) => (
            <div
              key={idx}
              style={{
                width: 88,
                height: 88,
                border: "1px solid #998C5F",
                borderRadius: "18px",
                overflow: "hidden",
                background: "#FFF",
                flexShrink: 0,
              }}
            >
              <img
                src={src}
                alt={`Attachment ${idx + 1}`}
                width={88}
                height={88}
                style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "4px" }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Hashtag labels */}
      {kudo.hashtags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {kudo.hashtags.map((tag) => (
            <HashtagLabel key={tag} tag={tag} onClick={onHashtagClick ?? (() => {})} />
          ))}
        </div>
      )}

      {/* Gold separator */}
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
        {/* Like / hearts */}
        <button
          onClick={onLike}
          aria-label={`${kudo.likeCount} likes`}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: 0,
          }}
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
          aria-label="Copy link"
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
        >
          <span
            style={{
              fontSize: "16px",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontWeight: 700,
              color: "#00101A",
            }}
          >
            Copy Link
          </span>
          {/* Link icon — MM_MEDIA_Link */}
          <img src="/kudos/link.svg" alt="" aria-hidden width={24} height={24} />
        </button>
      </div>
    </article>
  );
}
