-- ============================================================
-- Helper: get current authenticated user's role
-- SECURITY DEFINER so it can read profiles as the function owner
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS public.user_role LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$;

-- ============================================================
-- Enable RLS on all tables
-- ============================================================

ALTER TABLE public.departments     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasons         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.award_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nominations     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results         ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- departments
-- ============================================================

CREATE POLICY "admin_all_departments" ON public.departments
  FOR ALL TO authenticated
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');

CREATE POLICY "employee_read_departments" ON public.departments
  FOR SELECT TO authenticated
  USING (public.get_my_role() = 'employee');

-- ============================================================
-- profiles
-- ============================================================

CREATE POLICY "admin_all_profiles" ON public.profiles
  FOR ALL TO authenticated
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');

-- Employees can read all profiles (needed for nomination/vote lookups)
CREATE POLICY "employee_read_all_profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (public.get_my_role() = 'employee');

-- Employees can update only their own profile
CREATE POLICY "employee_update_own_profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid() AND public.get_my_role() = 'employee')
  WITH CHECK (id = auth.uid());

-- ============================================================
-- seasons
-- ============================================================

CREATE POLICY "admin_all_seasons" ON public.seasons
  FOR ALL TO authenticated
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');

CREATE POLICY "employee_read_seasons" ON public.seasons
  FOR SELECT TO authenticated
  USING (public.get_my_role() = 'employee');

-- ============================================================
-- award_categories
-- ============================================================

CREATE POLICY "admin_all_award_categories" ON public.award_categories
  FOR ALL TO authenticated
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');

CREATE POLICY "employee_read_award_categories" ON public.award_categories
  FOR SELECT TO authenticated
  USING (public.get_my_role() = 'employee');

-- ============================================================
-- nominations
-- ============================================================

CREATE POLICY "admin_all_nominations" ON public.nominations
  FOR ALL TO authenticated
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');

CREATE POLICY "employee_read_nominations" ON public.nominations
  FOR SELECT TO authenticated
  USING (public.get_my_role() = 'employee');

-- Employees can submit nominations where they are the nominator
CREATE POLICY "employee_insert_nominations" ON public.nominations
  FOR INSERT TO authenticated
  WITH CHECK (
    public.get_my_role() = 'employee'
    AND nominator_id = auth.uid()
  );

-- ============================================================
-- votes
-- ============================================================

CREATE POLICY "admin_all_votes" ON public.votes
  FOR ALL TO authenticated
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');

-- Employees see only their own votes
CREATE POLICY "employee_read_own_votes" ON public.votes
  FOR SELECT TO authenticated
  USING (voter_id = auth.uid() AND public.get_my_role() = 'employee');

-- Employees can cast votes where they are the voter
CREATE POLICY "employee_insert_votes" ON public.votes
  FOR INSERT TO authenticated
  WITH CHECK (
    public.get_my_role() = 'employee'
    AND voter_id = auth.uid()
  );

-- ============================================================
-- results
-- ============================================================

CREATE POLICY "admin_all_results" ON public.results
  FOR ALL TO authenticated
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');

CREATE POLICY "employee_read_results" ON public.results
  FOR SELECT TO authenticated
  USING (public.get_my_role() = 'employee');
