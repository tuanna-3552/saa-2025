// STUB — replace with real Google OAuth when ready
// Node.js runtime required: Edge runtime cannot access non-NEXT_PUBLIC_ env vars
import { createClient } from "@supabase/supabase-js";

export async function POST() {
  const email = process.env.DEV_USER_EMAIL;
  const password = process.env.DEV_USER_PASSWORD;

  if (!email || !password) {
    return Response.json(
      { error: "DEV_USER_EMAIL and DEV_USER_PASSWORD must be set in .env.local" },
      { status: 500 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }

  return Response.json({ session: data.session });
}
