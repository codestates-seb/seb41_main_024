import { Dispatch, SetStateAction, useEffect } from 'react';
import { useSetDefaultUserInfoType } from './useSetDefaultUserInfoType';

const useSetDefaultUserInfo = ({
  setFormValue,
  userInfo,
}: useSetDefaultUserInfoType) => {
  useEffect(() => {
    setFormValue({
      email: userInfo.email,
      nickName: userInfo.nickName,
      phoneNumber: userInfo.phoneNumber,
    });
  }, []);
};

export default useSetDefaultUserInfo;
