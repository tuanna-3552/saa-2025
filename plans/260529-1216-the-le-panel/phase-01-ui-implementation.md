# Phase 01 — UI Implementation

## Context Links

- MoMorph: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/b1Filzi9i6
- Plan: [plan.md](./plan.md)
- Design frame root: node `3204:6051` (1440×1796px, bg `rgba(0,16,26,1)`)
- Widget button to modify: `front-end/landing-page/src/components/home/widget-button.tsx`

## Overview

- **Priority**: P2
- **Status**: Complete
- **Goal**: Create `the-le-panel.tsx` fixed drawer component + wire it into `widget-button.tsx`

## Key Design Tokens (authoritative from MoMorph)

### Panel container — node `3204:6052` ("Thể Lệ")
| Token | Value |
|-------|-------|
| Width | `553px` |
| Height | `100vh` (full viewport) |
| Position | `fixed; right: 0; top: 0` |
| z-index | `300` |
| Background | `rgba(0, 7, 12, 1)` |
| Padding | `24px 40px 40px 40px` |
| Layout | flex column; justify: space-between |

### Content area — node `3204:6053` ("A_Nội dung thể lệ")
| Token | Value |
|-------|-------|
| Width | `473px` (= 553 − 2×40) |
| Overflow | `overflow-y: auto` (scrollable) |
| Gap between title + body | `24px` |

### Typography
| Element | Font | Size | Weight | Line-height | Color | Letter-spacing |
|---------|------|------|--------|-------------|-------|----------------|
| Title "Thể lệ" | Montserrat | 45px | 700 | 52px | `rgba(255,234,158,1)` | 0px |
| Section heading (22px) | Montserrat | 22px | 700 | 28px | `rgba(255,234,158,1)` | 0px |
| Section heading (24px) "KUDOS QUỐC DÂN" | Montserrat | 24px | 700 | 32px | `rgba(255,234,158,1)` | 0px |
| Body text | Montserrat | 16px | 700 | 24px | `rgba(255,255,255,1)` | 0.5px |
| Badge condition text | Montserrat | 16px | 700 | 24px | `rgba(255,255,255,1)` | 0.5px |
| Badge description text | Montserrat | 14px | 700 | 20px | `rgba(255,255,255,1)` | 0.1px |
| Icon label | Montserrat | ~12px | 700 | ~16px | `rgba(255,255,255,1)` | — |

### Footer buttons — node `3204:6092` ("B_Button")
| Property | "Đóng" (B.1) | "Viết KUDOS" (B.2) |
|----------|--------------|---------------------|
| Width | auto | `363px` |
| Height | `56px` | `56px` |
| Background | `rgba(255,234,158,0.10)` | `rgba(255,234,158,1)` |
| Border | `1px solid #998C5F` | none |
| Border-radius | `4px` | `4px` |
| Padding | `16px` | `16px` |
| Gap | `8px` | `8px` |
| Text color | `rgba(255,234,158,1)` | `rgba(0,16,26,1)` |
| Font | Montserrat 14px 700 | Montserrat 14px 700 |
| Footer row gap | 16px between buttons | — |

### Badge pills (hero tier badges)
| Property | Value |
|----------|-------|
| Border | `0.579px solid #FFEA9E` |
| Border-radius | `55.579px` (pill) |
| Height | `22px` |
| Padding | `2px 8px` |
| Font | Montserrat 12px 700 |
| Text color | `rgba(255,234,158,1)` |

## Panel Content Structure

```
Panel (fixed right, 553×100vh, rgba(0,7,12,1))
├── ScrollArea (flex-1, overflow-y: auto)
│   ├── Title: "Thể lệ" (45px, #FFEA9E)
│   └── Sections (gap 16px)
│       ├── Section A: Người nhận (gap 16px)
│       │   ├── Heading: "NGƯỜI NHẬN KUDOS: HUY HIỆU HERO..." (22px, #FFEA9E)
│       │   ├── Desc: "Dựa trên số lượng..." (16px white justified)
│       │   ├── Badge item: [New Hero pill] [condition] / [description]
│       │   ├── Badge item: [Rising Hero pill] ...
│       │   ├── Badge item: [Super Hero pill] ...
│       │   └── Badge item: [Legend Hero pill] ...
│       ├── Section B: Người gửi (gap 16px)
│       │   ├── Heading: "NGƯỜI GỬI KUDOS: SƯU TẬP..." (22px, #FFEA9E)
│       │   ├── Desc: "Mỗi lời Kudos..." (16px white justified)
│       │   ├── Icons grid 3×2 (REVIVAL, TOUCH OF LIGHT, STAY GOLD / FLOW TO HORIZON, BEYOND THE BOUNDARY, ROOT FURTHER)
│       │   └── Summary: "Những Sunner thu thập..." (16px white justified)
│       └── Section C: Kudos Quốc Dân (gap 16px)
│           ├── Heading: "KUDOS QUỐC DÂN" (24px, #FFEA9E)
│           └── Desc: "5 Kudos nhận về nhiều..." (16px white justified)
└── Footer (flex row, gap 16px, flex-shrink: 0)
    ├── Button "Đóng" (auto × 56px, secondary style)
    └── Button "Viết KUDOS" (363 × 56px, yellow primary)
```

## 6 Kudos Icon Badge Images

Extract from Figma via MoMorph `get_figma_image` tool using node IDs below. Save to `front-end/landing-page/public/kudos-icons/`:

| Icon | Figma Node ID | Save as |
|------|---------------|---------|
| REVIVAL | `3204:6082` (componentId `737:20446`) | `revival.png` |
| TOUCH OF LIGHT | `3204:6087` (componentId `737:20450`) | `touch-of-light.png` |
| STAY GOLD | `3204:6086` (componentId `737:20449`) | `stay-gold.png` |
| FLOW TO HORIZON | `3204:6083` | `flow-to-horizon.png` |
| BEYOND THE BOUNDARY | `3204:6084` | `beyond-the-boundary.png` |
| ROOT FURTHER | `3204:6088` | `root-further.png` |

Each icon renders at 80×80px in the grid (circular/badge style).

## Hero Badge Data

```typescript
const HERO_BADGES = [
  {
    name: "New Hero",
    condition: "Có 1-4 người gửi Kudos cho bạn",
    description: "Hành trình lan tỏa điều tốt đẹp bắt đầu – những lời cảm ơn và ghi nhận đầu tiên đã tìm đến bạn.",
  },
  {
    name: "Rising Hero",
    condition: "Có 5-9 người gửi Kudos cho bạn",
    description: "Hình ảnh bạn đang lớn dần trong trái tim đồng đội bằng sự từ tế và cống hiến của mình.",
  },
  {
    name: "Super Hero",
    condition: "Có 10–20 người gửi Kudos cho bạn",
    description: "Bạn đã trở thành biểu tượng được tin tưởng và yêu quý, người luôn sẵn sàng hỗ trợ và được nhiều đồng đội nhớ đến.",
  },
  {
    name: "Legend Hero",
    condition: "Có hơn 20 người gửi Kudos cho bạn",
    description: "Bạn đã trở thành huyền thoại – người để lại dấu ấn khó quên trong tập thể bằng trái tim và hành động của mình.",
  },
];
```

## 6 Kudos Icons Data

```typescript
const KUDOS_ICONS = [
  { name: "REVIVAL",            src: "/kudos-icons/revival.png" },
  { name: "TOUCH OF\nLIGHT",   src: "/kudos-icons/touch-of-light.png" },
  { name: "STAY GOLD",          src: "/kudos-icons/stay-gold.png" },
  { name: "FLOW TO\nHORIZON",  src: "/kudos-icons/flow-to-horizon.png" },
  { name: "BEYOND THE\nBOUNDARY", src: "/kudos-icons/beyond-the-boundary.png" },
  { name: "ROOT\nFURTHER",     src: "/kudos-icons/root-further.png" },
];
```

## Files to Modify / Create

| Action | File | Change |
|--------|------|--------|
| Create | `front-end/landing-page/src/components/home/the-le-panel.tsx` | New panel component |
| Modify | `front-end/landing-page/src/components/home/widget-button.tsx` | Add `theLePanelOpen` state, wire "Thể lệ" button, render `<TheLe Panel>` |
| Create | `front-end/landing-page/public/kudos-icons/*.png` | 6 badge icon images from Figma |

## Implementation Steps

### Step 1 — Extract 6 Kudos badge images from Figma

Use MoMorph `get_figma_image` with the node IDs from the table above.
Save each PNG to `front-end/landing-page/public/kudos-icons/`.

### Step 2 — Create `the-le-panel.tsx`

```tsx
"use client";

interface TheLePanelProps {
  onClose: () => void;
}

export default function TheLePannel({ onClose }: TheLePanelProps) {
  return (
    <div style={{ position: "fixed", right: 0, top: 0, width: "553px", height: "100vh", zIndex: 300, backgroundColor: "rgba(0,7,12,1)", padding: "24px 40px 40px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box" }}>
      {/* Scrollable content */}
      <div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Title */}
        {/* Section A: Người nhận — heading + body text + 4 badge items */}
        {/* Section B: Người gửi — heading + body text + 3×2 icon grid + summary */}
        {/* Section C: Kudos Quốc Dân — heading + body text */}
      </div>
      {/* Footer buttons (pinned, not scrolled) */}
      <div style={{ display: "flex", flexDirection: "row", gap: "16px", flexShrink: 0, paddingTop: "40px" }}>
        {/* Đóng button */}
        {/* Viết KUDOS button */}
      </div>
    </div>
  );
}
```

Key implementation notes:
- Use `"use client"` directive
- File must stay **under 200 lines** — extract `HERO_BADGES` and `KUDOS_ICONS` arrays as module-level constants
- Keep inline styles matching exact design tokens above; no guessing
- `PenIcon` SVG reuse from `widget-button.tsx` — copy the path, don't import from widget-button (avoid circular deps). Or extract to a shared icon file.
- X icon in "Đóng" button: simple SVG cross (same as in widget-button close button)
- "Viết KUDOS" text color: `rgba(0,16,26,1)` (dark text on yellow bg)
- Icon grid: two rows × three cols using `display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px`; each cell = flex column, center-aligned, image 80×80px + caption text below

### Step 3 — Update `widget-button.tsx`

Add state:
```tsx
const [theLePanelOpen, setTheLePanelOpen] = useState(false);
```

Wire the "Thể lệ" button (currently has no `onClick`):
```tsx
onClick={() => { setTheLePanelOpen(true); setPanelOpen(false); }}
```

Render panel at root of component return:
```tsx
{theLePanelOpen && <TheLePannel onClose={() => setTheLePanelOpen(false)} />}
```

Import `TheLePannel` at top of file.

### Step 4 — Visual validation

Run dev server and verify against the Figma frame image:
- Panel opens on "Thể lệ" click
- All 3 sections render with correct headings and text
- Badge pills look correct (pill shape, #FFEA9E border)
- 6 Kudos icons display in 3×2 grid
- Footer buttons render correctly: secondary "Đóng" left, yellow "Viết KUDOS" right
- Scroll works when panel content exceeds viewport height
- "Đóng" closes panel
- Float button disappears while panel is open (state is `theLePanelOpen && !panelOpen`)

## Todo List

- [ ] Extract 6 Kudos badge images via MoMorph and save to `public/kudos-icons/`
- [ ] Create `the-le-panel.tsx` with all content sections
- [ ] Add `theLePanelOpen` state to `widget-button.tsx`
- [ ] Wire "Thể lệ" button onClick → open panel, close float menu
- [ ] Render `<TheLePannel>` in widget-button return
- [ ] Run dev server and visually validate against Figma frame
- [ ] Run TypeScript compile check: `pnpm --filter landing-page type-check` (or `tsc --noEmit`)

## Success Criteria

- Panel opens exactly from the right side at 553px width
- All text matches Figma exactly: font sizes, weights, colors, alignment
- Badge pills have pill border, not solid background
- 6 Kudos icons display as circular badge images with captions
- "Đóng" closes panel; "Viết KUDOS" has clickable href (stub `#` is acceptable)
- No TypeScript errors, no console errors

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Badge images not accessible via `get_figma_image` with node IDs | Use `get_figma_image` with the parent section frame nodeId as fallback; or use screenshot/crop |
| File >200 lines | Extract badge data array + icon data array to `the-le-panel-data.ts` |
| Panel blocks access to page content | No fix needed per design (panel is intentional overlay) |

## Next Steps

After this phase → Phase 02 Tests.
