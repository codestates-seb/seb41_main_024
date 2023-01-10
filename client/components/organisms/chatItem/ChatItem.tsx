import Link from 'next/link';
import Image from 'next/image';
import ProductImg from '../../../public/chatItem/productImg.svg';
import Badge from '../../atoms/badge/Badge';
import Spot from '../../molecules/spot/Spot';

export interface chatItem {
  thumbnail: string | undefined;
  isOpen: boolean;
  title: string;
  price: string;
  spot: string;
}

const ChatItem = ({ thumbnail, isOpen, title, price, spot }: chatItem) => {
  const chatData = {
    thumbnail: ProductImg,
    isOpen: true,
    title: '아삭아삭 나주배 3kg',
    price: '9,850',
    spot: '서울 서초구',
  };

  return (
    <div className="flex items-center w-screen border-solid border-slate-400 h-20 p-4">
      <img src={ProductImg} className="w-16" />
      <div className="flex-1 flex-col items-start p-1">
        <Badge isOpen={chatData.thumbnail} />
        <p>{chatData.title}</p>
        <p>인당 {chatData.price}원</p>
      </div>
      <Spot spot={chatData.spot} />
    </div>
  );
};

export default ChatItem;

// <div className="flex-1">
//   <Link href="/">
//     <div className="bg-sky-500 flex flex-col justify-around items-center grow-1 p-2.5"></div>
//   </Link>
// </div>;
