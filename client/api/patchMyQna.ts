import axios from 'axios';
import Cookies from 'js-cookie';

const REQUEST_URL = 'https://ngether.site';

const patchMyQna = (
  formValue: { title: string; content: string },
  qnaId: number
) => {
  return axios.patch(`${REQUEST_URL}/api/qna/patch/${qnaId}`, formValue, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
};

export default patchMyQna;
