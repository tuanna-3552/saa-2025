"use client";

import { cn } from "@/lib/utils";

interface UsersPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const FONT = { fontFamily: "var(--font-montserrat)" };

export function UsersPagination({ page, totalPages, onPageChange }: UsersPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageList(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-1 py-4">
      {/* Prev */}
      <PageBtn
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </PageBtn>

      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="flex h-8 w-8 items-center justify-center text-sm"
            style={{ color: "rgba(255,255,255,0.4)", ...FONT }}
          >
            …
          </span>
        ) : (
          <PageBtn
            key={p}
            active={p === page}
            onClick={() => onPageChange(p as number)}
          >
            {p}
          </PageBtn>
        )
      )}

      {/* Next */}
      <PageBtn
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </PageBtn>
    </div>
  );
}

function PageBtn({
  children,
  active,
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded text-sm transition-all",
        active
          ? "font-semibold"
          : "hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30"
      )}
      style={{
        fontFamily: "var(--font-montserrat)",
        backgroundColor: active ? "var(--details-text-primary-1)" : undefined,
        color: active ? "var(--details-text-primary-2)" : "rgba(255,255,255,0.7)",
        border: active ? "none" : "1px solid transparent",
      }}
    >
      {children}
    </button>
  );
}

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [1];

  if (current > 3) pages.push("…");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("…");

  pages.push(total);
  return pages;
}
