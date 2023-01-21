export interface inputType {
  title: string;
  price: number;
  productsLink: string;
  category: string;
  maxNum: string;
  content: string;
  deadLine: string;
}
export interface uploadPostType extends inputType {
  latitude: number;
  longitude: number;
  accessToken?: string;
  refreshToken?: string;
  address: string;
}
