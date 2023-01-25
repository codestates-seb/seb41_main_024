import React from 'react';
import EditUserInfo from '../../../container/editUserInfo/editUserInfo';
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
        <EditUserInfo />
        <NearByList sharingLists={[]} />
      </NTabs>
    </>
  );
};

export default UserInfoEdit;
