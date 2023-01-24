import React from 'react';
import SharingListItem from '../../molecules/sharingListItem/SharingListItem';
import base from '../../../public/imageBox/base-box.svg';
import { ListItemPropsType } from '../../molecules/sharingListItem/sharingListItemType';
interface sharingListsType {
  sharingLists: ListItemPropsType[];
}
const NearByList = ({ sharingLists }: sharingListsType) => {
  return (
    <div className="grid grid-cols-2 gap-4 m-5 w-fit">
      {sharingLists?.map((sharingItem: ListItemPropsType) => (
        <SharingListItem
          src={base}
          alt="상품이미지"
          title={sharingItem?.title}
          isFavorite={true}
          key={sharingItem?.boardId}
          curNum={sharingItem?.curNum}
          maxNum={sharingItem?.maxNum}
          address={sharingItem?.address}
        />
      ))}
    </div>
  );
};

export default NearByList;
