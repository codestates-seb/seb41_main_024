export interface inputType {
  title: string;
  price: number | string;
  productsLink: string;
  category: string;
  maxNum: string;
  address: string;
  content: string;
  deadLine: string;
  lat: number;
  lng: number;
}
export interface uploadPostType extends inputType {
  category: string;
  latitude: number;
  longitude: number;
  accessToken: string | undefined;
  refreshToken: string | undefined;
}
