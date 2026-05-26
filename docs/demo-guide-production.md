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
| Review content | ✅ Live | Approve or reject nominations |
| User | ✅ Live | User list, filters, search, sorting, and CSV export |
| Settings | ✅ Live | System configuration |

---

### 6. Review content — Nominations Review
1. Click **Review content** in the header navigation.
2. Filter nominations by status using the filter buttons (**All**, **Pending**, **Approved**, **Rejected**) at the top of the table.
3. Click a nomination row to view its details (Sender, Receiver, Category, Reason, Hearts).
4. Click **Approve** or **Reject** to perform the moderation workflow. The status updates in the DB and reflects instantly in the UI.

### 7. User — User Management & DB Sync
1. Click **User** in the header navigation.
2. Inspect the user table. You will see columns populated with real DB seed data:
   - **Level**: Active user levels (e.g. 3, 2, 4, 1) synchronized from PostgreSQL.
   - **Σ sent Kudos (100)** / **Σ Received Kudos (100)**: Real counts of nominations sent/received by each user.
   - **Last Logged In**: Login timestamps formatted beautifully in Vietnam timezone (`dd/MM/yyyy HH:mm`, e.g., `23/12/2025 10:00`).
   - **SortIcon**: Vertically-aligned solid triangles matching Figma specifications.
3. Use the filters:
   - Select a department in the **Unit** dropdown to filter users by division.
   - Select a tier in the **Level** dropdown.
   - Select a rank in the **Role** dropdown.
   - Type in the **Search** box to filter dynamically by name or email.
4. Click the **Export** button at the top-right to download `users.csv`, containing formatted user records matching your current filter/search.

### 8. Settings — Campaign Management
1. Click **Settings** in the header navigation.
2. Inspect the campaigns table showing: ID, Campaign Name, Voting time timeframe, and Actions.
   - **Table Alignment**: Fits structural spacing and styling identical to the User page list.
3. **Add Campaign**:
   - Click the gold **Add Campaign** button.
   - In the clean Centered Modal, type a Name, select the Start & End Dates, then click **Add Campaign** (Year is auto-extracted from Start Date, Status is managed).
4. **Edit Campaign**:
   - Click the Actions button on a campaign row (circular bordered icon with three horizontal dots matching figma).
   - In the dropdown actions menu, hover on **Edit** (triggers an elegant gold background and glow text shadow).
   - Change the name or dates, and click **Save Changes**.
5. **Delete Campaign**:
   - Click the Actions button and hover/select **Delete** (shares the same glowing amber selection style as Edit).
   - Verify the custom deletion warning modal shows left-aligned description and target name highlighted in gold, with symmetrical **Delete** (red) and **Cancel** buttons. Confirm to delete.

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
