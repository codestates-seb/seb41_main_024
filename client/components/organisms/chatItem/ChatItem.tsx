import Badge from '../../atoms/badge/Badge';
import SmallSpot from '../../molecules/spot/SmallSpot';
import Alert from '../../atoms/alert/Alert';
import styles from './chatItem.module.css';
import { chatItemType } from './chatItemType';
import React from 'react';

const ChatItem = ({
  thumbnail,
  declareStatus,
  title,
  lastMessage,
  address,
}: chatItemType) => {
  return (
    <div className="flex items-center border-solid border-0 border-b border-slate-400 h-22 p-4 bg-[#ffffff]">
      <img src={thumbnail} className="w-16" />
      <div className="flex-1 flex-col items-start px-4">
        <Badge declareStatus={declareStatus} />
        <span className={`${styles.title_ellipsis} text-s font-medium`}>
          {title}
        </span>
        <span className="text-xs text-primary font-medium opacity-80">
          {lastMessage}
        </span>
      </div>
      <div className="flex flex-col items-end h-max">
        <SmallSpot address={address} />
      </div>
    </div>
  );
};

export default ChatItem;
