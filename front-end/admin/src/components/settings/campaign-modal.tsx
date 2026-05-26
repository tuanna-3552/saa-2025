"use client";

import { useEffect, useState } from "react";
import type { Season } from "@/hooks/use-seasons";

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (seasonData: any) => Promise<void>;
  season: Season | null; // Null if adding, populated if editing
}

// Helper to format ISO string from DB to YYYY-MM-DD for standard date input
function formatISOToDateOnly(isoString: string | null | undefined): string {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";
  const pad = (num: number) => String(num).padStart(2, "0");
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  return `${yyyy}-${MM}-${dd}`;
}

// Helper to format date-only string from input to ISO string for DB
function formatDateToISO(dateString: string, endOfDay: boolean = false): string | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;
  if (endOfDay) {
    date.setHours(23, 59, 59, 999);
  } else {
    date.setHours(0, 0, 0, 0);
  }
  return date.toISOString();
}

export function CampaignModal({
  isOpen,
  onClose,
  onSubmit,
  season,
}: CampaignModalProps) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (season) {
      setName(season.name);
      setStartDate(formatISOToDateOnly(season.voting_start));
      setEndDate(formatISOToDateOnly(season.voting_end));
    } else {
      setName("");
      setStartDate("");
      setEndDate("");
    }
    setError(null);
  }, [season, isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Campaign Name is required");
      return;
    }
    if (!startDate) {
      setError("Start Date is required");
      return;
    }
    if (!endDate) {
      setError("End Date is required");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const isoStart = formatDateToISO(startDate, false);
      const isoEnd = formatDateToISO(endDate, true);
      const derivedYear = isoStart ? new Date(isoStart).getFullYear() : new Date().getFullYear();

      const data: any = {
        name: name.trim(),
        year: derivedYear,
        // Defaulting to voting if current time is within bounds, or draft
        status: season ? season.status : "draft",
        voting_start: isoStart,
        voting_end: isoEnd,
      };

      await onSubmit(data);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save campaign");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className="relative z-10 w-full max-w-[480px] bg-[#060B0E] p-8 shadow-2xl transition-all"
        style={{
          borderRadius: "16px", // Smooth rounded corners matching Figma
          fontFamily: "var(--font-montserrat)",
        }}
      >
        {/* Centered Title */}
        <h2 className="mb-8 text-center text-2xl font-normal tracking-wide text-white">
          {season ? "Edit Campaign" : "Add Campaign"}
        </h2>

        {/* Error Alert */}
        {error && (
          <div
            className="mb-4 border border-[#D4271D]/50 bg-[#D4271D]/10 p-3 text-sm text-[#FF8F8F]"
            style={{ borderRadius: "8px" }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Campaign Name */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-sm font-semibold text-white/90">
              Campaign Name<span className="text-[#E53E3E] ml-1 font-bold">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Campaign Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 bg-white px-4 text-sm font-medium text-black placeholder-black/40 outline-none transition-colors border border-transparent focus:border-(--details-border)"
              style={{
                borderRadius: "8px", // Smooth rounded borders
              }}
            />
          </div>

          {/* Dates Row (Side-by-side) */}
          <div className="grid grid-cols-2 gap-4 text-left">
            {/* Start Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white/90">
                Start Date<span className="text-[#E53E3E] ml-1 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-12 bg-white px-4 text-sm font-medium text-black placeholder-black/40 outline-none transition-colors border border-transparent focus:border-(--details-border) cursor-pointer"
                  style={{
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white/90">
                End Date<span className="text-[#E53E3E] ml-1 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full h-12 bg-white px-4 text-sm font-medium text-black placeholder-black/40 outline-none transition-colors border border-transparent focus:border-(--details-border) cursor-pointer"
                  style={{
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons: Left Cancel, Rightwide Save */}
          <div className="mt-4 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="w-[120px] py-3 text-sm font-semibold text-white transition-all hover:bg-white/5 active:scale-95 border border-(--details-border)"
              style={{
                borderRadius: "8px",
                backgroundColor: "transparent",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 text-sm font-bold text-[#00101A] transition-all hover:opacity-95 active:scale-95 disabled:opacity-50"
              style={{
                backgroundColor: "var(--details-text-primary-1)",
                borderRadius: "8px",
              }}
            >
              {submitting ? "Saving..." : season ? "Save Changes" : "Add Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
