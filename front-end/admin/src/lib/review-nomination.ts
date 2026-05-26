import { supabase } from "@/lib/supabase";

export async function reviewNomination(
  id: string,
  action: "approved" | "rejected",
  reviewerId: string
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("nominations")
    .update({
      status: action,
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);

  return { error: error?.message ?? null };
}
