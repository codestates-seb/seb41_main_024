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

const UserMetaInfo = ({ productData }: productDataProps) => {
  const isWriter = Number(Cookies.get('memberId')) === productData?.memberId;
  const router = useRouter();
  const { id } = router.query;

  console.log(productData);
  const handleEdit = () => {
    router.push(`/edit/${id}`);
  };

  const deleteMutation = useMutation(() => deleteProductDetail(id));

  console.log(deleteMutation);

  if (deleteMutation.data) {
    router.push('/');
  }

  return (
    <div className="flex items-center border-b-1 border-x-0 border-t-0 border-solid border-[#475569] py-6 px-6">
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
        <div>
          <Button
            className="w-14 p-2 m-2 bg-primary text-white rounded"
            onClick={handleEdit}
          >
            수정
          </Button>
          <Button
            className="w-14 p-2 m-2 bg-primary text-white rounded"
            onClick={() => deleteMutation.mutate()}
          >
            삭제
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserMetaInfo;
