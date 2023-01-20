import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DefaultLayout from '../components/layout/defalutLayout/DefaultLayout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../components/layout/defalutLayout/defaultLayout';
import { CookiesProvider } from 'react-cookie';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const renderWithLayout =
    Component.getLayout ||
    function (page: ReactElement) {
      return <DefaultLayout>{page}</DefaultLayout>;
    };

  const queryClient = new QueryClient();

  return renderWithLayout(
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </CookiesProvider>
  );
}
