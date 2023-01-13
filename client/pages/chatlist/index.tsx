import Badge from '../../components/atoms/badge/Badge';
import Spot from '../../components/molecules/spot/Spot';
import ChatItem from '../../components/organisms/chatItem/ChatItem';
import ChatItemWithAlert from '../../components/organisms/chatItem/ChatItemWithAlert';
import ChatIcon from '../../public/navbar/ChatIcon';
import ProductImg from '../../public/chatItem/productImg.svg';
import ProductImg02 from '../../public/chatItem/productImg02.svg';
import ProductImg03 from '../../public/chatItem/productImg03.svg';
import ProductImg04 from '../../public/chatItem/productImg04.svg';
import ProductImg05 from '../../public/chatItem/productImg05.svg';

import MainHeader from '../../components/organisms/headers/mainHeader/MainHeader';
import Navbar from '../../components/organisms/navbar/Navbar';
import BottomNav from '../../components/organisms/bottomNav/bottomNav';

import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const ChatList = () => {
  const [chatListData, setChatListData] = useState([]);

  interface ChatListResponse {
    id: Number;
    thumbnail: string;
    isOpen: false;
    title: string;
    price: string;
    spot: string;
  }

  // React-Query로 교체
  // useEffect(() => {
  //   async function fetchChatList(): Promise<AxiosResponse<ChatListResponse>> {
  //     return await axios.get('http://localhost:3001/productList');
  //   }
  //   fetchChatList().then((res: any) => setChatListData(res.data));
  // }, []);

  console.log(chatListData);

  return (
    <div>
      <MainHeader />

      <div>
        <ChatItem
          thumbnail={ProductImg}
          isOpen={true}
          title="아삭아삭 나주배 3kg"
          price="9,850"
          spot="서울 서초구"
        />
        <ChatItem
          thumbnail={ProductImg02}
          isOpen={false}
          title="남해안 디포리 멸치다시팩 15g * 20팩"
          price="9,850"
          spot="경기도 수지구"
        />
        <ChatItem
          thumbnail={ProductImg03}
          isOpen={true}
          title="23년 햅쌀 프리미엄 경기미  쌀 10kg"
          price="9,850"
          spot="제주 연동"
        />
        <ChatItemWithAlert
          thumbnail={ProductImg04}
          isOpen={true}
          title="호주산 냉장 소고기 모듬구이 세트 600"
          price="9,850"
          spot="서울 중구"
        />
        <ChatItem
          thumbnail={ProductImg05}
          isOpen={false}
          title="헤이즈 파스텔 확장형 캐리어"
          price="9,850"
          spot="서울 서초구"
        />
        <ChatItem
          thumbnail={ProductImg}
          isOpen={true}
          title="아삭아삭 나주배 3kg"
          price="9,850"
          spot="서울 서초구"
        />
        <ChatItem
          thumbnail={ProductImg02}
          isOpen={false}
          title="남해안 디포리 멸치다시팩 15g * 20팩"
          price="9,850"
          spot="서울 서초구"
        />
        <ChatItem
          thumbnail={ProductImg03}
          isOpen={true}
          title="23년 햅쌀 프리미엄 경기미  쌀 10kg"
          price="9,850"
          spot="서울 서초구"
        />
        <ChatItem
          thumbnail={ProductImg}
          isOpen={true}
          title="호주산 냉장 소고기 모듬구이 세트 600"
          price="9,850"
          spot="서울 서초구"
        />
        <ChatItem
          thumbnail={ProductImg}
          isOpen={false}
          title="헤이즈 파스텔 확장형 캐리어"
          price="9,850"
          spot="서울 서초구"
        />
      </div>
      {chatListData &&
        chatListData.map((el: any) => {
          return (
            <ChatItem
              thumbnail={ProductImg}
              isOpen={el.isOpen}
              title={el.title}
              price={el.price}
              spot={el.spot}
            />
          );
        })}
      {/* <Navbar /> */}
      <BottomNav />
    </div>
  );
};

export default ChatList;
