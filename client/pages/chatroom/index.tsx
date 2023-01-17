import ChatHeader from '../../components/organisms/headers/chatHedaer/ChatHeader';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import ChatGroup from '../../components/organisms/chatGroup/ChatGroup';
import chatDummy from './dataChat';
import { ReactElement } from 'react';
import ChatRoomLayout from '../../components/layout/chatRoomLayout/ChatRoomLayout';

const Chatroom = () => {
  return (
    <div className="mx-0 mx-auto">
      <div className="bg-primary pt-[8.125rem] pb-[7.5rem] min-h-[calc(100vh-121px)]">
        <div className="flex justify-center my-9 mx-0">
          <strong className="inline-block py-[0.5rem] px-[1.25rem] bg-[rgba(217,217,217,0.3)] text-[#fff] font-normal leading-4 rounded">
            2023년 1월 5일 목요일
          </strong>
        </div>
        <ChatGroup chatData={chatDummy} />
      </div>

      <div className="fixed bottom-0 left-2/4 translate-x-[-50%] max-w-2xl w-full bg-white">
        <form className="flex p-[1rem]">
          <div className="flex-1">
            <TextField size="medium" autoComplete="off" className="w-full" />
          </div>
          <div className="flex justify-center pl-[1rem]">
            <IconButton
              aria-label="send"
              className="rounded-full bg-primary w-[3.125rem] h-[3.125rem] text-white self-center hover:"
              sx={{
                '&:hover, &.Mui-focused': {
                  bgcolor: (theme) => theme.palette.primary.main,
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </div>
        </form>
      </div>
    </div>
  );
};
Chatroom.getLayout = function (page: ReactElement) {
  return <ChatRoomLayout>{page}</ChatRoomLayout>;
};

export default Chatroom;
