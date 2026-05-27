"use client";

interface NotificationBadgeProps {
  count: number;
  onClick?: () => void;
}

// TODO: replace stub count with real Supabase query when notifications table exists
export default function NotificationBadge({ count, onClick }: NotificationBadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={count > 0 ? `${count} thông báo chưa đọc` : "Thông báo"}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        background: "transparent",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        color: "rgba(255,255,255,0.8)",
        transition: "background 0.15s ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
      }}
    >
      {/* Bell icon */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>

      {/* Badge */}
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            minWidth: "16px",
            height: "16px",
            padding: "0 4px",
            borderRadius: "8px",
            background: "#ef4444",
            color: "white",
            fontSize: "10px",
            fontWeight: 700,
            lineHeight: "16px",
            textAlign: "center",
            fontFamily: "var(--font-montserrat), sans-serif",
          }}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
