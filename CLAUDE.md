@AGENTS.md

# SAA-2025 — Award System

## Project Goal

Generate production-ready source code from design and specifications using the **Takumi** toolset in collaboration with **Claude Code**.

- **Input:** Figma designs (via MoMorph) + Screen Specs (via MoMorph)
- **Output:** Complete, tested, deployable source code

## Tech Stack & Conventions

**Monorepo:** pnpm workspaces + Turborepo
**Frontend:** Next.js 16, React 19, TypeScript 5
- `front-end/admin` — Client Side Rendering (CSR), protected admin panel
- `front-end/landing-page` — Server Side Rendering (SSR), SEO-optimized public site
- `front-end/shared-ui` — Shared Shadcn UI components + TailwindCSS preset (`@saa/shared-ui`)

**Backend:** Supabase (PostgreSQL, Auth, Realtime, Edge Functions)
**Styling:** TailwindCSS v4 + Shadcn UI
**Deployment:** Cloudflare Pages + Workers (`@cloudflare/next-on-pages`)
**CI/CD:** GitHub Actions

Follow all conventions defined in `docs/code-standards.md` and `.claude/rules/`.

## Quality Standards

### UI — Pixel-Perfect
- Every screen must match the Figma design exactly: spacing, typography, colors, component hierarchy.
- Use MoMorph MCP tools (`get_frame`, `download_specs`) to extract authoritative design tokens — never guess values.
- Run visual validation against the Figma frame before marking UI as done.

### Logic — Spec-Compliant
- All behaviors, validations, navigation flows, and edge cases must match the MoMorph Screen Specs.
- Cross-reference specs vs test cases for gaps before implementation.
- Decisions and clarifications are recorded in `plans/{plan}/clarifications.md`.

### Quality — TDD with Full Coverage
- Write tests **before** implementation (Test-Driven Development).
- **Unit Tests:** all business logic, utility functions, and hooks.
- **E2E Tests:** all critical user flows per screen specs.
- No feature is complete until all tests pass. Never mock to force passing tests.
- Delegate test runs to the `tester` agent; never ignore failing tests.
