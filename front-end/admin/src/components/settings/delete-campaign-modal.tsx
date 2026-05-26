"use client";

import { useState } from "react";

interface DeleteCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  campaignName: string;
}

export function DeleteCampaignModal({
  isOpen,
  onClose,
  onConfirm,
  campaignName,
}: DeleteCampaignModalProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleConfirm() {
    setDeleting(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to delete campaign");
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog container */}
      <div
        className="relative z-10 w-full max-w-[420px] bg-[#060B0E] p-8 shadow-2xl transition-all"
        style={{
          borderRadius: "16px", // Smooth rounded corners matching screenshot
          fontFamily: "var(--font-montserrat)",
        }}
      >
        {/* Title: Centered horizontally */}
        <h2 className="mb-6 text-center text-xl font-normal tracking-wide text-white">
          Delete Campaign
        </h2>

        {/* Error message */}
        {error && (
          <div
            className="mb-4 border border-[#D4271D]/50 bg-[#D4271D]/10 p-3 text-sm text-[#FF8F8F]"
            style={{ borderRadius: "6px" }}
          >
            {error}
          </div>
        )}

        {/* Content: Left-aligned */}
        <div className="mb-8 flex flex-col gap-2.5 text-left">
          <p className="text-sm font-light text-white/80 leading-normal">
            Bạn có chắc chắn muốn xoá campaign
          </p>
          <p
            className="text-lg font-medium leading-relaxed"
            style={{ color: "var(--details-text-primary-1)" }}
          >
            {campaignName}
          </p>
        </div>

        {/* Buttons Row: Side-by-side, identical height, rounded-md */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={deleting}
            className="flex-1 py-3 text-sm font-semibold text-white transition-all hover:opacity-95 active:scale-95 disabled:opacity-50"
            style={{
              backgroundColor: "#D4271D",
              borderRadius: "6px",
            }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="flex-1 py-3 text-sm font-semibold text-white transition-all hover:bg-white/5 active:scale-95"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--details-border)",
              borderRadius: "6px",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
