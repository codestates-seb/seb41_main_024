import ChatGroup from '../../components/organisms/chatGroup/ChatGroup';
import { Fragment, ReactElement, useEffect, useState } from 'react';
import ChatForm from '../../components/organisms/chatForm/ChatForm';;
import useWebSocketClient from '../../hooks/useWebSocketClient';
import axios from 'axios';
import Cookies from 'js-cookie';
import ChatItem from '../../components/organisms/chatItem/ChatItem'
import { getChatSharing } from '../../api/chatSharing';
import Link from 'next/link';
import ChatRoomLayout from '../../components/container/chatRoomLayout/ChatRoomLayout';
import ChatHeader from '../../components/organisms/headers/chatHedaer/ChatHeader';
import { useRouter } from 'next/router';

// 채팅방 개설시 자동으로 채팅방 개설 및 닉네임 설정
// 게시물 상세에서 n게더 참여하기 시 게시물 id와 채팅방 id가 똑같습니다.
// 따라서 게시물 작성 시 리턴되는 게시물 아이디를 이용해 바로 채팅방 생성 api로 호출해주시면 될 것 같습니다.
// 그 후 /chatroom으로 이동하게 된다면 해당 id를 통해 웹소켓 연결을 시도합니다.

let HEADER_TOKEN = {Authorization : Cookies.get('access_token')};
let IS_ROOM_OWER = false

const Chatroom = () => { 
  const [input, setInput] = useState('')
  const [sharingData, setSharingData] = useState({
    thumbnail: '',
    isOpen: false,
    title: '',
    price: '',
    alertNum: '',
    address: '',
    nickName: ''
  })
  const {stompClient, messages, members, roomId} = useWebSocketClient(HEADER_TOKEN);
  const router = useRouter();

  
  useEffect(() => {
    if(roomId)
    getChatSharing(roomId)
    .then((response) => {
        setSharingData(response.data);
        IS_ROOM_OWER = sharingData.nickName === Cookies.get('nickName')
      })
      .catch((error) => {
        console.error(error);
      });
  }, [roomId]);

  const onChangeInput =  (e: React.ChangeEvent<HTMLTextAreaElement>) => { 
    setInput(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(stompClient){
      stompClient.send(
        `/send/chat/${roomId}`, 
        HEADER_TOKEN,
        JSON.stringify({type:'TALK', message:input})
      );
      setInput('');
    }
  }

  const handleExitChatRoom = (): void => {
    if (!stompClient) return;
    const confirmationMessage = IS_ROOM_OWER ? 
      "방장님이 채팅에서 나가시면 N게더도 삭제되요" : 
      "채팅에서 나가시면 N게더에서도 이탈해요"
    if (stompClient && confirm(confirmationMessage)) {
      stompClient.disconnect(() => {})
      axios.get(`https://ngether.site/chat/room/leave/${roomId}`, {headers : HEADER_TOKEN} )
      router.push('/chatlist')
    }
    else return
  }

  return (
    <div>
      <ChatHeader members={members} handleExitChat={handleExitChatRoom} />
      <div className='left-2/4 mt-3 translate-x-[-50%] fixed max-w-[642px] min-w-[372px] w-[80%] px-[3rem] rounded'>
        <Link href={`/nearby/${roomId}`}>
          <ChatItem
            thumbnail={''}
            isOpen={sharingData.isOpen}
            title={sharingData.title}
            price={sharingData.price}
            address={sharingData.address}
            alertNum={sharingData.alertNum}
          />
        </Link>
      </div>
      <div className="bg-primary pt-[90px] pb-[7.5rem] min-h-[calc(100vh-121px)] max-w-[672px] w-full">
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
