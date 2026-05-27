# Prelaunch Countdown Page Implementation

**Date**: 2026-05-26 16:45
**Severity**: Medium
**Component**: Landing Page - Prelaunch Countdown
**Status**: Resolved

## What Happened

Implemented the prelaunch countdown timer component and landing page from scratch: a full-screen dark portal with centered countdown (Days/Hours/Minutes), abstract gradient overlay, and configurable redirect on expiry. Built environment-driven target date, Google Fonts integration, and client-side countdown logic with proper expiration handling.

## The Brutal Truth

This was supposed to be simple—just a countdown. But three bugs hiding in the logic would have shipped silent failures to production:

1. **Off-by-one-minute redirect**: The displayed countdown floored minutes to 2 digits, but the redirect check used that floored value (`== 0`) instead of raw milliseconds. Result: redirect fires up to 59 seconds early. Embarrassing because it passed casual testing (you have to watch the exact second it hits zero).

2. **Infinite self-redirect loop**: When the countdown already expired on page load, `useEffect` still started the interval, which then immediately redirected to "/" (the same page). This creates a soft loop—not catastrophic but definitely broken UX.

3. **Silent 100+ day truncation**: The code used `padStart(2)` to format days, then accessed the first two digits with array indexing. If the countdown is ever 100+ days, the third digit vanishes silently. Found during review, not in testing.

All three would have made it to production unnoticed. All three are the kind of bugs that make you angry at yourself later.

## Technical Details

**Environment variable pattern:**
```typescript
const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE;
const targetMs = new Date(eventDate).getTime();
```

Non-secret dates belong in `NEXT_PUBLIC_*` so they're baked at build time, not fetched at runtime. Avoids Supabase dependency for a static marketing date.

**Countdown interval logic (corrected version):**
```typescript
if (targetMs <= Date.now()) {
  // Already expired on mount—return immediately, don't start interval
  return;
}

const interval = setInterval(() => {
  const now = Date.now();
  const diff = targetMs - now;

  // Redirect check uses raw milliseconds, not floored display value
  if (diff <= 0) {
    clearInterval(interval);
    router.push(redirectTo);
  }
});
```

**Day capping for display (preventing truncation):**
```typescript
const days = Math.min(Math.floor(diff / (1000 * 60 * 60 * 24)), 99);
```

99-day cap is arbitrary but safe. If countdown ever exceeds this, display shows "99" instead of silently dropping digits.

## What We Tried

1. **Self-hosted Digital Numbers font** → Switched to `Share Tech Mono` from Google Fonts. Eliminates font sourcing risk and keeps deployment surface smaller. Trade-off: slightly less futuristic look, but more maintainable.

2. **Supabase-driven event date** → Rejected. Adds runtime dependency for a static marketing property. Environment variables are simpler, faster, and don't require auth context.

3. **Redirect on mount if expired** → Attempted first, caused self-redirect loop. Changed to silent zero display instead—better UX (no flash), allows graceful degradation if redirectTo is unavailable.

4. **Three-digit day display** → Caught in review. `padStart(2)` only guarantees 2-char output. Switched to `Math.min(..., 99)` cap to prevent silent truncation.

## Root Cause Analysis

**The real problem: countdown logic is deceptively tricky.** Time-based state, interval cleanup, redirect timing, and expired-on-mount edge cases all interact in ways that aren't obvious until you trace through the full execution path. This wasn't a stupid mistake—it was underestimation of the number of failure modes in a simple component.

The minute-redirect bug specifically came from **separating display logic from decision logic**. The countdown displays `padStart(2)` for readability, but the redirect check used that same formatted value. They should never be coupled. Off-by-one problems thrive in that gap.

## Lessons Learned

1. **Time-based redirects need millisecond precision, not formatted display values.** Keep decision logic and presentation logic completely separate. If you're displaying "0" but checking `== 0`, you've already lost.

2. **Expiry edge case: already expired on mount.** Always check if the deadline has passed before starting an interval. An immediate redirect creates UX problems; a graceful zero display is safer. Your users aren't robots—they won't notice the countdown isn't ticking if it's already done.

3. **Numeric truncation is silent.** If you cap or format numbers, document the limit. `99` for days isn't self-documenting; it's a trap for whoever inherits this and tries to use it for a year-long countdown.

4. **ESLint was broken project-wide.** The landing-page app had no lint rule enforcement. Caught a broken `eslint-plugin-next-on-pages` CJS import in an ESM config. Fixed by matching the admin app pattern. Add lint to CI before merging landing-page features.

5. **29MB background image is a production concern.** The Figma asset is beautiful but will kill mobile load times. Needs compression/optimization pass before launch. Noted but not blocking—flag for performance review sprint.

## Next Steps

1. **Compress background image.** 29MB PNG is unacceptable for a landing page. Use ImageMagick or similar to reduce to < 2MB, consider WebP format.

2. **Add test framework to landing-page.** Currently no Jest/Vitest setup. Countdown logic should be tested (especially interval cleanup and redirect timing). This would have caught bugs 1 & 2 automatically.

3. **Document environment variable pattern** in `docs/code-standards.md`: when to use `NEXT_PUBLIC_*` vs. Supabase vs. runtime config. Prevent future re-decisions on the same question.

4. **Add ESLint enforcement** to landing-page CI. Caught the named import issue manually; should be automated.

All work merged to main via commit `f68b92e`. Prelaunch page live and ready for staging validation.
