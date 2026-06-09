"use client";

import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

interface AccountMenuProps {
  onClose: () => void;
}

export default function AccountMenu({ onClose }: AccountMenuProps) {
  const router = useRouter();

  async function handleLogout() {
    onClose();
    const supabase = getSupabase();
    await supabase.auth.signOut();
    router.push("/login");
  }

  // Item layout: flex-start + gap — icon sits right of text, not pinned to far edge
  const baseItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "4px",
    width: "119px",
    padding: "16px",
    height: "56px",
    border: "none",
    cursor: "pointer",
    color: "#FFFFFF",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "16px",
    fontWeight: 700,
    textDecoration: "none",
    boxSizing: "border-box",
    borderRadius: "4px",
    transition: "background 0.1s ease",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        right: 0,
        background: "#00070C",
        border: "1px solid #998C5F",
        borderRadius: "8px",
        padding: "6px",
        zIndex: 100,
        boxShadow: "0 0 20px 2px rgba(153,140,95,0.25), 0 8px 32px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Profile — golden highlight (rgba(255,234,158,0.10)) per Figma */}
      <a
        href="/profile"
        style={{
          ...baseItemStyle,
          background: "rgba(255, 234, 158, 0.10)",
        }}
        onClick={onClose}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255, 234, 158, 0.18)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255, 234, 158, 0.10)";
        }}
      >
        Profile
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </a>

      {/* Logout — chevron-right per spec */}
      <button
        type="button"
        onClick={handleLogout}
        style={{ ...baseItemStyle, background: "transparent" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
        }}
      >
        Logout
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
