import React from 'react';
import UserInfoForm from '../../../molecules/userInfoForm/UserInfoForm';

const UserInfoEdit = (props) => {
  return <UserInfoForm editPage={true} content="수정하기" />;
};

export default UserInfoEdit;
