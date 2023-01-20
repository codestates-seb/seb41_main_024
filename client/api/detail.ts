import axios from 'axios';
import Cookies from 'js-cookie';
const REQUEST_URL = 'https://ngether.site';
export function getProductDetail(id: string) {
  return axios.get(`${REQUEST_URL}/api/boards/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

export function editProductDetail(id: string) {
  return axios.patch(`${REQUEST_URL}/api/boards/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

export function deleteProductDetail(id: string) {
  return axios.delete(`${REQUEST_URL}/api/boards/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

// json-server
// export function getProductDetail(id: number ) {
//   return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/myData/${id}`, {
//     headers: {
//       Authorization: Cookies.get('access_token'),
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// }

// export function editProductDetail(id: number ) {
//   return axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/myData/${id}`, {
//     headers: {
//       Authorization: Cookies.get('access_token'),
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// }

// export function deleteProductDetail(id: number) {
//   return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/myData/${id}`, {
//     headers: {
//       Authorization: Cookies.get('access_token'),
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// }
