import ChatGroup from '../../components/organisms/chatGroup/ChatGroup';
import { ReactElement, useEffect, useRef, useState } from 'react';
import ChatForm from '../../components/organisms/chatForm/ChatForm';
import useWebSocketClient from '../../hooks/useWebSocketClient';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Alert, AlertColor, Snackbar } from '@mui/material';

import Link from 'next/link';
import ChatRoomLayout from '../../components/container/chatRoomLayout/ChatRoomLayout';
import ChatHeader from '../../components/organisms/headers/chatHedaer/ChatHeader';
import { useRouter } from 'next/router';
import CircleLoading from '../../components/organisms/circleLoading/CircleLoading';
import { handleCompleteRecrutment } from '../../api/mySharing';
import { reportChat } from '../../api/detail';
import { getIsWriter } from '../../api/isWriter';
import ChatItemFC from '../../components/organisms/chatItemForChatroom/ChatItemFC';
import useLogin from '../../hooks/common/useLogin';
import ForbiddenMessage from '../../components/atoms/fobiddenMessage/ForbiddenMessage';
import Head from 'next/head';

// 채팅방 개설시 자동으로 채팅방 개설 및 닉네임 설정
// 게시물 상세에서 n게더 참여하기 시 게시물 id와 채팅방 id가 똑같습니다.
// 따라서 게시물 작성 시 리턴되는 게시물 아이디를 이용해 바로 채팅방 생성 api로 호출해주시면 될 것 같습니다.
// 그 후 /chatroom으로 이동하게 된다면 해당 id를 통해 웹소켓 연결을 시도합니다.

const Chatroom = () => {
  let HEADER_TOKEN = { Authorization: Cookies.get('access_token') };

  const { stompClient, messages, members, roomId, sharingData } =
    useWebSocketClient(HEADER_TOKEN);

  const isMember = members.filter((member) => {
    return member.nickName === Cookies.get('nickName');
  });
  const { isLogin } = useLogin();

  const [isOwner, setIsOwner] = useState(false);
  const [input, setInput] = useState('');
  const router = useRouter();
  const [alertOption, setAlertOption] = useState<{
    severity: AlertColor;
    value: string;
  }>({ severity: 'error', value: '' });
  const [open, setOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (roomId && typeof roomId === 'string') {
      getIsWriter(roomId).then((res) => setIsOwner(res.data));
    }
  }, [roomId]);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (stompClient) {
      stompClient.send(
        `/send/chat/${roomId}`,
        HEADER_TOKEN,
        JSON.stringify({ type: 'TALK', message: input })
      );
      setInput('');
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const checkDeclareStatus = async () => {
    const response = await axios.get(
      `https://ngether.site/chat/room/search/${roomId}`
    );
    const declareStatus = response.data.declareStatus;
    return declareStatus;
  };

  const handleReportChatroomWithToast = async () => {
    if (!stompClient) return;
    setOpen(true);
    reportChat(roomId)
      .then(() => {
        setOpen(true);
        setAlertOption({
          severity: 'success',
          value: '신고가 관리자에게 전달되었습니다',
        });
        router.push('/chatlist');
      })
      .catch(() => {
        setOpen(true);
        setAlertOption({ severity: 'warning', value: '신고에 실패했습니다' });
      });
  };

  const handleCompleteRecrutmentWithToast = async (): Promise<void> => {
    if (!stompClient) return;
    handleCompleteRecrutment(roomId)
      .then((res) => {
        setOpen(true);
        setAlertOption({
          severity: 'success',
          value: 'N게더 모집이 완료되었습니다',
        });
      })
      .catch(() => {
        setOpen(true);
        setAlertOption({
          severity: 'error',
          value: '해당 요청이 실패했습니다. 잠시 후에 다시 시도해주세요',
        });
      });
  };

  // 추방 핸들러
  const handleExcutedUser = (nickName: string) => {
    if (!stompClient) return;
    axios
      .get(
        `https://ngether.site/chat/room/deport/${roomId}?nickName=${nickName}`,
        { headers: HEADER_TOKEN }
      )
      .then((res) => {
        setOpen(true);
        setAlertOption({
          severity: 'success',
          value: `유저 ${nickName}이 성공적으로 퇴장시켰습니다`,
        });
      })
      .catch(() => {
        setOpen(true);
        setAlertOption({
          severity: 'error',
          value: '신고된 채팅방에서는 퇴장시킬 수 없습니다.',
        });
      });
  };

  // 퇴장 핸들러
  const handleExitChatRoom = async (): Promise<void> => {
    if (!stompClient) return;
    const isDeclare = await checkDeclareStatus();
    if (stompClient && !isDeclare) {
      setOpen(true);
      axios
        .get(`https://ngether.site/chat/room/leave/${roomId}`, {
          headers: HEADER_TOKEN,
        })
        .then((res) => {
          setOpen(true);
          setAlertOption({
            severity: 'success',
            value: 'N게더 모집에서 퇴장하셨습니다',
          });
          stompClient.disconnect(() => {});
        });
      router.push('/chatlist');
    } else {
      setOpen(true);
      setAlertOption({
        severity: 'error',
        value: '해당 N게더는 현재 신고된 상태로 퇴장하실 수 없습니다',
      });
    }
    return;
  };

  return (
    <div className="flex flex-col w-[100%]">
      <Head>
        <title>채팅방</title>
        <meta
          name="description"
          content="실시간 그룹 채팅을 할 수 있는 페이지입니다. 상대방을 비방하거나 모욕하면 신고당할 수 있으며 Ngether 서비스를 이용할 수 없습니다"
        />
      </Head>
      <ChatHeader
        isOwner={isOwner}
        members={members}
        declareStatus={sharingData.boardStatus}
        handleExitChat={handleExitChatRoom}
        handleSendReport={handleReportChatroomWithToast}
        handleCompleteRecrutment={handleCompleteRecrutmentWithToast}
        handleExcutedUser={handleExcutedUser}
      />
      {!isLogin && <ForbiddenMessage />}
      {!isMember && isLogin && (
        <div className="mt-[45%]">
          <CircleLoading />
        </div>
      )}
      {isMember && (
        <>
          <div className="left-2/4 mt-16 translate-x-[-50%] fixed">
            <Link href={`/nearby/${roomId}`}>
              <ChatItemFC sharingData={sharingData} />
            </Link>
          </div>
          <div className="bg-primary pt-[90px] h-[calc(100vh-138px)] box-border overflow-scroll overflow-x-hidden scroll-smooth max-w-[672px] w-full">
            <ChatGroup chatData={messages} />
            <div className="h-[32px]" ref={messagesEndRef} />
          </div>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            className="bottom-[25%]"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity={alertOption?.severity}>{alertOption?.value}</Alert>
          </Snackbar>
          <div className="fixed bottom-0 left-2/4 translate-x-[-50%] max-w-2xl w-full bg-white">
            <ChatForm
              onSubmit={handleSubmit}
              onChange={onChangeInput}
              value={input}
            />
          </div>
        </>
      )}
    </div>
  );
};

Chatroom.getLayout = function (page: ReactElement) {
  return <ChatRoomLayout>{page}</ChatRoomLayout>;
};

export default Chatroom;
