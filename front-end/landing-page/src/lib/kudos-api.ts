import { getSupabase } from "./supabase";
import type {
  KudoPost,
  HighlightKudo,
  SpotlightRecipient,
  UserStats,
  PrizeRecipient,
  KudosFilters,
} from "./kudos-types";
import { getStarCount } from "./kudos-types";

// Kudos-specific tables are not yet in the Database schema type — raw client used
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const raw = (): any => getSupabase();

const KUDOS_SELECT = `
  id, content, hashtags, attachment_urls, like_count, created_at,
  sender:profiles!sender_id(id, full_name, avatar_url, kudos_received_count, departments(name)),
  receiver:profiles!receiver_id(id, full_name, avatar_url, kudos_received_count, departments(name))
`.trim();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapKudo(row: any): KudoPost {
  return {
    id: row.id,
    senderId: row.sender?.id ?? "",
    senderName: row.sender?.full_name ?? "",
    senderAvatar: row.sender?.avatar_url ?? "",
    senderDepartment: row.sender?.departments?.name ?? "",
    senderStars: getStarCount(row.sender?.kudos_received_count ?? 0),
    receiverId: row.receiver?.id ?? "",
    receiverName: row.receiver?.full_name ?? "",
    receiverAvatar: row.receiver?.avatar_url ?? "",
    receiverDepartment: row.receiver?.departments?.name ?? "",
    receiverStars: getStarCount(row.receiver?.kudos_received_count ?? 0),
    content: row.content ?? "",
    hashtags: row.hashtags ?? [],
    attachmentImages: row.attachment_urls ?? [],
    likeCount: row.like_count ?? 0,
    likedByCurrentUser: false, // set by component using getLikedKudosIds
    createdAt: row.created_at ?? "",
  };
}

export async function getHighlightKudos(filters: KudosFilters = {}): Promise<HighlightKudo[]> {
  let q = raw().from("kudos").select(KUDOS_SELECT).order("like_count", { ascending: false }).limit(5);
  if (filters.hashtag) q = q.contains("hashtags", [filters.hashtag]);
  if (filters.department) q = q.eq("sender.departments.name", filters.department);
  const { data } = await q;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((r: any) => mapKudo(r));
}

export async function getAllKudos(filters: KudosFilters = {}, cursor?: string): Promise<KudoPost[]> {
  let q = raw().from("kudos").select(KUDOS_SELECT).order("created_at", { ascending: false }).limit(10);
  if (cursor) q = q.lt("created_at", cursor);
  if (filters.hashtag) q = q.contains("hashtags", [filters.hashtag]);
  if (filters.department) q = q.eq("sender.departments.name", filters.department);
  const { data } = await q;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((r: any) => mapKudo(r));
}

export async function getSpotlightRecipients(): Promise<SpotlightRecipient[]> {
  const { data } = await raw()
    .from("kudos")
    .select("receiver_id, created_at, receiver:profiles!receiver_id(full_name)");
  if (!data) return [];
  const map = new Map<string, { name: string; count: number; lastAt: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const row of data as any[]) {
    const existing = map.get(row.receiver_id);
    if (!existing) {
      map.set(row.receiver_id, { name: row.receiver?.full_name ?? "", count: 1, lastAt: row.created_at });
    } else {
      existing.count += 1;
      if (row.created_at > existing.lastAt) existing.lastAt = row.created_at;
    }
  }
  return Array.from(map.entries()).map(([id, v]) => ({
    id,
    name: v.name,
    kudosCount: v.count,
    lastReceivedAt: v.lastAt,
  }));
}

export async function getTotalKudosCount(): Promise<number> {
  const { count } = await raw().from("kudos").select("*", { count: "exact", head: true });
  return count ?? 0;
}

export async function getHashtags(): Promise<string[]> {
  const { data } = await raw().from("kudos").select("hashtags");
  if (!data) return [];
  const set = new Set<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const row of data as any[]) for (const tag of (row.hashtags ?? [])) set.add(tag as string);
  return Array.from(set).sort();
}

export async function getDepartments(): Promise<string[]> {
  const { data } = await getSupabase().from("departments").select("name").order("name");
  return (data ?? []).map((r) => r.name);
}

export async function getUserStats(userId: string): Promise<UserStats> {
  const [received, sent, profile, boxes] = await Promise.all([
    raw().from("kudos").select("*", { count: "exact", head: true }).eq("receiver_id", userId),
    raw().from("kudos").select("*", { count: "exact", head: true }).eq("sender_id", userId),
    raw().from("profiles").select("hearts_received").eq("id", userId).single(),
    raw().from("secret_boxes").select("opened_at").eq("user_id", userId),
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boxRows: any[] = boxes.data ?? [];
  return {
    kudosReceived: received.count ?? 0,
    kudosSent: sent.count ?? 0,
    heartsReceived: profile.data?.hearts_received ?? 0,
    secretBoxesOpened: boxRows.filter((b) => b.opened_at).length,
    secretBoxesUnopened: boxRows.filter((b) => !b.opened_at).length,
  };
}

export async function getRecentPrizeRecipients(): Promise<PrizeRecipient[]> {
  const { data } = await raw()
    .from("secret_boxes")
    .select("id, user_id, prize_description, profiles!user_id(full_name, avatar_url)")
    .not("opened_at", "is", null)
    .order("opened_at", { ascending: false })
    .limit(10);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((r: any) => ({
    id: r.id,
    name: r.profiles?.full_name ?? "",
    avatar: r.profiles?.avatar_url ?? "",
    prizeDescription: r.prize_description ?? "",
    profileUrl: `/profile/${r.user_id}`,
  }));
}

export async function getLikedKudosIds(userId: string): Promise<Set<string>> {
  const { data } = await raw().from("kudos_likes").select("kudos_id").eq("user_id", userId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Set((data ?? []).map((r: any) => r.kudos_id as string));
}

/**
 * Toggle like on a kudos post.
 * Delegates heart accounting and like_count updates to the DB function `toggle_kudos_like`.
 * The DB function enforces: sender cannot like own kudos, one like per user, special-day multiplier.
 */
export async function toggleLike(
  kudosId: string,
  userId: string
): Promise<{ likeCount: number; liked: boolean }> {
  const { data, error } = await raw().rpc("toggle_kudos_like", {
    p_kudos_id: kudosId,
    p_user_id: userId,
  });
  if (error) throw new Error(error.message);
  return { likeCount: data.like_count as number, liked: data.liked as boolean };
}
