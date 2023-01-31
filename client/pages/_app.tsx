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

export const UnreadMessageContext = createContext<UnreadMessageContextType>({} as UnreadMessageContextType);

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const renderWithLayout =
  Component.getLayout ||
  function (page: ReactElement) {
    return <DefaultLayout>{page}</DefaultLayout>;
  };

  const {isUnReadMessage, setIsUnReadMessage} = useLongPolling();

  const store = {
    isUnReadMessage: isUnReadMessage,
    setIsUnReadMessage: setIsUnReadMessage
  }

  const queryClient = new QueryClient();

  return (
    <UnreadMessageContext.Provider value={store}>
        <CookiesProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ReactQueryDevtools initialIsOpen={false} />
              {renderWithLayout(
                <Component {...pageProps} />
              )}
            </Hydrate>
          </QueryClientProvider>
        </CookiesProvider>
    </UnreadMessageContext.Provider>
  )
}
