import React from 'react';
import Img from '../../atoms/image/Image';
import styles from './sharingListItem.module.css';
import { ListItemPropsType } from './Type_ListItem';
import Button from '../../atoms/button/Button';

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
          {title}
        </strong>
      </div>
      {isFavorite && (
        <div className={styles.flex_listItem}>
          <strong className="font-normal">1/4</strong>
          <Button
            src="/sharingList/favorite_border.svg"
            alt="heart"
            width={24}
            height={24}
          />
        </div>
      )}
    </div>
  );
};

export default SharingListItem;
