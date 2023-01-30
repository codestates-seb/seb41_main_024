export interface DetailBottomPropsType {
  isOpen?: boolean;
  isLiked?: boolean;
  isWriter: boolean;
  isAdmin: boolean;
  handleUserBlock: () => void;
  handleLike: () => void;
  handleReport: () => void;
  handleGether: () => void;
  handleReportModalOpen: () => void;
  handleReportModalClose: () => void;
  isReportModalOpen: boolean;
  handleComplete: () => void;
  isGetherModalOpen: boolean;
  handleGetherModalOpen: () => void;
  handleGetherModalClose: () => void;
  isCompleteModalOpen: boolean;
  handleIsCompleteModalOpen: () => void;
  handleIsCompleteModalClose: () => void;
}
