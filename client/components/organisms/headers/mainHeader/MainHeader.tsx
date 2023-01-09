import { Fragment, useState } from 'react';
import { AppBar, Divider } from "@mui/material";
import Link from 'next/link';
import search from '../../../../public/header/search.svg'
import navigator from '../../../../public/header/navigator.svg'
import logo from '../../../../public/logos/logoRow.svg'
import DrawerList from '../drawer/Drawer';
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
        position="static" 
        color="inherit" 
        elevation={0} 
        sx={{ height: '50px'}}
      >
        <div className='flex'>
          <div className='flex-1'>
            <Link  href="/" >
              <img src={logo} alt="메인로고" />
            </Link>
          </div>
          <button className="border-0 bg-inherit mr-4" type="button">
            <img src={search} alt="검색하기" />
          </button>
          <button className="border-0 bg-inherit ml-4" type="button" onClick={handleDrawerToggle}>
            <img src={navigator} alt="메뉴열기" />
          </button>
        </div>
      </AppBar>
      <Divider />
      <DrawerList isOpen={isOpen} onClick={handleDrawerToggle}>
        <DrawerListItem text={"마이페이지"} path={"/mypage"} />
      </DrawerList>
    </Fragment>
  )
}


export default MainHeader;

