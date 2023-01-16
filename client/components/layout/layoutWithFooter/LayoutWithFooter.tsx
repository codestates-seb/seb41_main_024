import MainHeader from '../../organisms/headers/mainHeader/MainHeader';
import { defaultLayoutPropsType } from '../defalutLayout/defaultLayout';
import Navigation from '../../organisms/bottomNav/bottomNav';
import Footer from '../../molecules/footer/Footer';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import basicTheme from '../../../theme/basic';

const LayoutWithFooter = ({ children }: defaultLayoutPropsType) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={basicTheme}>
        <div className="max-w-2xl min-w-[390px] mx-auto h-[100vh] flex flex-col">
          <MainHeader />
          {children}
          <div className="pb-[56px]">
            <Footer />
          </div>
          <Navigation />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default LayoutWithFooter;
