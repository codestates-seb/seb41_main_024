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

const useWebSocketClient = (token: {Authorization : string}) => {
  const {query: {roomId}, isReady} = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([])
  const [stompClient, setStompClient] = useState<StompJS.Client | null>(null);

  useEffect(() => {
    if(!isReady) return
    axios.get(`https://ngether.site/chat/room/messages/${roomId}`)
    .then(res => setMessages(res.data.map((chatMessage: chatMessageType) => {
      console.log(res)
      return { ...chatMessage, createDate: transDateFormat(chatMessage.createDate) };
    })));

    const sockjs = new SockJS(`https://ngether.site/ws`);
    const ws = StompJS.over(sockjs)
    setStompClient(ws)

    ws.connect(
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
    axios.get(`https://ngether.site/chat/room/enter/${roomId}`, {headers : token})
    .then(res => console.log(res))
  }, [roomId, token])

  return {stompClient, messages, members, roomId}
}

export default useWebSocketClient;

const transDateFormat = (date: string) => {
  const targetDate = new Date(date);
  const formattedDate = `${targetDate.getHours() >= 12 ? '오후' : '오전'} ${targetDate.getHours() % 12 || 12}시 ${targetDate.getMinutes()}분`;
  return formattedDate
}