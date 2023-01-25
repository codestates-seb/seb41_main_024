import axios from 'axios';
import Cookies from 'js-cookie';

const getOneUserData = () => {
  const REQUEST_URL = 'https://ngether.site';

  return axios.get(`${REQUEST_URL}/api/members/myInformation`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
};

export default getOneUserData;
