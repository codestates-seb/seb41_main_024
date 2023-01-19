import { Dispatch, SetStateAction } from 'react';
import { userInfoType } from '../../components/molecules/userInfoForm/userInfoType';

export interface useSetDefaultUserInfoType {
  setFormValue: Dispatch<SetStateAction<{}>>;
  userInfo: userInfoType;
}
