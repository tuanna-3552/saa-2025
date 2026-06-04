"use client";

import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { useTranslation } from "@/hooks/use-translation";

interface AccountMenuProps {
  isAdmin: boolean;
  onClose: () => void;
}

export default function AccountMenu({ isAdmin, onClose }: AccountMenuProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL ?? "http://localhost:3001";
  if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_ADMIN_URL) {
    console.error("[AccountMenu] NEXT_PUBLIC_ADMIN_URL is not set — admin link will point to localhost");
  }

  async function handleSignOut() {
    onClose();
    const supabase = getSupabase();
    await supabase.auth.signOut();
    router.push("/login");
  }

  const itemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "10px 16px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "rgba(255,255,255,0.85)",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    textAlign: "left",
    gap: "10px",
    transition: "background 0.1s ease",
    textDecoration: "none",
  };

  function hoverOn(e: React.MouseEvent<HTMLElement>) {
    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
  }
  function hoverOff(e: React.MouseEvent<HTMLElement>) {
    (e.currentTarget as HTMLElement).style.background = "transparent";
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 4px)",
        right: 0,
        minWidth: "200px",
        background: "rgba(11,15,18,0.97)",
        border: "1px solid #2E3940",
        borderRadius: "8px",
        overflow: "hidden",
        zIndex: 100,
        backdropFilter: "blur(8px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Profile */}
      {/* TODO: replace href="#" with /profile when page is built */}
      <a href="#" style={itemStyle} onClick={onClose} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        {t("accountMenu.profile")}
      </a>

      {/* Admin Dashboard (admin only) */}
      {isAdmin && (
        <a href={adminUrl} style={itemStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Admin Dashboard
        </a>
      )}

      <div style={{ height: "1px", background: "#2E3940", margin: "4px 0" }} />

      {/* Sign out */}
      <button type="button" onClick={handleSignOut} style={itemStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        {t("accountMenu.signOut")}
      </button>
    </div>
  );
}
