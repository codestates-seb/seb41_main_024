import axios from 'axios';

const postSignup = (formValue: {
  email: string;
  nickName: string;
  phoneNumber: string;
  pw: string;
}) => {
  const REQUEST_URL = 'https://ngether.site';
  return axios.post(`${REQUEST_URL}/api/members`, JSON.stringify(formValue), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export default postSignup;

export const hashPassword = async (pw: string) => {
  const { data }: any = await axios({
    method: 'post',
    data: { pw },
    url: '/api/passwordHash',
  });
  return data;
};
