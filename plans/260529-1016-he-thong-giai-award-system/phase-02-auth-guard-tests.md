# Phase 02 — Auth Guard + Tests

## Context Links

- MoMorph screen: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/zFYDgyj_pD
- Test cases: ID-0 through ID-14 (15 total)
- Plan: [plan.md](./plan.md)
- Clarifications: [clarifications.md](./clarifications.md)
- Depends on: Phase 01 complete (page renders without auth)

## Overview

- **Priority:** P2
- **Status:** ✅ Complete
- **Effort:** 2h
- Add client-side auth guard to the page. Write unit + E2E tests covering all 15 test cases.

## Key Insights

- `supabase.ts` is browser-only (`typeof window === "undefined"` throws) — server-side session check not feasible without `@supabase/ssr`
- Pattern: `AuthGuard` client component wraps page body; checks `supabase.auth.getSession()` on mount; shows loading spinner while checking; calls `router.push('/login')` if no session
- Test ID-1 (unauthenticated redirect) requires mocking Supabase session in tests
- Scroll behavior (ID-9, ID-11) tested via E2E (Playwright) — unit tests cannot cover DOM scroll

## Architecture

```
AuthGuard ("use client")
  - useState: status = "loading" | "authenticated" | "unauthenticated"
  - useEffect: supabase.auth.getSession() → set status
  - if loading: return <div> loading spinner </div>
  - if unauthenticated: router.push('/login'), return null
  - if authenticated: return children
```

Inject into `page.tsx`:
```tsx
export default function HEThongGiaiPage() {
  return (
    <AuthGuard>
      <div style={{ ... }}>
        <Header />
        <main> ... </main>
        <Footer />
        <WidgetButton />
      </div>
    </AuthGuard>
  );
}
```

## Related Code Files

**Create:**
- `front-end/landing-page/src/components/award-system/auth-guard.tsx`
- `front-end/landing-page/src/components/award-system/auth-guard.test.tsx`
- `front-end/landing-page/src/components/award-system/award-nav.test.tsx`
- `front-end/landing-page/src/components/award-system/award-info-card.test.tsx`
- `front-end/landing-page/src/app/he-thong-giai/he-thong-giai.e2e.ts`

**Modify:**
- `front-end/landing-page/src/app/he-thong-giai/page.tsx` — wrap content in `<AuthGuard>`

**Read for test patterns:**
- `front-end/landing-page/src/components/auth/user-menu.test.tsx`
- `front-end/landing-page/src/components/home/award-card.test.tsx`

## Implementation Steps

### Step 1 — Create `auth-guard.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ok">("loading");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login");
      } else {
        setStatus("ok");
      }
    });
  }, [router]);

  if (status === "loading") {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#00101A" }}>
        <span style={{ color: "#FFEA9E", fontFamily: "var(--font-montserrat)" }}>Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
}
```

### Step 2 — Update `page.tsx` to use `AuthGuard`

Wrap the entire page content (header + main + footer) in `<AuthGuard>`.

### Step 3 — Write unit tests for `auth-guard.test.tsx`

Cover test cases ID-0 and ID-1:
- Mock `supabase.auth.getSession` — return session → renders children (ID-0)
- Mock `supabase.auth.getSession` — return null session → calls `router.push('/login')` (ID-1)
- While session resolves → renders loading state

### Step 4 — Write unit tests for `award-nav.test.tsx`

Cover test cases ID-5, ID-10, ID-11:
- ID-5: Renders 6 nav items in correct order (Top Talent → MVP)
- ID-10: Hover class applied on mouse enter (if using CSS hover, skip — CSS not testable in jsdom)
- ID-11: Passing `activeId="top-talent"` → only that item has active styles; switching `activeId` → previous loses active

### Step 5 — Write unit tests for `award-info-card.test.tsx`

Cover test cases ID-6, ID-7:
- ID-6: Renders correct qty, unit, value for each award (6 cards data-driven)
- ID-7: Image element has `width: 336` and `height: 336` (or test src attribute)

### Step 6 — Write E2E tests `he-thong-giai.e2e.ts`

Cover test cases ID-2, ID-3, ID-4, ID-8, ID-9, ID-12, ID-13, ID-14:

| TC | Scenario | E2E action |
|----|----------|------------|
| ID-2 | Nav from main menu | Click header "Award Information" link, expect `/he-thong-giai` |
| ID-3 | Overall layout | Assert `header`, `aside nav`, `main`, kudos section all visible |
| ID-4 | Title display | Assert "Sun* annual awards 2025" + "Hệ thống giải thưởng SAA 2025" text |
| ID-8 | Kudos banner | Scroll to bottom, assert "Sun* Kudos" + "Phong trào ghi nhận" + "Chi tiết" |
| ID-9 | Click nav → scroll | Click "Top Project", assert #top-project section is in viewport |
| ID-12 | "Chi tiết" click | Click button, expect navigation to `/kudos` |
| ID-13 | Invalid section | Inject invalid section via console, assert no JS errors thrown |
| ID-14 | Failed nav | Mock `/kudos` as 404, assert graceful error or page load fails cleanly |

**Note:** E2E tests require authenticated session. Use Supabase test user credentials from env vars `E2E_USER_EMAIL` / `E2E_USER_PASSWORD`, or a pre-seeded session cookie.

### Step 7 — Run tests

```bash
pnpm --filter landing-page test
pnpm --filter landing-page test:e2e
```

Fix all failures before marking phase complete.

## Todo List

- [x] Create `auth-guard.tsx`
- [x] Update `he-thong-giai/page.tsx` to wrap with `<AuthGuard>`
- [x] Write `auth-guard.test.tsx` (ID-0, ID-1)
- [x] Write `award-nav.test.tsx` (ID-5, ID-11)
- [x] Write `award-info-card.test.tsx` (ID-6, ID-7)
- [x] Write `he-thong-giai.e2e.ts` (ID-2, ID-3, ID-4, ID-8, ID-9, ID-12, ID-13, ID-14)
- [x] Run unit tests — all pass
- [x] Run E2E tests — all pass

## Success Criteria

- Unauthenticated visit to `/he-thong-giai` → redirect to `/login` (no flash of protected content)
- Authenticated visit → page renders normally
- All 15 test cases pass (unit + E2E)
- No TypeScript errors
- `pnpm --filter landing-page build` succeeds

## Risk Assessment

- **Session check flash** — loading state prevents protected content flash, but there's a brief "Loading..." delay. Acceptable per spec.
- **E2E auth setup** — if no test credentials configured, E2E tests for auth scenarios will fail. Ensure `E2E_USER_EMAIL`/`E2E_USER_PASSWORD` are set in `.env.test`.
- **`router.push` in tests** — requires `next/navigation` mock. Follow pattern from existing `user-menu.test.tsx`.

## Security Considerations

- Auth guard client-side only — not a hard security boundary. Server-side protection (middleware) is the proper long-term solution; document as tech debt.
- Never expose session tokens in console/render output.

## Next Steps

- Long-term: Add `/he-thong-giai` to `middleware.ts` protected routes for true server-side auth enforcement
- When `/kudos` page is built, update "Chi tiết" href from `/kudos` (may 404) to verified route
