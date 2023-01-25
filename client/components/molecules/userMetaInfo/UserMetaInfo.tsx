import React from 'react';
import Button from '../../atoms/button/Button';
import { productDataProps } from './userMetaInfoType';
import Link from 'next/link';

const UserMetaInfo = ({
  productData,
  handleDelete,
  isWriter,
  id,
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
      {isWriter && (
        <div className={'flex items-center'}>
          <Link
            href={`/edit/${id}`}
            className="w-14 p-2 m-2 bg-primary text-white rounded inline-block text-center"
          >
            수정
          </Link>
          <Button
            className="w-14 p-2 m-2 bg-primary text-white rounded"
            onClick={handleDelete}
          >
            삭제
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserMetaInfo;
