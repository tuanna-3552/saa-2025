"use client";

import { NominationStatusBadge, type NominationStatus } from "./nomination-status-badge";
import { NominationReviewActions } from "./nomination-review-actions";
import {
  InfoRow,
  NomineeProfile,
  ReasonSection,
  SectionDivider,
  SectionLabel,
  CardLoadingState,
  CardErrorState,
} from "./nomination-detail-sections";
import { formatDate } from "@/lib/format";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NominationDetail {
  id: string;
  status: NominationStatus;
  reason: string | null;
  created_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  reviewer: { full_name: string } | null;
  nominee: {
    full_name: string;
    avatar_url: string | null;
    department: { name: string } | null;
  } | null;
  nominator: {
    full_name: string;
    department: { name: string } | null;
  } | null;
  category: { name: string; description: string | null } | null;
  season: { name: string } | null;
}

export type ReviewAction = (
  id: string,
  action: "approved" | "rejected"
) => Promise<void>;

interface NominationDetailCardProps {
  nomination: NominationDetail | null;
  loading: boolean;
  error: string | null;
  onReview: ReviewAction;
  onBack: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function NominationDetailCard({
  nomination,
  loading,
  error,
  onReview,
  onBack,
}: NominationDetailCardProps) {
  if (loading) return <CardLoadingState />;
  if (error) return <CardErrorState message={error} />;
  if (!nomination) return <CardErrorState message="Nomination not found." />;

  return (
    // mm:nomination-detail-card
    <div
      className="w-full rounded-2xl p-8"
      style={{
        backgroundColor: "var(--details-container)",
        border: "1px solid var(--details-divider)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* ── Header: back button + title + status badge ── */}
      {/* mm:card-header */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* mm:btn-back */}
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2"
            style={{
              border: "1px solid var(--details-divider)",
              color: "var(--details-text-secondary-1)",
            }}
            title="Back to nominations"
          >
            {/* mm:icon-back */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* mm:card-title */}
          <h1
            className="text-lg font-semibold"
            style={{
              color: "var(--details-text-secondary-1)",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            Nomination Detail
          </h1>
        </div>

        {/* mm:status-badge-header */}
        <NominationStatusBadge status={nomination.status} />
      </div>

      {/* ── Nominee ── */}
      {/* mm:nominee-section */}
      {nomination.nominee && (
        <section className="mb-6">
          <SectionLabel>Nominee</SectionLabel>
          <NomineeProfile
            fullName={nomination.nominee.full_name}
            avatarUrl={nomination.nominee.avatar_url}
            departmentName={nomination.nominee.department?.name ?? null}
          />
        </section>
      )}

      <SectionDivider />

      {/* ── Meta grid ── */}
      {/* mm:meta-grid */}
      <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
        {nomination.nominator && (
          <InfoRow label="Nominator" value={nomination.nominator.full_name} />
        )}
        {nomination.nominator?.department && (
          <InfoRow label="Department" value={nomination.nominator.department.name} />
        )}
        {nomination.season && (
          <InfoRow label="Season" value={nomination.season.name} />
        )}
        {nomination.category && (
          <InfoRow label="Category" value={nomination.category.name} />
        )}
        <InfoRow label="Submitted" value={formatDate(nomination.created_at, "medium")} />
        {nomination.reviewed_at && (
          <InfoRow label="Reviewed" value={formatDate(nomination.reviewed_at, "medium")} />
        )}
        {nomination.reviewer && (
          <InfoRow label="Reviewed by" value={nomination.reviewer.full_name} />
        )}
      </div>

      <SectionDivider />

      {/* ── Reason ── */}
      <ReasonSection
        reason={nomination.reason}
        categoryDescription={nomination.category?.description ?? null}
      />

      {/* ── Review actions ── */}
      {/* mm:review-actions-section */}
      <div
        className="rounded-xl p-5"
        style={{
          backgroundColor: "rgba(46,57,64,0.25)",
          border: "1px solid var(--details-divider)",
        }}
      >
        <SectionLabel>Review decision</SectionLabel>
        <NominationReviewActions
          nominationId={nomination.id}
          currentStatus={nomination.status}
          onReview={onReview}
        />
      </div>
    </div>
  );
}
