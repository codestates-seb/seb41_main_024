import ChatItem from '../../components/organisms/chatItem/ChatItem';
import ProductImg from '../../public/chatItem/productImg.svg';
import ProductImg02 from '../../public/chatItem/productImg02.svg';
import ProductImg03 from '../../public/chatItem/productImg03.svg';
import ProductImg04 from '../../public/chatItem/productImg04.svg';
import ProductImg05 from '../../public/chatItem/productImg05.svg';
import Link from 'next/link';
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
                address={'서울 서초구'}
                // address={chatItem.address}
              />
            </Link>
          );
        })}

      <div>
        <ChatItem
          thumbnail={ProductImg}
          declareStatus={true}
          title="아삭아삭 나주배 3kg"
          price="9,850"
          address="서울 서초구"
        />
        <ChatItem
          thumbnail={ProductImg02}
          declareStatus={false}
          title="남해안 디포리 멸치다시팩 15g * 20팩 맛있게 진한 국물용 다시팩"
          price="9,850"
          address="경기도 수지구"
          alertNum="3"
        />
        <ChatItem
          thumbnail={ProductImg03}
          declareStatus={true}
          title="[최상등급 + 당일도정 + 혼합미] 23년 햅쌀 프리미엄 경기미 쌀 10kg"
          price="9,850"
          address="제주 연동"
        />
        <ChatItem
          thumbnail={ProductImg04}
          declareStatus={true}
          title="[글랜인스] 호주산 블랙앵거스 냉장 150 소고기 모듬구이 세트 600"
          price="9,850"
          address="서울 중구"
          alertNum="1"
        />
        <ChatItem
          thumbnail={ProductImg05}
          declareStatus={false}
          title="헤이즈 파스텔 확장형 캐리어"
          price="9,850"
          address="서울 서초구"
          alertNum="7"
        />
        <ChatItem
          thumbnail={ProductImg}
          declareStatus={true}
          title="아삭아삭 나주배 3kg"
          price="9,850"
          address="서울 서초구"
        />
        <ChatItem
          thumbnail={ProductImg02}
          declareStatus={false}
          title="남해안 디포리 멸치다시팩 15g * 20팩"
          price="9,850"
          address="서울 서초구"
        />
        <ChatItem
          thumbnail={ProductImg03}
          declareStatus={true}
          title="23년 햅쌀 프리미엄 경기미  쌀 10kg"
          price="9,850"
          address="서울 서초구"
          alertNum="1"
        />
        <ChatItem
          thumbnail={ProductImg}
          declareStatus={true}
          title="호주산 냉장 소고기 모듬구이 세트 600"
          price="9,850"
          address="서울 서초구"
        />
        <ChatItem
          thumbnail={ProductImg}
          declareStatus={false}
          title="헤이즈 파스텔 확장형 캐리어"
          price="9,850"
          address="서울 서초구"
        />
      </div>
    </div>
  );
};

export default ChatList;
