import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const useLongPolling = () => {
  const [isUnReadMessage, setIsUnReadMessage] = useState(false);
  const token = Cookies.get('access_token');
  useEffect(() => {
    const longPoll = async () => {
      try {
        const response = await axios.get(
          'https://ngether.site/chat/room/findNewMessages',
          { headers: { Authorization: token } }
        );

        if (response.status === 200) {
          await setIsUnReadMessage(true);
          setTimeout(async () => {
            await longPoll();
          }, 5000);
        }
      } catch (error: any) {
        const checkToken = Cookies.get('access_token');
        if (
          error?.response?.status === 500 ||
          error?.response?.status === 402
        ) {
          return;
        }

        if (checkToken) {
          await setIsUnReadMessage(false);
          await longPoll();
        }
      }
    };
    token !== undefined && longPoll();
  }, [token]);

  return { isUnReadMessage, setIsUnReadMessage };
};

export default useLongPolling;
