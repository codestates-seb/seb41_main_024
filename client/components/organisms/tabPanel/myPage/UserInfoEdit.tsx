import React from 'react';
import UserInfoForm from '../../../molecules/userInfoForm/UserInfoForm';
import { useQuery } from '@tanstack/react-query';
import getOneUserData from '../../../../api/getOneUserData';
import Loading from '../../loading/Loading';

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
      {isLoading && <Loading />}
    </div>
  );
};

export default UserInfoEdit;
