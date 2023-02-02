import MainHeader from '../../organisms/headers/mainHeader/MainHeader';
import { defaultLayoutPropsType } from './defaultLayoutType';
import Navigation from '../../organisms/bottomNav/BottomNav';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import basicTheme from '../../../theme/basic';
import React, { useEffect, useState } from 'react';
import useLogin from '../../../hooks/common/useLogin';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';

const DefaultLayout = ({ children }: defaultLayoutPropsType) => {
  const router = useRouter();
  const { isLogin } = useLogin();
  const nickName = Cookies.get('nickName');

  const handleLogOut = () => {
    axios.delete('https://ngether.site/api/deleteRefreshToken', {
      headers: {
        Authorization: Cookies.get('access_token'),
        Refresh: Cookies.get('refresh_token'),
      },
    });
    Cookies.remove('access_token', { path: '' });
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
        <div className="max-w-2xl mx-auto min-h-[100vh] pcPageLine">
          <MainHeader
            isLogin={isLogin}
            nickName={nickName}
            logOutHandler={handleLogOut}
          />
          {children}
          <Navigation />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default DefaultLayout;
