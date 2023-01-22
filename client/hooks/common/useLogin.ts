import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function useLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const accessToken = Cookies.get('access_token');
  const refreshToken = Cookies.get('refresh_token');
  useEffect(() => {
    if (!accessToken && !refreshToken) setIsLogin(false);
    setIsFetching(false);
  }, []);

  return { isLogin, isFetching };
}
export default useLogin;
