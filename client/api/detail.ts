import axios from 'axios';
import Cookies from 'js-cookie';

export function getProductDetail({ id }: { id: number }) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

export function editProductDetail({ id }: { id: number }) {
  return axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

export function deleteProductDetail({ id }: { id: number }) {
  return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

// json-server
// export function getProductDetail({ id }: { id: number }) {
//   return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/myData/${id}`, {
//     headers: {
//       Authorization: Cookies.get('access_token'),
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// }

// export function editProductDetail({ id }: { id: number }) {
//   return axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/myData/${id}`, {
//     headers: {
//       Authorization: Cookies.get('access_token'),
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// }

// export function deleteProductDetail({ id }: { id: number }) {
//   return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/myData/${id}`, {
//     headers: {
//       Authorization: Cookies.get('access_token'),
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// }
