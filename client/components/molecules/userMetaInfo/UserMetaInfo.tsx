import Image from 'next/image';
import React from 'react';
import Button from '../../atoms/button/Button';
import { productDataProps } from './userMetaInfo';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';

const UserMetaInfo = ({ productData }: productDataProps) => {
  const [cookies, setCookie] = useCookies(['memberId']);
  const isWriter = Number(cookies.memberId) === productData.memberId;
  const router = useRouter();

  const handleEdit = () => {
    router.push('/addnew');
  };

  console.log('>>>', productData);

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
          <Button onClick={() => handleEdit()}>
            <Image
              src="/detail/edit.svg"
              width={24}
              height={24}
              alt="edit-button"
            />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserMetaInfo;
