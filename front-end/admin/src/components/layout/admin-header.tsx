"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { LanguageDropdown } from "@saa/shared-ui";
import { useTranslation } from "@/hooks/use-translation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Overview", href: "/dashboard", translationKey: "header.overview" },
  { label: "Review content", href: "/nominations", translationKey: "header.review" },
  { label: "User", href: "/users", translationKey: "header.user" },
  { label: "Settings", href: "/settings", translationKey: "header.settings" },
];

/** Gold glow shadow matching Figma: blur=6 rgba(250,226,135,1) + drop shadow */
const ACTIVE_GLOW = "0 0 6px rgba(250,226,135,0.9), 0 4px 4px rgba(0,0,0,0.25)";

export function AdminHeader() {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();
  const [logoError, setLogoError] = useState(false);
  const { t } = useTranslation();

  return (
    <header
      className="sticky top-0 z-50 flex w-full items-center justify-between px-10 py-3"
      style={{
        backgroundColor: "var(--details-container)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--details-divider)",
      }}
    >
      {/* ── Logo + ADMIN ── */}
      <div className="flex items-center gap-3">
        {/*
          To add your logo:
          1. Place your logo file at: front-end/admin/public/logo.svg  (or .png)
          2. The <Image> below will display it automatically.
          Until then, a placeholder icon is shown.
        */}
        <div className="relative h-10 w-10 shrink-0">
          {logoError ? (
            /* Fallback when logo.svg is missing */
            <div
              className="absolute inset-0 flex items-center justify-center rounded text-xs font-bold"
              style={{
                backgroundColor: "var(--details-text-primary-1)",
                color: "var(--details-text-primary-2)",
              }}
            >
              SAA
            </div>
          ) : (
            /* Place your logo at front-end/admin/public/logo.svg */
            <Image
              src="/logo.svg"
              alt="SAA Logo"
              fill
              className="object-contain"
              onError={() => setLogoError(true)}
            />
          )}
        </div>

        <span
          className="block h-8 w-px shrink-0"
          style={{ backgroundColor: "var(--details-divider)" }}
        />

        <span
          className="font-medium text-sm tracking-widest"
          style={{
            color: "var(--details-text-primary-1)",
            fontFamily: "var(--font-montserrat)",
          }}
        >
          {t("header.admin")}
        </span>
      </div>

      {/* ── Nav tabs ── */}
      <nav className="flex items-center h-full gap-10">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center py-4 text-sm font-medium tracking-wide transition-colors",
                isActive
                  ? "text-(--details-text-primary-1)"
                  : "text-white/70 hover:text-white"
              )}
              style={{
                fontFamily: "var(--font-montserrat)",
                ...(isActive && {
                  textShadow: "0 0 8px rgba(255,226,135,0.95), 0 0 20px rgba(255,226,135,0.4)",
                }),
              }}
            >
              {t(item.translationKey)}
              {/* Glowing underline on active */}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{
                    backgroundColor: "var(--details-text-primary-1)",
                    boxShadow: ACTIVE_GLOW,
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Right controls ── */}
      <div className="flex items-center gap-3">
        {/* Bell — placeholder, implement later */}
        <button
          type="button"
          title="Notifications (coming soon)"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          style={{ color: "var(--details-text-secondary-1)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        <LanguageDropdown />

        {/* Account dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-white/10"
              style={{
                border: "1px solid var(--details-border)",
                color: "var(--details-text-secondary-1)",
                borderRadius: "4px",
                padding: "10px",
              }}
              title="Account"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            {profile?.full_name && (
              <>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">{profile.full_name}</span>
                    <span className="text-xs text-muted-foreground">{profile.role}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={signOut}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
