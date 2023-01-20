import Image from 'next/image';
import React from 'react';
import Button from '../../atoms/button/Button';
import { productDataProps } from './userMetaInfo';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { deleteProductDetail } from '../../../api/detail';
import Link from 'next/link';

const UserMetaInfo = ({
  productData,
  deleteHandler,
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
            onClick={deleteHandler}
          >
            삭제
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserMetaInfo;
