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

        {/* Send icon */}
        <div
          style={{
            width: 32,
            height: 32,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M4 16L28 16M28 16L18 6M28 16L18 26"
              stroke="#FFEA9E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

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
          <span style={{ fontSize: "24px" }}>
            {kudo.likedByCurrentUser ? "❤️" : "🤍"}
          </span>
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
              stroke="#00101A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
              stroke="#00101A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
