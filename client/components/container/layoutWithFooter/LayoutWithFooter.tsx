import MainHeader from '../../organisms/headers/mainHeader/MainHeader';
import { defaultLayoutPropsType } from '../defalutLayout/defaultLayoutType';
import Navigation from '../../organisms/bottomNav/BottomNav';
import Footer from '../../molecules/footer/Footer';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import basicTheme from '../../../theme/basic';
import useLogin from '../../../hooks/common/useLogin';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

//메인페이지, 마이페이지
const LayoutWithFooter = ({ children }: defaultLayoutPropsType) => {
  const { isLogin } = useLogin();
  const router = useRouter();
  const nickName = Cookies.get('nickName');
  const [isUnReadMessage, setIsUnReadMessage] = useState(false);
  const token = Cookies.get('access_token')
  const [timeoutState, setTimeoutState] = useState<NodeJS.Timeout>();

  const longPolling: Function = async (token: string) => {
    if (token !== undefined) {
      try {
        const response = await axios.get('https://ngether.site/chat/room/findNewMessages', { headers: { Authorization: token } });
        if (response.status === 200) {
          setIsUnReadMessage(true);
          setTimeoutState(setTimeout(async () => { return await longPolling(token) }, 5000));
        }
        if (response.status === 421) {
          setIsUnReadMessage(false);
          return await longPolling();
        }
      } catch (error) {
        setTimeoutState(setTimeout(async () => { return await longPolling(token) }, 5000));
      }
    } else {
      setTimeoutState(setTimeout(async () => { return await longPolling(token) }, 5000));
    }
  };
  
  useEffect(() => {
    longPolling(token);
    return () => {
      clearTimeout(timeoutState);
    };
  }, []);

  const handleLogOut = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('memberId');
    Cookies.remove('nickName');
    Cookies.remove('locationId');
    Cookies.remove('role');
    router.push('/');
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={basicTheme}>
        <div className="max-w-2xl mx-auto min-h-[100vh] flex flex-col pcPageLine">
          <MainHeader
            isLogin={isLogin}
            nickName={nickName}
            logOutHandler={handleLogOut}
          />
          {children}
          <Footer />
          <Navigation isUnReadMessage={isUnReadMessage} setIsUnReadMessage={setIsUnReadMessage}/>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default LayoutWithFooter;
