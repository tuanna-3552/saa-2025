-- ============================================================
-- Seed Data — SAA-2025 Local Development
-- Fixed UUIDs for reproducibility across db:reset runs
-- ============================================================

-- Auth users (required before profiles due to FK)
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, is_super_admin,
  confirmation_token, recovery_token, email_change_token_new,
  email_change, email_change_token_current, phone_change_token,
  reauthentication_token
) VALUES
  ('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-000000000001','authenticated','authenticated','admin1@saa.local',crypt('password123',gen_salt('bf')),NOW(),NOW(),NOW(),'{"provider":"email","providers":["email"]}','{}',false,'','','','','','',''),
  ('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-000000000002','authenticated','authenticated','admin2@saa.local',crypt('password123',gen_salt('bf')),NOW(),NOW(),NOW(),'{"provider":"email","providers":["email"]}','{}',false,'','','','','','',''),
  ('00000000-0000-0000-0000-000000000000','e0000000-0000-0000-0000-000000000001','authenticated','authenticated','emp1@saa.local',crypt('password123',gen_salt('bf')),NOW(),NOW(),NOW(),'{"provider":"email","providers":["email"]}','{}',false,'','','','','','',''),
  ('00000000-0000-0000-0000-000000000000','e0000000-0000-0000-0000-000000000002','authenticated','authenticated','emp2@saa.local',crypt('password123',gen_salt('bf')),NOW(),NOW(),NOW(),'{"provider":"email","providers":["email"]}','{}',false,'','','','','','',''),
  ('00000000-0000-0000-0000-000000000000','e0000000-0000-0000-0000-000000000003','authenticated','authenticated','emp3@saa.local',crypt('password123',gen_salt('bf')),NOW(),NOW(),NOW(),'{"provider":"email","providers":["email"]}','{}',false,'','','','','','',''),
  ('00000000-0000-0000-0000-000000000000','e0000000-0000-0000-0000-000000000004','authenticated','authenticated','emp4@saa.local',crypt('password123',gen_salt('bf')),NOW(),NOW(),NOW(),'{"provider":"email","providers":["email"]}','{}',false,'','','','','','',''),
  ('00000000-0000-0000-0000-000000000000','e0000000-0000-0000-0000-000000000005','authenticated','authenticated','emp5@saa.local',crypt('password123',gen_salt('bf')),NOW(),NOW(),NOW(),'{"provider":"email","providers":["email"]}','{}',false,'','','','','','',''),
  ('00000000-0000-0000-0000-000000000000','e0000000-0000-0000-0000-000000000006','authenticated','authenticated','emp6@saa.local',crypt('password123',gen_salt('bf')),NOW(),NOW(),NOW(),'{"provider":"email","providers":["email"]}','{}',false,'','','','','','',''),
  ('00000000-0000-0000-0000-000000000000','e0000000-0000-0000-0000-000000000007','authenticated','authenticated','emp7@saa.local',crypt('password123',gen_salt('bf')),NOW(),NOW(),NOW(),'{"provider":"email","providers":["email"]}','{}',false,'','','','','','',''),
  ('00000000-0000-0000-0000-000000000000','e0000000-0000-0000-0000-000000000008','authenticated','authenticated','emp8@saa.local',crypt('password123',gen_salt('bf')),NOW(),NOW(),NOW(),'{"provider":"email","providers":["email"]}','{}',false,'','','','','','','')
ON CONFLICT (id) DO NOTHING;

-- Departments
INSERT INTO public.departments (id, name, description) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'Engineering', 'Software engineers and architects'),
  ('d0000000-0000-0000-0000-000000000002', 'Design',      'UI/UX designers and researchers'),
  ('d0000000-0000-0000-0000-000000000003', 'Product',     'Product managers and analysts'),
  ('d0000000-0000-0000-0000-000000000004', 'Marketing',   'Marketing and growth team'),
  ('d0000000-0000-0000-0000-000000000005', 'QA',          'Quality assurance engineers')
ON CONFLICT (id) DO NOTHING;

-- Profiles
INSERT INTO public.profiles (id, full_name, email, department_id, role, level, last_logged_in) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Admin One',     'admin1@saa.local', 'd0000000-0000-0000-0000-000000000003', 'admin',    3, '2025-12-23 10:00:00+07'),
  ('a0000000-0000-0000-0000-000000000002', 'Admin Two',     'admin2@saa.local', 'd0000000-0000-0000-0000-000000000003', 'admin',    2, '2025-12-23 10:00:00+07'),
  ('e0000000-0000-0000-0000-000000000001', 'Alice Nguyen',  'emp1@saa.local',   'd0000000-0000-0000-0000-000000000001', 'employee', 2, '2025-12-23 10:00:00+07'),
  ('e0000000-0000-0000-0000-000000000002', 'Bob Tran',      'emp2@saa.local',   'd0000000-0000-0000-0000-000000000001', 'employee', 2, '2025-12-23 10:00:00+07'),
  ('e0000000-0000-0000-0000-000000000003', 'Carol Le',      'emp3@saa.local',   'd0000000-0000-0000-0000-000000000002', 'employee', 4, '2025-12-24 11:00:00+07'),
  ('e0000000-0000-0000-0000-000000000004', 'David Pham',    'emp4@saa.local',   'd0000000-0000-0000-0000-000000000001', 'employee', 1, '2025-12-25 14:00:00+07'),
  ('e0000000-0000-0000-0000-000000000005', 'Emma Vo',       'emp5@saa.local',   'd0000000-0000-0000-0000-000000000002', 'employee', 3, '2025-12-26 15:00:00+07'),
  ('e0000000-0000-0000-0000-000000000006', 'Frank Nguyen',  'emp6@saa.local',   'd0000000-0000-0000-0000-000000000003', 'employee', 2, '2025-12-27 09:00:00+07'),
  ('e0000000-0000-0000-0000-000000000007', 'Grace Tran',    'emp7@saa.local',   'd0000000-0000-0000-0000-000000000004', 'employee', 3, '2025-12-28 12:00:00+07'),
  ('e0000000-0000-0000-0000-000000000008', 'Henry Le',      'emp8@saa.local',   'd0000000-0000-0000-0000-000000000005', 'employee', 2, '2025-12-29 10:00:00+07')
ON CONFLICT (id) DO NOTHING;

-- Season 2025
INSERT INTO public.seasons (id, name, year, voting_start, voting_end, status) VALUES
  (
    '5a000000-0000-0000-0000-000000000001',
    'SAA 2025', 2025,
    '2025-11-20 00:00:00+07', '2025-11-30 23:59:59+07',
    'voting'
  )
ON CONFLICT (id) DO NOTHING;

-- Award Categories
INSERT INTO public.award_categories (id, season_id, name, description, display_order) VALUES
  ('c0000000-0000-0000-0000-000000000001', '5a000000-0000-0000-0000-000000000001', 'Best Innovator', 'Delivered the most impactful technical innovation', 1),
  ('c0000000-0000-0000-0000-000000000002', '5a000000-0000-0000-0000-000000000001', 'Team Player',    'Consistently supported teammates and fostered collaboration', 2),
  ('c0000000-0000-0000-0000-000000000003', '5a000000-0000-0000-0000-000000000001', 'Rising Star',    'Showed exceptional growth and initiative this year', 3)
ON CONFLICT (id) DO NOTHING;

-- Nominations — mix of approved / rejected / pending
INSERT INTO public.nominations (id, season_id, category_id, nominee_id, nominator_id, reason, status, reviewed_by, reviewed_at) VALUES
  -- approved
  ('b0000000-0000-0000-0000-000000000001','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000002','Built the new CI pipeline from scratch and reduced deploy time by 40%','approved','a0000000-0000-0000-0000-000000000001',NOW()),
  ('b0000000-0000-0000-0000-000000000002','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000003','Introduced AI tooling that saved 20% dev time across the team','approved','a0000000-0000-0000-0000-000000000001',NOW()),
  ('b0000000-0000-0000-0000-000000000003','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000001','Always helps unblock teammates and never says no when someone needs help','approved','a0000000-0000-0000-0000-000000000001',NOW()),
  ('b0000000-0000-0000-0000-000000000004','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000002','Organized cross-team design reviews that improved UI consistency across all products','approved','a0000000-0000-0000-0000-000000000001',NOW()),
  ('b0000000-0000-0000-0000-000000000005','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000001','Went from junior to leading a project in one year, showing incredible growth','approved','a0000000-0000-0000-0000-000000000001',NOW()),
  ('b0000000-0000-0000-0000-000000000006','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000003','Mastered three new technologies in six months: TypeScript, Kubernetes, and Go','approved','a0000000-0000-0000-0000-000000000001',NOW()),
  ('b0000000-0000-0000-0000-000000000007','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000004','e0000000-0000-0000-0000-000000000001','Redesigned the entire database schema resulting in 3x query performance improvement','approved','a0000000-0000-0000-0000-000000000001',NOW()),
  ('b0000000-0000-0000-0000-000000000008','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000005','e0000000-0000-0000-0000-000000000004','Mentored 3 junior designers and helped them ship their first major feature','approved','a0000000-0000-0000-0000-000000000001',NOW()),
  ('b0000000-0000-0000-0000-000000000009','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000004','e0000000-0000-0000-0000-000000000005','Joined as a mid-level and within 8 months was leading sprints independently','approved','a0000000-0000-0000-0000-000000000001',NOW()),
  ('b0000000-0000-0000-0000-000000000010','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000006','e0000000-0000-0000-0000-000000000007','Built an internal analytics dashboard used daily by the entire product team','approved','a0000000-0000-0000-0000-000000000002',NOW()),
  ('b0000000-0000-0000-0000-000000000011','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000007','e0000000-0000-0000-0000-000000000006','Coordinated the Q4 all-hands and got 95% satisfaction score from participants','approved','a0000000-0000-0000-0000-000000000002',NOW()),
  ('b0000000-0000-0000-0000-000000000012','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000008','e0000000-0000-0000-0000-000000000003','Came in knowing zero about QA; now writes automation tests that catch real bugs weekly','approved','a0000000-0000-0000-0000-000000000002',NOW()),
  -- rejected (spam)
  ('b0000000-0000-0000-0000-000000000013','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000004','chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc','rejected','a0000000-0000-0000-0000-000000000001',NOW()),
  ('b0000000-0000-0000-0000-000000000014','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000005','Cảm ơn người em bình thường nhưng phi thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team','rejected','a0000000-0000-0000-0000-000000000001',NOW()),
  ('b0000000-0000-0000-0000-000000000015','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000006','Just a great person overall, everyone likes them, very positive energy in the office','rejected','a0000000-0000-0000-0000-000000000002',NOW()),
  -- pending
  ('b0000000-0000-0000-0000-000000000016','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000005','e0000000-0000-0000-0000-000000000002','Redesigned the onboarding flow reducing user drop-off from 60% to 25% in first month','pending',NULL,NULL),
  ('b0000000-0000-0000-0000-000000000017','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000006','e0000000-0000-0000-0000-000000000008','Stepped up to fill a team lead role during a critical sprint when the lead was sick','pending',NULL,NULL),
  ('b0000000-0000-0000-0000-000000000018','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000007','e0000000-0000-0000-0000-000000000001','Learned React Native from scratch and shipped a mobile feature in under 2 months','pending',NULL,NULL),
  ('b0000000-0000-0000-0000-000000000019','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000008','e0000000-0000-0000-0000-000000000007','Wrote the entire test suite for the payments module, catching 12 critical bugs before release','pending',NULL,NULL),
  ('b0000000-0000-0000-0000-000000000020','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000006','Pair programmed with every new hire in Q3, dramatically reducing their ramp-up time','pending',NULL,NULL),
  ('b0000000-0000-0000-0000-000000000021','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000008','Promoted from intern to full-time engineer after delivering a production feature solo','pending',NULL,NULL),
  ('b0000000-0000-0000-0000-000000000022','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000004','Migrated legacy monolith services to microservices without any production downtime','pending',NULL,NULL),
  ('b0000000-0000-0000-0000-000000000023','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000004','e0000000-0000-0000-0000-000000000003','Runs daily standups that are always on time and energize the team to start the day','pending',NULL,NULL),
  ('b0000000-0000-0000-0000-000000000024','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000005','e0000000-0000-0000-0000-000000000002','Published two internal tech talks that helped the whole company adopt better practices','pending',NULL,NULL),
  ('b0000000-0000-0000-0000-000000000025','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000006','e0000000-0000-0000-0000-000000000005','Optimized API response times from 800ms average down to 120ms through caching strategy','pending',NULL,NULL),
  ('b0000000-0000-0000-0000-000000000026','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000008','e0000000-0000-0000-0000-000000000001','Volunteered to document the entire codebase during a company hackathon weekend','pending',NULL,NULL)
ON CONFLICT (id) DO NOTHING;

-- Votes — spread across nominees and categories for varied heart counts
INSERT INTO public.votes (id, season_id, category_id, voter_id, nominee_id) VALUES
  -- votes on nomination 001 (Alice, Best Innovator) — 3 votes
  ('f0000000-0000-0000-0000-000000000001','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000001'),
  ('f0000000-0000-0000-0000-000000000002','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000005','e0000000-0000-0000-0000-000000000001'),
  ('f0000000-0000-0000-0000-000000000003','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000007','e0000000-0000-0000-0000-000000000001'),
  -- votes on nomination 002 (Bob, Best Innovator) — 1 vote
  ('f0000000-0000-0000-0000-000000000004','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000002'),
  -- votes on nomination 003 (Bob, Team Player) — 2 votes
  ('f0000000-0000-0000-0000-000000000005','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000002'),
  ('f0000000-0000-0000-0000-000000000006','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000004','e0000000-0000-0000-0000-000000000002'),
  -- votes on nomination 004 (Carol, Team Player) — 4 votes
  ('f0000000-0000-0000-0000-000000000007','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000003'),
  ('f0000000-0000-0000-0000-000000000008','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000005','e0000000-0000-0000-0000-000000000003'),
  ('f0000000-0000-0000-0000-000000000009','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000006','e0000000-0000-0000-0000-000000000003'),
  ('f0000000-0000-0000-0000-000000000010','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000008','e0000000-0000-0000-0000-000000000003'),
  -- votes on nomination 005 (Carol, Rising Star) — 2 votes
  ('f0000000-0000-0000-0000-000000000011','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000003'),
  ('f0000000-0000-0000-0000-000000000012','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000004','e0000000-0000-0000-0000-000000000003'),
  -- votes on nomination 006 (Alice, Rising Star) — 5 votes
  ('f0000000-0000-0000-0000-000000000013','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000008','e0000000-0000-0000-0000-000000000001'),
  ('f0000000-0000-0000-0000-000000000014','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000001'),
  ('f0000000-0000-0000-0000-000000000015','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000005','e0000000-0000-0000-0000-000000000001'),
  ('f0000000-0000-0000-0000-000000000016','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000006','e0000000-0000-0000-0000-000000000001'),
  ('f0000000-0000-0000-0000-000000000017','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000007','e0000000-0000-0000-0000-000000000001'),
  -- votes on nomination 007 (David, Best Innovator) — 2 votes
  ('f0000000-0000-0000-0000-000000000018','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000006','e0000000-0000-0000-0000-000000000004'),
  ('f0000000-0000-0000-0000-000000000019','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000008','e0000000-0000-0000-0000-000000000004'),
  -- votes on nomination 010 (Frank, Best Innovator) — 3 votes
  ('f0000000-0000-0000-0000-000000000020','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000006'),
  ('f0000000-0000-0000-0000-000000000021','5a000000-0000-0000-0000-000000000001','c0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000004','e0000000-0000-0000-0000-000000000006')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Kudos Seed Data
-- Kudos = nominations. Update approved nominations (b001-b012)
-- with kudos-style content, hashtags, like counts, and timestamps.
-- ============================================================

-- Profile avatars + kudos stats
UPDATE public.profiles SET
  avatar_url           = 'https://api.dicebear.com/7.x/avataaars/svg?seed=AliceNguyen',
  kudos_received_count = 52,
  hearts_received      = 1499
WHERE id = 'e0000000-0000-0000-0000-000000000001';

UPDATE public.profiles SET
  avatar_url           = 'https://api.dicebear.com/7.x/avataaars/svg?seed=BobTran',
  kudos_received_count = 25,
  hearts_received      = 499
WHERE id = 'e0000000-0000-0000-0000-000000000002';

UPDATE public.profiles SET
  avatar_url           = 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarolLe',
  kudos_received_count = 18,
  hearts_received      = 1143
WHERE id = 'e0000000-0000-0000-0000-000000000003';

UPDATE public.profiles SET
  avatar_url           = 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidPham',
  kudos_received_count = 12,
  hearts_received      = 454
WHERE id = 'e0000000-0000-0000-0000-000000000004';

UPDATE public.profiles SET
  avatar_url           = 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaVo',
  kudos_received_count = 8,
  hearts_received      = 143
WHERE id = 'e0000000-0000-0000-0000-000000000005';

UPDATE public.profiles SET
  avatar_url           = 'https://api.dicebear.com/7.x/avataaars/svg?seed=FrankNguyen',
  kudos_received_count = 35,
  hearts_received      = 743
WHERE id = 'e0000000-0000-0000-0000-000000000006';

UPDATE public.profiles SET
  avatar_url           = 'https://api.dicebear.com/7.x/avataaars/svg?seed=GraceTran',
  kudos_received_count = 15,
  hearts_received      = 612
WHERE id = 'e0000000-0000-0000-0000-000000000007';

UPDATE public.profiles SET
  avatar_url           = 'https://api.dicebear.com/7.x/avataaars/svg?seed=HenryLe',
  kudos_received_count = 6,
  hearts_received      = 121
WHERE id = 'e0000000-0000-0000-0000-000000000008';

-- Nominations: kudos content, hashtags, like_count, staggered timestamps
-- b001  Best Innovator — nominee=Alice, nominator=Bob (1000 likes, highlight #1)
UPDATE public.nominations SET
  reason     = 'Cam on nguoi em binh thuong nhung phi thuong :D Cam on su cham chi, can man cua em da tao dong luc rat nhieu cho team, de luon nhac minh luon phai no luc hon nua trong cong viec!',
  hashtags   = ARRAY['#Dedicated', '#Inspiring'],
  like_count = 1000,
  created_at = '2026-05-24 14:00:00+07'
WHERE id = 'b0000000-0000-0000-0000-000000000001';

-- b002  Best Innovator — nominee=Bob, nominator=Carol (175 likes)
UPDATE public.nominations SET
  reason     = 'Bob da gioi thieu AI tooling tiet kiem 20% thoi gian dev cho ca team. Su sang tao cua anh luon khien chung minh nguong mo va muon hoc hoi theo!',
  hashtags   = ARRAY['#Innovation', '#HardWorking'],
  like_count = 175,
  created_at = '2026-05-24 16:00:00+07'
WHERE id = 'b0000000-0000-0000-0000-000000000002';

-- b003  Team Player — nominee=Bob, nominator=Alice (324 likes)
UPDATE public.nominations SET
  reason     = 'Chi Alice luon ho tro unblock teammates ke ca ngoai gio, khong bao gio noi khong khi ai can. Tinh than dong doi cua chi la nguon cam hung lon cho toan team!',
  hashtags   = ARRAY['#TeamPlayer', '#Caring'],
  like_count = 324,
  created_at = '2026-05-25 10:00:00+07'
WHERE id = 'b0000000-0000-0000-0000-000000000003';

-- b004  Team Player — nominee=Carol, nominator=Bob (856 likes, highlight #2)
UPDATE public.nominations SET
  reason     = 'Carol da to chuc cross-team design review giup cai thien UI consistency tren toan bo san pham. Su tan tam va chuyen nghiep cua ban that dang kham phuc!',
  hashtags   = ARRAY['#Innovation', '#TeamPlayer'],
  like_count = 856,
  created_at = '2026-05-25 14:00:00+07'
WHERE id = 'b0000000-0000-0000-0000-000000000004';

-- b005  Rising Star — nominee=Carol, nominator=Alice (287 likes)
UPDATE public.nominations SET
  reason     = 'Carol phat trien tu junior len lead project chi trong 1 nam. Toc do tien bo dang kinh ngac va su chu dong cua ban truyen cam hung cho ca team moi ngay!',
  hashtags   = ARRAY['#HardWorking', '#Dedicated'],
  like_count = 287,
  created_at = '2026-05-26 09:00:00+07'
WHERE id = 'b0000000-0000-0000-0000-000000000005';

-- b006  Rising Star — nominee=Alice, nominator=Carol (499 likes, highlight #5)
UPDATE public.nominations SET
  reason     = 'Alice da thanh thao TypeScript, Kubernetes va Go chi trong 6 thang nho su kien tri va dam me hoc hoi khong ngung nghi. Ket qua that su tuyet voi!',
  hashtags   = ARRAY['#HardWorking', '#Dedicated'],
  like_count = 499,
  created_at = '2026-05-26 15:00:00+07'
WHERE id = 'b0000000-0000-0000-0000-000000000006';

-- b007  Best Innovator — nominee=David, nominator=Alice (256 likes)
UPDATE public.nominations SET
  reason     = 'David da redesign toan bo database schema va cai thien query performance len 3x. Day la thanh tuu ky thuat an tuong tao ra su khac biet ro ret cho toan he thong!',
  hashtags   = ARRAY['#Innovation', '#HardWorking'],
  like_count = 256,
  created_at = '2026-05-27 11:00:00+07'
WHERE id = 'b0000000-0000-0000-0000-000000000007';

-- b008  Team Player — nominee=Emma, nominator=David (143 likes)
UPDATE public.nominations SET
  reason     = 'Emma da mentor 3 junior designer va giup ho ship tinh nang dau tien thanh cong. Su kien nhan va tan tam voi dong nghiep cua ban that dang tran trong!',
  hashtags   = ARRAY['#Caring', '#TeamPlayer'],
  like_count = 143,
  created_at = '2026-05-28 09:00:00+07'
WHERE id = 'b0000000-0000-0000-0000-000000000008';

-- b009  Rising Star — nominee=David, nominator=Emma (198 likes)
UPDATE public.nominations SET
  reason     = 'David gia nhap voi vi tri mid-level va chi sau 8 thang da tu lead sprint mot cach xuat sac. Su truong thanh nhanh chong cua ban that an tuong va dang tu hao!',
  hashtags   = ARRAY['#HardWorking', '#Dedicated'],
  like_count = 198,
  created_at = '2026-05-29 14:00:00+07'
WHERE id = 'b0000000-0000-0000-0000-000000000009';

-- b010  Best Innovator — nominee=Frank, nominator=Grace (743 likes, highlight #3)
UPDATE public.nominations SET
  reason     = 'Frank da build internal analytics dashboard duoc ca team Product dung hang ngay. San pham cua anh tiet kiem hang gio lam viec moi tuan cho tat ca moi nguoi!',
  hashtags   = ARRAY['#Innovation', '#Inspiring'],
  like_count = 743,
  created_at = '2026-05-30 10:00:00+07'
WHERE id = 'b0000000-0000-0000-0000-000000000010';

-- b011  Team Player — nominee=Grace, nominator=Frank (612 likes, highlight #4)
UPDATE public.nominations SET
  reason     = 'Grace da to chuc Q4 all-hands dat 95% satisfaction score tu participants. Kha nang ket noi va truyen cam hung cho moi nguoi cua ban that su xuat sac!',
  hashtags   = ARRAY['#TeamPlayer', '#Dedicated'],
  like_count = 612,
  created_at = '2026-05-31 09:00:00+07'
WHERE id = 'b0000000-0000-0000-0000-000000000011';

-- b012  Rising Star — nominee=Henry, nominator=Carol (121 likes)
UPDATE public.nominations SET
  reason     = 'Henry vao khong biet gi ve QA, gio viet automation test scripts bat real bugs moi tuan. Hanh trinh hoc hoi va phat trien cua ban truyen cam hung cho ca team!',
  hashtags   = ARRAY['#HardWorking', '#Dedicated'],
  like_count = 121,
  created_at = '2026-06-01 09:00:00+07'
WHERE id = 'b0000000-0000-0000-0000-000000000012';

-- Kudos likes — sample per-user likes on top-5 nominations
INSERT INTO public.kudos_likes (id, kudos_id, user_id) VALUES
  -- b001 (Alice <- Bob): liked by e001, e003-e008
  ('ab000000-0000-0000-0000-000000000001','b0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000001'),
  ('ab000000-0000-0000-0000-000000000002','b0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000003'),
  ('ab000000-0000-0000-0000-000000000003','b0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000004'),
  ('ab000000-0000-0000-0000-000000000004','b0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000005'),
  ('ab000000-0000-0000-0000-000000000005','b0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000006'),
  ('ab000000-0000-0000-0000-000000000006','b0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000007'),
  ('ab000000-0000-0000-0000-000000000007','b0000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000008'),
  -- b004 (Carol <- Bob): liked by e001, e004-e008
  ('ab000000-0000-0000-0000-000000000008','b0000000-0000-0000-0000-000000000004','e0000000-0000-0000-0000-000000000001'),
  ('ab000000-0000-0000-0000-000000000009','b0000000-0000-0000-0000-000000000004','e0000000-0000-0000-0000-000000000004'),
  ('ab000000-0000-0000-0000-000000000010','b0000000-0000-0000-0000-000000000004','e0000000-0000-0000-0000-000000000005'),
  ('ab000000-0000-0000-0000-000000000011','b0000000-0000-0000-0000-000000000004','e0000000-0000-0000-0000-000000000006'),
  ('ab000000-0000-0000-0000-000000000012','b0000000-0000-0000-0000-000000000004','e0000000-0000-0000-0000-000000000007'),
  ('ab000000-0000-0000-0000-000000000013','b0000000-0000-0000-0000-000000000004','e0000000-0000-0000-0000-000000000008'),
  -- b010 (Frank <- Grace): liked by e001-e005
  ('ab000000-0000-0000-0000-000000000014','b0000000-0000-0000-0000-000000000010','e0000000-0000-0000-0000-000000000001'),
  ('ab000000-0000-0000-0000-000000000015','b0000000-0000-0000-0000-000000000010','e0000000-0000-0000-0000-000000000002'),
  ('ab000000-0000-0000-0000-000000000016','b0000000-0000-0000-0000-000000000010','e0000000-0000-0000-0000-000000000003'),
  ('ab000000-0000-0000-0000-000000000017','b0000000-0000-0000-0000-000000000010','e0000000-0000-0000-0000-000000000004'),
  ('ab000000-0000-0000-0000-000000000018','b0000000-0000-0000-0000-000000000010','e0000000-0000-0000-0000-000000000005'),
  -- b011 (Grace <- Frank): liked by e001-e004, e008
  ('ab000000-0000-0000-0000-000000000019','b0000000-0000-0000-0000-000000000011','e0000000-0000-0000-0000-000000000001'),
  ('ab000000-0000-0000-0000-000000000020','b0000000-0000-0000-0000-000000000011','e0000000-0000-0000-0000-000000000002'),
  ('ab000000-0000-0000-0000-000000000021','b0000000-0000-0000-0000-000000000011','e0000000-0000-0000-0000-000000000003'),
  ('ab000000-0000-0000-0000-000000000022','b0000000-0000-0000-0000-000000000011','e0000000-0000-0000-0000-000000000004'),
  ('ab000000-0000-0000-0000-000000000023','b0000000-0000-0000-0000-000000000011','e0000000-0000-0000-0000-000000000008'),
  -- b006 (Alice <- Carol): liked by e001, e002, e004, e007, e008
  ('ab000000-0000-0000-0000-000000000024','b0000000-0000-0000-0000-000000000006','e0000000-0000-0000-0000-000000000001'),
  ('ab000000-0000-0000-0000-000000000025','b0000000-0000-0000-0000-000000000006','e0000000-0000-0000-0000-000000000002'),
  ('ab000000-0000-0000-0000-000000000026','b0000000-0000-0000-0000-000000000006','e0000000-0000-0000-0000-000000000004'),
  ('ab000000-0000-0000-0000-000000000027','b0000000-0000-0000-0000-000000000006','e0000000-0000-0000-0000-000000000007'),
  ('ab000000-0000-0000-0000-000000000028','b0000000-0000-0000-0000-000000000006','e0000000-0000-0000-0000-000000000008')
ON CONFLICT ON CONSTRAINT kudos_likes_unique DO NOTHING;

-- Secret boxes — mix of opened and sealed across employees
INSERT INTO public.secret_boxes (id, user_id, prize_description, opened_at) VALUES
  -- Alice: 2 opened, 1 sealed
  ('ac000000-0000-0000-0000-000000000001','e0000000-0000-0000-0000-000000000001','Voucher an uong 500.000d tai Sun* Cafe','2026-05-20 10:00:00+07'),
  ('ac000000-0000-0000-0000-000000000002','e0000000-0000-0000-0000-000000000001','1 ngay lam viec remote tu chon trong thang','2026-05-28 14:00:00+07'),
  ('ac000000-0000-0000-0000-000000000003','e0000000-0000-0000-0000-000000000001','Tai nghe khong day Sony WH-1000XM5',NULL),
  -- Bob: 1 opened, 1 sealed
  ('ac000000-0000-0000-0000-000000000004','e0000000-0000-0000-0000-000000000002','Sach Clean Code ban dac biet co chu ky','2026-05-22 11:00:00+07'),
  ('ac000000-0000-0000-0000-000000000005','e0000000-0000-0000-0000-000000000002','Gift card mua sach truc tuyen 300.000d',NULL),
  -- Carol: 1 opened, 1 sealed
  ('ac000000-0000-0000-0000-000000000006','e0000000-0000-0000-0000-000000000003','Bo mau ve Posca chuyen nghiep cao cap','2026-05-25 15:00:00+07'),
  ('ac000000-0000-0000-0000-000000000007','e0000000-0000-0000-0000-000000000003','Khoa hoc design online tren Udemy',NULL),
  -- Frank: 2 opened, 1 sealed
  ('ac000000-0000-0000-0000-000000000008','e0000000-0000-0000-0000-000000000006','2 ve xem phim CGV hang Gold Class','2026-05-18 09:00:00+07'),
  ('ac000000-0000-0000-0000-000000000009','e0000000-0000-0000-0000-000000000006','Voucher spa va massage thu gian 800.000d','2026-05-30 16:00:00+07'),
  ('ac000000-0000-0000-0000-000000000010','e0000000-0000-0000-0000-000000000006','Balo laptop cao cap Samsonite',NULL),
  -- Grace: 1 opened, 1 sealed
  ('ac000000-0000-0000-0000-000000000011','e0000000-0000-0000-0000-000000000007','Chuot gaming Logitech G Pro Wireless','2026-05-29 13:00:00+07'),
  ('ac000000-0000-0000-0000-000000000012','e0000000-0000-0000-0000-000000000007','Khoa hoc tieng Nhat online 3 thang',NULL),
  -- David: sealed
  ('ac000000-0000-0000-0000-000000000013','e0000000-0000-0000-0000-000000000004','Keyboard co Leopold FC900R',NULL),
  -- Emma: opened
  ('ac000000-0000-0000-0000-000000000014','e0000000-0000-0000-0000-000000000005','Tablet ve Wacom Intuos Pro Medium','2026-05-27 10:00:00+07'),
  -- Henry: opened
  ('ac000000-0000-0000-0000-000000000015','e0000000-0000-0000-0000-000000000008','Man hinh di dong BenQ EW2480','2026-05-31 11:00:00+07')
ON CONFLICT (id) DO NOTHING;
