---
title: "Settings Page Implementation"
description: "Admin Settings page: Manage seasons (campaigns) with add, edit, and delete functionality, including delete confirmation popup."
status: draft
priority: P2
effort: 5h
branch: main
tags: [frontend, feature, admin]
blockedBy: []
blocks: []
created: 2026-05-26
completed: null
---

# Settings Page Implementation

## Overview

Implements the **Settings** section of the admin panel (nav "Settings" → `/settings`).
Displays a list of all campaigns (seasons) from the database in a table with ID, Name, Time, and Actions columns.
Allows the administrator to:
1. View campaigns (seasons) with their timeframes.
2. Add a new campaign (using a form modal/slide-over).
3. Edit an existing campaign (using a form modal/slide-over).
4. Delete a campaign (using a double-confirmation modal).

## MoMorph References

| Screen | fileKey | screenId | URL |
|--------|---------|----------|-----|
| Admin - Setting | `9ypp4enmFmdK3YAFJLIu6C` | `fTCVEC9aV_` | https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/fTCVEC9aV_ |
| Popup delete campaign | `9ypp4enmFmdK3YAFJLIu6C` | `FVA7A5f8z8` | https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/FVA7A5f8z8 |

## Design Analysis (from screenshots)

### Page Layout
- Title: **"Setting"**
- **Add Campaign** button (gold, top-right of the table area, matching Figma: color `var(--details-text-primary-1)`)
- Data table with 4 columns:
  - **ID**: Sequential display number (1-based)
  - **Name**: Campaign name (e.g., "Campaign x2 heart release landing page")
  - **Time**: Shows the timeframe from `voting_start` to `voting_end` or formatted date ranges
  - **Actions**: Action icon button (circle-arrow or cog) that opens a popover or dropdown containing **Edit** and **Delete** actions.
- Footer at the bottom: `"Bản quyền thuộc về Sun* © 2025"` (provided by `AdminLayout`).

### Popups & Dialogs
1. **Action Menu Dropdown**:
   - Small floating list next to the action button containing **Edit** (with pencil icon) and **Delete** (with cross/trash icon) options.
2. **Delete Campaign Popup**:
   - Dark modal box with raw borders.
   - Title: **"Delete Campaign"**
   - Text: `"Bạn có chắc chắn muốn xoá campaign"` followed by the campaign name highlighted in gold.
   - Buttons:
     - **Delete** (red background, solid color `var(--details-error)`)
     - **Cancel** (dark background with gold/white border)

### Form Fields (Add/Edit Campaign)
Since the `seasons` table holds the campaigns, the creation/editing form will need the following inputs:
- **Campaign Name**: Text input
- **Year**: Number input (defaults to current year)
- **Status**: Select dropdown (`draft`, `voting`, `closed`, `announced`)
- **Voting Start & End**: DateTime-local inputs

## Phases

| # | Phase | Track | Status | File |
|---|-------|-------|--------|------|
| 1 | [Settings Page + Seasons Hook + Components](./phase-01-settings-page.md) | Full | ⏳ Draft | phase-01-settings-page.md |

## Key Files

**Create:**
- `front-end/admin/src/hooks/use-seasons.ts` — Hook to manage reading/writing/deleting `seasons` (campaigns)
- `front-end/admin/src/app/(admin)/settings/page.tsx` — Settings page wrapper
- `front-end/admin/src/components/settings/settings-table.tsx` — Campaign table view
- `front-end/admin/src/components/settings/settings-row.tsx` — Table row with actions dropdown
- `front-end/admin/src/components/settings/campaign-modal.tsx` — Add/Edit campaign modal form
- `front-end/admin/src/components/settings/delete-campaign-modal.tsx` — Double-confirmation delete popup

## Key Dependencies

- `front-end/shared-ui/src/types/database.ts` — `seasons` schema types
- `front-end/admin/src/lib/supabase.ts` — Supabase client
- `@/components/ui/dropdown-menu` — Existing dropdown/popover menu pattern
- `date-fns` — Date formatting library

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Foreign key constraint violation on delete | High | In Supabase migrations, `award_categories`, `nominations`, `votes`, and `results` are defined with `ON DELETE CASCADE`. Confirming this cascade behavior is safe or prompt the user first. |
| Timezone issues with datetime-local | Medium | Store dates in ISO format (`TIMESTAMPTZ` in Postgres) and handle local/UTC conversion gracefully in form fields. |
