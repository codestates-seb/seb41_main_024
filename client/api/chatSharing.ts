import axios from 'axios';
import Cookies from 'js-cookie';

export function getChatSharing(boardId: string | string[] | undefined) {
  return axios.get(
    `https://ngether.site/api/boards/${boardId}`,
    {
      headers: {
        Authorization: Cookies.get('access_token'),
        Refresh: Cookies.get('refresh_token'),
      },
    }
  );
}