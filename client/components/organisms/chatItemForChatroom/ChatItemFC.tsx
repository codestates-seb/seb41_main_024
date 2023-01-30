import Badge from '../../atoms/badge/Badge';
import SmallSpot from '../../molecules/spot/SmallSpot';
import Alert from '../../atoms/alert/Alert';
import styles from './chatItemFC.module.css';
import { chatItemFCType } from './chatItemFCType';
import React from 'react';

const ChatItemFC = ({
  sharingData
}: chatItemFCType) => {
  const chatAddress = sharingData.address.split(' ').slice(1, 3).join(' ');

  return (
    <div className="flex items-center p-4 bg-[#ffffff] w-[65vw]">
      <img src={sharingData.imageLink} className="w-16" />
      <div className="flex-1 flex-col items-start px-4">
        <span className={`${styles.title_ellipsis} text-s font-medium`}>
          {sharingData.title}
        </span>
        <span className={`${styles.title_ellipsis} text-xs text-black font-medium opacity-50`} >
        {`${sharingData.price.toLocaleString()}원`}
        </span>
        <span className={`${styles.title_ellipsis} text-xs text-black font-medium opacity-50`} >
        {`~${sharingData.deadLine}`}
        </span>
      </div>
      <SmallSpot address={chatAddress} />
    </div>
  );
};

export default ChatItemFC;

{/* <div className="flex items-center border-solid border-0 border-b border-slate-400 h-22 p-4 bg-[#ffffff]">
<img src={imageLink || base} className="w-16" />
<div className="flex-1 flex-col px-4">
  <Badge recruitment={recruitment} />
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
  <Alert unreadCount={unreadCount} />
</div>
</div> */}
