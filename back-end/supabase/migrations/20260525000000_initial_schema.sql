-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- Enum Types
-- ============================================================

CREATE TYPE public.user_role AS ENUM ('admin', 'employee');
CREATE TYPE public.season_status AS ENUM ('draft', 'voting', 'closed', 'announced');
CREATE TYPE public.nomination_status AS ENUM ('pending', 'approved', 'rejected');

-- ============================================================
-- updated_at trigger
-- ============================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ============================================================
-- Table: departments
-- ============================================================

CREATE TABLE public.departments (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT departments_name_key UNIQUE (name)
);

CREATE TRIGGER departments_updated_at
  BEFORE UPDATE ON public.departments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- Table: profiles (linked to auth.users)
-- ============================================================

CREATE TABLE public.profiles (
  id            UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  avatar_url    TEXT,
  department_id UUID        REFERENCES public.departments(id) ON DELETE SET NULL,
  role          public.user_role NOT NULL DEFAULT 'employee',
  is_active     BOOLEAN     NOT NULL DEFAULT TRUE,
  level         INTEGER     NOT NULL DEFAULT 1,
  last_logged_in TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT profiles_email_key UNIQUE (email)
);

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- Table: seasons
-- ============================================================

CREATE TABLE public.seasons (
  id               UUID               PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT               NOT NULL,
  year             INTEGER            NOT NULL,
  voting_start     TIMESTAMPTZ,
  voting_end       TIMESTAMPTZ,
  status           public.season_status NOT NULL DEFAULT 'draft',
  created_at       TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ        NOT NULL DEFAULT NOW()
);

CREATE TRIGGER seasons_updated_at
  BEFORE UPDATE ON public.seasons
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- Table: award_categories
-- ============================================================

CREATE TABLE public.award_categories (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id           UUID        NOT NULL REFERENCES public.seasons(id) ON DELETE CASCADE,
  name                TEXT        NOT NULL,
  description         TEXT,
  icon                TEXT,
  max_votes_per_voter INTEGER     NOT NULL DEFAULT 1,
  display_order       INTEGER     NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER award_categories_updated_at
  BEFORE UPDATE ON public.award_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX award_categories_season_order_idx
  ON public.award_categories(season_id, display_order);

-- ============================================================
-- Table: nominations
-- ============================================================

CREATE TABLE public.nominations (
  id           UUID                     PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id    UUID                     NOT NULL REFERENCES public.seasons(id) ON DELETE CASCADE,
  category_id  UUID                     NOT NULL REFERENCES public.award_categories(id) ON DELETE CASCADE,
  nominee_id   UUID                     NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  nominator_id UUID                     NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reason       TEXT,
  status       public.nomination_status NOT NULL DEFAULT 'pending',
  reviewed_by  UUID                     REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewed_at  TIMESTAMPTZ,
  created_at   TIMESTAMPTZ              NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ              NOT NULL DEFAULT NOW(),
  CONSTRAINT nominations_unique_entry UNIQUE (season_id, category_id, nominee_id, nominator_id)
);

CREATE TRIGGER nominations_updated_at
  BEFORE UPDATE ON public.nominations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX nominations_season_category_idx ON public.nominations(season_id, category_id);
CREATE INDEX nominations_status_idx          ON public.nominations(status);
CREATE INDEX nominations_nominee_idx         ON public.nominations(nominee_id);

-- ============================================================
-- Table: votes
-- One vote per voter per category per season
-- ============================================================

CREATE TABLE public.votes (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id   UUID        NOT NULL REFERENCES public.seasons(id) ON DELETE CASCADE,
  category_id UUID        NOT NULL REFERENCES public.award_categories(id) ON DELETE CASCADE,
  voter_id    UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  nominee_id  UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT votes_unique_voter_category UNIQUE (season_id, category_id, voter_id)
);

CREATE INDEX votes_season_category_idx ON public.votes(season_id, category_id);

-- ============================================================
-- Table: results
-- One winner per category per season
-- ============================================================

CREATE TABLE public.results (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id    UUID        NOT NULL REFERENCES public.seasons(id) ON DELETE CASCADE,
  category_id  UUID        NOT NULL REFERENCES public.award_categories(id) ON DELETE CASCADE,
  winner_id    UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  vote_count   INTEGER     NOT NULL DEFAULT 0,
  announced_by UUID        REFERENCES public.profiles(id) ON DELETE SET NULL,
  announced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT results_unique_category UNIQUE (season_id, category_id)
);
