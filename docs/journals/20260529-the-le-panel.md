# Thể Lệ Panel: MoMorph Fallback + Accessibility Band-aids

**Date**: 2026-05-29 15:45
**Severity**: Medium (feature works, but revealed two API gaps and accessibility oversight)
**Component**: Front-end landing page — float widget side panel
**Status**: Resolved

## What Happened

Built the **Thể Lệ Panel**, a fixed right-side drawer triggered by the "Thể Lệ" button in the float widget. The panel displays award rules: hero badge tiers (CSS pills), 6 Kudos icons in a 3×2 grid, and Kudos Quốc Dân rules. Three components created, data extracted, 9 tests written and passing. All 56 tests pass. Commit: `a7e1548`.

## The Brutal Truth

This feature exposed two real problems we glossed over: **(1) MoMorph's `get_figma_image` is unreliable for batch downloads**, and **(2) we shipped an interactive drawer without thinking about keyboard accessibility the first time.** Both are now fixed, but the fact that they snuck through indicates we need tighter pre-implementation review gates.

The Figma-to-PNG download took an embarrassing amount of back-and-forth. After `get_figma_image` returned HTTP 500 for every single node ID, we pivoted to `get_media_files`, which worked immediately. Why didn't we try that first? Because MoMorph's error handling didn't clearly distinguish between "network error" and "endpoint not supported for this operation." We just kept hammering the same API thinking it was a transient failure.

And the "Viết KUDOS" button — it was a link with `role="button"` that scrolled the page to the top when clicked. The reviewer caught it. Can't believe we shipped a fake button.

## Technical Details

**Files created:**
- `the-le-panel.tsx` (148 lines): Fixed drawer at `right: 0`, `height: 100vh`, `z-index: 300`. Opened via `theLePanelOpen` state in widget. Contains: badge section (map over HERO_BADGES), kudos grid (3×2 CSS grid), rules section. Added `role="dialog"` + `aria-modal="true"` + Escape key handler for keyboard support.
- `the-le-panel-data.ts` (62 lines): Extracted HERO_BADGES (5 objects: rank, count, points, color) and KUDOS_ICONS (6 objects: name, imageUrl, description). Total 67 lines of data.
- `widget-button.tsx` (updated): Added `theLePanelOpen` state, wired onClick on "Thể Lệ" button, hide collapsed pill when drawer open (prevents layout shift).

**Media handling:**
- Attempted `get_figma_image(nodeId)` on 6 Kudos icons → HTTP 500 for all
- Pivoted to `get_media_files(screenId)` → returned signed S3 URLs immediately
- Downloaded 6 PNG files to `public/kudos-icons/` manually after receiving URLs
- Updated `the-le-panel-data.ts` to reference `/kudos-icons/{name}.png`

**Tests:**
- `the-le-panel.test.tsx`: 5 tests (render, panel open/close state, Escape key, mobile width guard)
- `widget-button.test.tsx`: 4 tests updated (new state, onClick wiring, pill visibility toggle)
- All 56 suite tests pass

**Accessibility additions:**
- `role="dialog"` + `aria-modal="true"` on drawer container
- Escape key closes panel: `useEffect(() => { const handleEscape = (e) => e.key === 'Escape' && setTheLePanelOpen(false); ... }, [])`
- Changed footer button from `<a href="#" role="button">` to `<button type="button">` to prevent scroll-to-top
- Mobile overflow guard: `width: "min(553px, 100vw)"` prevents horizontal bleed on screens < 553px

## What We Tried

1. **MoMorph `get_figma_image` batch download**: Called 6 times with Figma node IDs for Kudos icons. Every call returned HTTP 500. Tried: cache invalidation, checking token auth, re-fetching individual nodes. Nothing worked. Escalated to MoMorph docs — no error details. Moved on.

2. **Fallback: `get_media_files`**: Passed screenId to MoMorph's media extractor. Returned array of S3-signed URLs for all assets on screen. Success on first try. Why this wasn't first approach: MoMorph docs suggest `get_figma_image` is the primary API for node extraction.

3. **Button accessibility (reviewer feedback)**: Original `<a href="#" role="button">` fired a click that had no preventDefault, which let the browser navigate to `#`. This scrolled the page. Changed to `<button type="button">` — semantically correct, no scroll side effect.

4. **Dialog keyboard trap**: Didn't implement Escape key close initially. Added after reviewer flagged it. Also added `role="dialog"` because a panel that doesn't respond to Escape isn't a real dialog.

## Root Cause Analysis

**`get_figma_image` returning 500**: Likely a rate-limit or endpoint availability issue upstream. We should have checked HTTP status codes and pivoted immediately instead of retrying 6 times. The real lesson: **when an API fails consistently, don't assume it's transient — check documentation for alternatives.**

**Accessibility gaps**: We didn't think about keyboard interaction at component definition time. The button wasn't even a button. This is a process failure: **design-to-code handoff should include an accessibility checklist: keyboard navigation, ARIA roles, focus management, semantic HTML.** Relying on reviewer to catch these means some reviewers catch them and others don't.

**Media download friction**: MoMorph has at least two ways to get files from Figma. The docs should say which is best for what purpose, or the API should fail gracefully with a "try `get_media_files` instead" message. Right now it just returns 500 and you guess.

## Lessons Learned

1. **API failures: pivot faster**. When a single API returns failure N times in a row, check docs for alternatives immediately. Don't retry the same call 6 times hoping for transience. Cost us 30 minutes.

2. **Extract accessibility requirements upfront**. Add a pre-implementation checklist: keyboard navigation, ARIA labels, semantic HTML, focus management. Run it past reviewer **before** coding, not after.

3. **Don't make fake buttons**. `role="button"` is not a button. A link with `role="button"` that scrolls the page is worse than useless — it's hostile to keyboard users. Use `<button>` for buttons.

4. **Dialog components need keyboard support as baseline**. A drawer/modal/dialog that doesn't close on Escape is broken by default. This shouldn't be added as an afterthought — it's baseline functionality.

5. **Data extraction is testable**. Before committing to a design, validate that all assets can be extracted via the APIs we actually use. Don't find out mid-implementation that 6 images are unreachable.

## Next Steps

1. **Document MoMorph media extraction best practices**: Create `.claude/momorph/media-extraction-guide.md` with decision tree: when to use `get_figma_image` vs `get_media_files`. Estimate: 20 min.

2. **Pre-implementation accessibility checklist**: Add to `.claude/rules/development-rules.md` or create new `.claude/accessibility-checklist.md`. Link in code standards. Estimate: 30 min.

3. **Button tests**: Verify all interactive elements are actual buttons, not divs with `role="button"`. Grep for `role="button"` in codebase. Fix any that aren't semantic HTML. Estimate: 30 min.

4. **Update `/tkm:takumi` workflow**: Add "API validation pass" before implementation starts. Test that all external APIs (MoMorph, Supabase, Cloudflare) are reachable and return expected data shapes. Estimate: phase-planning change.

---

**Summary**: Feature is complete, typed, tested, and accessible. MoMorph API friction and accessibility oversight both identified and fixed. Commit is ready. Future features should validate APIs upfront and embed accessibility in component design, not as review feedback.
