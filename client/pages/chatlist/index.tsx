import Badge from '../../components/atoms/badge/Badge';
import Spot from '../../components/molecules/spot/Spot';
import ChatItem from '../../components/organisms/chatItem/ChatItem';
import ChatIcon from '../../public/navbar/ChatIcon';
import ProductImg from '../../public/chatItem/productImg.svg';
import MainHeader from '../../components/organisms/headers/mainHeader/MainHeader';
import Navbar from '../../components/organisms/navbar/Navbar';

import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const ChatList = () => {
  const [chatListData, setChatListData] = useState([] as any);

  interface ChatListResponse {
    id: Number;
    thumbnail: string;
    isOpen: false;
    title: string;
    price: string;
    spot: string;
  }

  // React-Query로 교체
  useEffect(() => {
    async function fetchChatList(): Promise<AxiosResponse<ChatListResponse>> {
      return await axios.get('http://localhost:3001/productList');
    }
    fetchChatList().then((res) => setChatListData(res.data));
  }, []);

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
          thumbnail={ProductImg}
          isOpen={true}
          title="아삭아삭 나주배 3kg"
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
          thumbnail={ProductImg}
          isOpen={true}
          title="아삭아삭 나주배 3kg"
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
      </div>
      {/* <ChatItem
        thumbnail={ProductImg}
        isOpen={true}
        title="아삭아삭 나주배 3kg"
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
        thumbnail={ProductImg}
        isOpen={true}
        title="아삭아삭 나주배 3kg"
        price="9,850"
        spot="서울 서초구"
      />
      <ChatItem
        thumbnail={ProductImg}
        isOpen={true}
        title="아삭아삭 나주배 3kg"
        price="9,850"
        spot="서울 서초구"
      /> */}

      <Navbar />

      {/* {chatListData &&
        chatListData.map((el: any) => {
          <ChatItem
            thumbnail={el.thumbnail}
            isOpen={el.isOpen}
            title={el.title}
            price={el.price}
            spot={el.spot}
          />;
        })} */}
    </div>
  );
};

export default ChatList;
