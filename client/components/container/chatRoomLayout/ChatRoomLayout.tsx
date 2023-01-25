import { defaultLayoutPropsType } from '../defalutLayout/defaultLayoutType';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import basicTheme from '../../../theme/basic';

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
