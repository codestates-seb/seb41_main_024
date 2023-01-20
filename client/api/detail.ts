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

export function editProductDetail(id: string, form: any) {
  return axios.patch(`${REQUEST_URL}/api/boards/${id}`, form, {
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
// export function getProductDetail(id: string) {
//   return axios.get(`http://localhost:3001/myData/${id}`, {
//     headers: {
//       Authorization: Cookies.get('access_token'),
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// }

// export function editProductDetail(id: string, form: any) {
//   return axios.patch(`http://localhost:3001/myData/${id}`, form, {
//     headers: {
//       Authorization: Cookies.get('access_token'),
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// }

// export function deleteProductDetail(id: string) {
//   return axios.delete(`http://localhost:3001/myData/${id}`, {
//     headers: {
//       Authorization: Cookies.get('access_token'),
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// }
