import React from 'react';
import UserInfoForm from '../../../molecules/userInfoForm/UserInfoForm';
import { useQuery } from '@tanstack/react-query';
import getOneUserData from '../../../../api/getOneUserData';

const UserInfoEdit = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getOneUserData,
  });

  return (
    <div>
      {data && (
        <UserInfoForm editPage={true} content="수정하기" userInfo={data.data} />
      )}
      {isLoading && (
        <div className="flex fixed inset-0 justify-center items-center z-[100] bg-black bg-opacity-[0.05]">
          <strong>Loading...</strong>
        </div>
      )}
    </div>
  );
};

export default UserInfoEdit;
