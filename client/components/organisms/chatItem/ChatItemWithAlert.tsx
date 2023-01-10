import Link from 'next/link';
import Image from 'next/image';
import ProductImg from '../../../public/chatItem/productImg.svg';
import Badge from '../../atoms/badge/Badge';

import SmallSpot from '../../molecules/spot/SmallSpot';
import Alert from '../../atoms/alert/alert';

export interface chatItem {
  thumbnail: string | undefined;
  isOpen: boolean;
  title: string;
  price: string;
  spot: string;
}

const ChatItemWithAlert = ({
  thumbnail,
  isOpen,
  title,
  price,
  spot,
}: chatItem) => {
  return (
    <div className="flex items-center border-solid border-0 border-b border-slate-400 h-20 p-4">
      <img src={thumbnail} className="w-16" />
      <div className="flex-1 flex-col items-start px-4">
        <div className="flex">
          <Badge isOpen={isOpen} />
          <SmallSpot spot={spot} />
        </div>
        <p className="text-s font-medium">{title}</p>
        <p className="text-xs text-primary font-medium">인당 {price}원</p>
      </div>
      <Alert alertNum="1" />
    </div>
  );
};

export default ChatItemWithAlert;
