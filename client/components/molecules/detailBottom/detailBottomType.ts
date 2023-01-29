export interface DetailBottomPropsType {
  isOpen?: boolean;
  isLiked?: boolean;
  isWriter: boolean;
  handleLike: () => void;
  handleReport: () => void;
  handleGether: () => void;
  handleModalOpen: () => void;
  handleClose: () => void;
  modalOpen: boolean;
  handleComplete: () => void;
}
