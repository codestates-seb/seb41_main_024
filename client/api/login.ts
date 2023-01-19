import axios from 'axios';

export function requestLogin(form: any) {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, form);
}
