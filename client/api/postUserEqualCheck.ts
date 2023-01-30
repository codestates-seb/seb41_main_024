import axios from 'axios';

const REQUEST_URL = 'https://ngether.site';

const postUserEqualCheck = (enteredValue: { [name: string]: string }) => {
  return axios.post(`${REQUEST_URL}/api/members/check`, enteredValue);
};

export default postUserEqualCheck;
