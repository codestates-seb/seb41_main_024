import React from 'react';
import Img from '../../atoms/image/Image';
import styles from './sharingListItem.module.css';
import { ListItemPropsType } from './sharingListItemType';
import Button from '../../atoms/button/Button';
import Link from 'next/link';
import Image from 'next/image';

const SharingListItem = ({
  src,
  alt,
  title,
  isFavorite,
}: ListItemPropsType) => {
  return (
    <div className={`flex flex-col ${styles.flex_container}`}>
      <Img src={src} alt={alt} />
      <div className="px-2 mt-2.5">
        <strong className={`${styles.title_ellipsis} font-normal`}>
          <Link href="/nearbydetail">{title}</Link>
        </strong>
      </div>
      {isFavorite && (
        <div className={styles.flex_listItem}>
          <strong className="font-normal">1/4</strong>
          <Button>
            <Image
              src="/sharingList/favorite_border.svg"
              alt="heart"
              width={24}
              height={24}
            ></Image>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SharingListItem;
