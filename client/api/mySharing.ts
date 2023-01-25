import axios from 'axios';
import Cookies from 'js-cookie';

// export function getMySharing() {
//   return axios.get(
//     `https://ngether.site/api/members/myChatting?page=1&size=10`,
//     {
//       headers: {
//         Authorization: Cookies.get('access_token'),
//         Refresh: Cookies.get('refresh_token'),
//       },
//     }
//   );
// }

// NEXT_PUBLIC_API_URL;
export function getMySharing() {
  const REQUEST_URL = 'https://ngether.site';

  return axios.get(`${REQUEST_URL}/api/members/myChatting?page=1&size=10`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

// json-server
// export function getMySharing() {
//   return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/myData`, {
//     headers: {
//       Authorization: Cookies.get('access_token'),
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// }
