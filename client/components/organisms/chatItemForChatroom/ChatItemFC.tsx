import Badge from '../../atoms/badge/Badge';
import SmallSpot from '../../molecules/spot/SmallSpot';
import Alert from '../../atoms/alert/Alert';
import styles from './chatItemFC.module.css';
import { chatItemFCType } from './chatItemFCType';
import React from 'react';

const ChatItemFC = ({
  thumbnail,
  title,
  address,
}: chatItemFCType) => {
  const chatAddress = address?.split(' ').slice(1, 3).join(' ');

  return (
    <div className="flex items-center border-solid border-0 border-b border-slate-400 h-22 p-4 bg-[#ffffff]">
      <img src={thumbnail} className="w-16" />
      <div className="flex-1 flex-col items-start px-4">
        <span className={`${styles.title_ellipsis} text-s font-medium`}>
          {title}
        </span>
      </div>
      <div className="flex flex-col items-end h-max">
        <SmallSpot address={chatAddress} />
      </div>
    </div>
  );
};

export default ChatItemFC;
