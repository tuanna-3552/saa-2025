import { createClient } from "@supabase/supabase-js";
import type { Database } from "@saa/shared-ui";

let instance: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabase() {
  if (typeof window === "undefined") {
    throw new Error("Supabase client can only be used in the browser");
  }

  if (!instance) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error(
        "Missing Supabase environment variables. " +
          "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
    }

    instance = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  return instance;
}

export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get: (_, prop) => getSupabase()[prop as keyof ReturnType<typeof createClient<Database>>],
});
