"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNominations, type StatusFilter } from "@/hooks/use-nominations";
import { NominationsTable } from "@/components/nominations/nominations-table";
import { NominationsStatusFilter } from "@/components/nominations/nominations-status-filter";

export default function NominationsPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const { nominations, loading, error } = useNominations(statusFilter);

  function handleRowClick(id: string) {
    router.push(`/nominations/${id}`);
  }

  return (
    <div className="flex flex-col gap-6 px-20 py-8">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <h1
          className="font-normal leading-[52px]"
          style={{
            fontSize: "45px",
            color: "var(--details-text-secondary-1)",
            fontFamily: "var(--font-montserrat)",
          }}
        >
          Review content
        </h1>
      </div>

      {/* Filter + count row */}
      <div className="flex items-center justify-between">
        <NominationsStatusFilter
          value={statusFilter}
          onChange={setStatusFilter}
        />
        {!loading && !error && (
          <span
            className="text-sm"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            {nominations.length} nomination{nominations.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Table */}
      <NominationsTable
        nominations={nominations}
        loading={loading}
        error={error}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
