// import '../public/fonts/style.css';
import '../styles/globals.css';

import { Noto_Sans_KR } from '@next/font/google';

import type { AppProps } from 'next/app';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import DefaultLayout from '../components/container/defalutLayout/DefaultLayout';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../components/container/defalutLayout/defaultLayoutType';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const notoSansKR = Noto_Sans_KR({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['korean'],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const renderWithLayout =
    Component.getLayout ||
    function (page: ReactElement) {
      return (
        <DefaultLayout>
          <main className={notoSansKR.className}>{page}</main>
        </DefaultLayout>
      );
    };

  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Ngether</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
          {renderWithLayout(<Component {...pageProps} />)}
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
