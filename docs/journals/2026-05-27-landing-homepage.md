# Landing Page Homepage — Track A/B Parallel Execution

**Date**: 2026-05-27 16:06
**Severity**: Low (feature complete, minor craft notes)
**Component**: `front-end/landing-page` — `/home` route
**Status**: Resolved
**Commit**: `092285a` — feat(landing-page): implement /home homepage with auth-conditional header

## What Happened

Shipped a 7-section homepage (header, hero with countdown timer, featured content, 6-card awards grid, kudos section, widget button, footer) matching Figma pixel-perfect. Auth-conditional header renders user controls (LanguageToggle, NotificationBadge, AccountMenu) only when Supabase session exists. Role-based menu: admins see "Admin Dashboard" link; employees don't. 29 unit tests across 6 test files, all passing. Jest infrastructure bootstrapped from scratch for landing-page workspace.

## The Brutal Truth

The parallel execution (Track A UI + Track B auth logic) saved wall time but created a header redesign mid-flight. Track A's design iteration produced static auth controls; Track B replaced them with a self-fetching `<UserMenu />` that detects session client-side. This forced me to reconcile two different component hierarchies. The language toggle got built twice — once inline in the header, once as a standalone component. Wasteful, but the overlap was caught during review and consolidated. The real friction: had Track A and Track B agreed on a header "slot" upfront, integration would've been seamless. Instead, I spent 30 minutes untangling competing implementations.

Also: jsdom strips `-webkit-line-clamp` silently. Debugging that required reading the jsdom docs and working around the limitation with a style attribute test that would never pass in a real browser. That's a lie of a test, and it bothers me. A visual regression suite would catch this instantly; unit tests are blind to webkit quirks.

## Technical Details

**Client-side session fetch in `useEffect`:**
```tsx
// UserMenu.tsx
useEffect(() => {
  const fetchSession = async () => {
    const { data } = await getSupabase().auth.getSession();
    setSession(data.session);
  };
  fetchSession();
}, []);
```

Edge runtime prevents server-side cookie access in header; minor auth flicker on page load is acceptable and consistent with login-form.tsx pattern. Supabase session becomes available only after client hydration.

**Router mock fix:**
```ts
// Before: new object per call → infinite useEffect re-runs
useRouter: () => ({ push: jest.fn() })

// After: stable reference
const mockRouter = { push: jest.fn() };
useRouter: () => mockRouter
```

**Environment-driven event date:**
Updated hero-section from hardcoded `"2025-12-26T00:00:00"` to `process.env.NEXT_PUBLIC_EVENT_DATE ?? "2025-12-26T00:00:00"`. Prevents future hardcoding disasters.

## What We Tried

1. **Initial approach**: Static header built by Track A, auth slot filled by Track B response → collision detected during code review
2. **First fix**: Replace Track A header entirely with Track B version → losing design iteration work
3. **Second approach**: Merge both; keep Track B's UserMenu, strip Track A's duplicate controls → 15-minute reconciliation
4. **jsdom webkit workaround**: Tested `-webkit-line-clamp` via style attribute + `overflow: hidden` instead of computed styles → acceptable for unit tests, inadequate for visual regression

## Root Cause Analysis

**Parallel execution without interface contract**: Track A and Track B should have defined the header component boundary upfront — "Track A designs the layout; Track B provides UserMenu as a drop-in replacement for the auth controls slot." Instead, both teams independently solved for the same space. This is a coordination tax of parallel work, not a failure — but it's real and measurable (30 min lost). 

**jsdom limitations**: Unit tests cannot validate webkit rendering. The test passes; a real browser would fail if `-webkit-line-clamp` broke. This creates a false sense of security.

**Hardcoded values leaking through code review**: `NEXT_PUBLIC_EVENT_DATE` should have been enforced as an environment variable from day one, not caught as a reviewer comment.

## Lessons Learned

1. **Parallel tracks need explicit interface specs**: Before spawning Track A/B agents, document the component boundary. "Track A builds header shell; Track B provides UserMenu; connection point is here." Prevents mid-flight redesign.

2. **Jest alone is insufficient for visual components**: `-webkit-line-clamp`, blend modes, transform stacking, media queries — all silently fail in jsdom. Plan for visual regression testing (Chromatic, Percy) or manual Figma diff. Unit tests should verify logic, not CSS rendering.

3. **Environment config validation at build time**: Hardcoded event dates, admin URLs, API endpoints — all should fail the build if missing from `.env.local`. Add a validation script that runs `next build --lint` or similar before compile.

4. **Acknowledge the flicker**: Client-side session fetch will always produce an initial render-without-session before hydration completes. This is acceptable for public-facing pages; document it, don't hide it.

## Next Steps

- [ ] **Add build-time env validation**: Create `scripts/validate-env.ts`, run it before `next build` in CI/CD
- [ ] **Plan visual regression suite**: Evaluate Chromatic/Percy for webkit/blend-mode validation
- [ ] **Defer E2E Playwright tests**: Deferred to separate plan after visual suite is in place
- [ ] **Complete `/awards`, `/kudos` pages**: Currently href="#" placeholders; separate feature plan
- [ ] **Test ID-28 deferred**: Notification badge real count awaits notifications table schema
- [ ] **Cross-check `mixBlendMode: "screen"`**: Visual validation of award card wrapper against Figma — reviewer flagged potential drift

**Owner**: Feature lead (feature complete; blockers are infrastructure-level, not code)
**Timeline**: Next sprint — env validation high priority, visual suite medium priority

