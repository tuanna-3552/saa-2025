-- ============================================================
-- Kudos Feature Schema
-- Kudos ARE nominations — add kudos-specific columns to existing tables
-- and create supporting tables for likes and secret boxes.
-- ============================================================

-- Kudos fields on nominations
ALTER TABLE public.nominations
  ADD COLUMN IF NOT EXISTS hashtags        TEXT[]  NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS attachment_urls TEXT[]  NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS like_count      INTEGER NOT NULL DEFAULT 0;

-- Kudos stats on profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS kudos_received_count INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS hearts_received       INTEGER NOT NULL DEFAULT 0;

-- ============================================================
-- Table: kudos_likes
-- Tracks per-user likes on nominations (used by toggle_kudos_like).
-- kudos_id references nominations.id — named kudos_id to keep
-- the kudos-api client code unchanged.
-- ============================================================

CREATE TABLE public.kudos_likes (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  kudos_id   UUID        NOT NULL REFERENCES public.nominations(id) ON DELETE CASCADE,
  user_id    UUID        NOT NULL REFERENCES public.profiles(id)    ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT kudos_likes_unique UNIQUE (kudos_id, user_id)
);

CREATE INDEX kudos_likes_user_idx  ON public.kudos_likes(user_id);
CREATE INDEX kudos_likes_kudos_idx ON public.kudos_likes(kudos_id);

-- ============================================================
-- Table: secret_boxes
-- ============================================================

CREATE TABLE public.secret_boxes (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  prize_description TEXT        NOT NULL DEFAULT '',
  opened_at         TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER secret_boxes_updated_at
  BEFORE UPDATE ON public.secret_boxes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX secret_boxes_user_idx ON public.secret_boxes(user_id);

-- ============================================================
-- Function: toggle_kudos_like
-- p_kudos_id references nominations.id
-- ============================================================

CREATE OR REPLACE FUNCTION public.toggle_kudos_like(
  p_kudos_id UUID,
  p_user_id  UUID
)
RETURNS JSON LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_liked BOOLEAN;
  v_count INTEGER;
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.kudos_likes
    WHERE kudos_id = p_kudos_id AND user_id = p_user_id
  ) THEN
    DELETE FROM public.kudos_likes
      WHERE kudos_id = p_kudos_id AND user_id = p_user_id;
    UPDATE public.nominations
      SET like_count = GREATEST(0, like_count - 1) WHERE id = p_kudos_id;
    UPDATE public.profiles p
      SET hearts_received = GREATEST(0, hearts_received - 1)
      FROM public.nominations n WHERE n.id = p_kudos_id AND p.id = n.nominee_id;
    v_liked := FALSE;
  ELSE
    IF EXISTS (
      SELECT 1 FROM public.nominations WHERE id = p_kudos_id AND nominator_id = p_user_id
    ) THEN
      RAISE EXCEPTION 'Sender cannot like their own kudos';
    END IF;
    INSERT INTO public.kudos_likes (kudos_id, user_id) VALUES (p_kudos_id, p_user_id);
    UPDATE public.nominations
      SET like_count = like_count + 1 WHERE id = p_kudos_id;
    UPDATE public.profiles p
      SET hearts_received = hearts_received + 1
      FROM public.nominations n WHERE n.id = p_kudos_id AND p.id = n.nominee_id;
    v_liked := TRUE;
  END IF;

  SELECT like_count INTO v_count FROM public.nominations WHERE id = p_kudos_id;
  RETURN json_build_object('like_count', v_count, 'liked', v_liked);
END;
$$;

-- ============================================================
-- RLS
-- ============================================================

ALTER TABLE public.kudos_likes  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.secret_boxes ENABLE ROW LEVEL SECURITY;

-- kudos_likes: all authenticated read; own insert/delete
CREATE POLICY "all_read_kudos_likes"   ON public.kudos_likes FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "own_insert_kudos_likes" ON public.kudos_likes FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "own_delete_kudos_likes" ON public.kudos_likes FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- secret_boxes: users see own only; admin full access
CREATE POLICY "own_read_secret_boxes"  ON public.secret_boxes FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "admin_all_secret_boxes" ON public.secret_boxes FOR ALL TO authenticated
  USING (public.get_my_role() = 'admin') WITH CHECK (public.get_my_role() = 'admin');
