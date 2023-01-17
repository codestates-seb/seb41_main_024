import MainHeader from '../../organisms/headers/mainHeader/MainHeader';
import { defaultLayoutPropsType } from '../defalutLayout/defaultLayout';
import Navigation from '../../organisms/bottomNav/BottomNav';
import Footer from '../../molecules/footer/Footer';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import basicTheme from '../../../theme/basic';
//메인페이지, 마이페이지
const LayoutWithFooter = ({ children }: defaultLayoutPropsType) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={basicTheme}>
        <div className="max-w-2xl mx-auto min-h-[100vh] flex flex-col">
          <MainHeader />
          {children}
          <div>
            <Footer />
          </div>
          <Navigation />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default LayoutWithFooter;
