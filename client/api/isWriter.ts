import axios from 'axios';
import Cookies from 'js-cookie';

const REQUEST_URL = 'https://ngether.site';

export function getIsWriter(id: string) {
  return axios.get(`${REQUEST_URL}/api/boards/${id}/checkMyBoard`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}
