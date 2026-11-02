export interface MemoryPhoto {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  date: string;
  tag?: string;
}

export interface LoveNoteReason {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface WishMessage {
  id: string;
  senderName: string;
  message: string;
  timestamp: string;
  avatarEmoji: string;
  relationTag?: string;
}
