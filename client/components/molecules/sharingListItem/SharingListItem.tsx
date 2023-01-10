import React from 'react';
import Img from '../../atoms/image/Image';
import styles from './sharingListItem.module.css';
import { ListItemPropsType } from './Type_ListItem';
import { ReactComponent as Heart } from '../../../public/sharingList/heart.svg';

const SharingListItem = ({ src, alt, title, isHeart }: ListItemPropsType) => {
  return (
    <div className={`flex flex-col ${styles.flex_container}`}>
      <Img src={src} alt={alt} />
      <strong className={styles.list_Title}>{title}</strong>
      {isHeart ? (
        <div className={styles.flex_ListItem}>
          <strong>1/4</strong>
          <Heart />
        </div>
      ) : null}
    </div>
  );
};

export default SharingListItem;
