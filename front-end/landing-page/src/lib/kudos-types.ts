export interface KudoPost {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderDepartment: string;
  senderStars: number;
  receiverId: string;
  receiverName: string;
  receiverAvatar: string;
  receiverDepartment: string;
  receiverStars: number;
  content: string;
  hashtags: string[];
  attachmentImages: string[];
  likeCount: number;
  likedByCurrentUser: boolean;
  createdAt: string; // ISO string — display as 'HH:mm - MM/DD/YYYY'
}

export type HighlightKudo = KudoPost;

export interface SpotlightRecipient {
  id: string;
  name: string;
  kudosCount: number;
  lastReceivedAt: string;
}

export interface UserStats {
  kudosReceived: number;
  kudosSent: number;
  heartsReceived: number;
  secretBoxesOpened: number;
  secretBoxesUnopened: number;
}

export interface PrizeRecipient {
  id: string;
  name: string;
  avatar: string;
  prizeDescription: string;
  profileUrl: string;
}

export interface KudosFilters {
  hashtag?: string;
  department?: string;
}

/** Stars awarded based on kudos received: 0 (<10), 1 (≥10), 2 (≥20), 3 (≥50) */
export function getStarCount(kudosReceivedCount: number): number {
  if (kudosReceivedCount >= 50) return 3;
  if (kudosReceivedCount >= 20) return 2;
  if (kudosReceivedCount >= 10) return 1;
  return 0;
}
