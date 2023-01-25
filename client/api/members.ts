import axios from 'axios';

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
