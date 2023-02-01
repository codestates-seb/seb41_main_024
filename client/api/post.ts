import axios from 'axios';

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
  selectedAddressBookId: number;
  range: number;
  category: string;
  sortBy: string;
  page: number;
}
interface searchPostsByTitleType {
  type: number;
  keyword: string;
  page: number;
  size: number;
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

export const getPostsByAddressBook = async ({
  selectedAddressBookId,
  range = 1.5,
  category,
  sortBy,
  page,
}: getPostType) => {
  console.log('api ::', selectedAddressBookId, range, category, sortBy, page);

  const url = `${REQUEST_URL}/api/distances/${selectedAddressBookId}?range=${range}&category=${category}&sortBy=${sortBy}&page=${page}&size=10`;
  return await axios({
    method: 'get',
    url,
  }).then((res) => res.data);
};
export const getPostsInSpecifiedLocation = async ({
  locationData,
  range = 1.5,
  category = 'product',
  page = 1,
  size = 10,
  sortBy = 'distance',
}: any) => {
  const newData = {
    latitude: locationData?.lat,
    longitude: locationData?.lng,
    address: locationData?.address,
  };

  const url = `${REQUEST_URL}/api/distance?range=${range}&category=${category}&sortBy=${sortBy}&page=${page}&size=${size}`;
  return await axios({ method: 'post', url, data: newData }).then(
    (res) => res.data
  );
};

export const searchPostsByTitle = async ({
  type,
  keyword,
  page = 1,
  size = 10,
}: searchPostsByTitleType) => {
  const url = `${REQUEST_URL}/api/boards/search?type=${type}&keyword=${encodeURIComponent(
    keyword
  )}&page=${page}&size=${size}`;
  return await axios({
    method: 'get',
    url,
  }).then((res) => res.data);
};

export const getAllSharingPosts = async () => {
  const url = `${REQUEST_URL}/api/boards?page=1&size=2000`;
  return await axios({
    method: 'get',
    url,
  }).then((res) => res.data);
};
