import ChatItem from '../../components/organisms/chatItem/ChatItem';
import ProductImg from '../../public/chatItem/productImg.svg';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { getMySharing } from '../../api/mySharing';
import { useEffect } from 'react';

const ChatList = () => {
  const { data,refetch } = useQuery(['mySharing'], getMySharing);
  const chatListData = data?.data.data;

  useEffect(() => {
    refetch();
  }, [])

  console.log(chatListData);
  return (
    <div>
      {chatListData &&
        chatListData.map((chatItem: any) => {
          return (
            <Link href={`/chatroom/${chatItem.roomId}`}>
              <ChatItem
                key={chatItem.roomId}
                thumbnail={ProductImg}
                declareStatus={chatItem.declareStatus}
                title={chatItem.roomName}
                price={chatItem.price}
                lastMessage={chatItem.lastMessage}
                address={chatItem.address}
                alertNum={chatItem.alertNum || 1}
              />
            </Link>
          );
        })}
    </div>
  );
};

export default ChatList;
