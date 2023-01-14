import Link from 'next/link';
import Image from 'next/image';
import ProductImg from '../../../public/chatItem/productImg.svg';
import Badge from '../../atoms/badge/Badge';

import SmallSpot from '../../molecules/spot/SmallSpot';
import Alert from '../../atoms/alert/Alert';

export interface chatItem {
  thumbnail: string | undefined;
  isOpen: boolean;
  title: string;
  price: string;
  spot: string;
  alertNum: string;
}

const ChatItemWithAlert = ({
  thumbnail,
  isOpen,
  title,
  price,
  spot,
  alertNum,
}: chatItem) => {
  return (
    <div className="flex items-start border-solid border-0 border-b border-slate-400 h-22 p-4">
      <img src={thumbnail} className="w-16" />
      <div className="flex-1 flex-col items-start px-4">
        <Badge isOpen={isOpen} />
        <p className="text-s font-medium">{title}</p>
        <p className="text-xs text-primary font-medium">인당 {price}원</p>
      </div>
      <div className="flex flex-col justyfy-start items-end h-max">
        <SmallSpot spot={spot} />
        {Number(alertNum) > 0 && <Alert alertNum={alertNum} />}
      </div>
    </div>
  );
};

export default ChatItemWithAlert;
