import React from 'react';
import AddressBook from '../../../container/addressBook/AddressBook';
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
        <AddressBook />
      </NTabs>
    </>
  );
};

export default UserInfoEdit;
