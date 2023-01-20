import MainHeader from '../../organisms/headers/mainHeader/MainHeader';
import { defaultLayoutPropsType } from '../defalutLayout/defaultLayout';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import basicTheme from '../../../theme/basic';
import ChatHeader from '../../organisms/headers/chatHedaer/ChatHeader';
import BottomNav from '../../organisms/bottomNav/BottomNav';

const ChatRoomLayout = ({ children }: defaultLayoutPropsType) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={basicTheme}>
        <div className="max-w-2xl mx-auto min-h-[100vh] flex flex-col">
          {children}
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ChatRoomLayout;