export interface inputType {
  title: string;
  price: number | string;
  productsLink: string;
  category: string;
  maxNum: string;
  address: string;
  content: string;
}
export interface uploadPostType extends inputType {
  category: string;
  latitude: string;
  longitude: string;
  deadLine: string;
  accessToken: string | undefined;
  refreshToken: string | undefined;
}
