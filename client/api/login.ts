import axios from 'axios';

const REQUEST_URL = 'https://ngether.site';

export function requestLogin(form: any) {
  return axios.post(`${REQUEST_URL}/auth/login`, form);
}

// export function requestLogin(form: any) {
//   return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, form);
// }
