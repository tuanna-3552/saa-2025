# Phase 01 — UI Implementation

## Context Links

- MoMorph screen: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/zFYDgyj_pD
- Specs: 22 items (all `completed` in MoMorph)
- Test cases: ID-3 through ID-8 (GUI), ID-9 through ID-12 (FUNCTION)
- Plan: [plan.md](./plan.md)
- Clarifications: [clarifications.md](./clarifications.md)

## Overview

- **Priority:** P2
- **Status:** ✅ Complete
- **Effort:** 4h
- Implement all UI components for `/he-thong-giai` page. No auth logic here — that's Phase 02.

## Key Insights

- `KudosSection` already exists at `components/home/kudos-section.tsx` → reuse directly
- `Header`, `Footer`, `WidgetButton` reusable with no changes
- Left nav uses `position: sticky; top: 80px` (header height) with JS click-to-scroll + IntersectionObserver for active state
- The page structure mirrors `/home/page.tsx` pattern (edge runtime + server component shell)
- Keyvisual background: reuse `/home/keyvisual-bg.png` with different overlay (no countdown)
- Award images: 336×336px, extract from Figma via `get_design_item_image` for each award item

## Award Data (from specs, authoritative)

```ts
const AWARDS = [
  { id: "top-talent",          label: "Top Talent",               qty: "10", unit: "Đơn vị",  value: "7.000.000 VNĐ",  valueNote: "cho mỗi giải thưởng" },
  { id: "top-project",         label: "Top Project",              qty: "02", unit: "Tập thể", value: "15.000.000 VNĐ", valueNote: "cho mỗi giải thưởng" },
  { id: "top-project-leader",  label: "Top Project Leader",       qty: "03", unit: "Cá nhân", value: "7.000.000 VNĐ",  valueNote: "cho mỗi giải thưởng" },
  { id: "best-manager",        label: "Best Manager",             qty: "01", unit: "Cá nhân", value: "10.000.000 VNĐ", valueNote: "cho mỗi giải thưởng" },
  { id: "signature-creator",   label: "Signature 2025 - Creator", qty: "01", unit: "",        value: "5.000.000 VNĐ",  valueNote: "(cá nhân) / 8.000.000 VNĐ (tập thể)" },
  { id: "mvp",                 label: "MVP (Most Valuable Person)", qty: "01", unit: "",     value: "15.000.000 VNĐ", valueNote: "" },
]
```

Nav items match this order: Top Talent → Top Project → Top Project Leader → Best Manager → Signature 2025 - Creator → MVP

## Architecture

```
/he-thong-giai/page.tsx          (server component, edge runtime)
  └─ AuthGuard (client)          ← Phase 02
  └─ Header                      ← reuse
  └─ main
      ├─ AwardSystemKeyvisual    ← new: decorative banner
      ├─ section
      │   ├─ SectionTitle        ← new: subtitle + heading
      │   └─ div.layout          ← flex-row gap
      │       ├─ AwardNav        ← new: sticky left nav, 6 items
      │       └─ div.cards       ← 6× AwardInfoCard
      └─ KudosSection            ← reuse
  └─ Footer                      ← reuse
  └─ WidgetButton                ← reuse
```

## Related Code Files

**Create:**
- `front-end/landing-page/src/app/he-thong-giai/page.tsx`
- `front-end/landing-page/src/components/award-system/keyvisual.tsx`
- `front-end/landing-page/src/components/award-system/section-title.tsx`
- `front-end/landing-page/src/components/award-system/award-nav.tsx`
- `front-end/landing-page/src/components/award-system/award-info-card.tsx`
- `front-end/landing-page/public/awards/top-talent.png` (+ 5 more)

**Read for patterns:**
- `front-end/landing-page/src/app/home/page.tsx`
- `front-end/landing-page/src/components/home/hero-section.tsx`
- `front-end/landing-page/src/components/home/awards-section.tsx`
- `front-end/landing-page/src/components/home/kudos-section.tsx`

## Implementation Steps

### Step 1 — Extract award images from Figma

Use MoMorph `get_design_item_image` for each award item ID:

| Award | Item ID | Save as |
|-------|---------|---------|
| Top Talent | `I313:8467;214:2525` | `public/awards/top-talent.png` |
| Top Project | `313:8468` | `public/awards/top-project.png` |
| Top Project Leader | `313:8469` | `public/awards/top-project-leader.png` |
| Best Manager | `313:8470` | `public/awards/best-manager.png` |
| Signature 2025 | `313:8471` | `public/awards/signature-creator.png` |
| MVP | `313:8510` | `public/awards/mvp.png` |

Also check if Keyvisual requires a different background asset (item `313:8437`). If same artwork as homepage, reuse `/home/keyvisual-bg.png`.

### Step 2 — Create `award-info-card.tsx`

```tsx
"use client";

interface AwardInfoCardProps {
  id: string;
  label: string;
  description: string;
  qty: string;
  unit: string;
  value: string;
  valueNote: string;
  image: string; // path e.g. "/awards/top-talent.png"
}
```

Layout (side-by-side):
- Left: `img` 336×336px, `object-fit: contain`
- Right: title (large, white) + description + metadata rows
  - "Số lượng giải thưởng:" `qty` `unit`
  - "Giá trị giải thưởng:" `value` `valueNote`
- Font: Montserrat, title bold large, metadata white
- Section `id` = `award.id` (for scroll target)

### Step 3 — Create `award-nav.tsx`

```tsx
"use client";
// Props: items (same AWARDS array), activeId, onSelect
```

Design:
- Vertical list, left column
- `position: sticky; top: 80px; align-self: flex-start` (sticks while cards scroll)
- Each item: text + icon prefix, click → `document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' })`
- Active item: gold color `#FFEA9E` + underline (same pattern as header nav active)
- Hover: highlight background `rgba(255,255,255,0.08)`
- Active state tracking: use `IntersectionObserver` on each award section to update `activeId` as user scrolls

```tsx
// IntersectionObserver pattern
useEffect(() => {
  const observers = AWARDS.map((award) => {
    const el = document.getElementById(award.id);
    if (!el) return null;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveId(award.id); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return obs;
  });
  return () => observers.forEach((o) => o?.disconnect());
}, []);
```

### Step 4 — Create `section-title.tsx`

Static component:
- Subtitle: "Sun* annual awards 2025" — small, faint white (same as `awards-section.tsx` pattern)
- Divider: `1px solid #2E3940`
- Main heading: "Hệ thống giải thưởng SAA 2025" — large, `#FFEA9E`, Montserrat bold

### Step 5 — Create `keyvisual.tsx`

Decorative banner based on spec mms_3:
- Background: `/home/keyvisual-bg.png` (reuse, confirm via image extraction)
- Container: `width: 100%; height: 400px; position: relative; overflow: hidden`
- Overlay content (centered/bottom):
  - Logo/icon top-left
  - Title "ROOT FURTHER" (from `/home/root-further-logo.png`)
  - Subtitle "Sun* Annual Award 2025"
- No countdown, no CTA buttons (different from homepage HeroSection)
- `aria-label`: "Keyvisual Sun* Annual Award 2025"

### Step 6 — Create `page.tsx`

```tsx
export const runtime = "edge";
// Server component shell — AuthGuard injected in Phase 02

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AwardSystemKeyvisual from "@/components/award-system/keyvisual";
import SectionTitle from "@/components/award-system/section-title";
import AwardNav from "@/components/award-system/award-nav";
import AwardInfoCard from "@/components/award-system/award-info-card";
import KudosSection from "@/components/home/kudos-section";
import WidgetButton from "@/components/home/widget-button";
```

Page layout:
- Dark background `#00101A`
- Max content width: 1512px centered (match homepage pattern)
- Content padding: `0 144px` (match homepage pattern)
- Award section: `display: flex; gap: 80px` — nav (left, ~240px) + cards (right, flex-1)
- Spacing between sections: match homepage rhythm (~80-120px padding)

### Step 7 — Compile check

```bash
pnpm --filter landing-page build
```

Fix any TypeScript errors before proceeding to Phase 02.

## Todo List

- [x] Extract 6 award images via `get_design_item_image`
- [x] Check keyvisual image asset (same or different from homepage)
- [x] Create `award-info-card.tsx` with AwardInfoCardProps interface
- [x] Create `award-nav.tsx` with IntersectionObserver active tracking
- [x] Create `section-title.tsx` (static)
- [x] Create `keyvisual.tsx` (decorative banner)
- [x] Create `he-thong-giai/page.tsx` (shell, no auth yet)
- [x] Run compile check, fix errors

## Success Criteria

- Page renders at `/he-thong-giai` without errors
- All 6 award cards visible with correct data (qty, value, unit)
- Each award has its 336×336px image
- Left nav shows 6 items in correct order
- Click nav item → smooth scroll to that award section
- Scroll past an award section → corresponding nav item becomes active (gold + underline)
- Sun* Kudos section visible at bottom with "Chi tiết" button linking to `/kudos`
- Keyvisual banner renders with correct background
- Compile succeeds with `pnpm --filter landing-page build`

## Risk Assessment

- **Image extraction may fail for some itemIds** → fall back to placeholder div with gold border, add TODO comment
- **IntersectionObserver threshold 0.3 may feel laggy** → adjust to 0.5 if needed during visual validation
- **`position: sticky` on nav may not work if parent has `overflow: hidden`** → ensure award layout container has no `overflow: hidden`

## Security Considerations

- All data static (no API calls in Phase 01) — no XSS risk
- Images served from `/public` — no path traversal risk

## Next Steps

- Phase 02 adds `AuthGuard` wrapper (client-side session check)
- Phase 02 adds tests for GUI, FUNCTION, and ACCESSING test cases
