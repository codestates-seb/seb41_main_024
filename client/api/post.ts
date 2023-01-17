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

export const uploadPost = async (data: uploadPostType) => {
  const query = data.category === '배달' ? 'delivery' : 'product';
  const { data: response } = await axios({
    method: 'post',
    data,
    headers: { Authorization: data.accessToken, Refresh: data.refreshToken },
    url: `http://3.34.54.131:8080/api/boards?category=${query}`,
  });

  return response.data;
};
