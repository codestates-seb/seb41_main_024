import { useRouter } from 'next/router';
import { AppBar, Button, Divider } from '@mui/material';
import { ReactComponent as ArrowbackIcon } from '../../../../public/header/arrowback.svg';
import { ReactComponent as NavigatorIcon } from '../../../../public/header/navigator.svg';
import { ReactComponent as Logo } from '../../../../public/logos/logoFooter.svg';
import { useState } from 'react';
import DrawerSet from '../drawer/DrawerSet';
import DrawerListItem from '../../../molecules/drawerListItem/DrawerListItem';
import DialogMaker from '../../dialogMaker/DialogMaker';
import Cookies from 'js-cookie';

interface ChatHeaderType {
  isOwner: boolean;
  members: { nickName: string; imageLink: string }[];
  declareStatus: string;
  handleExitChat: () => void;
  handleSendReport: () => void;
  handleCompleteRecrutment: () => void;
  handleExcutedUser: (nickName: string) => void;
}

const ChatHeader = ({
  isOwner,
  members,
  declareStatus,
  handleExitChat,
  handleSendReport,
  handleCompleteRecrutment,
  handleExcutedUser,
}: ChatHeaderType) => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="relative">
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{ height: '50px' }}
      >
        <div className="flex fixed items-center max-w-[672px] w-[100%] h-[50px] border-b-1 border-x-0 border-t-0 border-solid border-[#0000001f] bg-[white] justify-center">
          <div className="flex w-[150px]">
            <Button
              className="mr-auto border-0 bg-inherit"
              type="button"
              onClick={() => router.push('/chatlist')}
            >
              <ArrowbackIcon />
              <strong className="font-normal">채팅목록</strong>
            </Button>
          </div>
          <div className="flex flex-1 justify-center">
            <Logo />
          </div>
          <div className="flex w-[150px]">
            <Button
              className="border-0 ml-auto bg-inherit"
              type="button"
              onClick={handleDrawerToggle}
            >
              <NavigatorIcon />
            </Button>
          </div>
        </div>
      </AppBar>
      <Divider />
      <DrawerSet isOpen={isDrawerOpen} onClick={handleDrawerToggle}>
        <div className="absolute left-0 right-0 top-[64px] bottom-0">
          <strong className="block font-normal text-center my-3">
            유저 목록
          </strong>
          <ul className="absolute left-0 right-0 top-[46px] bottom-[157px] overflow-y-auto">
            {members.map((member, index) => (
              <li key={index}>
                <DrawerListItem>
                  <div className="flex pl-[0.35rem]">
                    <span className="w-[2.4125rem] h-[2.4125rem] rounded-full overflow-hidden">
                      <img
                        src={member.imageLink}
                        alt=""
                        className="block w-full h-full object-cover"
                      />
                    </span>
                    <p className="text-s text-primary pl-[1rem] pt-[0.6rem] w-[140px] truncate">
                      {member.nickName}
                    </p>
                    {isOwner && member.nickName !== Cookies.get('nickName') && (
                      <DialogMaker
                        name="강퇴"
                        title="해당 유저를 강퇴하시겠어요?"
                        question="강퇴당한 유저는 다시는 입장할 수 없습니다."
                        func={() => handleExcutedUser(member.nickName)}
                        className="p-0 m-0 text-xs text-red-500"
                      />
                    )}
                  </div>
                </DrawerListItem>
              </li>
            ))}
          </ul>
          <Divider className="mt-3" />
          <ul className="absolute left-0 right-0 bottom-0">
            {isOwner && declareStatus !== 'BOARD_COMPLETE' && (
              <li>
                <DrawerListItem>
                  <DialogMaker
                    name="N게더 모집 완료하기"
                    title="N게더 모집을 완료하시겠어요?"
                    question="N게더 모집을 완료하면 더 이상 다른 분들이 참여하실 수 없습니다"
                    func={handleCompleteRecrutment}
                  />
                </DrawerListItem>
              </li>
            )}
            <li>
              <DrawerListItem>
                <DialogMaker
                  name="채팅방 신고하기"
                  title="이 채팅방을 신고하시겠어요?"
                  func={handleSendReport}
                />
              </DrawerListItem>
            </li>
            <li>
              <DrawerListItem>
                <DialogMaker
                  name="채팅방 나가기"
                  title="채팅방에서 나가시겠어요?"
                  question="채팅방에서 나가면 N게더에서도 불참하게되며, 방장이실 경우 게시물도 같이 삭제됩니다"
                  func={handleExitChat}
                />
              </DrawerListItem>
            </li>
          </ul>
        </div>
      </DrawerSet>
    </div>
  );
};

export default ChatHeader;
