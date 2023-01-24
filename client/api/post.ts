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
  locationId?: number;
  range: number;
  category: string;
}
const REQUEST_URL = 'https://ngether.site';

export const uploadPost = async (data: uploadPostType) => {
  return await axios({
    method: 'post',
    data,
    headers: {
      Authorization: data.accessToken,
      Refresh: data.refreshToken,
    },
    url: `${REQUEST_URL}/api/boards`,
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
export const getPostsInSpecifiedLocation = async ({
  locationData,
  range = 1,
  category,
  page = 1,
  size = 300,
}: any) => {
  const newData = {
    latitude: locationData?.lat,
    longitude: locationData?.lng,
    address: locationData?.address,
  };
  const url = `${REQUEST_URL}/api/distance?range=${range}&category=${category}&sortBy=distance&page=${page}&size=${size}`;
  return await axios({ method: 'post', url, data: newData }).then(
    (res) => res.data
  );
};

export const searchPostsByTitle = async ({
  type,
  keyword,
  page = 1,
  size = 10,
}) => {
  const url = `${REQUEST_URL}/api/boards/search?type=${type}&keyword=${encodeURIComponent(
    keyword
  )}&page=${page}&size=${size}`;
  return await axios({
    method: 'get',
    url,
  }).then((res) => res.data);
};
