import axios from 'axios';
import Cookies from 'js-cookie';

const REQUEST_URL = 'https://ngether.site';

const accessToken = Cookies.get('access_token');
const refreshToken = Cookies.get('refresh_token');

export const checkTokenExpiration = () => {
  // 로그인 안했으면 리턴 accessToken === undefined && accessToken === undefined 이었던 것 수정
  if (accessToken === undefined && refreshToken === undefined) {
    return;
  }
  // 리프레쉬 토큰은 있지만 엑세스 토큰이 expires 옵션에 의해 만료됐다고 예상되는 경우
  if (accessToken === undefined && refreshToken) {
    // 헤더에 리프레쉬 토큰을 담아 api/reissue로 get req
    return axios
      .get(`${REQUEST_URL}/api/reissue`, { headers: { refresh: refreshToken } })
      .then((res) => {
        // res header에 authorization을 다시 엑세스 토큰 쿠키에 set
        res.headers.authorization &&
          Cookies.set('access_token', res.headers.authorization, {
            expires: 0.079,
          });
        // refresh 토큰 만료 예상시 res header에 refresh 토큰도 같이 오기 때문에, 만약 헤더에 있다면 같이 set
        res.headers.refresh &&
          Cookies.set('refresh', res.headers.refresh, { expires: 20 });
      })
      .catch((err) => {
        console.error(err);
      });
  }
};
