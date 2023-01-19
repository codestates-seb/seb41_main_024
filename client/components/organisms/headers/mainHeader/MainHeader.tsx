import { Fragment, useState } from 'react';
import { AppBar, Button, Divider } from '@mui/material';
import Link from 'next/link';
import { ReactComponent as SearchIcon } from '../../../../public/header/search.svg';
import { ReactComponent as NavigatorIcon } from '../../../../public/header/navigator.svg';
import { ReactComponent as Logo } from '../../../../public/logos/logoRow.svg';
import DrawerList from '../drawer/DrawerList';
import DrawerListItem from '../../../molecules/drawerListItem/DrawerListItem';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const MainHeader = () => {
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const nickName = Cookies.get('nickName');
  const isLogin = Cookies.get('access_token');

  const handleLogOut = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('memberId');
    Cookies.remove('nickName');
    router.push('/');
  };

  return (
    <Fragment>
      <AppBar
        className=""
        position="static"
        color="inherit"
        elevation={0}
        sx={{ height: '50px' }}
      >
        <div className="flex fixed items-center w-[100%] max-w-[672px] h-[50px] px-4 border-b-1 border-x-0 border-t-0 border-solid border-[#0000001f] bg-[white] z-10">
          <div className="flex-1">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="border-0 mr-2 p-0 bg-inherit pt-1">
            <Link href="/search">
              <SearchIcon />
            </Link>
          </div>
          <Button
            className="border-0 ml-2 p-0 bg-inherit min-w-0"
            type="button"
            onClick={handleDrawerToggle}
          >
            <NavigatorIcon />
          </Button>
        </div>
      </AppBar>
      {/* <Divider /> */}
      <DrawerList isOpen={isDrawerOpen} onClick={handleDrawerToggle}>
        {isLogin && (
          <div className="flex flex-col items-center m-4">
            <span className="text-primary text-bold">{nickName}</span>
            <Button
              variant="contained"
              className="m-4"
              onClick={() => handleLogOut()}
            >
              로그아웃
            </Button>
          </div>
        )}
        {!isLogin && (
          <div className="flex justify-center items-center m-2">
            <Link href={'/login'}>
              <Button variant="contained" className="m-2">
                로그인
              </Button>
            </Link>
            <Link href={'/signup'}>
              <Button variant="contained" className="m-2">
                회원가입
              </Button>
            </Link>
          </div>
        )}

        <DrawerListItem text={'마이페이지'} path={'/mypage'} />
        {/* <DrawerListItem text={'마이페이지'} path={'/mypage/로그인 한 사람의 멤버 아이디'} /> */}
        {/* 임의로 1로 지정 */}
      </DrawerList>
    </Fragment>
  );
};

export default MainHeader;
