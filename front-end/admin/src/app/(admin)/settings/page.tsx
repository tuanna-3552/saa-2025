"use client";

import { useState } from "react";
import { useSeasons, type Season } from "@/hooks/use-seasons";
import { SettingsTable } from "@/components/settings/settings-table";
import { CampaignModal } from "@/components/settings/campaign-modal";
import { DeleteCampaignModal } from "@/components/settings/delete-campaign-modal";

export default function SettingsPage() {
  const {
    seasons,
    loading,
    error,
    addSeason,
    updateSeason,
    deleteSeason,
  } = useSeasons();

  // Modal control states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeSeason, setActiveSeason] = useState<Season | null>(null);

  // Trigger: Open form modal for creating
  function handleAddClick() {
    setActiveSeason(null);
    setIsFormOpen(true);
  }

  // Trigger: Open form modal for editing
  function handleEditClick(season: Season) {
    setActiveSeason(season);
    setIsFormOpen(true);
  }

  // Trigger: Open confirmation dialog for deleting
  function handleDeleteClick(season: Season) {
    setActiveSeason(season);
    setIsDeleteOpen(true);
  }

  // Handle: Save operation (Create/Update)
  async function handleFormSubmit(seasonData: any) {
    if (activeSeason) {
      await updateSeason(activeSeason.id, seasonData);
    } else {
      await addSeason(seasonData);
    }
  }

  // Handle: Delete operation
  async function handleDeleteConfirm() {
    if (activeSeason) {
      await deleteSeason(activeSeason.id);
    }
  }

  return (
    <div className="flex flex-col gap-6 px-20 py-8">
      {/* Title block: Header title & Add button */}
      <div className="flex items-center justify-between">
        <h1
          className="font-normal leading-[52px]"
          style={{
            fontSize: "45px",
            color: "var(--details-text-secondary-1)",
            fontFamily: "var(--font-montserrat)",
          }}
        >
          Setting
        </h1>
        <button
          type="button"
          onClick={handleAddClick}
          className="flex h-10 items-center rounded px-6 text-base font-semibold transition-opacity hover:opacity-90 active:scale-95"
          style={{
            backgroundColor: "var(--details-text-primary-1)",
            color: "var(--details-text-primary-2)",
            fontFamily: "var(--font-montserrat)",
            borderRadius: "2px", // Consistent sharp Brutalist edges
          }}
        >
          Add Campaign
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="mt-4">
        <SettingsTable
          seasons={seasons}
          loading={loading}
          error={error}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Add / Edit Form Modal (Option A Centered) */}
      <CampaignModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        season={activeSeason}
      />

      {/* Deletion Confirmation Modal */}
      <DeleteCampaignModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        campaignName={activeSeason?.name || ""}
      />
    </div>
  );
}
