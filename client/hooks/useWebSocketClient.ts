import { useEffect, useState } from 'react';
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

const useWebSocketClient = (roomId: number | string, token: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [stompClient, setStompClient] = useState<StompJS.Client | null>(null);

  useEffect(() => {
    axios.get(`https://ngether.site/chat/room/messages/${roomId}`)
    .then(res => setMessages(res.data.map((chatMessage: chatMessageType) => {
      return { ...chatMessage, createDate: transDateFormat(chatMessage.createDate) };
    })));

    const sockjs = new SockJS(`https://ngether.site/ws`);
    const ws = StompJS.over(sockjs)
    setStompClient(ws)

    ws.connect(
      {Authorization : token},
      () => {
        ws.subscribe(
        `/receive/chat/${roomId}`, 
        (messages) => {
          let parsedMessage = JSON.parse(messages.body);
          parsedMessage.createDate = transDateFormat(parsedMessage.createDate)
          setMessages((prev) => [...prev, parsedMessage])
        }, 
        {Authorization : token});
        // axios.get(`https://ngether.site/chat/enter/${roomId}`, headers: {Authorization : token})
      }, 
      (error) => {
        console.log(error)
      }
    )
  }, [roomId, token])

  return {stompClient, messages}
}

export default useWebSocketClient;

const transDateFormat = (date: string) => {
  const targetDate = new Date(date);
  const formattedDate = `${targetDate.getHours() >= 12 ? '오후' : '오전'} ${targetDate.getHours() % 12 || 12}시 ${targetDate.getMinutes()}분`;
  return formattedDate
}