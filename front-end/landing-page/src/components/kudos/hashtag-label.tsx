"use client";

// HashtagLabel: inline clickable hashtag chip.
// Design ref: Figma "C.3.7_Hash tag" — color #D4271D (red), bold 16px Montserrat

interface HashtagLabelProps {
  tag: string;
  onClick: (tag: string) => void;
}

export default function HashtagLabel({ tag, onClick }: HashtagLabelProps) {
  return (
    <button
      onClick={() => onClick(tag)}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontSize: "16px",
        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
        fontWeight: 700,
        lineHeight: "24px",
        letterSpacing: "0.5px",
        color: "#D4271D",
        display: "inline",
      }}
    >
      {tag.startsWith("#") ? tag : `#${tag}`}
    </button>
  );
}
