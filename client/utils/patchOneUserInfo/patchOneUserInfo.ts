import { AlertColor } from '@mui/material';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import Cookies from 'js-cookie';
import patchOneUserData from '../../api/patchOneUserData';
const patchOneUserInfo = (
  formValue: {
    email: string;
    nickName: string;
    phoneNumber: string;
    pw: string;
  },
  queryClient: QueryClient,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setAlertOption: Dispatch<
    SetStateAction<{
      severity: AlertColor;
      value: string;
    }>
  >
) => {
  return useMutation(patchOneUserData(formValue), {
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo']);
      setOpen(true);
      setAlertOption({
        severity: 'success',
        value: '수정 완료 되었습니다.',
      });
      Cookies.set('nickName', formValue.nickName);
    },
  });
};

export default patchOneUserInfo;
