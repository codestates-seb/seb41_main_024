import axios from 'axios';
import Cookies from 'js-cookie';

const patchOneUserData = (formValue: {
  email: string;
  nickName: string;
  phoneNumber: string;
  pw: string;
}) => {
  const REQUEST_URL = 'https://ngether.site';

  return () =>
    axios.patch(`${REQUEST_URL}/api/members/patch`, JSON.stringify(formValue), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('access_token'),
        Refresh: Cookies.get('refresh_token'),
      },
    });
};

export default patchOneUserData;
