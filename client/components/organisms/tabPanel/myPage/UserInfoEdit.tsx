import React from 'react';
import UserInfoForm from '../../../molecules/userInfoForm/UserInfoForm';
import NearByList from '../../nearByList/NearByList';
import NTabs from '../../nTabs/NTabs';

const UserInfoEdit = () => {
  return (
    <>
      <NTabs
        ariaLabel="내정보, 검색위치 등록 탭"
        tabLabels={['내정보 수정', '검색위치 등록']}
        themeSub={true}
      >
        <UserInfoForm editPage={true} content="수정하기" />
        <NearByList />
      </NTabs>
    </>
  );
};

export default UserInfoEdit;
