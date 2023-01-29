export interface DetailBottomPropsType {
  isLiked: boolean;
  isWriter: boolean;
  handleLike: () => void;
  handleReport: () => void;
  handleGether: () => void;
  id: number;
  handleModalOpen: () => void;
  handleClose: () => void;
  modalOpen: boolean;
}
