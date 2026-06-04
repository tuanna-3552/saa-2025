"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { useTranslation } from "@/hooks/use-translation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { t } = useTranslation();
  const [status, setStatus] = useState<"loading" | "ok">("loading");

  useEffect(() => {
    getSupabase()
      .auth.getSession()
      .then(({ data: { session } }) => {
        if (!session) {
          router.push("/login");
        } else {
          setStatus("ok");
        }
      });
  }, [router]);

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#00101A",
        }}
      >
        <span
          style={{
            color: "#FFEA9E",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "16px",
            fontWeight: 700,
          }}
        >
          {t("awardSystem.loading")}
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
