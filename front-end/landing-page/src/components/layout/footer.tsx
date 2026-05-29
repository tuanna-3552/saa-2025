"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

interface FooterLink {
  label: string;
  href: string;
  matchPath?: string;
}

const FOOTER_LINKS: FooterLink[] = [
  { label: "About SAA 2025", href: "/home", matchPath: "/home" },
  { label: "Award Information", href: "/award-system", matchPath: "/award-system" },
  { label: "Sun* Kudos", href: "/kudos", matchPath: "/kudos" },
  { label: "Tiêu chuẩn chung", href: "/tieu-chuan-chung", matchPath: "/tieu-chuan-chung" },
];

export default function Footer() {
  const pathname = usePathname();

  function isActive(link: FooterLink) {
    if (!link.matchPath) return false;
    return pathname === link.matchPath || pathname.startsWith(link.matchPath + "/");
  }

  return (
    <footer
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "40px 90px",
        borderTop: "1px solid #2E3940",
        backgroundColor: "#00101A",
        boxSizing: "border-box",
      }}
    >
      {/* Left: Logo + nav links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "80px",
          height: "64px",
        }}
      >
        {/* Logo — 69×64 */}
        <div style={{ position: "relative", width: "69px", height: "64px", flexShrink: 0 }}>
          <Image
            src="/logo.svg"
            alt="SAA Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "48px" }}>
          {FOOTER_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <a
                key={link.label}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px",
                  height: "56px",
                  textDecoration: "none",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  letterSpacing: "0.15px",
                  color: "rgba(255,255,255,1)",
                  backgroundColor: active ? "rgba(255,234,158,0.10)" : "transparent",
                  textShadow: active
                    ? "0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287"
                    : "none",
                  transition: "background 0.15s ease",
                  whiteSpace: "nowrap",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = active
                    ? "rgba(255,234,158,0.10)"
                    : "transparent";
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Right: copyright */}
      <p
        style={{
          margin: 0,
          fontFamily:
            "var(--font-montserrat-alternates), var(--font-montserrat), sans-serif",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "24px",
          color: "rgba(255,255,255,1)",
          whiteSpace: "nowrap",
        }}
      >
        Bản quyền thuộc về Sun* © 2025
      </p>
    </footer>
  );
}
