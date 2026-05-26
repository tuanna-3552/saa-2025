---
phase: 1
title: "Settings page — hook, components, and modals"
status: draft
effort: 5h
priority: P1
blockedBy: []
---

# Phase 01 — Settings Page (Campaign Management)

## Context Links
- Plan: [plan.md](./plan.md)
- Design List: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/fTCVEC9aV_
- Design Popup: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/FVA7A5f8z8

## Overview

Create the `/settings` admin page. It handles full CRUD operations on `seasons` (referred to as campaigns in the UI).
Features:
- Retrieve and list all campaigns (seasons) from Supabase.
- Display ID, Name, timeframe, and Actions (Edit/Delete).
- Create a new campaign with validation (Name, Year, Status, Dates).
- Edit an existing campaign with pre-filled fields.
- Delete a campaign with a premium dark-themed double-confirmation modal.

## Architecture

```
app/(admin)/settings/page.tsx               ← CSR client page: handles state, modal triggers
  ├── components/settings/
  │     ├── settings-table.tsx              ← Table shell with headers
  │     ├── settings-row.tsx                ← Row component with dropdown menu
  │     ├── campaign-modal.tsx              ← Form modal for Add & Edit operations
  │     └── delete-campaign-modal.tsx       ← Double-confirmation popup for Delete
hooks/use-seasons.ts                        ← Supabase custom hook for query/mutate seasons
```

## Data Strategy & Supabase Integration

### Hook: `use-seasons.ts`
We will create a custom hook `useSeasons` to query and mutate `seasons` table.

```typescript
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@saa/shared-ui";

export type Season = Database["public"]["Tables"]["seasons"]["Row"];
export type NewSeason = Database["public"]["Tables"]["seasons"]["Insert"];
export type UpdateSeason = Database["public"]["Tables"]["seasons"]["Update"];

export function useSeasons() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchSeasons() {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("seasons")
        .select("*")
        .order("created_at", { ascending: false });
      if (err) throw err;
      setSeasons(data || []);
    } catch (e: any) {
      setError(e.message || "Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  }

  async function addSeason(season: NewSeason) {
    const { data, error: err } = await supabase
      .from("seasons")
      .insert([season])
      .select();
    if (err) throw err;
    await fetchSeasons();
    return data?.[0];
  }

  async function updateSeason(id: string, updates: UpdateSeason) {
    const { data, error: err } = await supabase
      .from("seasons")
      .update(updates)
      .eq("id", id)
      .select();
    if (err) throw err;
    await fetchSeasons();
    return data?.[0];
  }

  async function deleteSeason(id: string) {
    const { error: err } = await supabase
      .from("seasons")
      .delete()
      .eq("id", id);
    if (err) throw err;
    await fetchSeasons();
  }

  useEffect(() => {
    fetchSeasons();
  }, []);

  return {
    seasons,
    loading,
    error,
    refresh: fetchSeasons,
    addSeason,
    updateSeason,
    deleteSeason,
  };
}
```

## Related Code Files

**Create:**
- `front-end/admin/src/hooks/use-seasons.ts`
- `front-end/admin/src/app/(admin)/settings/page.tsx`
- `front-end/admin/src/components/settings/settings-table.tsx`
- `front-end/admin/src/components/settings/settings-row.tsx`
- `front-end/admin/src/components/settings/campaign-modal.tsx`
- `front-end/admin/src/components/settings/delete-campaign-modal.tsx`

## Implementation Steps

### Step 1 — Hook (`use-seasons.ts`)
1. Create `front-end/admin/src/hooks/use-seasons.ts`.
2. Implement fetch, add, update, delete functions wrapping Supabase Client queries.

### Step 2 — Page Component (`settings/page.tsx`)
1. Create `front-end/admin/src/app/(admin)/settings/page.tsx`.
2. Fetch seasons using the `useSeasons()` hook.
3. Manage UI States:
   - `isAddModalOpen: boolean`
   - `isEditModalOpen: boolean`
   - `isDeleteModalOpen: boolean`
   - `activeSeason: Season | null` (currently selected campaign for edit or delete)
4. Layout:
   - Header with title **"Setting"**
   - **Add Campaign** button on the right
   - Table showing active/past campaigns
   - Dynamic Modals rendered conditionally at the bottom

### Step 3 — Settings Table & Row Components
1. Create `front-end/admin/src/components/settings/settings-table.tsx` and `settings-row.tsx`.
2. The table must match the dark aesthetic from the screenshot:
   - Alternating row styling or clean bordered-bottom rows.
   - Time format display: `voting_start` to `voting_end` range (e.g. `23/12/2025 - 10:00  25/12/2025 - 10:00`).
   - Actions: circular icon button triggers `DropdownMenu` with **Edit** and **Delete** options.

### Step 4 — Campaign Form Modal (`campaign-modal.tsx`)
Props: `isOpen`, `onClose`, `onSubmit`, `season` (if editing).
Form elements (styled with sharp net geometry, 0px-2px corners for a Technical/Luxury look):
- Input: **Campaign Name** (string, required)
- Input: **Year** (number, required)
- Select: **Status** (`draft`, `voting`, `closed`, `announced`)
- Input: **Voting Start & End** (datetime-local)

Integrate form submitting with error handling and loading indicators.

### Step 5 — Delete Campaign Confirmation Modal (`delete-campaign-modal.tsx`)
Props: `isOpen`, `onClose`, `onConfirm`, `campaignName`.
Matches Figma pixel-perfect:
- Title: **Delete Campaign**
- Bold question: "Bạn có chắc chắn muốn xoá campaign"
- Target campaign name highlighted in gold: `var(--details-text-primary-1)`
- Red **Delete** button: `var(--details-error)`
- Outlined **Cancel** button with gold/white border.

### Step 6 — TypeScript & Quality Checks
Run TypeScript checking:
`pnpm --filter @saa/admin tsc --noEmit`

## Todo List

- [ ] Create `use-seasons.ts` hook
- [ ] Create `settings/page.tsx`
- [ ] Create `settings-table.tsx` and `settings-row.tsx`
- [ ] Create `campaign-modal.tsx` (Add & Edit Form)
- [ ] Create `delete-campaign-modal.tsx` (Delete Confirmation Modal)
- [ ] Verify everything compiles without lint/type errors

## Success Criteria

- Table loads list of campaigns (seasons) successfully from the database.
- Clicking **Add Campaign** shows the form modal, submitting it inserts a new record in Supabase.
- Clicking **Edit** pre-fills the form modal and successfully updates the campaign details.
- Clicking **Delete** opens the double-confirmation dialog, and confirming deletes the campaign and all cascades successfully.
- Active underline glows on `"Settings"` in the navigation bar.
- TypeScript builds clean without errors.
