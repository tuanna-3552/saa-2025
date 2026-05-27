"use client";

import Image from "next/image";
import UserMenu from "@/components/auth/user-menu";

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "About SAA 2025", href: "#about", active: true },
  { label: "Award Information", href: "#awards" },
  { label: "Sun* Kudos", href: "#kudos" },
];

export default function Header() {

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 144px",
        backgroundColor: "rgba(16, 20, 23, 0.80)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #2E3940",
        boxSizing: "border-box",
      }}
    >
      {/* Left: Logo + Nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "64px",
          height: "56px",
        }}
      >
        {/* Logo — 52×48 */}
        <div style={{ position: "relative", width: "52px", height: "48px", flexShrink: 0 }}>
          <Image
            src="/logo.svg"
            alt="SAA Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px",
                height: "52px",
                textDecoration: "none",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: "20px",
                letterSpacing: "0.1px",
                color: link.active ? "#FFEA9E" : "rgba(255,255,255,1)",
                borderRadius: link.active ? undefined : "4px",
                borderBottom: link.active ? "1px solid #FFEA9E" : "none",
                textShadow: link.active
                  ? "0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287"
                  : "none",
                transition: "background 0.15s ease, color 0.15s ease",
                whiteSpace: "nowrap",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                if (!link.active) {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,255,255,0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (!link.active) {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Right: auth-conditional controls — language toggle, bell, account menu */}
      {/* UserMenu renders null when unauthenticated (fetches own session) */}
      <div style={{ display: "flex", alignItems: "center", height: "56px" }}>
        <UserMenu />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          header {
            padding: 12px 24px !important;
          }
        }
      `}</style>
    </header>
  );
}
