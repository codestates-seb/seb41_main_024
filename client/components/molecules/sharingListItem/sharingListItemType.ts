export interface ListItemPropsType {
  boardId?: number;
  title: string;
  content?: string;
  createDate?: string;
  modifiedAt?: string;
  likeCount?: number;
  category?: string;
  price?: number;
  maxNum: number;
  boardStatus?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  deadLine?: string;
  productsLink?: string;
  curNum: number;
  src: string;
  alt: string;
  isFavorite?: boolean;
  imageLink?: string;
}
export interface kakaoMapItemType {
  latitude: number;
  longitude: number;
  boardId: number;
  title: string;
  maxNum: number;
  curNum: number;
  userImageLink: string;
}
