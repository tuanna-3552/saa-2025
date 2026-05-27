"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function LoginForm() {
  const router = useRouter();
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
        backgroundColor: "#0d1421",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "var(--font-montserrat), sans-serif",
      }}
    >
      {/* Right-side abstract art */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "58%",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/prelaunch-bg.png"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left center" }}
        />
        {/* Left-side fade to blend art into background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, #0d1421 0%, transparent 30%)",
          }}
        />
      </div>

      {/* Header */}
      <header
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 40px",
          backgroundColor: "rgba(11,15,18,0.8)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {/* SAA logo — mirrors admin-header.tsx pattern */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ position: "relative", width: "40px", height: "40px", flexShrink: 0 }}>
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
                  color: "#0d1421",
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
        </div>

        {/* Language selector — mirrors admin-header.tsx pattern */}
        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 10px",
            background: "transparent",
            border: "none",
            borderRadius: "9999px",
            cursor: "pointer",
            color: "rgba(255,255,255,0.7)",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
        >
          <img src="/vn-flag.svg" alt="VN" width={20} height={14} style={{ objectFit: "contain" }} />
          <span style={{ fontSize: "13px", fontWeight: 600, fontFamily: "var(--font-montserrat), sans-serif" }}>VN</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </header>

      {/* Main content */}
      <main
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 40px 0 100px",
          maxWidth: "640px",
        }}
      >
        {/* ROOT FURTHER — image placeholder, replace with /images/root-further.png when ready */}
        <img
          src="/images/root_further.png"
          alt="ROOT FURTHER"
          width={451}
          height={200}
          style={{
            display: "block",
            maxWidth: "100%",
          }}
        />

        {/* Subtitle */}
        <div style={{ marginTop: "24px" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "40px",
              letterSpacing: "0.5px",
              color: "rgba(255,255,255,1)",
            }}
          >
            Bắt đầu hành trình của bạn cùng SAA 2025.
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "40px",
              letterSpacing: "0.5px",
              color: "rgba(255,255,255,1)",
            }}
          >
            Đăng nhập để khám phá!
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div
            style={{
              marginTop: "16px",
              padding: "10px 14px",
              borderRadius: "6px",
              background: "rgba(220,38,38,0.15)",
              border: "1px solid rgba(220,38,38,0.4)",
              fontSize: "13px",
              color: "#fca5a5",
              lineHeight: "18px",
            }}
          >
            {error}
          </div>
        )}

        {/* LOGIN with Google button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            marginTop: "32px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "16px 24px",
            height: "60px",
            background: loading ? "rgba(255,234,158,0.06)" : "rgba(255,234,158,0.08)",
            border: "1.5px solid rgba(255,234,158,1)",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "15px",
            fontWeight: 700,
            color: "rgba(255,234,158,1)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            width: "fit-content",
            transition: "background 0.2s ease, transform 0.15s ease",
          }}
          onMouseEnter={(e) => {
            if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,234,158,0.15)";
          }}
          onMouseLeave={(e) => {
            if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,234,158,0.08)";
          }}
          onMouseDown={(e) => {
            if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
          }}
          onMouseUp={(e) => {
            if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          <span>{loading ? "Đang đăng nhập…" : "LOGIN With Google"}</span>
          {loading ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}
            >
              <circle cx="10" cy="10" r="8" stroke="rgba(255,234,158,0.3)" strokeWidth="2" />
              <path d="M10 2a8 8 0 0 1 8 8" stroke="rgba(255,234,158,1)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            /* Google "G" logo — on the right per Figma */
            <svg
              width="20"
              height="20"
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
      </main>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 10,
          borderTop: "1px solid rgba(255,255,255,0.12)",
          padding: "14px 40px",
          textAlign: "center",
          fontFamily: "var(--font-montserrat-alternates), var(--font-montserrat), sans-serif",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "24px",
          letterSpacing: "0",
          color: "rgba(255,255,255,1)",
        }}
      >
        Bản quyền thuộc về Sun* © 2025
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
