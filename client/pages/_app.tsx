import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import basicTheme from '../theme/basic';
import DefaultLayout from '../components/layout/defalutLayout/DefaultLayout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../components/layout/defalutLayout/defaultLayout';

import { QueryClient, QueryClientProvider } from 'react-query';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
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
