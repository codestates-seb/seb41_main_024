import { QueryClient, useMutation } from '@tanstack/react-query';
import patchOneUserData from '../../api/patchOneUserData';
const patchOneUserInfo = (
  formValue: {
    email: string;
    nickName: string;
    phoneNumber: string;
    pw: string;
  },
  queryClient: QueryClient
) => {
  return useMutation(patchOneUserData(formValue), {
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo']);
      alert('수정되었습니다!');
    },
  });
};

export default patchOneUserInfo;
