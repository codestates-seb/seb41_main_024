import '../styles/globals.css';
import type { AppProps } from 'next/app';
import DefaultLayout from '../components/layout/defalutLayout/DefaultLayout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../components/layout/defalutLayout/defaultLayout';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
  const queryClient = new QueryClient();
  return renderWithLayout(
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </CookiesProvider>
  );
}
