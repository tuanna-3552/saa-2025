# Clarifications

## Session 2026-05-29

- Q: How should we scope this plan? → A: HOLD — ~6 files, 2 phases, pixel-perfect Figma match
- Q: Where does "Chi tiết" button navigate? → A: /kudos route (page built later — link may 404 until built)
- Q: Award info images source? → A: Extract from Figma via MoMorph get_design_item_image
- Q: Auth guard implementation? → A: Server-side Supabase session check in page — NOTE: current supabase.ts is browser-only; implemented as client-side AuthGuard component instead (same intent, different mechanism due to missing @supabase/ssr)
