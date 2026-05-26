"use client";

import { useState } from "react";
import type { NominationStatus } from "./nomination-status-badge";

interface NominationReviewActionsProps {
  nominationId: string;
  currentStatus: NominationStatus;
  onReview: (id: string, action: "approved" | "rejected") => Promise<void>;
}

export function NominationReviewActions({
  nominationId,
  currentStatus,
  onReview,
}: NominationReviewActionsProps) {
  const [busy, setBusy] = useState<"approved" | "rejected" | null>(null);

  async function handleAction(action: "approved" | "rejected") {
    setBusy(action);
    try {
      await onReview(nominationId, action);
    } finally {
      setBusy(null);
    }
  }

  if (currentStatus !== "pending") {
    return (
      <p
        className="text-sm italic"
        style={{ color: "var(--details-text-secondary-1)", opacity: 0.5 }}
      >
        This nomination has already been reviewed.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {/* Make Public */}
      <button
        type="button"
        disabled={busy !== null}
        onClick={() => handleAction("approved")}
        className="flex h-11 min-w-[140px] items-center justify-center rounded-lg px-6 text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
        style={{
          backgroundColor: "var(--details-text-primary-1)",
          color: "var(--details-text-primary-2)",
          fontFamily: "var(--font-montserrat)",
          boxShadow: busy === null ? "0 0 12px rgba(255,234,158,0.30)" : "none",
        }}
      >
        {busy === "approved" ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: "var(--details-text-primary-2)", borderTopColor: "transparent" }} />
            Processing…
          </span>
        ) : (
          "Make Public"
        )}
      </button>

      {/* Mark as Spam */}
      <button
        type="button"
        disabled={busy !== null}
        onClick={() => handleAction("rejected")}
        className="flex h-11 min-w-[140px] items-center justify-center rounded-lg border px-6 text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
        style={{
          backgroundColor: "transparent",
          color: "var(--details-error)",
          borderColor: "var(--details-error)",
          fontFamily: "var(--font-montserrat)",
        }}
      >
        {busy === "rejected" ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: "var(--details-error)", borderTopColor: "transparent" }} />
            Processing…
          </span>
        ) : (
          "Mark as Spam"
        )}
      </button>
    </div>
  );
}
