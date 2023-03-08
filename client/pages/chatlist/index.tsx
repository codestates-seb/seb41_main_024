import ChatItem from '../../components/organisms/chatItem/ChatItem';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { getMySharing } from '../../api/mySharing';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Head from 'next/head';
import LoginChecker from '../../components/container/loginChecker/LoginChecker';

const ChatList = () => {
  const { data, refetch } = useQuery(['mySharing'], getMySharing);
  const chatListData = data?.data.data;
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, []);

  const [isNoChatListAlertOpen, setIsNoChatListAlertOpen] = useState(true);
  const handleNoChatListAlertClose = () => {
    setIsNoChatListAlertOpen(false);
    router.push('/nearby');
  };

  return (
    <LoginChecker path="/login">
      <div className="ani_fadeIn">
        <Head>
          <title>채팅 목록</title>
        </Head>
        {chatListData?.length === 0 && (
          <NoChatListAlert
            isNoChatListAlertOpen={isNoChatListAlertOpen}
            handleNoChatListAlertClose={handleNoChatListAlertClose}
          />
        )}
        {chatListData &&
          chatListData.map((chatItem: any) => {
            return (
              <Link href={`/chatroom/${chatItem.roomId}`}>
                <ChatItem
                  key={chatItem.roomId}
                  recruitment={chatItem.recruitment}
                  title={chatItem.roomName}
                  lastMessage={chatItem.lastMessage}
                  address={chatItem.address}
                  unreadCount={chatItem.unreadCount}
                  imageLink={chatItem.imageLink}
                />
              </Link>
            );
          })}
      </div>
    </LoginChecker>
  );
};

export default ChatList;

interface NoChatListAlertPropsType {
  isNoChatListAlertOpen: boolean;
  handleNoChatListAlertClose: () => void;
}
const NoChatListAlert = ({
  isNoChatListAlertOpen,
  handleNoChatListAlertClose,
}: NoChatListAlertPropsType) => {
  return (
    <div>
      <Dialog
        open={isNoChatListAlertOpen}
        onClose={handleNoChatListAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle color="primary" id="alert-dialog-title">
          {'참여하신 쉐어링이 없습니다'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            지금 내 주변 Ngether에 참여해보세요😀
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleNoChatListAlertClose}
            color="primary"
            autoFocus
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
