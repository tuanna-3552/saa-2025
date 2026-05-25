# Phase 1 — Foundation Setup

## Status: pending

## Goal
Supabase typed browser client + Shadcn UI components initialized.

## Files to Create
- `front-end/admin/.env.local.example`
- `front-end/admin/src/lib/supabase.ts`
- `front-end/admin/components.json` (Shadcn init)
- `front-end/admin/src/components/ui/` (button, input, label, form, card)

## Steps

1. Create `.env.local.example` with Supabase URL + anon key placeholders
2. Create `src/lib/supabase.ts` — typed `createClient<Database>(...)`
3. Run `pnpm dlx shadcn@latest init` from `front-end/admin`
4. Add components: `pnpm dlx shadcn@latest add button input label form card`

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Success Criteria
- `src/lib/supabase.ts` compiles without errors
- `src/components/ui/button.tsx` exists
- `pnpm type-check` passes
