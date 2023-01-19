import { Dispatch, SetStateAction } from 'react';
import { userInfoType } from '../../components/molecules/userInfoForm/userInfoType';

export interface setDefaultUserInfoType {
  setFormValue: Dispatch<SetStateAction<{}>>;
  userInfo: userInfoType;
}
