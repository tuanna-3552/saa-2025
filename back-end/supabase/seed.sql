-- ============================================================
-- Seed Data — SAA-2025 Local Development
-- Fixed UUIDs for reproducibility across db:reset runs
-- ============================================================

-- Auth users (required before profiles due to FK)
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, is_super_admin
) VALUES
  (
    '00000000-0000-0000-0000-000000000000',
    'a0000000-0000-0000-0000-000000000001',
    'authenticated', 'authenticated',
    'admin1@saa.local',
    crypt('password123', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}', '{}', false
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    'a0000000-0000-0000-0000-000000000002',
    'authenticated', 'authenticated',
    'admin2@saa.local',
    crypt('password123', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}', '{}', false
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    'e0000000-0000-0000-0000-000000000001',
    'authenticated', 'authenticated',
    'emp1@saa.local',
    crypt('password123', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}', '{}', false
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    'e0000000-0000-0000-0000-000000000002',
    'authenticated', 'authenticated',
    'emp2@saa.local',
    crypt('password123', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}', '{}', false
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    'e0000000-0000-0000-0000-000000000003',
    'authenticated', 'authenticated',
    'emp3@saa.local',
    crypt('password123', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}', '{}', false
  )
ON CONFLICT (id) DO NOTHING;

-- Departments
INSERT INTO public.departments (id, name, description) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'Engineering', 'Software engineers and architects'),
  ('d0000000-0000-0000-0000-000000000002', 'Design',      'UI/UX designers and researchers'),
  ('d0000000-0000-0000-0000-000000000003', 'Product',     'Product managers and analysts')
ON CONFLICT (id) DO NOTHING;

-- Profiles
INSERT INTO public.profiles (id, full_name, email, department_id, role) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Admin One',   'admin1@saa.local', 'd0000000-0000-0000-0000-000000000003', 'admin'),
  ('a0000000-0000-0000-0000-000000000002', 'Admin Two',   'admin2@saa.local', 'd0000000-0000-0000-0000-000000000003', 'admin'),
  ('e0000000-0000-0000-0000-000000000001', 'Alice Nguyen','emp1@saa.local',   'd0000000-0000-0000-0000-000000000001', 'employee'),
  ('e0000000-0000-0000-0000-000000000002', 'Bob Tran',    'emp2@saa.local',   'd0000000-0000-0000-0000-000000000001', 'employee'),
  ('e0000000-0000-0000-0000-000000000003', 'Carol Le',    'emp3@saa.local',   'd0000000-0000-0000-0000-000000000002', 'employee')
ON CONFLICT (id) DO NOTHING;

-- Season 2025  (prefix '5a' = valid hex)
INSERT INTO public.seasons (id, name, year, nomination_start, nomination_end, voting_start, voting_end, status) VALUES
  (
    '5a000000-0000-0000-0000-000000000001',
    'SAA 2025', 2025,
    '2025-11-01 00:00:00+07', '2025-11-15 23:59:59+07',
    '2025-11-20 00:00:00+07', '2025-11-30 23:59:59+07',
    'nomination'
  )
ON CONFLICT (id) DO NOTHING;

-- Award Categories  (prefix 'c0' = valid hex)
INSERT INTO public.award_categories (id, season_id, name, description, display_order) VALUES
  ('c0000000-0000-0000-0000-000000000001', '5a000000-0000-0000-0000-000000000001', 'Best Innovator', 'Delivered the most impactful technical innovation', 1),
  ('c0000000-0000-0000-0000-000000000002', '5a000000-0000-0000-0000-000000000001', 'Team Player',    'Consistently supported teammates and fostered collaboration', 2),
  ('c0000000-0000-0000-0000-000000000003', '5a000000-0000-0000-0000-000000000001', 'Rising Star',    'Showed exceptional growth and initiative this year', 3)
ON CONFLICT (id) DO NOTHING;

-- Nominations (approved, reviewed by admin1)  (prefix 'b0' = valid hex)
INSERT INTO public.nominations (id, season_id, category_id, nominee_id, nominator_id, reason, status, reviewed_by, reviewed_at) VALUES
  ('b0000000-0000-0000-0000-000000000001', '5a000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002', 'Built the new CI pipeline from scratch',           'approved', 'a0000000-0000-0000-0000-000000000001', NOW()),
  ('b0000000-0000-0000-0000-000000000002', '5a000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000003', 'Introduced AI tooling that saved 20% dev time',    'approved', 'a0000000-0000-0000-0000-000000000001', NOW()),
  ('b0000000-0000-0000-0000-000000000003', '5a000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'Always helps unblock teammates',                   'approved', 'a0000000-0000-0000-0000-000000000001', NOW()),
  ('b0000000-0000-0000-0000-000000000004', '5a000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'Organized cross-team design reviews',              'approved', 'a0000000-0000-0000-0000-000000000001', NOW()),
  ('b0000000-0000-0000-0000-000000000005', '5a000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'Went from junior to leading a project in one year', 'approved', 'a0000000-0000-0000-0000-000000000001', NOW()),
  ('b0000000-0000-0000-0000-000000000006', '5a000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000003', 'Mastered three new technologies in six months',    'approved', 'a0000000-0000-0000-0000-000000000001', NOW())
ON CONFLICT (id) DO NOTHING;

-- Votes (one vote per voter per category)  (prefix 'f0' = valid hex)
INSERT INTO public.votes (id, season_id, category_id, voter_id, nominee_id) VALUES
  ('f0000000-0000-0000-0000-000000000001', '5a000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001'),
  ('f0000000-0000-0000-0000-000000000002', '5a000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002'),
  ('f0000000-0000-0000-0000-000000000003', '5a000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000003')
ON CONFLICT (id) DO NOTHING;
