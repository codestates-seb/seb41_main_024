import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const REQUEST_URL = 'https://ngether.site';
let willRefreshToken = false;

const router = useRouter();

const checkTokenExpiration = () => {
  if (willRefreshToken) {
    return;
  }

  const accessToken = Cookies.get('access_token');
  const refreshToken = Cookies.get('refresh_token');

  // 둘 다 없으면 로그인도 안한거니까 로그인 창으로 보내버림
  if (!accessToken || !refreshToken) {
    router.push('/login')
    return;
  }

  // 일단 로그인은 했으니까 토큰을 refresh 할 것으로 수정
  if(accessToken) {
    willRefreshToken = true;
  
    axios.post(`${REQUEST_URL}/api/refresh_token`, { refresh: refreshToken })
    .then(res => {
      res.headers.authorization &&
      Cookies.set('access_token', res.headers.authorization);
      willRefreshToken = false;
    })
    .catch(err => {
      console.error(err);
      willRefreshToken = false;
    });
  }
}