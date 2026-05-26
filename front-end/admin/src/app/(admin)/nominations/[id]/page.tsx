"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useNomination } from "@/hooks/use-nomination";
import { reviewNomination } from "@/lib/review-nomination";
import { NominationDetailCard } from "@/components/nominations/nomination-detail-card";

export default function NominationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const { user } = useAuth();
  const { nomination, loading, error } = useNomination(id);
  const [reviewError, setReviewError] = useState<string | null>(null);

  async function handleReview(
    nominationId: string,
    action: "approved" | "rejected"
  ): Promise<void> {
    if (!user?.id) {
      setReviewError("You must be logged in to review nominations.");
      return;
    }
    setReviewError(null);
    const { error: mutationError } = await reviewNomination(nominationId, action, user.id);
    if (mutationError) {
      setReviewError(mutationError);
      return;
    }
    router.push("/nominations");
  }

  function handleBack() {
    router.push("/nominations");
  }

  return (
    <div
      className="mx-auto w-full max-w-[900px] px-4 py-8 sm:px-6 lg:px-8"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      {reviewError && (
        <div
          className="mb-4 rounded px-4 py-3 text-sm"
          style={{
            backgroundColor: "rgba(212,39,29,0.15)",
            color: "var(--details-error)",
            border: "1px solid var(--details-error)",
          }}
        >
          {reviewError}
        </div>
      )}
      <NominationDetailCard
        nomination={nomination}
        loading={loading}
        error={error}
        onReview={handleReview}
        onBack={handleBack}
      />
    </div>
  );
}
