import { useEffect } from 'react';
import { setDefaultUserInfoType } from './setDefaultUserInfoType';

const setDefaultUserInfo = ({
  setFormValue,
  userInfo,
}: setDefaultUserInfoType) => {
  useEffect(() => {
    setFormValue({
      email: userInfo.email,
      nickName: userInfo.nickName,
      phoneNumber: userInfo.phoneNumber,
    });
  }, [userInfo]);
};

export default setDefaultUserInfo;
