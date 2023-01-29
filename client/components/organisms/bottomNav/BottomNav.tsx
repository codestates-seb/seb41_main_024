import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { bottomNavPropsType } from './bottomNavType';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function BottomNav(): JSX.Element {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<undefined | string>();

  useEffect(() => {
    const token = Cookies.get('access_token');
    setIsLogin(token);
  }, []);

  const NAVIGATION_LIST: Array<object> = [
    {
      label: '홈',
      icon: <HomeOutlinedIcon />,
      path: '/',
    },
    {
      label: '내 주변',
      icon: <LocationOnOutlinedIcon />,
      path: '/nearby',
    },
    {
      label: '채팅',
      icon: <ChatBubbleOutlineOutlinedIcon />,
      path: '/chatlist',
    },
    {
      label: isLogin ? '나의 N게더' : '로그인',
      icon: isLogin ? <PersonOutlineOutlinedIcon /> : <LoginIcon />,
      path: isLogin ? '/mypage' : '/login',
    },
    {
      label: 'N게더 모집',
      icon: <AddOutlinedIcon />,
      path: '/addnew',
    },
  ];

  const handleOnClick = (path: string) => {
    if (isLogin || path === '/') {
      router.push(path);
    } else {
      router.push('/login');
    }
  };

  return (
    <Box
      sx={{
        height: 56,
      }}
    >
      <CssBaseline />
      <Paper sx={{}} elevation={4}>
        <BottomNavigation
          showLabels
          value={router.pathname}
          sx={{
            position: 'fixed',
            left: '50%',
            width: '100%',
            maxWidth: '672px',
            transform: 'translateX(-50%)',
            bottom: '0',
            zIndex: '10',
            // borderTop: '1px solid #475569',
          }}
        >
          {NAVIGATION_LIST.map(({ label, icon, path }: any) => {
            return (
              <BottomNavigationAction
                key={label}
                label={label}
                icon={icon}
                value={path}
                onClick={() => handleOnClick(path)}
                sx={
                  path === '/addnew'
                    ? {
                        bgcolor: (theme) => theme.palette.primary.main,
                        color: (theme) => theme.palette.primary.contrastText,
                        '& .Mui-selected, svg': {
                          color: (theme) => theme.palette.primary.contrastText,
                        },
                      }
                    : null
                }
              />
            );
          })}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
