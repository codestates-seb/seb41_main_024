import MainHeader from '../../organisms/headers/mainHeader/MainHeader';
import { defaultLayoutPropsType } from './defaultLayout';
import Navigation from '../../organisms/bottomNav/BottomNav';
import Footer from '../../molecules/footer/Footer';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import basicTheme from '../../../theme/basic';
import React from 'react';

const DefaultLayout = ({ children }: defaultLayoutPropsType) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={basicTheme}>
        <div className="max-w-2xl mx-auto min-h-[100vh]">
          <MainHeader />
          {children}
          <Navigation />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default DefaultLayout;
