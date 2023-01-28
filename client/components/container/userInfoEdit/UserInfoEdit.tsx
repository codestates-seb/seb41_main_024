import React from 'react';
import EditUserInfo from '../editUserInfo/editUserInfo';
import NearByList from '../../organisms/nearByList/NearByList';
import NTabs from '../../organisms/nTabs/NTabs';

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
