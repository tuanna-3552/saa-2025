# SAA-2025 Demo Guide — Production

**Audience:** Stakeholders, clients, and reviewers accessing the live deployed app.

---

## Access URLs

| App | URL |
|-----|-----|
| Admin panel | Provided by the deployment team |
| Landing page | Provided by the deployment team |

> Contact the project lead for the production URL and admin credentials before the demo.

---

## Prerequisites

- A modern browser (Chrome, Firefox, Edge — latest version)
- Admin credentials (email + password) provided by the team
- Stable internet connection

---

## Demo Flow — Admin Overview

### 1. Login

1. Open the **Admin Panel URL** in your browser
2. You are redirected to the **Login** page
3. Enter the admin credentials provided:
   - **Email:** *(provided by team)*
   - **Password:** *(provided by team)*
4. Click **Sign in**
5. You are taken to the **Overview (Dashboard)** page

---

### 2. Dashboard — Overview Page

The dashboard shows a real-time **per-department stats table** sourced from the production database.

| Column | What it shows |
|--------|--------------|
| **Unit** | Department name |
| **Total members** | Number of active employees in the department |
| **Total sent kudos** | Approved nominations submitted by department members |
| **Total received kudos** | Approved nominations received by department members |
| **Total users with kudos** | Number of unique employees who received at least one nomination |
| **Total received secret box** | Votes cast for employees in the department |

> All figures reflect the current live data in the production Supabase database.

---

### 3. Date Range Picker

1. Click the **date range button** (top-right of the Overview page, shows current range)
2. A calendar popup opens
3. Select a **start date**, then an **end date**
4. Click **Today** to quickly select today's date
5. Click **Apply** to confirm

---

### 4. Header Controls

| Control | Location | Function |
|---------|----------|----------|
| Logo | Top-left | — |
| Nav tabs | Center | Navigate between admin sections |
| Bell icon | Top-right | Notifications *(coming soon)* |
| Language switcher | Top-right | Switch UI language *(coming soon)* |
| Account button (square) | Top-right | Open account menu |

**To sign out:**
1. Click the **account button** (square icon, top-right)
2. Click **Sign out** in the dropdown
3. You are redirected to the Login page

---

### 5. Navigation Overview

| Section | Status | Description |
|---------|--------|-------------|
| Overview | ✅ Live | Department stats dashboard |
| Review content | 🔲 Coming soon | Approve or reject nominations |
| Role | 🔲 Coming soon | Manage user roles |
| Settings | 🔲 Coming soon | System configuration |

---

## Production Environment Details

| Item | Detail |
|------|--------|
| Hosting | Cloudflare Pages |
| Backend | Supabase (managed PostgreSQL + Auth) |
| Auth | Email/password, admin-role restricted |
| Data | Live production database — changes are real |

> **Important:** All actions in production affect real data. Do not create test records during a live demo without coordinating with the team first.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Login fails | Verify credentials with the project lead; check Caps Lock |
| "Access denied" error | The account is not assigned the admin role — contact the team |
| Page does not load | Check internet connection; try a hard refresh (`Ctrl+Shift+R`) |
| Dashboard shows no data | Production database may have no seed data yet — contact the team |
