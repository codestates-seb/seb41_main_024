import axios from 'axios';
import Cookies from 'js-cookie';

const REQUEST_URL = 'https://ngether.site';

export function checkNickName(nickNameForm: object) {
  return axios.post(`${REQUEST_URL}/api/members/check`, nickNameForm, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

export function checkPhoneNumber(phoneForm: object) {
  return axios.post(`${REQUEST_URL}/api/members/check`, phoneForm, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}
