import axios from 'axios';
const REQUEST_URL = 'https://ngether.site';
export function requestLogin(form: any) {
  return axios.post(`${REQUEST_URL}/auth/login`, form);
}
