export interface CommentType {
  author: {
    userId: string;
    nickname: string;
    profileImageUrl: string;
  };
  content: string;
  createdAt: Date;
  isMine: boolean;
}
