import axios from 'axios';
import Cookies from 'js-cookie';

const REQUEST_URL = 'https://ngether.site';

export function getAllUsers() {
  return axios.get(`${REQUEST_URL}/api/members`);
}

export function requestSignUp(form: any) {
  return axios.post(`${REQUEST_URL}/api/members`, form);
}

export function requestLogin(form: any) {
  return axios.post(`${REQUEST_URL}/auth/login`, form);
}

export function requestGoogleLogin() {
  return axios.get(`${REQUEST_URL}/api/members/getGoogleMember`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

export function requestFirstGoogleLogin(form: any) {
  return axios.patch(`${REQUEST_URL}/api/members/patchGoogleMember`, form, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}
