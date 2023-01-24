import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DefaultLayout from '../components/container/defalutLayout/DefaultLayout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../components/container/defalutLayout/defaultLayout';
import { CookiesProvider } from 'react-cookie';
import { SessionProvider } from 'next-auth/react';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const renderWithLayout =
    Component.getLayout ||
    function (page: ReactElement) {
      return (
        <SessionProvider session={pageProps.session}>
          <DefaultLayout>{page}</DefaultLayout>
        </SessionProvider>
      );
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
