import { useRouter } from 'next/router';
import { AppBar, Button, Divider } from '@mui/material';
import { ReactComponent as ArrowbackIcon } from '../../../../public/header/arrowback.svg';
import { ReactComponent as NavigatorIcon } from '../../../../public/header/navigator.svg';
import { ReactComponent as Logo } from '../../../../public/logos/logoFooter.svg';
import { useState } from 'react';
import DrawerList from '../drawer/DrawerList';
import DrawerListItem from '../../../molecules/drawerListItem/DrawerListItem';
import DialogButton from '../../DialogButton/DialogButton';

interface ChatHeaderType {
  isOwner: boolean;
  members: string[];
  declareStatus: string;
  handleExitChat: () => void;
  handleSendReport: () => void;
  handleCompleteRecrutment: () => void;
}

const ChatHeader = ({isOwner, members, declareStatus, handleExitChat, handleSendReport, handleCompleteRecrutment}: ChatHeaderType) => {
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
            className="w-[150px] border-0 m-0 p-0 bg-inherit"
            type="button"
            onClick={() => router.push('/chatlist')}
          >
            <ArrowbackIcon />
            <p>채팅목록으로 이동</p>
          </Button>
          <div className="flex flex-1 justify-center">
            <Logo />
          </div>
          <Button
            className="w-[150px] border-0 px-5 bg-inherit min-w-0"
            type="button"
            onClick={handleDrawerToggle}
          >
            <NavigatorIcon />
          </Button>
        </div>
      </AppBar>
      <Divider />
      <DrawerList isOpen={isDrawerOpen} onClick={handleDrawerToggle}>
        <p className='text-center my-3'>유저 목록</p>
        {members.map((member,index) => <DrawerListItem key={index} text={member}/>)}
        <Divider className='mt-3'/>
        <div className='fixed bottom-3 w-[100%]'>
          {isOwner && declareStatus !== "BOARD_COMPLETE" && (
            <DrawerListItem>
              <DialogButton 
                name="N게더 모집 완료하기" 
                title="N게더 모집을 완료하시겠어요?"
                question="N게더 모집을 완료하면 더 이상 다른 분들이 참여하실 수 없습니다"
                func={handleCompleteRecrutment}
              />
            </DrawerListItem>
          )}
          <DrawerListItem>
            <DialogButton 
              name="채팅방 신고하기" 
              title="이 채팅방을 신고하시겠어요?"
              func={handleSendReport}
            />
          </DrawerListItem>
          <DrawerListItem>
            <DialogButton 
              name="채팅방 나가기" 
              title="채팅방에서 나가시겠어요?"
              question="채팅방에서 나가면 N게더에서도 불참하게되며, 방장이실 경우 게시물도 같이 삭제됩니다"
              func={handleExitChat}
            />
          </DrawerListItem>
        </div>
      </DrawerList>
    </>
  );
};

export default ChatHeader;
