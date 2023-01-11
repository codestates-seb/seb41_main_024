import { Fragment, useState } from 'react';
import { AppBar, Button, Divider } from '@mui/material';
import Link from 'next/link';
import search from '../../../../public/header/search.svg';
import navigator from '../../../../public/header/navigator.svg';
import logo from '../../../../public/logos/logoRow.svg';
import DrawerList from '../drawer/DrawerList';
import DrawerListItem from '../../../molecules/drawerListItem/DrawerListItem';

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <AppBar
        className='px-4 py-4 border-b border-b-inherit'
        position='static'
        color='inherit'
        elevation={0}
        sx={{ height: '50px' }}
      >
        <div className='flex'>
          <div className='flex-1'>
            <Link href='/'>
              <img src={logo} alt='메인로고' />
            </Link>
          </div>
          <Button className='border-0 mr-2 p-0 bg-inherit' type='button'>
            <img src={search} alt='검색하기' />
          </Button>
          <Button
            className='border-0 ml-2 p-0 bg-inherit'
            type='button'
            onClick={handleDrawerToggle}
          >
            <img src={navigator} alt='메뉴열기' />
          </Button>
        </div>
      </AppBar>
      <Divider />
      <DrawerList isOpen={isOpen} onClick={handleDrawerToggle}>
        <DrawerListItem text={'마이페이지'} path={'/mypage/1'} />
        {/* <DrawerListItem text={'마이페이지'} path={'/mypage/로그인 한 사람의 멤버 아이디'} /> */}
        {/* 임의로 1로 지정 */}
      </DrawerList>
    </Fragment>
  );
};

export default MainHeader;
