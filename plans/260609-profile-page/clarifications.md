## Session 2026-06-09

- Q: What are the C.3 filter dropdown options? → A: Two options: "Đã nhận" (received) and "Đã gửi" (sent). Default shows Received. Count badge reflects the selected filter.
- Q: Should /profile support viewing other users (/profile/[userId])? → A: Yes — /profile (own) + /profile/[userId] (others). Both render same layout. "Mở Secret Box" button is hidden on others' profiles.
- Q: What triggers the D.3.1 "Spam" badge on kudos cards? → A: Omitted — profile feed shows only approved nominations. No status badge.
- Q: How to handle Secret Box stats (B.4, B.5) with no DB schema? → A: Show values from getUserStats() — displays 0 until schema is populated. "Mở Secret Box" button opens existing SecretBoxDialog (coming-soon placeholder).
