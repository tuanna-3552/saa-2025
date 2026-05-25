import { createClient } from "@supabase/supabase-js";
import type { Database } from "@saa/shared-ui";

let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabase() {
  if (typeof window === "undefined") {
    throw new Error("Supabase client can only be used in the browser");
  }

  if (!supabaseInstance) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error(
        "Missing Supabase environment variables. " +
          "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
    }

    supabaseInstance = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  return supabaseInstance;
}

// For backward compatibility, create a lazy proxy
export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get: (target, prop) => {
    return getSupabase()[prop as keyof ReturnType<typeof createClient<Database>>];
  },
});
