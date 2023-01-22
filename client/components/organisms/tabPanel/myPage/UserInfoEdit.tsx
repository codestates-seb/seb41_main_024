import React from 'react';
import UserInfoForm from '../../../molecules/userInfoForm/UserInfoForm';
import NearByList from '../../nearByList/NearByList';
import SubTab from '../../subTab/subTab';

const UserInfoEdit = () => {
  return (
    <>
      <SubTab tabLabels={['내정보 수정', '검색위치 등록']}>
        <UserInfoForm editPage={true} content="수정하기" />
        <NearByList />
      </SubTab>
    </>
  );
};

export default UserInfoEdit;
