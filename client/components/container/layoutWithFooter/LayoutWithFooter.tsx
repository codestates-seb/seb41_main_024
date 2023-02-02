import MainHeader from '../../organisms/headers/mainHeader/MainHeader';
import { defaultLayoutPropsType } from '../defalutLayout/defaultLayoutType';
import Navigation from '../../organisms/bottomNav/BottomNav';
import Footer from '../../molecules/footer/Footer';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import basicTheme from '../../../theme/basic';
import useLogin from '../../../hooks/common/useLogin';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';

//메인페이지, 마이페이지
const LayoutWithFooter = ({ children }: defaultLayoutPropsType) => {
  const { isLogin } = useLogin();
  const router = useRouter();
  const nickName = Cookies.get('nickName');

  const handleLogOut = () => {
    axios.delete('https://ngether.site/api/deleteRefreshToken', 
      {
        headers: {
          Authorization: Cookies.get('access_token'),
          Refresh: Cookies.get('refresh_token'),
        },
      }
    )
    Cookies.remove('access_token' , { path: '' });
    Cookies.remove('refresh_token', { path: '' });
    Cookies.remove('memberId', { path: '' });
    Cookies.remove('nickName', { path: '' });
    Cookies.remove('locationId', { path: '' });
    Cookies.remove('role', { path: '' });
    router.push('/');
    window.location.reload();
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={basicTheme}>
        <div className="max-w-2xl mx-auto min-h-[100vh] flex flex-col pcPageLine">
          <MainHeader
            isLogin={isLogin}
            nickName={nickName}
            logOutHandler={handleLogOut}
          />
          {children}
          <Footer />
          <Navigation />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default LayoutWithFooter;
