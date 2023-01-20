import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SockJS from 'sockjs-client';
import StompJS from 'stompjs';
import axios from 'axios';

interface chatMessageType {
  chatMessageId: number,
  chatRoomId: number,
  createDate: string,
  message: string,
  nickName: string,
  type: string
}

const useWebSocketClient = (token: {Authorization : string | undefined}) => {
  const {query: {roomId}, isReady} = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([])
  const [stompClient, setStompClient] = useState<StompJS.Client | null>(null);

  useEffect( () => {
    // 쿠키가 왜 언디파인드일지 파악하보고
    // 단순 로컬 오류였음
    // 셋타임아웃으로 초단위를 맞추는건 지양하기
      if(!isReady && token !== undefined) return
      // 이부분이 동기로 작동하는데 비동기로 짜보는게 좋겠다
      // 
      const sockjs = new SockJS(`https://ngether.site/ws`);
      const ws = StompJS.over(sockjs);
      setStompClient(ws);

      const setChatWebsocket = async () => {
        await axios.get(`https://ngether.site/chat/room/messages/${roomId}`, {headers : token})
        .then(res => setMessages(res.data.map((chatMessage: chatMessageType) => {
          console.log(res)
          return { ...chatMessage, createDate: transDateFormat(chatMessage.createDate) };
        })));
        
        // .then(res => setMessages(res.data.map((chatMessage: chatMessageType) => {
        //   console.log(res)
        //   return { ...chatMessage, createDate: transDateFormat(chatMessage.createDate) };
        // })));
        // 중복되는 부분은 함수로 관리하면 좋겠다.
        // function createChatMessage = (chatMessage: chatMessageType) => {
        // return {...chatMessage, createDate: transDateFormat(chatMessage.createDate)}
        
        await ws.connect(
          {},
          () => {
            ws.subscribe(
            `/receive/chat/${roomId}`, 
            (messages) => {
              console.log(messages)
              let parsedMessage = JSON.parse(messages.body);
              parsedMessage.createDate = transDateFormat(parsedMessage.createDate)
              setMessages((prev) => [...prev, parsedMessage])
            }, 
            {});
            axios.get(`https://ngether.site/chat/room/enter/${roomId}`, {headers: token})
            .then(res => setMembers(res.data.map((member: { memberId: number, nickName: string; }) => member.nickName)));
          }, 
          (error) => {
            console.log(error)
          }
        )
      }
      setChatWebsocket();
  }, [roomId, token])

  return {stompClient, messages, members, roomId}
}

export default useWebSocketClient;

const transDateFormat = (date: string) => {
  const targetDate = new Date(date);
  const formattedDate = `${targetDate.getHours() >= 12 ? '오후' : '오전'} ${targetDate.getHours() % 12 || 12}시 ${targetDate.getMinutes()}분`;
  return formattedDate
}

// 이거 테스트코드 만들어볼것