import ChatGroup from '../../components/organisms/chatGroup/ChatGroup';
import { ReactElement, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import StompJS from 'stompjs';
import axios from 'axios';
import ChatForm from '../../components/organisms/chatForm/ChatForm';
import ChatRoomLayout from '../../components/layout/chatRoomLayout/ChatRoomLayout';
import { Cookies } from 'react-cookie';

// 채팅방 개설시 자동으로 채팅방 개설 및 닉네임 설정
// 게시물 상세에서 n게더 참여하기 시 게시물 id와 채팅방 id가 똑같습니다.
// 따라서 게시물 작성 시 리턴되는 게시물 아이디를 이용해 바로 채팅방 생성 api로 호출해주시면 될 것 같습니다.
// 그 후 /chatroom으로 이동하게 된다면 해당 id를 통해 웹소켓 연결을 시도합니다.


let HEADER_TOKEN = {Authorization : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoic29uZ0BnbWFpbC5jb20iLCJzdWIiOiJzb25nQGdtYWlsLmNvbSIsImlhdCI6MTY3NDA4NzgzNiwiZXhwIjoxNjc0MDkwMjM2fQ.a_i3mgf9Aqi7w5be6giDlTaFJkzdwEtho_vCjQnILQk'}; 
// let HEADER_TOKEN = '';

const Chatroom = () => {  
  const [messages, setMessages] = useState<any[]>([])
  const [members, setMembers] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [stompClient, setStompClient] = useState<StompJS.Client | null>(null)
  const [roomId, setRoomId] = useState<string | null>('7')
  
  // const cookies = new Cookies();
  // HEADER_TOKEN = cookies.get('access_token');

  // if (HEADER_TOKEN === '') {
  //   return;
  // }
  useEffect(() => {
    axios.get(`https://ngether.site/chat/room/messages/${roomId}`)
    .then(res => setMessages(res.data.map((chatMessage: 
        {
          chatMessageId: number,
          chatRoomId: number,
          createDate: string,
          message: string,
          nickName: string,
          type: string
        }
      ) => {
      const date = new Date(chatMessage.createDate);
      const formattedDate = `${date.getHours() >= 12 ? '오후' : '오전'} ${date.getHours() % 12 || 12}시 ${date.getMinutes()}분`;
      return { ...chatMessage, createDate: formattedDate };
    })));

    axios.get(`https://ngether.site/chat/room/${roomId}/memberList`)
    .then(res => setMembers(res.data.map((member: { memberId: number, nickName: string; }) => member.nickName)));

    const sockjs = new SockJS(`https://ngether.site/ws`);
    const ws = StompJS.over(sockjs)
    setStompClient(ws)

    ws.connect(
      HEADER_TOKEN,
      () => {
        ws.subscribe(`/receive/chat/${roomId}`, (messages) => {
          let parsedMessage = JSON.parse(messages.body);
          const date = new Date(parsedMessage.createDate);
          const formattedDate = `${date.getHours() >= 12 ? '오후' : '오전'} ${date.getHours() % 12 || 12}시 ${date.getMinutes()}분`;
          parsedMessage.createDate = formattedDate
          setMessages((prev) => [...prev, parsedMessage])
        }, HEADER_TOKEN);
        // axios.get(`https://ngether.site/chat/enter/${roomId}`, headers: {HEADER_TOKEN})
      }, 
      (error) => {
        console.log(error)
    })
  }, [roomId])

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

  const exitChatRoom = (roomId: string) => {
    if(stompClient){
      stompClient.disconnect(() => {
        console.log('끊김')},
        HEADER_TOKEN
      )
      // axios.get(`https://ngether.site/chat/room/leaves/${roomId}`, headers: {HEADER_TOKEN})
    }
  }

  return (
    <div className="mx-0 mx-auto">
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
