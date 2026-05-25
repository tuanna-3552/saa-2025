# Phase 3 — TypeScript Types

## Overview

Generate Supabase TypeScript types and export from `@saa/shared-ui` so both `admin` and `landing-page` apps can import them.

## Files

| File | Action |
|------|--------|
| `back-end/package.json` | Add `db:types` script |
| `front-end/shared-ui/src/types/database.ts` | Generated output target |
| `front-end/shared-ui/src/index.ts` | Add types re-export |

## db:types Script

```json
"db:types": "supabase gen types typescript --local --schema public > ../front-end/shared-ui/src/types/database.ts"
```

## Implementation Steps

1. Add `db:types` script to `back-end/package.json`
2. Create `front-end/shared-ui/src/types/` directory with placeholder `database.ts`
3. Add re-export to `front-end/shared-ui/src/index.ts`:
   ```ts
   export type { Database } from "./types/database";
   ```

## Usage (after running db:types)

```ts
import type { Database } from "@saa/shared-ui";
type Profile = Database["public"]["Tables"]["profiles"]["Row"];
```

## Success Criteria

- `pnpm db:types` (from back-end/) generates `database.ts` with all 7 table types
- `import type { Database } from "@saa/shared-ui"` resolves in admin app
