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
  token: {
    accessToken: string;
    refreshToken: string;
  };
  locationId: string;
  range: number;
  category: string;
}
const REQUEST_URL = 'http://3.34.54.131:8080';

export const uploadPost = async (data: uploadPostType) => {
  const query = data.category === '배달' ? 'delivery' : 'product';
  const { data: response } = await axios({
    method: 'post',
    data,
    headers: { Authorization: data.accessToken, Refresh: data.refreshToken },
    url: `${REQUEST_URL}/api/boards?category=${query}`,
  });
  return response.data;
};

export const getPosts = async ({ token, locationId, range, category }) => {
  const { data: response } = await axios({
    method: 'get',
    headers: { Authorization: token.accessToken, Refresh: token.refreshToken },
    url: `${REQUEST_URL}/api/distance/${locationId}range=${range}&&category=${category}`,
  });
  return response.data;
};
