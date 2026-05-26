---
title: Prelaunch Countdown Page — Landing Page
status: completed
created: 2026-05-26
blockedBy: []
blocks: []
---

# Prelaunch Countdown Page

**Goal:** Implement the "Countdown - Prelaunch page" screen for the public landing page. Full-screen dark background with a colorful abstract art overlay, displaying a live countdown timer (Days / Hours / Minutes) until the event start date.

## MoMorph Refs
- Countdown - Prelaunch page: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/8PJQswPZmU
- Figma node: `2268:35127` in file `9ypp4enmFmdK3YAFJLIu6C`

## Phases

| # | Phase | Status |
|---|-------|--------|
| 01 | [Assets, Fonts & Countdown Component](./phase-01-assets-fonts-countdown.md) | ✅ Completed |
| 02 | [Prelaunch Page Assembly](./phase-02-prelaunch-page.md) | ✅ Completed |

## Key Decisions
- Data source: `NEXT_PUBLIC_EVENT_DATE` env var (ISO string, e.g. `2025-12-01T09:00:00+07:00`), forwarded in `next.config.ts`
- No SECONDS displayed — design shows only Days / Hours / Minutes
- Countdown component is a Client Component (`"use client"`)
- Page itself stays as SSR Server Component wrapping the client countdown
- **Font**: `Share Tech Mono` via `next/font/google` for digits (no self-hosting); Montserrat Bold for labels/title
- **Zero state**: When countdown hits 0, redirect to `"/"` (will land on real homepage once prelaunch page is replaced)
- **Responsive**: Desktop only — match Figma 1512px design exactly
- Background image: Download Figma asset to `public/images/prelaunch-bg.jpg`

## Files Changed
- `front-end/landing-page/src/app/page.tsx` — replaced with Prelaunch page
- `front-end/landing-page/src/app/layout.tsx` — add Montserrat + Share Tech Mono fonts
- `front-end/landing-page/next.config.ts` — add `NEXT_PUBLIC_EVENT_DATE` to env block
- `front-end/landing-page/src/components/countdown-timer.tsx` — NEW, client component
- `front-end/landing-page/public/images/prelaunch-bg.jpg` — NEW, background art

## Validation Log

### Session 1 — 2026-05-26
**Trigger:** Pre-implementation blueprint validation
**Questions asked:** 4

#### Questions & Answers

1. **[Risk]** "Digital Numbers" font is a non-Google, non-standard font. What's the fallback strategy?
   - Options: Share Tech Mono | Self-host Digital Numbers | CSS-only fallback
   - **Answer:** Share Tech Mono (Google Fonts)
   - **Rationale:** Eliminates font sourcing risk and self-hosting complexity. Acceptable visual approximation.

2. **[Architecture]** When the countdown reaches 00:00:00, what should the page do?
   - Options: Show zeros and stay | Redirect to homepage | Show a message
   - **Answer:** Redirect to a homepage (`"/"`)
   - **Rationale:** Countdown component needs `useRouter` redirect when `diff <= 0`. Target route "/" will be the real homepage once prelaunch page is replaced.

3. **[Scope]** The Figma design is 1512px wide — should the page be responsive?
   - Options: Desktop only | Basic mobile | Fully responsive
   - **Answer:** Desktop only — match design exactly
   - **Rationale:** HOLD SCOPE confirmed. No responsive work in this plan.

4. **[Architecture]** Should `NEXT_PUBLIC_EVENT_DATE` be added to `next.config.ts` env block?
   - Options: Yes, add to next.config.ts | No, rely on process.env
   - **Answer:** Yes, add to next.config.ts
   - **Rationale:** Consistent with project pattern for `NEXT_PUBLIC_SUPABASE_URL` etc.

#### Confirmed Decisions
- Font: Share Tech Mono via `next/font/google` — no self-hosting
- Zero state: `router.push("/")` when countdown diff ≤ 0
- Responsive: desktop only
- Env: `NEXT_PUBLIC_EVENT_DATE` added to `next.config.ts`

#### Action Items
- [ ] Remove all Digital Numbers / self-hosting steps from Phase 01
- [ ] Add `useRouter` redirect logic to `countdown-timer.tsx`
- [ ] Add `NEXT_PUBLIC_EVENT_DATE` to `next.config.ts` env block (Phase 02)
