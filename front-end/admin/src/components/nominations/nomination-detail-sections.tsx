"use client";

import Image from "next/image";

// -- Primitives --

export function AvatarFallback({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="flex h-full w-full items-center justify-center rounded-full text-base font-semibold"
      style={{
        backgroundColor: "var(--details-divider)",
        color: "var(--details-text-primary-1)",
        fontFamily: "var(--font-montserrat)",
      }}
    >
      {initials}
    </div>
  );
}

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    // mm:info-row
    <div className="flex flex-col gap-1">
      <span
        className="text-xs font-medium uppercase tracking-widest"
        style={{ color: "var(--details-text-secondary-1)", opacity: 0.5, fontFamily: "var(--font-montserrat)" }}
      >
        {label}
      </span>
      <span
        className="text-sm font-medium"
        style={{ color: "var(--details-text-secondary-1)", fontFamily: "var(--font-montserrat)" }}
      >
        {value}
      </span>
    </div>
  );
}

export function SectionDivider() {
  return <div className="my-6 h-px w-full" style={{ backgroundColor: "var(--details-divider)" }} />;
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-4 text-xs font-medium uppercase tracking-widest"
      style={{ color: "var(--details-text-primary-1)", fontFamily: "var(--font-montserrat)" }}
    >
      {children}
    </p>
  );
}

// -- Loading / error states --

export function CardLoadingState() {
  return (
    <div className="flex items-center justify-center py-24">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"
        style={{ borderColor: "var(--details-text-primary-1)", borderTopColor: "transparent" }}
      />
    </div>
  );
}

export function CardErrorState({ message }: { message: string }) {
  return (
    <div
      className="rounded-lg border p-6 text-sm"
      style={{ borderColor: "var(--details-error)", color: "var(--details-error)", fontFamily: "var(--font-montserrat)" }}
    >
      {message}
    </div>
  );
}

// -- ReasonSection --

interface ReasonSectionProps {
  reason: string | null;
  categoryDescription: string | null;
}

export function ReasonSection({ reason, categoryDescription }: ReasonSectionProps) {
  return (
    // mm:reason-section
    <section className="mb-8">
      <SectionLabel>Reason for nomination</SectionLabel>
      {/* mm:reason-body */}
      <div
        className="rounded-xl p-5 text-sm leading-relaxed"
        style={{
          backgroundColor: "rgba(46,57,64,0.40)",
          border: "1px solid var(--details-divider)",
          color: "var(--details-text-secondary-1)",
          fontFamily: "var(--font-montserrat)",
          whiteSpace: "pre-wrap",
        }}
      >
        {reason ?? <span style={{ opacity: 0.4 }}>No reason provided.</span>}
      </div>
      {categoryDescription && (
        <p
          className="mt-3 text-xs"
          style={{ color: "var(--details-text-secondary-1)", opacity: 0.4, fontFamily: "var(--font-montserrat)" }}
        >
          Category: {categoryDescription}
        </p>
      )}
    </section>
  );
}

// -- NomineeProfile --

interface NomineeProfileProps {
  fullName: string;
  avatarUrl: string | null;
  departmentName: string | null;
}

export function NomineeProfile({ fullName, avatarUrl, departmentName }: NomineeProfileProps) {
  return (
    // mm:nominee-profile
    <div className="flex items-center gap-4">
      {/* mm:nominee-avatar */}
      <div
        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full"
        style={{ border: "2px solid var(--details-border)" }}
      >
        {avatarUrl ? (
          <Image src={avatarUrl} alt={fullName} fill className="object-cover" sizes="56px" />
        ) : (
          <AvatarFallback name={fullName} />
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        {/* mm:nominee-name */}
        <span
          className="text-base font-semibold"
          style={{ color: "var(--details-text-secondary-1)", fontFamily: "var(--font-montserrat)" }}
        >
          {fullName}
        </span>
        {/* mm:nominee-department */}
        {departmentName && (
          <span
            className="text-sm"
            style={{ color: "var(--details-text-secondary-1)", opacity: 0.6, fontFamily: "var(--font-montserrat)" }}
          >
            {departmentName}
          </span>
        )}
      </div>
    </div>
  );
}
