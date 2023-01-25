import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import DefaultLayout from '../components/container/defalutLayout/DefaultLayout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../components/container/defalutLayout/defaultLayout';
import { CookiesProvider } from 'react-cookie';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
        <Hydrate state={pageProps.dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </CookiesProvider>
  );
}
