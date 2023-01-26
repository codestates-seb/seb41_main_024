import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SockJS from 'sockjs-client';
import StompJS from 'stompjs';
import axios from 'axios';
import Cookies from 'js-cookie';

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
  const [isConnected, setIsConnected] = useState(false);
  const nickName = Cookies.get('nickName')
  
  useEffect(() => {
    if (!isReady || !HEADER_TOKEN || isConnected) return;

    const defaultChatSetting = async () => {
      await axios.get(`https://ngether.site/chat/room/enter/${roomId}`, {headers: HEADER_TOKEN});
      await axios.get(`https://ngether.site/chat/room/messages/${roomId}`, {headers : HEADER_TOKEN})
      .then(res => setMessages(res.data.map(transDateFormChatMessage)));
    } 
    
    const setChatWebsocket = async () => {
      try {
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

    const checkChatMember = () => {
      axios.get(`https://ngether.site/chat/room/${roomId}/memberList`)
      .then(res => {        
        const members = res.data.map((member: { memberId: number, nickName: string; }) => member.nickName)
        
        if(members.includes(nickName)) {
          setMembers(members);
          defaultChatSetting();
          setChatWebsocket();
        }
        else return
      })
    } 

    checkChatMember()
    setIsConnected(true);
  }, [roomId, HEADER_TOKEN, isConnected])

  useEffect(() => {
    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          stompClient.unsubscribe('sub-0');
          setIsConnected(false);
        });
      }
    };
  }, [stompClient])

  return {stompClient, messages, members, roomId}
}

export default useWebSocketClient;

const transDateFormat = (date: string) => {
  const targetDate = new Date(date);
  const formattedDate = `${targetDate.getHours() >= 12 ? '오후' : '오전'} ${targetDate.getHours() % 12 || 12}시 ${targetDate.getMinutes()}분`;
  return formattedDate
}

const transDateFormatForAdmin = (date: string) => {
  const targetDate = new Date(date);
  const formattedDate = `${targetDate.getFullYear()}년 ${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일 ${targetDate.getHours() >= 12 ? '오후' : '오전'} ${targetDate.getHours() % 12 || 12}시 ${targetDate.getMinutes()}분`;
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