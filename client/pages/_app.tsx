import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import basicTheme from '../theme/basic';
import DefaultLayout from '../components/layout/defalutLayout/DefaultLayout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../components/layout/defalutLayout/defaultLayout';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const renderWithLayout =
    Component.getLayout ||
    function (page: ReactElement) {
      return <DefaultLayout>{page}</DefaultLayout>;
    };
  {
    /* <StyledEngineProvider injectFirst>
      <ThemeProvider theme={basicTheme}>
      </ThemeProvider>
    </StyledEngineProvider> */
  }
  return renderWithLayout(
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
