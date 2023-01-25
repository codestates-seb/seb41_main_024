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

const useWebSocketClient = (HEADER_TOKEN: {Authorization : string | undefined}) => {
  const {query: {roomId}, isReady} = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [stompClient, setStompClient] = useState<StompJS.Client | null>(null);

  useEffect( () => {
      if(!isReady && HEADER_TOKEN !== undefined) return

      const setChatWebsocket = async () => {
        try {
          await axios.get(`https://ngether.site/chat/room/messages/${roomId}`, {headers : HEADER_TOKEN})
          .then(res => setMessages(res.data.map(transDateFormChatMessage)));

          await axios.get(`https://ngether.site/chat/room/enter/${roomId}`, {headers: HEADER_TOKEN})
          .then(res => setMembers(res.data.map((member: { memberId: number, nickName: string; }) => member.nickName)));

          const sockjs = new SockJS(`https://ngether.site/ws`);
          const ws = StompJS.over(sockjs);
          setStompClient(ws);

          await ws.connect(
            HEADER_TOKEN,
            () => {
              ws.subscribe(
              `/receive/chat/${roomId}`, 
              async (messages) => {
                if((JSON.parse(messages.body).type) === 'REENTER') {
                  await axios.get(`https://ngether.site/chat/room/messages/${roomId}`, {headers : HEADER_TOKEN})
                  .then(res => setMessages(res.data.map(transDateFormChatMessage)));
                }
                setMessages((prevMessages) => [...prevMessages, transDateFormChatMessage(JSON.parse(messages.body))])
                window.scrollTo({ top: document.body.scrollHeight })
              }, 
              HEADER_TOKEN);
            }, 
            (error) => {
              console.log(error)
            }
          )
        }
        catch (error) {
          console.log(error)
        }
      }
      setChatWebsocket();
  }, [roomId, HEADER_TOKEN])
  return {stompClient, messages, members, roomId}
}

export default useWebSocketClient;

const transDateFormat = (date: string) => {
  const targetDate = new Date(date);
  const formattedDate = `${targetDate.getHours() >= 12 ? '오후' : '오전'} ${targetDate.getHours() % 12 || 12}시 ${targetDate.getMinutes()}분`;
  return formattedDate
}

// 지속적으로 반복되는 부분을 수정
// 32번째 줄 map 내부, 40번째 줄에서도 파싱이 필요한 상황이었지만 
// transDateFormChatMessage을 통해 해결
// let parsedMessage = JSON.parse(messages.body);
// parsedMessage.createDate = transDateFormat(parsedMessage.createDate);
// 이 부분도 parse부분을 인자로 직접 넣으면 됨
export const transDateFormChatMessage = (chatMessage: chatMessageType) => {
  return {...chatMessage, createDate: transDateFormat(chatMessage.createDate)}
}

// 이거 테스트코드 만들어볼것