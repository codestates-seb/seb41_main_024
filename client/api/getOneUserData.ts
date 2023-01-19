import axios from 'axios';

const getOneUserData = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_URL_API}`, {
    headers: {
      Authorization: `${process.env.NEXT_PUBLIC_TOKEN_AUTHOR}`,
    },
  });
};

export default getOneUserData;
