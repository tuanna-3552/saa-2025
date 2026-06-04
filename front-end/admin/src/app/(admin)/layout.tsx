"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { AdminHeader } from "@/components/layout/admin-header";
import { useTranslation } from "@/hooks/use-translation";

function FullPageSpinner() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "var(--details-container-2)" }}
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"
        style={{ borderColor: "var(--details-text-primary-1)", borderTopColor: "transparent" }}
      />
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!loading && (!user || profile?.role !== "admin")) {
      router.replace("/login");
    }
  }, [user, profile, loading, router]);

  if (loading) return <FullPageSpinner />;
  if (!user || profile?.role !== "admin") return null;

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "var(--details-container-2)" }}
    >
      <AdminHeader />
      <main className="flex-1">{children}</main>
      <footer className="py-4 text-center text-sm" style={{ color: "var(--details-text-primary-1)" }}>
        {t("footer.copyright")}
      </footer>
    </div>
  );
}
