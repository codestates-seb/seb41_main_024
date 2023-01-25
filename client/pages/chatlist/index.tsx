import ChatItem from '../../components/organisms/chatItem/ChatItem';
import ProductImg from '../../public/chatItem/productImg.svg';
import ProductImg02 from '../../public/chatItem/productImg02.svg';
import ProductImg03 from '../../public/chatItem/productImg03.svg';
import ProductImg04 from '../../public/chatItem/productImg04.svg';
import ProductImg05 from '../../public/chatItem/productImg05.svg';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getMySharing } from '../../api/mySharing';

const ChatList = () => {
  const { data } = useQuery(['mySharing'], getMySharing);
  const chatListData = data?.data.data;

  return (
    <div>
      {chatListData &&
        chatListData.map((chatItem: any) => {
          return (
            <Link href={`/chat/${chatItem.roomId}`}>
              <ChatItem
                key={chatItem.roomId}
                thumbnail={ProductImg}
                declareStatus={chatItem.declareStatus}
                title={chatItem.roomName}
                price={chatItem.price}
                lastMessage={chatItem.lastMessage}
                address={chatItem?.address || '서울 구로구'}
              />
            </Link>
          );
        })}
    </div>
  );
};

export default ChatList;
