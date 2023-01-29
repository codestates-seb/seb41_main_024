export interface DetailBottomPropsType {
  isOpen?: boolean;
  isLiked?: boolean;
  isWriter: boolean;
  handleLike: () => void;
  handleReport: () => void;
  handleGether: () => void;
  handleComplete: () => void;
}
