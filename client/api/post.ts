import axios from 'axios';
import { inputType } from '../hooks/addNewHooks/useInputType';
interface uploadPostType {
  title: string;
  price: number | string;
  productsLink: string;
  category: string;
  maxNum: string;
  address: string;
  content: string;
  latitude: string;
  longitude: string;
  deadLine: string;
  accessToken: string;
  refreshToken: string;
}
interface getPostType {
  locationId: number;
  range: number;
  category: string;
}
const REQUEST_URL = ' https://ngether.site';

export const uploadPost = async (data: uploadPostType) => {
  const query = data.category === '배달' ? 'delivery' : 'product';
  return await axios({
    method: 'post',
    data,
    headers: { Authorization: data.accessToken, Refresh: data.refreshToken },
    url: `${REQUEST_URL}/api/boards?category=${query}`,
  });
};

export const getPosts = async ({
  locationId,
  range,
  category,
}: getPostType) => {
  const url = `${REQUEST_URL}/api/distance/${locationId}?range=${range}&&category=${category}`;

  return await axios({
    method: 'get',
    url,
  }).then((res) => res.data);
};
export const getPostsInCurrentLocation = async ({ range, category }: any) => {
  const data = {
    latitude: 35.6194352,
    longitude: 129.3486386,
    address: '서울시 노원구 공릉1동',
  };
  console.log('api::', range, category);
  const url = `${REQUEST_URL}/api/distance?range=${range}&category=${category}`;
  return await axios({ method: 'post', url, data }).then((res) => res.data);
};
