import axios from 'axios';
import Cookies from 'js-cookie';


export function getMySharing() {
  const REQUEST_URL = 'https://ngether.site';

  return axios.get(`${REQUEST_URL}/api/members/myChatting?page=1&size=10`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

export const handleCompleteRecrutment = (roomId: string | string[] | undefined): void => {
  axios(
    {
      url: `https://ngether.site/api/boards/complete/${roomId}`,
      method: 'patch',
      headers: {
        Authorization: Cookies.get('access_token'),
        Refresh: Cookies.get('refresh_token'),
      }
    }
  )
}
