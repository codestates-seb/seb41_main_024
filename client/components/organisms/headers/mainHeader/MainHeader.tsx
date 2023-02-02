import React from 'react';
import { Fragment, useState } from 'react';
import { AppBar, Button } from '@mui/material';
import Link from 'next/link';
import { ReactComponent as SearchIcon } from '../../../../public/header/search.svg';
import { ReactComponent as NavigatorIcon } from '../../../../public/header/navigator.svg';
import { ReactComponent as Logo } from '../../../../public/logos/logoRow.svg';
import DrawerSet from '../drawer/DrawerSet';
import DrawerListItem from '../../../molecules/drawerListItem/DrawerListItem';
import { mainHeaderType } from './mainHeaderType';
import Cookies from 'js-cookie';
import useAdminRole from '../../../../hooks/common/useAdminRole';

const MainHeader = ({ nickName, logOutHandler }: mainHeaderType) => {
  const [isLogin, setIsLogin] = useState<undefined | string>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAdmin } = useAdminRole();
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsLogin(Cookies.get('access_token'));
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
      <DrawerSet isOpen={isDrawerOpen} onClick={handleDrawerToggle}>
        {!isLogin && (
          <div className="flex justify-center items-center m-2">
            <Button 
              className="m-2"
              href={'/login'} 
              variant="contained" 
              component="a"
              LinkComponent={Link}
            >
              로그인
            </Button>
            <Button 
              className="m-2"
              href={'/signup'} 
              variant="contained" 
              component="a"
              LinkComponent={Link}
            >
              회원가입
            </Button>
          </div>
        )}
        {isLogin && (
          <>
            <div className="flex flex-col items-center m-4 w-full">
              <span className="text-primary text-bold">{nickName}</span>
              <Button
                variant="contained"
                className="m-4"
                onClick={logOutHandler}
              >
                로그아웃
              </Button>
              {isAdmin ? (
                <DrawerListItem text={'관리자페이지'} path={'/admin'} />
              ) : (
                <DrawerListItem text={'마이페이지'} path={'/mypage'} />
              )}
            </div>
          </>
        )}
      </DrawerSet>
    </Fragment>
  );
};

export default MainHeader;
