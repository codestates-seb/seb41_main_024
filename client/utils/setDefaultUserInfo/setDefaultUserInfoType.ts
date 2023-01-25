import { Dispatch, SetStateAction } from 'react';
export interface setDefaultUserInfoType {
  setFormValue: Dispatch<SetStateAction<{}>>;
  userInfo: any;
}
