export interface chatRowType {
  imageLink?: string | null;
  chatMessageId?: number;
  nickName: string | null;
  message: string;
  time?: string;
  myChat?: string;
  createDate: string;
  type: string;
  unreadCount: number;
}
