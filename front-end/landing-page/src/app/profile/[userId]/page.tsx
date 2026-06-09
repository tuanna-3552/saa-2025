export const runtime = "edge";

import AuthGuard from "@/components/award-system/auth-guard";
import ProfilePageContent from "@/components/profile/profile-page-content";

// Next.js 15+: params is a Promise for dynamic segments in server components
export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return (
    <AuthGuard>
      <ProfilePageContent userId={userId} />
    </AuthGuard>
  );
}
