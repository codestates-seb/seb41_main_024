import ChatItem from '../../components/organisms/chatItem/ChatItem';
import ProductImg from '../../public/chatItem/productImg.svg';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { getMySharing } from '../../api/mySharing';
import { useEffect } from 'react';

const ChatList = () => {
  const { data, refetch } = useQuery(['mySharing'], getMySharing);
  const chatListData = data?.data.data;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {chatListData &&
        chatListData.map((chatItem: any) => {
          return (
            <Link href={`/chatroom/${chatItem.roomId}`}>
              <ChatItem
                key={chatItem.roomId}
                thumbnail={ProductImg}
                recruitment={chatItem.recruitment}
                title={chatItem.roomName}
                price={chatItem.price}
                lastMessage={chatItem.lastMessage}
                address={chatItem.address}
                unreadCount={chatItem.unreadCount}
                declareStatus={chatItem.declareStatus}
                imageLink={chatItem.imageLink}
              />
            </Link>
          );
        })}
    </div>
  );
};

export default ChatList;
