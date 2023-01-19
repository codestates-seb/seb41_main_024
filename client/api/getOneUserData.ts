import axios from 'axios';

const getOneUserData = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/members/myInformation`, {
    headers: {
      Authorization: `${process.env.NEXT_PUBLIC_TOKEN_AUTHOR}`,
    },
  });
};

export default getOneUserData;
