---
phase: 01
title: Assets, Fonts & Countdown Component
status: completed
priority: high
effort: medium
---

# Phase 01 — Assets, Fonts & Countdown Component

## Context Links
- Design: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/8PJQswPZmU
- Figma node: `2268:35127`, file `9ypp4enmFmdK3YAFJLIu6C`
- Background image asset (Figma, expires 7 days): `https://www.figma.com/api/mcp/asset/6376f65c-83b3-4793-83a8-806d3da7f3ac`

## Overview
Set up the background image, custom fonts, and build the reusable `CountdownTimer` client component.

## Design Tokens (from Figma)
| Token | Value |
|-------|-------|
| Background color | `#00101a` |
| Gradient overlay | `linear-gradient(13.3deg, rgb(0,16,26) 15.5%, rgba(0,18,29,0.46) 52.1%, rgba(0,19,32,0) 63.4%)` |
| Border color (digit card) | `#ffea9e` |
| Border width | `0.75px` |
| Border radius | `8px` |
| Digit card size | `76.8×122.88px` |
| Digit font size | `73.73px` |
| Digit font | `Digital Numbers Regular` → self-hosted |
| Label font | `Montserrat Bold`, `36px`, `48px` line-height |
| Title font | `Montserrat Bold`, `36px`, `48px` line-height |
| Digit group gap | `21px` |
| Group separator gap | `60px` |
| Card backdrop blur | `24.96px` |
| Card bg | gradient `white → rgba(255,255,255,0.1)`, `opacity: 50%` |

## Requirements
- Background image: colorful abstract wave art, flipped vertically (CSS `scale-y: -1` + `rotate-180`)
- Overlay: dark gradient to reveal bottom-left content area
- Digit cards: glassmorphism style (backdrop-blur, white-to-transparent gradient bg, golden border)
- Countdown: live, ticks every 1000ms via `setInterval`, stops at zero
- Shows: Days (2 digits), Hours (2 digits), Minutes (2 digits) — NO SECONDS
- Target date from: `process.env.NEXT_PUBLIC_EVENT_DATE`

## Implementation Steps

### Step 1 — Download background image
```bash
# From the workspace root, download the Figma asset:
curl -L "https://www.figma.com/api/mcp/asset/6376f65c-83b3-4793-83a8-806d3da7f3ac" \
  -o "front-end/landing-page/public/images/prelaunch-bg.jpg"
```
- Create `front-end/landing-page/public/images/` directory first
- Verify the downloaded file is a valid image (not HTML/error)

<!-- Updated: Validation Session 1 - Font changed from self-hosted Digital Numbers to Share Tech Mono (Google Fonts) -->
### Step 2 — Add fonts to layout.tsx
```tsx
import { Montserrat, Share_Tech_Mono } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-digital",
});
// Apply both variables to <body> className in layout.tsx
```
- `Share Tech Mono` approximates the segmented LED digit look from the design
- Pass both `montserrat.variable` and `shareTechMono.variable` to `<body>` className

### Step 4 — Create countdown-timer.tsx
File: `front-end/landing-page/src/components/countdown-timer.tsx`

```tsx
"use client";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

function calcTimeLeft(targetDate: string): TimeLeft {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
  };
}
```

- Component: `CountdownTimer({ targetDate: string })`
- On mount: compute initial `timeLeft`, set interval (1000ms) to recompute
- Cleanup interval on unmount
- Render: three groups (DAYS, HOURS, MINUTES), each group = 2 `DigitCard` + label
- `DigitCard`: single digit, glassmorphism style per design tokens
- Pad each unit to 2 digits before splitting: `String(days).padStart(2, "0")`
- When `targetDate` is missing/invalid: render zeros (graceful fallback)

## Files to Create / Modify
| File | Action |
|------|--------|
| `front-end/landing-page/public/images/prelaunch-bg.jpg` | Create (download) |
| `front-end/landing-page/src/app/layout.tsx` | Modify — add Montserrat + Share Tech Mono |
| `front-end/landing-page/src/components/countdown-timer.tsx` | Create |

## Todo
- [x] Download background image to `public/images/prelaunch-bg.jpg`
- [x] Add Montserrat + Share Tech Mono via `next/font/google` in `layout.tsx`
- [x] Create `countdown-timer.tsx` with `DigitCard` sub-component
- [x] Verify countdown logic: days/hours/minutes calculation
- [x] Add `useRouter` redirect to `"/"` when diff ≤ 0 (zero-state behavior)
- [x] Run type-check: `pnpm --filter @saa/landing-page type-check`

## Success Criteria
- `CountdownTimer` renders 3 groups (DAYS, HOURS, MINUTES) with 2 digit cards each
- Digits decrement correctly on 1-second interval
- Stops at 00 00 00 when target date is in the past
- Digital Numbers font loads correctly in browser
- Type-check passes with no errors

## Risk
- Figma asset URL expires in 7 days — download immediately when implementing
