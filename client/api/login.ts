import axios from 'axios';

export function requestLogin(form: any) {
  return axios.post(`http://3.34.54.131:8080/auth/login`, form);
}

// export function requestLogin(form: any) {
//   return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, form);
// }
