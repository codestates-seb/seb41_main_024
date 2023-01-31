import { getChatSharing } from '../api/chatSharing';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SockJS from 'sockjs-client';
import StompJS from 'stompjs';
import axios from 'axios';
import Cookies from 'js-cookie';
import { transDateTimeFormat } from '../utils/transDateFormat/transDateFormat';

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
  const [sharingData, setSharingData] = useState({
    address : '',
    boardId : 0,
    boardStatus : '',
    category : '',
    content : '',
    createDate : '',
    curNum : 0,
    deadLine : 0,
    imageLink : '',
    latitude : '',
    likeCount : 0,
    longitude : '',
    maxNum : 0,
    memberId : 0,
    nickname : '',
    price : 0,
    productsLink : '',
    title : ''
  })
  const [stompClient, setStompClient] = useState<StompJS.Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const mapMembers = (arr: any[]) => {
    return arr.map((member: { memberId: number, nickName: string; imageLink:string; }) => { return {nickName: member.nickName, imageLink: member.imageLink}})
  }

  useEffect(() => {
    if (!isReady || !HEADER_TOKEN || isConnected) return;

    const defaultChatSetting = async () => {
      await axios.get(`https://ngether.site/chat/room/enter/${roomId}`, {headers: HEADER_TOKEN});
      await axios.get(`https://ngether.site/chat/room/messages/${roomId}`, {headers : HEADER_TOKEN})
      .then(res => setMessages(res.data.map(transDateFormChatMessage)));
      await getChatSharing(roomId)
      .then((response) => {
        console.log(response.data)
        setSharingData(response.data);
      })
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
              const message = JSON.parse(messages.body)
              if (message.type === 'REENTER') {
                await axios.get(`https://ngether.site/chat/room/messages/${roomId}`, {headers : HEADER_TOKEN})
                .then(res => setMessages(res.data.map(transDateFormChatMessage)));
              } 
              if (message.type === 'ENTER' || message.type === 'LEAVE') {
                await axios.get(`https://ngether.site/chat/room/${roomId}/memberList`, {headers : HEADER_TOKEN})
                .then(res => {        
                  const members = mapMembers(res.data);
                  setMembers(members);
                });
              }
              if (message.type === 'NOTICE') {
                await getChatSharing(roomId)
                .then((response) => {setSharingData(response.data);
                })
              }
              setMessages((prevMessages) => [...prevMessages, transDateFormChatMessage(message)])
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
        const members = mapMembers(res.data)
        const isMember = members.filter((member) => {return member.nickName === Cookies.get('nickName')});
        if(isMember) {
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

  return {stompClient, messages, members, roomId, sharingData}
}

export default useWebSocketClient;

export const transDateFormChatMessage = (chatMessage: chatMessageType) => {
  return {...chatMessage, createDate: transDateTimeFormat(chatMessage.createDate)}
}