import Image from 'next/image';
import React from 'react';
import Button from '../../atoms/button/Button';
import { userDataProps } from './userMetaInfo';

const UserMetaInfo = ({ userData }: userDataProps) => {
  return (
    <div className="flex items-center border-b-1 border-x-0 border-t-0 border-solid border-[#475569] py-6 px-6">
      <div>
        <div className="bg-emerald-500 w-8 h-8"></div>
      </div>
      <div className="grow ml-2">
        <strong className="font-semibold text-base">
          {userData?.nickName}
        </strong>
        <p>{userData?.address}</p>
      </div>
      <Button>
        <Image
          src="/detail/edit.svg"
          width={24}
          height={24}
          alt="edit-button"
        />
      </Button>
    </div>
  );
};

export default UserMetaInfo;
