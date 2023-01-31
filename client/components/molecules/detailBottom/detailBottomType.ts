export interface DetailBottomPropsType {
  isOpen?: any;
  isLiked?: boolean;
  isWriter: boolean;
  isAdmin: boolean;
  isReported: boolean;
  isMySharing?: boolean;
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
