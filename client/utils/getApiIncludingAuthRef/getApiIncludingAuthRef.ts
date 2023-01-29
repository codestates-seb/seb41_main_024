import axios from 'axios';
import Cookies from 'js-cookie';

const REQUEST_URL = 'https://ngether.site';

export function getApiIncludingAuthRef(apiUrl: string) {
  return axios.get(`${REQUEST_URL}${apiUrl}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}
