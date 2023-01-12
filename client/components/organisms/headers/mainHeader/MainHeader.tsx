import { Fragment, useState } from 'react';
import { AppBar, Button, Divider } from '@mui/material';
import Link from 'next/link';
import {ReactComponent as SearchIcon} from '../../../../public/header/search.svg';
import {ReactComponent as NavigatorIcon} from '../../../../public/header/navigator.svg';
import {ReactComponent as Logo} from '../../../../public/logos/logoRow.svg';
import DrawerList from '../drawer/DrawerList';
import DrawerListItem from '../../../molecules/drawerListItem/DrawerListItem';

const MainHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Fragment>
      <AppBar
        className="px-4 py-4 border-b border-b-inherit"
        position="static"
        color="inherit"
        elevation={0}
        sx={{ height: '50px' }}
      >
        <div className="flex">
          <div className="flex-1">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="border-0 mr-2 p-0 bg-inherit pt-1">
            <Link href="/search" >
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
      <Divider />
      <DrawerList isOpen={isDrawerOpen} onClick={handleDrawerToggle}>
        <DrawerListItem text={'마이페이지'} path={'/mypage/1'} />
        {/* <DrawerListItem text={'마이페이지'} path={'/mypage/로그인 한 사람의 멤버 아이디'} /> */}
        {/* 임의로 1로 지정 */}
      </DrawerList>
    </Fragment>
  );
};

export default MainHeader;
