import axios from 'axios';
import Cookies from 'js-cookie';

const REQUEST_URL = 'https://ngether.site';

const postMyQna = (formValue: { title: string; content: string }) => {
  return axios.post(`${REQUEST_URL}/api/qna`, formValue, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
};

export default postMyQna;
