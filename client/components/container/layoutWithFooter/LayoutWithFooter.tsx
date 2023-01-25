import MainHeader from '../../organisms/headers/mainHeader/MainHeader';
import { defaultLayoutPropsType } from '../defalutLayout/defaultLayoutType';
import Navigation from '../../organisms/bottomNav/BottomNav';
import Footer from '../../molecules/footer/Footer';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import basicTheme from '../../../theme/basic';
import useLogin from '../../../hooks/common/useLogin';
import Cookies from 'js-cookie';

import { signOut } from 'next-auth/react';

//메인페이지, 마이페이지
const LayoutWithFooter = ({ children }: defaultLayoutPropsType) => {
  const { isLogin } = useLogin();
  const nickName = Cookies.get('nickName');

  const handleLogOut = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('memberId');
    Cookies.remove('nickName');
    Cookies.remove('locationId');
    signOut({ callbackUrl: '/' });
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={basicTheme}>
        <div className="max-w-2xl mx-auto min-h-[100vh] flex flex-col">
          <MainHeader
            isLogin={isLogin}
            nickName={nickName}
            logOutHandler={handleLogOut}
            session={{
              data: {
                user: {
                  name: '',
                  email: '',
                  image: '',
                },
                accessToken: '',
                expires: '',
              },
              status: '',
            }}
          />
          {children}
          <div>
            <Footer />
          </div>
          <Navigation />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default LayoutWithFooter;
