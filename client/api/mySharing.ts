import axios from 'axios';
import Cookies from 'js-cookie';

export function getMySharing() {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/members/myChatting?page=1&size=10`,
    {
      headers: {
        Authorization: Cookies.get('access_token'),
        Refresh: Cookies.get('refresh_token'),
      },
    }
  );
}
