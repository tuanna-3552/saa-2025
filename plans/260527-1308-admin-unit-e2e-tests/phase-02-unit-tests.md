# Phase 02: Unit Tests — lib/format, lib/review-nomination

**Status:** completed

## Files to create

### `src/lib/format.test.ts`
Tests for `formatDateTime`, `formatDateShort`, `formatDate`:
- null/empty input → returns `"-"`
- valid ISO string → correct dd/MM/yyyy HH:mm format
- `formatDate` short vs medium style
- invalid date → returns original string (catch branch)

### `src/lib/review-nomination.test.ts`
Mock `@/lib/supabase`. Tests for `reviewNomination`:
- happy path approved → calls supabase update with correct args, returns `{ error: null }`
- happy path rejected → same
- supabase error → returns `{ error: "some message" }`
