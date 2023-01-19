import ChatGroup from '../../components/organisms/chatGroup/ChatGroup';
import { ReactElement, useState } from 'react';
import ChatForm from '../../components/organisms/chatForm/ChatForm';
import ChatRoomLayout from '../../components/layout/chatRoomLayout/ChatRoomLayout';
import useWebSocketClient from '../../hooks/useWebSocketClient';
import axios from 'axios';

// 채팅방 개설시 자동으로 채팅방 개설 및 닉네임 설정
// 게시물 상세에서 n게더 참여하기 시 게시물 id와 채팅방 id가 똑같습니다.
// 따라서 게시물 작성 시 리턴되는 게시물 아이디를 이용해 바로 채팅방 생성 api로 호출해주시면 될 것 같습니다.
// 그 후 /chatroom으로 이동하게 된다면 해당 id를 통해 웹소켓 연결을 시도합니다.


let HEADER_TOKEN = {Authorization : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoic29uZ0BnbWFpbC5jb20iLCJzdWIiOiJzb25nQGdtYWlsLmNvbSIsImlhdCI6MTY3NDEwOTYyNiwiZXhwIjoxNjc0MTEyMDI2fQ.QM11SgAdjcqLxwpaqlIVJsFZ1WEO6mQog_92AzH7tvY'}; 

const Chatroom = () => { 
  const [input, setInput] = useState('')
  const {stompClient, messages, members, roomId} = useWebSocketClient(HEADER_TOKEN);

  const onChangeInput =  (e: React.ChangeEvent<HTMLTextAreaElement>) => { 
    setInput(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(stompClient){
      stompClient.send(
        `/send/chat/${roomId}`, 
        HEADER_TOKEN ,
        JSON.stringify({type:'TALK', message:input})
      );
      setInput('');
    }
  }

  const exitChatRoom = () => {
    console.log(roomId)
    if(stompClient){
      stompClient.disconnect(() => {
        console.log('끊김')},
        HEADER_TOKEN
      )
      axios.get(`https://ngether.site/chat/room/leave/${roomId}`, {headers: HEADER_TOKEN})
    }
  }

  return (
    <div className="mx-0 mx-auto">
      <button onClick={exitChatRoom}>퇴장</button>
      <div className="bg-primary pt-[8.125rem] pb-[7.5rem] min-h-[calc(100vh-121px)]">
        <ChatGroup chatData={messages} />
      </div>
      <div className="fixed bottom-0 left-2/4 translate-x-[-50%] max-w-2xl w-full bg-white">
        <ChatForm onSubmit={handleSubmit} onChange={onChangeInput} value={input}/>
      </div>
    </div>
  );
};

Chatroom.getLayout = function (page: ReactElement) {
  return <ChatRoomLayout>{page}</ChatRoomLayout>;
};

export default Chatroom;
