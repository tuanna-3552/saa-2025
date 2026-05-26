# SAA-2025 Demo Guide — Local Development

**Audience:** Developers, QA, internal reviewers running the app locally.

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 20 | https://nodejs.org |
| pnpm | ≥ 9 | `npm i -g pnpm` |
| Docker Desktop | latest | https://www.docker.com/products/docker-desktop |
| Supabase CLI | latest | `pnpm add -g supabase` |

---

## 1. Start Supabase (Local Backend)

```bash
# From repo root
cd d:/repo/saa-2025

# Start all Supabase services (DB, Auth, REST, Studio)
pnpm supabase start
```

Wait until all services are healthy. You will see:

```
Project URL    │ http://127.0.0.1:54321
Studio         │ http://127.0.0.1:54323
```

> **If services don't start:** Run `pnpm supabase stop --no-backup && pnpm supabase start`

---

## 2. Install Dependencies

```bash
# From repo root
pnpm install
```

---

## 3. Configure Environment

The admin app already has `.env.local` pre-configured for local Supabase. Verify it matches the key shown by `pnpm supabase status`:

```
front-end/admin/.env.local
─────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_<key from supabase status>
```

---

## 4. Start the Admin App

```bash
# From repo root
pnpm --filter @saa/admin dev
# OR from front-end/admin/
cd front-end/admin && pnpm dev
```

Admin panel starts at **http://localhost:3001**

---

## 5. Demo Flow — Admin Overview

### 5.1 Login

1. Open **http://localhost:3001**
2. You are redirected to **http://localhost:3001/login**
3. Enter credentials:
   - **Email:** `admin1@saa.local`
   - **Password:** `password123`
4. Click **Sign in**
5. You are redirected to **http://localhost:3001/dashboard**

> **Non-admin test:** Log in with `emp1@saa.local` / `password123` → you should see "Access denied. Admin privileges required."

### 5.2 Dashboard — Overview Page

The dashboard displays a **per-department stats table** with live data from the local database:

| Column | Source |
|--------|--------|
| Unit | `departments` table |
| Total members | Active profiles in each department |
| Total sent kudos | Approved nominations sent by dept members |
| Total received kudos | Approved nominations received by dept members |
| Total users with kudos | Unique recipients of approved nominations |
| Total received secret box | Votes received by dept members |

**Seed data loaded:**
- 3 departments: Engineering, Design, Product
- 5 users (2 admins + 3 employees)
- 1 active season: SAA 2025
- 6 approved nominations, 3 votes

### 5.3 Date Range Picker

1. Click the date range button (top-right of the Overview page)
2. A calendar popup opens
3. Click a start date, then an end date to select a range
4. Click **Today** to jump the selection to today
5. Click **Apply** to close

> Currently the date range is UI-only (does not filter table data — filtering will be wired in a future sprint).

### 5.4 Header — Account Menu

1. Click the **user icon button** (top-right of the header, square 40×40)
2. A dropdown opens showing the signed-in admin's name and role
3. Click **Sign out** to log out → redirected to `/login`

### 5.5 Navigation

| Nav Item | Route | Status |
|----------|-------|--------|
| Overview | `/dashboard` | ✅ Live |
| Review content | `/nominations` | ✅ Live |
| User | `/users` | ✅ Live |
| Settings | `/settings` | ✅ Live |

### 5.6 Review content — Nominations Review
1. Click **Review content** in the header navigation or open **http://localhost:3001/nominations**.
2. Filter nominations by status using the filter buttons (**All**, **Pending**, **Approved**, **Rejected**) at the top of the table.
3. Click a nomination row to view its details (Sender, Receiver, Category, Reason, Hearts).
4. Click **Approve** or **Reject** to perform the moderation workflow. The status updates in the DB and reflects instantly in the UI.

### 5.7 User — User Management & DB Sync
1. Click **User** in the header navigation or open **http://localhost:3001/users**.
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

### 5.8 Settings — Campaign Management
1. Click **Settings** in the header navigation or open **http://localhost:3001/settings**.
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

## 6. Database Studio (Optional)

View live data at **http://127.0.0.1:54323**

Navigate to **Table Editor** → inspect `departments`, `profiles`, `nominations`, `votes`.

---

## 7. Stop Services

```bash
pnpm supabase stop
```

---

## Seed Accounts Summary

| Email | Password | Role |
|-------|----------|------|
| admin1@saa.local | password123 | admin |
| admin2@saa.local | password123 | admin |
| emp1@saa.local | password123 | employee |
| emp2@saa.local | password123 | employee |
| emp3@saa.local | password123 | employee |
