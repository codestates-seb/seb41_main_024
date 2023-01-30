import React from 'react';
import SharingListItem from '../../molecules/sharingListItem/SharingListItem';
import base from '../../../public/imageBox/base-box.svg';
import { ListItemPropsType } from '../../molecules/sharingListItem/sharingListItemType';
import NoContent from '../../molecules/noContent/NoContent';
interface sharingListsType {
  sharingLists: ListItemPropsType[];
}
const NearByList = ({ sharingLists }: sharingListsType) => {
  return (
    <>
      {sharingLists?.length === 0 && <NoContent />}
      <div className="grid grid-cols-2 gap-4 w-full p-5">
        {sharingLists?.map((sharingItem: ListItemPropsType) => (
          <SharingListItem
            src={sharingItem?.imageLink || base}
            alt="상품이미지"
            title={sharingItem?.title}
            isFavorite={true}
            key={sharingItem?.boardId}
            curNum={sharingItem?.curNum}
            maxNum={sharingItem?.maxNum}
            address={sharingItem?.address}
            boardId={sharingItem?.boardId}
            boardStatus={sharingItem?.boardStatus}
          />
        ))}
      </div>
    </>
  );
};

export default NearByList;
