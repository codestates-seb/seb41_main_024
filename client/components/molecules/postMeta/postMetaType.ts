export interface PostMetaType {
  isLiked?: boolean;
  handleLike: () => void;
  productData?: {
    content: string;
    title: string;
    category: string;
    createDate: any;
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
