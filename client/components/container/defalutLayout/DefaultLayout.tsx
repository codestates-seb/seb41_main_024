import MainHeader from '../../organisms/headers/mainHeader/MainHeader';
import { defaultLayoutPropsType } from './defaultLayout';
import Navigation from '../../organisms/bottomNav/BottomNav';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import basicTheme from '../../../theme/basic';
import React from 'react';
import useLogin from '../../../hooks/common/useLogin';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import { signIn, useSession } from 'next-auth/react';

const DefaultLayout = ({ children }: defaultLayoutPropsType) => {
  const router = useRouter();
  const { isLogin } = useLogin();
  const nickName = Cookies.get('nickName');
  const session = useSession();

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
        <div className="max-w-2xl mx-auto min-h-[100vh]">
          <MainHeader
            isLogin={isLogin}
            nickName={nickName}
            logOutHandler={handleLogOut}
            session={session}
          />
          {children}
          <Navigation />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default DefaultLayout;
