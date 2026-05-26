---
phase: 02
title: Prelaunch Page Assembly
status: completed
priority: high
effort: small
blockedBy: []
---

# Phase 02 — Prelaunch Page Assembly

## Context Links
- Design: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/8PJQswPZmU
- Figma node: `2268:35127`, file `9ypp4enmFmdK3YAFJLIu6C`
- Plan: [phase-01-assets-fonts-countdown.md](./phase-01-assets-fonts-countdown.md)

## Overview
Replace the placeholder `page.tsx` with the full Prelaunch page. Wire the `CountdownTimer` component into the SSR page, apply the background image + gradient overlay, and center the content per the Figma design.

## Layout Structure (from Figma)
```
<page>                          bg: #00101a, full-screen
  <bg-image>                   absolute, full-size, flipped vertically (-scale-y-100 rotate-180), opacity 50%
    <img src="/images/prelaunch-bg.jpg" />
  </bg-image>
  <gradient-overlay>           absolute, full-size, dark gradient (bottom-left to top-right)
  </gradient-overlay>
  <content>                    absolute, top-[218px], centered, px-[144px] py-[96px]
    <title>                    "Sự kiện sẽ bắt đầu sau" — Montserrat Bold, 36px, white, centered
    <countdown-timer />        Days / Hours / Minutes
  </content>
</page>
```

## Implementation Steps

### Step 1 — Update page.tsx
File: `front-end/landing-page/src/app/page.tsx`

Replace the current placeholder with:
```tsx
export const runtime = "edge";

import CountdownTimer from "@/components/countdown-timer";

export default function HomePage() {
  const targetDate = process.env.NEXT_PUBLIC_EVENT_DATE ?? "";
  return (
    <main className="relative min-h-screen bg-[#00101a] overflow-hidden">
      {/* Background art — flipped vertically per Figma */}
      <div className="absolute inset-0 -scale-y-100 rotate-180 opacity-50">
        <img
          src="/images/prelaunch-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(13.3deg, rgb(0,16,26) 15.5%, rgba(0,18,29,0.46) 52.1%, rgba(0,19,32,0) 63.4%)",
        }}
      />

      {/* Countdown content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6 px-36 py-24">
        <p
          className="text-[36px] font-bold text-white text-center leading-12"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Sự kiện sẽ bắt đầu sau
        </p>
        <CountdownTimer targetDate={targetDate} />
      </div>
    </main>
  );
}
```

<!-- Updated: Validation Session 1 - Add NEXT_PUBLIC_EVENT_DATE to next.config.ts + redirect on zero -->
### Step 2 — Add NEXT_PUBLIC_EVENT_DATE to next.config.ts
File: `front-end/landing-page/next.config.ts`

Add to the `env` block (consistent with existing `NEXT_PUBLIC_SUPABASE_URL` etc.):
```ts
env: {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "",
  NEXT_PUBLIC_EVENT_DATE: process.env.NEXT_PUBLIC_EVENT_DATE || "",  // ← add this
},
```

### Step 3 — Type-check & lint
```bash
pnpm --filter @saa/landing-page type-check
pnpm --filter @saa/landing-page lint
```

## Files to Modify
| File | Action |
|------|--------|
| `front-end/landing-page/next.config.ts` | Modify — add `NEXT_PUBLIC_EVENT_DATE` to env block |
| `front-end/landing-page/src/app/page.tsx` | Replace — Prelaunch page |

## Todo
- [x] Add `NEXT_PUBLIC_EVENT_DATE` to `next.config.ts` env block
- [x] Replace `page.tsx` with Prelaunch layout
- [x] Verify background image path matches `public/images/prelaunch-bg.jpg`
- [x] Verify `CountdownTimer` import resolves correctly
- [x] Verify redirect to `"/"` fires when `NEXT_PUBLIC_EVENT_DATE` is unset or past
- [x] Run type-check: `pnpm --filter @saa/landing-page type-check`
- [x] Run lint: `pnpm --filter @saa/landing-page lint`
- [x] Visual check: `pnpm --filter @saa/landing-page dev` → open localhost:3000

## Success Criteria
- Page renders full-screen with dark background `#00101a`
- Colorful abstract image appears flipped with 50% opacity
- Dark gradient overlays bottom-left of the image
- "Sự kiện sẽ bắt đầu sau" title appears above countdown
- CountdownTimer displays DAYS / HOURS / MINUTES with glassmorphism digit cards
- No TypeScript errors, lint passes
- `export const runtime = "edge"` preserved for Cloudflare Pages compatibility

## Notes
- Keep `export const runtime = "edge"` — required for Cloudflare Pages deployment
- The `<img>` tag is used instead of `next/image` to stay compatible with edge runtime and avoid Cloudflare Pages image optimization constraints
- `z-10` on content ensures it renders above the absolute positioned bg layers
