import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useLogin from '../../../hooks/common/useLogin';
import { loginCheckerPropsType } from './loginCheckerType';

const LoginChecker = ({ children, path }: loginCheckerPropsType) => {
  const router = useRouter();
  const { isLogin, isFetching } = useLogin();
  useEffect(() => {
    if (!isLogin) {
      router.push(path);
    }
  }, [isLogin]);
  return (
    <>
      {isFetching && <div>Loading...</div>}
      {isLogin && !isFetching && children}
    </>
  );
};

export default LoginChecker;
