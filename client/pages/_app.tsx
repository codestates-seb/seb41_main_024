import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import DefaultLayout from '../components/container/defalutLayout/DefaultLayout';
import React, { ReactElement, createContext } from 'react';
import { NextPageWithLayout } from '../components/container/defalutLayout/defaultLayoutType';
import { CookiesProvider } from 'react-cookie';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useLongPolling from '../hooks/useLongPolling';
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};


export interface UnreadMessageContextType {
  isUnReadMessage: boolean;
  setIsUnReadMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UnreadMessageContext = createContext<UnreadMessageContextType>({
  isUnReadMessage: false,
  setIsUnReadMessage: () => {},
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const renderWithLayout =
    Component.getLayout ||
    function (page: ReactElement) {
      return <DefaultLayout>{page}</DefaultLayout>;
    };

  const queryClient = new QueryClient();

  const {isUnReadMessage, setIsUnReadMessage} = useLongPolling()

  return renderWithLayout(
    <UnreadMessageContext.Provider  value={{ isUnReadMessage, setIsUnReadMessage}}>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </CookiesProvider>
    </UnreadMessageContext.Provider>
  );
}
