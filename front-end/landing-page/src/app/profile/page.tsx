export const runtime = "edge";

import AuthGuard from "@/components/award-system/auth-guard";
import ProfilePageContent from "@/components/profile/profile-page-content";

export const metadata = {
  title: "Profile",
  description: "Sun* Annual Awards 2025 — Your profile",
};

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfilePageContent />
    </AuthGuard>
  );
}
