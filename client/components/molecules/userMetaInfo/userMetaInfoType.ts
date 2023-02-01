export interface productDataProps {
  productData?: {
    content: string;
    title: string;
    category: string;
    createDate: Date;
    price: number;
    maxNum: number;
    curNum: number;
    deadLine: string;
    productsLink: string;
    nickname: string;
    address: string;
    memberId: number;
    userImageLink?: string;
  };
  handleDelete: () => void;
  handleComplete: () => void;
  handleGoEdit: (id: string) => void;
  isWriter?: boolean;
  id: string;
  isDeleteModalOpen: boolean;
  handleIsDeleteModalOpen: () => void;
  handleIsDeleteModalClose: () => void;
  isOpen?: boolean;
  isCompleteModalOpen: boolean;
  handleIsCompleteModalOpen: () => void;
  handleIsCompleteModalClose: () => void;
}
