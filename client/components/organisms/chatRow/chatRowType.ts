export interface chatRowType {
  thumbSrc?: string | null;
  chatMessageId?: number
  nickName: string | null;
  message: string;
  createDate: string;
  type: string;
  unreadCount: number;
}
