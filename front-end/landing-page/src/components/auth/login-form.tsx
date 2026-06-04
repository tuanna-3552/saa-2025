"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import LanguageToggle from "./language-toggle";
import { useLanguage } from "@saa/shared-ui";

const TRANSLATIONS = {
  VN: {
    subtitle: "Bắt đầu hành trình của bạn cùng SAA 2025.\nĐăng nhập để khám phá!",
    loginBtn: "LOGIN With Google",
    logging: "Đang đăng nhập…",
    copyright: "Bản quyền thuộc về Sun* © 2025",
  },
  EN: {
    subtitle: "Start your journey with SAA 2025.\nLog in to explore!",
    loginBtn: "LOGIN With Google",
    logging: "Signing in…",
    copyright: "Copyright © Sun* 2025",
  },
} as const;

export default function LoginForm() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);

  // DEV STUB — credentials handled server-side in /api/auth/dev-login
  // Replace with supabase.auth.signInWithOAuth({ provider: "google" }) when OAuth is configured
  async function handleGoogleLogin() {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/dev-login", { method: "POST" });
      const body: { session?: { access_token: string; refresh_token: string }; error?: string } =
        await res.json();

      if (!res.ok || !body.session) {
        setError(body.error ?? "Sign-in failed. Please try again.");
        return;
      }

      const { error: sessionError } = await supabase.auth.setSession(body.session);
      if (sessionError) {
        setError("Session initialization failed. Please try again.");
        return;
      }
      router.push("/home");
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#00101A",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "var(--font-montserrat), sans-serif",
      }}
    >
      {/* Full-screen keyvisual background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <img
          src="/images/login-bg.png"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Rectangle 57: left horizontal dark fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0,16,26,0) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Cover: bottom vertical dark fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0) 51.74%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Header — 80px tall, padding 12px 144px */}
      <header
        style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "80px",
          padding: "0 144px",
          backgroundColor: "rgba(11, 15, 18, 0.8)",
          flexShrink: 0,
          borderBottom: "1px solid #2E3940",
        }}
      >
        {/* SAA logo — 52×48px */}
        <div style={{ position: "relative", width: "52px", height: "48px", flexShrink: 0 }}>
          {logoError ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                backgroundColor: "rgba(255,234,158,1)",
                color: "#00101A",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              SAA
            </div>
          ) : (
            <Image
              src="/logo.svg"
              alt="SAA Logo"
              fill
              style={{ objectFit: "contain" }}
              onError={() => setLogoError(true)}
            />
          )}
        </div>

        <LanguageToggle />
      </header>

      {/* Main content — padding 0 144px, vertically centered */}
      <main
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 144px",
        }}
      >
        {/* ROOT FURTHER logo — 451×200px */}
        <img
          src="/images/root_further.png"
          alt="ROOT FURTHER"
          width={451}
          height={200}
          style={{ display: "block" }}
        />

        {/* Frame 550: text + button, padding-left 16px, gap 24px */}
        <div
          style={{
            marginTop: "80px",
            paddingLeft: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Subtitle — 480px, 20px/40px Montserrat 700 */}
          <p
            style={{
              margin: 0,
              maxWidth: "480px",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "40px",
              letterSpacing: "0.5px",
              color: "rgba(255,255,255,1)",
            }}
          >
            {t.subtitle.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>

          {/* Error message */}
          {error && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "6px",
                background: "rgba(220,38,38,0.15)",
                border: "1px solid rgba(220,38,38,0.4)",
                fontSize: "13px",
                color: "#fca5a5",
                lineHeight: "18px",
                maxWidth: "480px",
              }}
            >
              {error}
            </div>
          )}

          {/* LOGIN with Google — 305×60px, solid gold fill, dark text */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "16px 24px",
              width: "305px",
              height: "60px",
              background: loading ? "rgba(255,234,158,0.65)" : "rgba(255,234,158,1)",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!loading)
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,222,100,1)";
            }}
            onMouseLeave={(e) => {
              if (!loading)
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,234,158,1)";
            }}
            onMouseDown={(e) => {
              if (!loading)
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
            }}
            onMouseUp={(e) => {
              if (!loading)
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            {/* Label — 225px centered, 22px Montserrat 700, dark color */}
            <span
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                lineHeight: "28px",
                letterSpacing: "0",
                color: "rgba(0,16,26,1)",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? t.logging : t.loginBtn}
            </span>

            {/* Google icon / spinner — 24×24px */}
            {loading ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}
              >
                <circle cx="12" cy="12" r="10" stroke="rgba(0,16,26,0.3)" strokeWidth="2" />
                <path
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="rgba(0,16,26,1)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z"
                  fill="#4285F4"
                />
                <path
                  d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.954-3.386.954-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0 0 10 20z"
                  fill="#34A853"
                />
                <path
                  d="M4.405 11.9A6.01 6.01 0 0 1 4.09 10c0-.663.114-1.308.314-1.9V5.51H1.064A9.996 9.996 0 0 0 0 10c0 1.614.386 3.14 1.064 4.49L4.405 11.9z"
                  fill="#FBBC05"
                />
                <path
                  d="M10 3.977c1.468 0 2.786.504 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0A9.996 9.996 0 0 0 1.064 5.51l3.341 2.59C5.19 5.736 7.395 3.977 10 3.977z"
                  fill="#EA4335"
                />
              </svg>
            )}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 10,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid #2E3940",
          padding: "24px 90px",
          fontFamily: "var(--font-montserrat-alternates), var(--font-montserrat), sans-serif",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "24px",
          color: "rgba(255,255,255,1)",
        }}
      >
        {t.copyright}
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        button:focus-visible {
          outline: 2px solid rgba(255,234,158,0.8);
          outline-offset: 3px;
        }
      `}</style>
    </div>
  );
}
