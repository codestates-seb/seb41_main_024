import { useMutation } from '@tanstack/react-query';
import patchOneUserData from '../../api/patchOneUserData';
const patchOneUserInfo = (formValue, queryClient) => {
  return useMutation(patchOneUserData(formValue), {
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo']);
      alert('수정되었습니다!');
    },
  });
};

export default patchOneUserInfo;
