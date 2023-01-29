export interface PostMetaPrposType {
  isLiked: boolean;
  handleLike: () => void;
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
  };
}
