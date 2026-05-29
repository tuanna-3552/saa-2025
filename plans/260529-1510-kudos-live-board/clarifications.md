# Clarifications

## Session 2026-05-29

- Q: Scope — how large should this plan be? → A: HOLD SCOPE — implement all 4 sections (Banner, Highlight carousel, Spotlight, All Kudos + Sidebar)
- Q: Spotlight interactive word cloud library → A: react-force-graph or d3-force (force-directed graph with pan/zoom)
- Q: Ghi nhận input (A.1) — submission dialog scope → A: Placeholder dialog only; real form deferred to follow-up plan
- Q: Real-time Supabase subscriptions vs static load → A: Static load only; no Realtime subscriptions in this plan
- Q: Profile hover preview complexity → A: Simple tooltip showing avatar, full name, department, star count
- Q: Mở quà dialog (D.1.8) → A: Placeholder dialog; real Secret Box implementation deferred
- Q: All Kudos feed pagination → A: Infinite scroll with Intersection Observer (no library)
- Q: Xem chi tiết navigation → A: Link to `/kudos/[id]`; detail page built in separate plan
