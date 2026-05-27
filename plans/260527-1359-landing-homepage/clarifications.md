---
screen: Homepage SAA
screenId: i87tDx10uM
fileKey: 9ypp4enmFmdK3YAFJLIu6C
---

# Clarifications

## Session 2026-05-27

- Q: How to scope the plan? → A: HOLD SCOPE — all 7 sections (Header, Hero, Root Further, Awards, Kudos, Widget, Footer)
- Q: Award card thumbnails — how to handle? → A: Download from Figma via MoMorph `get_design_item_image`; save to `public/awards/{slug}.png`
- Q: Language switching VN/EN scope? → A: Visual toggle only — VN/EN dropdown opens but no actual translation applied; all text stays Vietnamese
- Q: Notification panel + Widget button scope? → A: Stub both — notification bell shows badge from Supabase count (stub 0, no notifications table yet); widget pill renders and toggles placeholder panel
- Q: Notification count source? → A: No notifications table in DB schema; stub count = 0 until table is added in a future plan
- Q: Auth access level for /home? → A: Public page — unauthenticated users see full content; authenticated users see additional header controls (bell, language, account icon)
- Q: Linked pages /awards and /kudos exist? → A: Not yet built; use `href="#"` with TODO comment during implementation
- Q: Admin Dashboard URL? → A: Use `NEXT_PUBLIC_ADMIN_URL` env var or hardcode localhost:3001 as fallback
