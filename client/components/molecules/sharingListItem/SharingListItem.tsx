import React from 'react';
import Img from '../../atoms/image/Image';
import styles from './sharingListItem.module.css';
import { ListItemPropsType } from './sharingListItemType';
import Button from '../../atoms/button/Button';
import Link from 'next/link';
import Image from 'next/image';
import StateBadge from '../../organisms/stateBadge/StateBadge';

const SharingListItem = ({
  src,
  alt,
  title,
  isFavorite,
  curNum,
  maxNum,
  address,
  boardId,
}: ListItemPropsType) => {
  const localAddress = address
    ?.split(' ')
    .filter((item, index) => {
      if (index <= 2) return true;
    })
    .join(' ');
  return (
    <div className={`flex flex-col ${styles.flex_container}`}>
      <Link href={`/nearby/${boardId}`} className="block relative pb-[100%]">
        <img
          className="absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] w-full h-auto"
          src={src}
          alt={alt}
        />
        {true && <StateBadge stateText={'모집 완료'} usedList={true} />}
      </Link>
      <div className="px-2 mt-2.5">
        <strong className={`${styles.title_ellipsis} font-normal`}>
          <Link href={`/nearby/${boardId}`}>{title}</Link>
        </strong>
      </div>
      <div className={styles.flex_listItem}>
        <strong className="font-normal">{`${curNum} / ${maxNum}`}</strong>
        {/* <Button>
          <Image
            src="/sharingList/favorite_border.svg"
            alt="heart"
            width={24}
            height={24}
          ></Image>
        </Button> */}
        <div>{localAddress}</div>
      </div>
    </div>
  );
};

export default SharingListItem;
