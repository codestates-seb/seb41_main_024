import React from 'react';
import Button from '../../atoms/button/Button';
import { productDataProps } from './userMetaInfoType';
import Link from 'next/link';
import ModalComponent from '../../organisms/modal/Modal';

const UserMetaInfo = ({
  productData,
  handleDelete,
  isWriter,
  id,
  isDeleteModalOpen,
  handleIsDeleteModalOpen,
  handleIsDeleteModalClose,
}: productDataProps) => {
  return (
    <div className="flex items-center border-b-1 border-x-0 border-t-0 border-solid border-[#475569] py-6 px-6 inline-block">
      <div>
        <div className="bg-emerald-500 w-8 h-8"></div>
      </div>
      <div className="grow ml-2">
        <strong className="font-semibold text-base">
          {productData?.nickname}
        </strong>
        <p>{productData?.address}</p>
      </div>
      <ModalComponent
        modalOpen={isDeleteModalOpen}
        handleClose={handleIsDeleteModalClose}
        title="해당 게시물을 삭제하시겠습니까? 삭제된 게시물은 복구되지 않습니다"
        onClick={handleDelete}
        positiveResponse="예 삭제하겠습니다"
        positiveColor={'red'}
        negativeResponse="취소"
        negativeColor={'black'}
      />
      {isWriter && (
        <div className={'flex items-center'}>
          <Link
            href={`/edit/${id}`}
            className="w-14 p-2 m-2 bg-primary text-white rounded inline-block text-center"
          >
            수정
          </Link>
          <Button
            className="w-14 p-2 m-2 bg-[red] text-white rounded"
            onClick={handleIsDeleteModalOpen}
          >
            삭제
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserMetaInfo;
