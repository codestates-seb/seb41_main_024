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
  // temp
  // const chatData = {
  //   thumbnail: ProductImg,
  //   isOpen: true,
  //   title: '아삭아삭 나주배 3kg',
  //   price: '9,850',
  //   spot: '서울 서초구',
  // };

  return (
    <div className="flex items-center border-solid border-0 border-b border-slate-400 h-20 p-4">
      <img src={thumbnail} className="w-16" />
      <div className="flex-1 flex-col items-start px-4">
        <Badge isOpen={isOpen} />
        <p>{title}</p>
        <p className="text-sky-500">인당 {price}원</p>
      </div>
      <Spot spot={spot} />
    </div>
  );
};

export default ChatItem;
