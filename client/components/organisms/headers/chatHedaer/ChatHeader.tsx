import { useRouter } from 'next/router';
import { AppBar, Button, Divider, Menu, MenuItem } from '@mui/material';
import { ReactComponent as ArrowbackIcon } from '../../../../public/header/arrowback.svg';
import { ReactComponent as NavigatorIcon } from '../../../../public/header/navigator.svg';
import { ReactComponent as Logo } from '../../../../public/logos/logoFooter.svg';
import { useState } from 'react';
import DrawerList from '../drawer/DrawerList';
import DrawerListItem from '../../../molecules/drawerListItem/DrawerListItem';

interface ChatHeaderType {
  members: string[];
  handleExitChat: () => void;
}

const ChatHeader = ({members, handleExitChat}: ChatHeaderType) => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{ height: '50px' }}
      >
        <div className="flex fixed items-center max-w-[672px] w-[100%] h-[50px] border-b-1 border-x-0 border-t-0 border-solid border-[#0000001f] bg-[white] justify-center">
          <Button
            className="border-0 m-0 p-0 bg-inherit"
            type="button"
            onClick={() => router.push('/chatlist')}
          >
            <ArrowbackIcon />
          </Button>
          <div className="flex flex-1 justify-center">
            <Logo />
          </div>
          <Button
            className="border-0 px-5 bg-inherit min-w-0"
            type="button"
            onClick={handleDrawerToggle}
          >
            <NavigatorIcon />
          </Button>
        </div>
      </AppBar>
      <Divider />
      <DrawerList isOpen={isDrawerOpen} onClick={handleDrawerToggle}>
        {members.map((member,index) => <DrawerListItem key={index} text={member}/>)}
        <div className='fixed bottom-0 w-[100%]'>
          <DrawerListItem text={'나가기'} onClick={handleExitChat}/>
        </div>
      </DrawerList>
    </>
  );
};

export default ChatHeader;
