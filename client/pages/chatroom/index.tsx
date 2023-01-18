import ChatHeader from '../../components/organisms/headers/chatHedaer/ChatHeader';
import ChatGroup from '../../components/organisms/chatGroup/ChatGroup';
import chatDummy from './dataChat';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import StompJS from 'stompjs';
import axios from 'axios';
import ChatForm from '../../components/organisms/chatForm/ChatForm';

// 채팅방 개설시 자동으로 채팅방 개설 및 닉네임 설정
// 게시물 상세에서 n게더 참여하기 시 게시물 id와 채팅방 id가 똑같습니다.
// 따라서 게시물 작성 시 리턴되는 게시물 아이디를 이용해 바로 채팅방 생성 api로 호출해주시면 될 것 같습니다.
// 그 후 /chatroom으로 이동하게 된다면 해당 id를 통해 웹소켓 연결을 시도합니다.

const HEADER_TOKEN = {
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiY2hhdHRlc3RAZ21haWwuY29tIiwic3ViIjoiY2hhdHRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjc0MDA4MzE0LCJleHAiOjE2NzQwMTA3MTR9.acrb9pET0YoV07piRHZyhoHHPaEEGmFCTUZ8C9eF6u8'
}

const Chatroom = () => {  
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [stompClient, setStompClient] = useState<StompJS.Client | null>(null)
  const [roomId, setRoomId] = useState<string | null>('1')

  useEffect(() => {
    if (!roomId) {
      return;
    }
    
    const sockjs = new SockJS(`http://ec2-3-34-54-131.ap-northeast-2.compute.amazonaws.com:8080/ws`);
    const ws = StompJS.over(sockjs)
    setStompClient(ws)

    // 채팅방 입장 api 호출
    // 채팅방 입장 화면
    // @GetMapping("/room/enter/{room-Id}")
    // public String roomDetail(@PathVariable("room-Id") Long roomId) {
    //     chatService.enterRoom(roomId);
    //     return "/chat/roomdetail";
    // }

    ws.connect(
      HEADER_TOKEN,
      () => {
        ws.subscribe(`/receive/chat/${roomId}`, (messages) => {
            setMessages((prev) => [...prev, JSON.parse(messages.body)])
        }, HEADER_TOKEN);
        ws.send(        
          `/send/chat/${roomId}`, 
          HEADER_TOKEN ,
          JSON.stringify({type:'ENTER', message:''})
        )
        console.log('연결됨');
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
    // // 퇴장부분
    // if(stompClient){
    //   stompClient.send(        
    //     `/send/chat/${roomId}`, 
    //     HEADER_TOKEN ,
    //     JSON.stringify({type:'LEAVE', message:''})
    //   )
    //   stompClient.subscribe(`/receive/chat/room/${roomId}`, (frame) => {
    //   }, HEADER_TOKEN).unsubscribe()
    // }
  }

  const joinRoom = (roomId: string) => {
    setRoomId(roomId);
  }

  return (
    <div className="max-w-2xl my-0 mx-auto">
      <ChatHeader />
      <div className="bg-primary pt-[8.125rem] pb-[7.5rem] min-h-[calc(100vh-121px)]">
        <div className="flex justify-center my-9 mx-0">
          <strong className="inline-block py-[0.5rem] px-[1.25rem] bg-[rgba(217,217,217,0.3)] text-[#fff] font-normal leading-4 rounded">
            {/* chattest 님이 입장하셨습니다. */}
          </strong>
        </div>
        <ChatGroup chatData={messages} />
      </div>
      <div className="fixed bottom-12 left-2/4 translate-x-[-50%] max-w-2xl w-full bg-white">
        <ChatForm onSubmit={handleSubmit} onChange={onChangeInput} value={input}/>
      </div>
    </div>
  );
};

export default Chatroom;
