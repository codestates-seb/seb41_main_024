import Badge from '../../atoms/badge/Badge';
import SmallSpot from '../../molecules/spot/SmallSpot';
import Alert from '../../atoms/alert/Alert';
import styles from './chatItem.module.css';
import { chatItemType } from './chatItemType';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '../../../api/detail';

const ChatItem = ({
  thumbnail,
  declareStatus,
  title,
  lastMessage,
  address,
  alertNum,
}: chatItemType) => {
  const chatAddress = address?.split(' ').slice(1, 3).join(' ');

  return (
    <div className="flex items-center border-solid border-0 border-b border-slate-400 h-22 p-4 bg-[#ffffff]">
      <img src={thumbnail} className="w-16" />
      <div className="flex-1 flex-col items-start px-4">
        <Badge declareStatus={declareStatus} />
        <span className={`${styles.title_ellipsis} text-s font-medium`}>
          {title}
        </span>
        <span
          className={`${styles.title_ellipsis} text-xs text-black font-medium opacity-50`}
        >
          {lastMessage}
        </span>
      </div>
      <div className="flex flex-col items-end h-max">
        <SmallSpot address={chatAddress} />
        {alertNum && alertNum > 0 && <Alert alertNum={alertNum} />}
      </div>
    </div>
  );
};

export default ChatItem;
