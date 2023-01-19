import axios from 'axios';
import Cookies from 'js-cookie';

// export function getProductDetail(id: string) {
//   return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/${id}`, {
//     headers: {
//       Authorization: Cookies.get('access_token'),
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// }

// export function editProductDetail(id: string, form: any) {
//   return axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/${id}`, form, {
//     headers: {
//       Authorization: Cookies.get('access_token'),
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// }

// export function deleteProductDetail(id: string) {
//   return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/${id}`, {
//     headers: {
//       Authorization: Cookies.get('access_token'),
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// }

// json-server
export function getProductDetail(id: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/myData/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

export function editProductDetail(id: string, form: any) {
  return axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/myData/${id}`, form, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

export function deleteProductDetail(id: string) {
  return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/myData/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}
