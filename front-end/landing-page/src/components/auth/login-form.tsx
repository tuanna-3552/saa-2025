"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <main
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#00101a",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background art — same as prelaunch page, upright */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
        }}
      >
        <img
          src="/images/prelaunch-bg.png"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,16,26,0.3) 0%, rgba(0,16,26,0.85) 60%, #00101a 100%)",
        }}
      />

      {/* Login card */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          padding: "0 24px",
          width: "100%",
          maxWidth: "480px",
        }}
      >
        {/* Award logo mark */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          {/* SAA star/trophy icon */}
          <div
            style={{
              width: "72px",
              height: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="36,4 44.5,27 69,27 49.5,42 57,65 36,51 15,65 22.5,42 3,27 27.5,27"
                fill="none"
                stroke="#ffea9e"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Headings */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
            <h1
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                lineHeight: "36px",
                color: "#ffffff",
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              SAA Awards 2025
            </h1>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                color: "rgba(255,255,255,0.55)",
                margin: 0,
              }}
            >
              Đăng nhập để tiếp tục
            </p>
          </div>
        </div>

        {/* Glassmorphism card */}
        <div
          style={{
            position: "relative",
            width: "100%",
            borderRadius: "16px",
            padding: "40px 36px",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
            border: "0.75px solid rgba(255,234,158,0.3)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Error message */}
          {error && (
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "8px",
                background: "rgba(220,38,38,0.15)",
                border: "1px solid rgba(220,38,38,0.4)",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "#fca5a5",
                lineHeight: "18px",
              }}
            >
              {error}
            </div>
          )}

          {/* Sign in with Google button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              width: "100%",
              padding: "14px 24px",
              borderRadius: "10px",
              background: loading
                ? "rgba(255,255,255,0.06)"
                : "rgba(255,255,255,0.1)",
              border: "0.75px solid rgba(255,255,255,0.2)",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              color: loading ? "rgba(255,255,255,0.45)" : "#ffffff",
              letterSpacing: "0.01em",
              transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
              outline: "none",
              WebkitAppearance: "none",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.15)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,234,158,0.5)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,255,255,0.2)";
              }
            }}
          >
            {loading ? (
              /* Spinner */
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}
              >
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M10 2a8 8 0 0 1 8 8"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              /* Google "G" logo */
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
            <span>{loading ? "Đang đăng nhập…" : "Đăng nhập với Google"}</span>
          </button>

          {/* Divider hint */}
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "12px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.3)",
              textAlign: "center",
              margin: 0,
              lineHeight: "16px",
            }}
          >
            Chỉ dành cho nhân viên Sun Asterisk
          </p>
        </div>
      </div>

      {/* Spinner keyframes */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
