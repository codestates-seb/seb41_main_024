import Badge from '../../atoms/badge/Badge';
import SmallSpot from '../../molecules/spot/SmallSpot';
import Alert from '../../atoms/alert/Alert';
import styles from './chatItem.module.css';
import { chatItemType } from './chatItemType';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '../../../api/detail';
import Image from 'next/image';
import base from '../../../public/imageBox/base-box.svg';
import StateBadge from '../stateBadge/StateBadge';

const ChatItem = ({
  recruitment,
  title,
  lastMessage,
  address,
  unreadCount,
  imageLink,
}: chatItemType) => {
  const chatAddress = address?.split(' ').slice(1, 3).join(' ');

  return (
    <div className="flex items-center border-solid border-0 border-b border-slate-400 h-22 p-4 bg-[#ffffff]">
      <div className="w-16">
        <Image
          alt="상품이미지"
          src={imageLink || base}
          width={62}
          height={62}
          quality={15}
          // fill
          // sizes="(max-width: 672px) 3px, 5px"
        />
      </div>
      <div className="flex-1 flex-col px-4">
        <Badge recruitment={recruitment} />
        <p className={`${styles.title_ellipsis} text-s font-medium break-all`}>
          {title}
        </p>
        <p
          className={`${styles.title_ellipsis} text-xs text-black font-medium opacity-50 break-all`}
        >
          {lastMessage}
        </p>
      </div>
      <div className="flex flex-col items-end h-max">
        <SmallSpot address={chatAddress} />
        <Alert unreadCount={unreadCount} />
      </div>
    </div>
  );
};

export default ChatItem;
