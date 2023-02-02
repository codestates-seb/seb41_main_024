import React from 'react';
import NTabs from '../../organisms/nTabs/NTabs';
import AddressBook from '../addressBook/AddressBook';
import EditUserInfo from '../editUserInfo/editUserInfo';

const UserInfoEdit = () => {
  return (
    <>
      <NTabs
        ariaLabel="내정보, 주소록 탭"
        tabLabels={['내정보 수정', '주소록 등록']}
        themeSub={true}
      >
        <EditUserInfo />
        <AddressBook />
      </NTabs>
    </>
  );
};

export default UserInfoEdit;
