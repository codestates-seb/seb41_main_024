import React from 'react';
import Badge from '../../atoms/badge/Badge';
import Spot from '../../molecules/spot/Spot';
import { chatItemPropsType } from './chatItem';

const ChatItem = ({
  thumbnail,
  isOpen,
  title,
  price,
  spot,
}: chatItemPropsType) => {
  return (
    <div className="flex items-center border-solid border-0 border-b border-slate-400 h-22 p-4">
      <img src={thumbnail} className="w-16" />
      <div className="flex-1 flex-col items-start px-4">
        <Badge isOpen={isOpen} />
        <p className="text-s font-medium">{title}</p>
        <p className="text-xs text-primary font-medium">인당 {price}원</p>
      </div>
      <Spot spot={spot} />
    </div>
  );
};

export default ChatItem;
